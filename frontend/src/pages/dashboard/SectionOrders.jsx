import { useState, useEffect } from 'react';
import { Badge, Card, SectionTitle, LoadingState, EmptyState, RedBtn } from './shared';
import { useCart } from '../../context/CartContext';
import API from '../../config';

const STAGES = ['Placed', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];

function TrackBar({ status }) {
  const idx = { pending:0, confirmed:1, processing:2, shipped:3, delivered:4, cancelled:-1 }[status] ?? 0;
  if (status === 'cancelled') return (
    <div style={{ marginTop:12, padding:'8px 14px', background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:8, color:'#ef4444', fontSize:12, fontWeight:600, fontFamily:"'Oswald',sans-serif" }}>
      <i className="fas fa-ban" style={{ marginRight:6 }} /> Order Cancelled
    </div>
  );
  return (
    <div style={{ marginTop:14 }}>
      <div style={{ display:'flex', gap:4, alignItems:'center' }}>
        {STAGES.map((s, i) => (
          <div key={s} style={{ display:'flex', alignItems:'center', flex: i < STAGES.length-1 ? 1 : 'none' }}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, flexShrink:0 }}>
              <div style={{ width:26, height:26, borderRadius:'50%', background: i <= idx ? '#e30613' : 'rgba(255,255,255,0.08)', border: i <= idx ? '2px solid #e30613' : '2px solid rgba(255,255,255,0.12)', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.3s' }}>
                {i < idx
                  ? <i className="fas fa-check" style={{ color:'#fff', fontSize:10 }} />
                  : <div style={{ width:6, height:6, borderRadius:'50%', background: i === idx ? '#fff' : 'rgba(255,255,255,0.25)' }} />}
              </div>
              <span style={{ color: i <= idx ? '#fff' : 'rgba(255,255,255,0.3)', fontSize:9, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.04em', whiteSpace:'nowrap', textTransform:'uppercase' }}>{s}</span>
            </div>
            {i < STAGES.length-1 && (
              <div style={{ flex:1, height:2, background: i < idx ? '#e30613' : 'rgba(255,255,255,0.08)', margin:'0 4px 16px', borderRadius:2, transition:'background 0.3s' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function printInvoice(order) {
  const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' }) : '';
  const rows = order.items?.map(i => `<tr><td>${i.name}</td><td style="text-align:center">${i.qty}</td><td style="text-align:right">$${i.price.toFixed(2)}</td><td style="text-align:right">$${(i.price*i.qty).toFixed(2)}</td></tr>`).join('') || '';
  const w = window.open('','_blank','width=700,height=900');
  w.document.write(`<!DOCTYPE html><html><head><title>Invoice #${order._id?.slice(-8).toUpperCase()}</title>
  <style>body{font-family:Arial,sans-serif;padding:40px;color:#111}h1{color:#e30613;margin:0}table{width:100%;border-collapse:collapse;margin:20px 0}th{background:#f5f5f5;padding:10px;text-align:left;font-size:13px}td{padding:10px;border-bottom:1px solid #eee;font-size:13px}.total{font-weight:700;font-size:16px;color:#e30613}.footer{margin-top:40px;color:#999;font-size:12px}@media print{button{display:none}}</style>
  </head><body>
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:30px">
    <div><h1>24HR FREMONT TIRE & AUTO</h1><p style="color:#666;margin:4px 0">Fremont, CA · (415) 634-7777</p></div>
    <div style="text-align:right"><div style="font-size:22px;font-weight:700">INVOICE</div><div style="color:#666;font-size:13px">#${order._id?.slice(-8).toUpperCase()}</div><div style="color:#666;font-size:13px">${date}</div></div>
  </div>
  <table><thead><tr><th>Item</th><th style="text-align:center">Qty</th><th style="text-align:right">Unit Price</th><th style="text-align:right">Total</th></tr></thead><tbody>${rows}</tbody></table>
  <div style="text-align:right"><div style="color:#666;font-size:13px">Subtotal: $${order.subtotal?.toFixed(2)}</div><div style="color:#666;font-size:13px">Shipping: ${order.shipping===0?'FREE':'$'+order.shipping?.toFixed(2)}</div><div style="color:#666;font-size:13px">Tax: $${order.tax?.toFixed(2)}</div><div class="total" style="margin-top:8px">Total: $${order.total?.toFixed(2)}</div></div>
  <div class="footer"><p>Thank you for your business!</p></div>
  <button onclick="window.print()" style="margin-top:20px;padding:10px 24px;background:#e30613;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px">Print / Save PDF</button>
  </body></html>`);
  w.document.close();
}

function OrderCard({ order, onReorder }) {
  const [open, setOpen] = useState(false);
  const [reordered, setReordered] = useState(false);
  const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' }) : '';

  const handleReorder = () => {
    onReorder(order.items);
    setReordered(true);
    setTimeout(() => setReordered(false), 2500);
  };

  return (
    <Card style={{ overflow:'hidden' }}>
      <div style={{ padding:'18px 22px' }}>
        {/* Header row */}
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:10, marginBottom:12 }}>
          <div>
            <div style={{ color:'rgba(255,255,255,0.35)', fontSize:11, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:4 }}>Order #{order._id?.slice(-8).toUpperCase()}</div>
            <div style={{ color:'#fff', fontSize:15, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.03em' }}>
              {order.items?.length} item{order.items?.length !== 1 ? 's' : ''} · <span style={{ color:'#e30613' }}>${order.total?.toFixed(2)}</span>
            </div>
            {date && <div style={{ color:'rgba(255,255,255,0.3)', fontSize:11, marginTop:3 }}>{date}</div>}
          </div>
          <Badge status={order.status || 'pending'} />
        </div>

        {/* Item thumbnails */}
        <div style={{ display:'flex', gap:8, marginBottom:12, flexWrap:'wrap' }}>
          {order.items?.slice(0, 4).map((item, i) => (
            <div key={i} style={{ width:44, height:44, borderRadius:8, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <img src={item.img} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'contain', padding:4 }} onError={e => e.target.style.display='none'} />
            </div>
          ))}
          {order.items?.length > 4 && (
            <div style={{ width:44, height:44, borderRadius:8, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(255,255,255,0.4)', fontSize:11, fontWeight:700 }}>
              +{order.items.length - 4}
            </div>
          )}
        </div>

        {/* Track bar */}
        <TrackBar status={order.status} />

        {/* Tracking info */}
        {order.trackingNumber && (
          <div style={{ marginTop:10, padding:'10px 14px', background:'rgba(59,130,246,0.08)', border:'1px solid rgba(59,130,246,0.2)', borderRadius:9, display:'flex', alignItems:'center', gap:10 }}>
            <i className="fas fa-truck" style={{ color:'#60a5fa', fontSize:13 }} />
            <span style={{ color:'rgba(255,255,255,0.6)', fontSize:12 }}>{order.courier || 'Courier'}: </span>
            {order.trackingUrl
              ? <a href={order.trackingUrl} target="_blank" rel="noreferrer" style={{ color:'#60a5fa', fontSize:12, fontWeight:700 }}>{order.trackingNumber}</a>
              : <span style={{ color:'#60a5fa', fontSize:12, fontWeight:700 }}>{order.trackingNumber}</span>
            }
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display:'flex', gap:8, marginTop:12, flexWrap:'wrap', alignItems:'center' }}>
          <button onClick={() => setOpen(o => !o)}
            style={{ background:'none', border:'none', color:'rgba(255,255,255,0.4)', cursor:'pointer', fontSize:12, fontFamily:"'Oswald',sans-serif", fontWeight:600, letterSpacing:'0.05em', display:'flex', alignItems:'center', gap:6, padding:0 }}>
            <i className={`fas fa-chevron-${open ? 'up' : 'down'}`} style={{ fontSize:10 }} />
            {open ? 'Hide Details' : 'View Details'}
          </button>
          <div style={{ marginLeft:'auto', display:'flex', gap:8 }}>
            <button onClick={() => printInvoice(order)}
              style={{ padding:'6px 14px', borderRadius:7, border:'1px solid rgba(255,255,255,0.15)', background:'rgba(255,255,255,0.05)', color:'rgba(255,255,255,0.6)', fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:"'Oswald',sans-serif", letterSpacing:'0.05em' }}>
              <i className="fas fa-file-invoice" style={{ marginRight:5 }} />Invoice
            </button>
            <button onClick={handleReorder}
              style={{ padding:'6px 14px', borderRadius:7, border:`1px solid ${reordered ? 'rgba(34,197,94,0.4)' : 'rgba(227,6,19,0.4)'}`, background: reordered ? 'rgba(34,197,94,0.1)' : 'rgba(227,6,19,0.08)', color: reordered ? '#22c55e' : '#e30613', fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:"'Oswald',sans-serif", letterSpacing:'0.05em', transition:'all 0.2s' }}>
              {reordered ? <><i className="fas fa-check" style={{ marginRight:5 }} />Added!</> : <><i className="fas fa-rotate-right" style={{ marginRight:5 }} />Reorder</>}
            </button>
          </div>
        </div>

        {open && (
          <div style={{ marginTop:14, paddingTop:14, borderTop:'1px solid rgba(255,255,255,0.07)' }}>
            {order.items?.map((item, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 0', borderBottom: i < order.items.length-1 ? '1px solid rgba(255,255,255,0.05)' : 'none', gap:12 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:36, height:36, borderRadius:7, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.07)', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <img src={item.img} alt={item.name} style={{ maxWidth:'100%', maxHeight:'100%', objectFit:'contain', padding:3 }} onError={e => e.target.style.display='none'} />
                  </div>
                  <div>
                    <div style={{ color:'#fff', fontSize:13, fontWeight:600 }}>{item.name}</div>
                    <div style={{ color:'rgba(255,255,255,0.3)', fontSize:11 }}>Qty: {item.qty}</div>
                  </div>
                </div>
                <div style={{ color:'#fff', fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:14, flexShrink:0 }}>
                  ${(item.price * item.qty).toFixed(2)}
                </div>
              </div>
            ))}
            <div style={{ marginTop:12, paddingTop:10, borderTop:'1px solid rgba(255,255,255,0.06)' }}>
              {[['Subtotal', `$${order.subtotal?.toFixed(2)}`], ['Shipping', order.shipping === 0 ? 'FREE' : `$${order.shipping?.toFixed(2)}`], ['Tax', `$${order.tax?.toFixed(2)}`]].map(([k,v]) => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', color:'rgba(255,255,255,0.4)', fontSize:12, padding:'3px 0' }}>
                  <span>{k}</span><span>{v}</span>
                </div>
              ))}
              <div style={{ display:'flex', justifyContent:'space-between', color:'#fff', fontWeight:800, fontSize:15, fontFamily:"'Oswald',sans-serif", padding:'6px 0 0', marginTop:4, borderTop:'1px solid rgba(255,255,255,0.08)' }}>
                <span>Total</span><span style={{ color:'#e30613' }}>${order.total?.toFixed(2)}</span>
              </div>
            </div>
            {order.address && (
              <div style={{ marginTop:10, color:'rgba(255,255,255,0.35)', fontSize:12 }}>
                <i className="fas fa-location-dot" style={{ color:'#e30613', marginRight:6 }} />{order.address}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

export default function SectionOrders({ user }) {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState(false);
  const { addItem } = useCart();

  const loadOrders = (email) => {
    setLoading(true);
    fetch(`${API}/orders/mine?email=${encodeURIComponent(email)}`, { signal: AbortSignal.timeout(60000) })
      .then(r => r.json()).then(data => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setOrders([]))
      .finally(() => { setLoading(false); setRetrying(false); });
  };

  useEffect(() => {
    if (!user?.email) { setLoading(false); return; }
    loadOrders(user.email);
  }, [user]);

  const handleReorder = (items) => {
    items?.forEach(item => addItem({ id: item.id, name: item.name, price: item.price, img: item.img, catLabel: item.catLabel }, item.qty));
  };

  return (
    <div>
      <SectionTitle
        title="My Orders"
        sub={loading ? '' : `${orders.length} order${orders.length !== 1 ? 's' : ''} placed`}
        action={
          <div style={{ display:'flex', gap:8 }}>
            <button onClick={() => { setRetrying(true); loadOrders(user.email); }}
              disabled={loading}
              style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', color:'rgba(255,255,255,0.6)', padding:'10px 16px', borderRadius:9, fontSize:12, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.07em', textTransform:'uppercase', cursor:'pointer' }}>
              <i className={`fas fa-rotate-right${loading ? ' fa-spin' : ''}`} style={{ fontSize:11 }} /> Refresh
            </button>
            <a href="/shop" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#e30613', border:'none', color:'#fff', padding:'10px 22px', borderRadius:9, fontSize:12, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.07em', textTransform:'uppercase', cursor:'pointer', textDecoration:'none' }}>
              <i className="fas fa-store" style={{ fontSize:11 }} /> Shop Now
            </a>
          </div>
        }
      />

      {loading ? <LoadingState /> : orders.length === 0 ? (
        <EmptyState icon="fa-box-open" title="No Orders Yet" sub="Your order history will appear here after you purchase from our shop."
          action={<a href="/shop"><RedBtn><i className="fas fa-store" style={{ fontSize:12 }} /> Browse Shop</RedBtn></a>}
        />
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {orders.map(o => <OrderCard key={o._id} order={o} onReorder={handleReorder} />)}
        </div>
      )}
    </div>
  );
}
