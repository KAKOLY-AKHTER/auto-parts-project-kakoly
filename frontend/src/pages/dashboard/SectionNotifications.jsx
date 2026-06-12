import { useState, useEffect } from 'react';
import { SectionTitle, LoadingState, EmptyState } from './shared';

import API from '../../config';

function fmtDate(raw) {
  if (!raw) return '';
  try {
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    return d.toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
  } catch { return raw; }
}

const TYPE_CONFIG = {
  service: { icon:'fa-screwdriver-wrench', color:'#22c55e' },
  order:   { icon:'fa-box',                color:'#3b82f6' },
  alert:   { icon:'fa-triangle-exclamation', color:'#eab308' },
  promo:   { icon:'fa-tag',                color:'#a855f7' },
  reward:  { icon:'fa-star',               color:'#f59e0b' },
};

const STATUS_MESSAGES = {
  pending:   'has been received and is awaiting confirmation.',
  confirmed: 'has been confirmed. We look forward to seeing you!',
  completed: 'is complete. Thank you for choosing us!',
  cancelled: 'has been cancelled.',
};

function bookingsToNotifications(bookings) {
  return bookings.map(b => {
    const date = new Date(b.createdAt);
    const diffDays = Math.floor((Date.now() - date) / 86400000);
    const timeLabel = diffDays === 0 ? 'Today'
      : diffDays === 1 ? 'Yesterday'
      : `${diffDays} days ago`;

    const statusMsg = STATUS_MESSAGES[b.status] || 'has been updated.';
    return {
      id:    b._id,
      type:  'service',
      title: `${b.service}`,
      desc:  `Your booking for ${fmtDate(b.date)} at ${b.time} ${statusMsg}`,
      time:  timeLabel,
      read:  b.status === 'completed' || b.status === 'cancelled',
      status: b.status,
    };
  });
}

function ordersToNotifications(orders) {
  return orders
    .filter(o => ['shipped','delivered'].includes(o.status))
    .map(o => {
      const diffDays = Math.floor((Date.now() - new Date(o.createdAt)) / 86400000);
      const timeLabel = diffDays === 0 ? 'Today' : diffDays === 1 ? 'Yesterday' : `${diffDays} days ago`;
      return {
        id:    'order-' + o._id,
        type:  'order',
        title: o.status === 'shipped' ? `Your order #${o._id?.slice(-8).toUpperCase()} has shipped!` : `Order #${o._id?.slice(-8).toUpperCase()} delivered`,
        desc:  o.status === 'shipped'
          ? `${o.items?.length} item${o.items?.length !== 1 ? 's' : ''} · ${o.trackingNumber ? `Tracking: ${o.trackingNumber}` : 'Check dashboard for updates'}`
          : `Your order has been delivered. Total: $${o.total?.toFixed(2)}`,
        time:  timeLabel,
        read:  o.status === 'delivered',
        status: o.status,
      };
    });
}

export default function SectionNotifications({ user }) {
  const [notifs,  setNotifs]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter,  setFilter]  = useState('all');

  useEffect(() => {
    if (!user?.email) { setLoading(false); return; }
    Promise.all([
      fetch(`${API}/bookings/mine?email=${encodeURIComponent(user.email)}`).then(r => r.json()).catch(() => []),
      fetch(`${API}/orders/mine?email=${encodeURIComponent(user.email)}`).then(r => r.json()).catch(() => []),
      fetch(`${API}/vehicles?email=${encodeURIComponent(user.email)}`).then(r => r.json()).catch(() => []),
    ]).then(([bookings, orders, vehicles]) => {
      const bookingNotifs = bookingsToNotifications(Array.isArray(bookings) ? bookings : []);
      const orderNotifs   = ordersToNotifications(Array.isArray(orders) ? orders : []);
      const oilNotifs     = (Array.isArray(vehicles) ? vehicles : [])
        .filter(v => v.mileage)
        .map(v => {
          const mileage = Number(v.mileage);
          const nextDue = Math.ceil(mileage / 5000) * 5000;
          const remaining = nextDue - mileage;
          if (remaining > 1500) return null;
          return {
            id:    'oil-' + v._id,
            type:  'alert',
            title: `Oil Change Due — ${v.year} ${v.make} ${v.model}`,
            desc:  remaining <= 0 ? 'Oil change is overdue! Schedule service now.' : `Only ${remaining.toLocaleString()} miles remaining until oil change is due at ${nextDue.toLocaleString()} mi.`,
            time:  'Based on mileage',
            read:  false,
            status: remaining <= 0 ? 'overdue' : 'soon',
          };
        }).filter(Boolean);
      setNotifs([...oilNotifs, ...orderNotifs, ...bookingNotifs]);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [user]);

  const unread      = notifs.filter(n => !n.read).length;
  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read:true })));
  const markRead    = (id) => setNotifs(n => n.map(x => x.id === id ? { ...x, read:true } : x));
  const dismiss     = (id) => setNotifs(n => n.filter(x => x.id !== id));

  const filtered = filter === 'all'    ? notifs
    : filter === 'unread' ? notifs.filter(n => !n.read)
    : notifs.filter(n => n.type === filter);

  const cfg = (type) => TYPE_CONFIG[type] || TYPE_CONFIG.service;

  return (
    <div>
      <SectionTitle
        title="Notifications"
        sub={loading ? '' : `${notifs.length} notification${notifs.length !== 1 ? 's' : ''}${unread > 0 ? ` · ${unread} unread` : ''}`}
        action={
          unread > 0 && (
            <button onClick={markAllRead}
              style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.14)', color:'rgba(255,255,255,0.7)', padding:'9px 16px', borderRadius:9, fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:"'Oswald',sans-serif", letterSpacing:'0.05em' }}>
              <i className="fas fa-check-double" style={{ fontSize:11, color:'#22c55e' }} /> Mark All Read
            </button>
          )
        }
      />

      {loading ? <LoadingState /> : notifs.length === 0 ? (
        <EmptyState
          icon="fa-bell"
          title="No Notifications"
          sub="You're all caught up. Service booking updates and alerts will appear here."
        />
      ) : (
        <>
          {/* Summary row */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))', gap:10, marginBottom:22 }}>
            {[
              { label:'Unread',   value:unread,                                         color:'#e30613', icon:'fa-circle-dot' },
              { label:'Services', value:notifs.filter(n=>n.type==='service').length,    color:'#22c55e', icon:'fa-screwdriver-wrench' },
              { label:'Alerts',   value:notifs.filter(n=>n.type==='alert').length,      color:'#eab308', icon:'fa-triangle-exclamation' },
              { label:'Orders',   value:notifs.filter(n=>n.type==='order').length,      color:'#3b82f6', icon:'fa-box' },
            ].map(({ label, value, color, icon }) => (
              <div key={label} style={{ background:'#0f0f17', border:`1px solid ${color}22`, borderRadius:12, padding:'14px 16px', display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:34, height:34, borderRadius:8, background:`${color}14`, border:`1px solid ${color}30`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <i className={`fas ${icon}`} style={{ color, fontSize:13 }} />
                </div>
                <div>
                  <div style={{ color:'#fff', fontSize:22, fontWeight:700, fontFamily:"'Oswald',sans-serif", lineHeight:1 }}>{value}</div>
                  <div style={{ color:'rgba(255,255,255,0.45)', fontSize:11, marginTop:2 }}>{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Filter pills */}
          <div style={{ display:'flex', gap:8, marginBottom:18, flexWrap:'wrap' }}>
            {['all','unread','service','order','alert'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding:'6px 14px', borderRadius:99, border:`1px solid ${filter===f ? '#e30613' : 'rgba(255,255,255,0.12)'}`, background: filter===f ? 'rgba(227,6,19,0.14)' : 'transparent', color: filter===f ? '#fff' : 'rgba(255,255,255,0.5)', fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:"'Oswald',sans-serif", textTransform:'capitalize', letterSpacing:'0.05em', transition:'all 0.15s' }}>
                {f}
              </button>
            ))}
          </div>

          {/* List */}
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {filtered.length === 0 && (
              <div style={{ color:'rgba(255,255,255,0.3)', textAlign:'center', padding:'40px 0', fontFamily:"'Oswald',sans-serif", fontSize:15, letterSpacing:'0.05em' }}>
                No notifications in this category.
              </div>
            )}
            {filtered.map(n => {
              const c = cfg(n.type);
              return (
                <div key={n.id}
                  style={{ background: n.read ? '#0f0f17' : 'rgba(227,6,19,0.04)', border:`1px solid ${n.read ? 'rgba(255,255,255,0.08)' : 'rgba(227,6,19,0.2)'}`, borderRadius:14, padding:'18px 20px', display:'flex', alignItems:'flex-start', gap:14, transition:'all 0.2s' }}>

                  <div style={{ width:44, height:44, borderRadius:11, background:`${c.color}14`, border:`1.5px solid ${c.color}30`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                    <i className={`fas ${c.icon}`} style={{ color:c.color, fontSize:16 }} />
                  </div>

                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:8 }}>
                      <div style={{ color:'#fff', fontSize:14, fontWeight: n.read ? 500 : 700, lineHeight:1.4 }}>{n.title}</div>
                      {!n.read && <div style={{ width:9, height:9, borderRadius:'50%', background:'#e30613', flexShrink:0, marginTop:5 }} />}
                    </div>
                    <div style={{ color:'rgba(255,255,255,0.5)', fontSize:13, marginTop:5, lineHeight:1.55 }}>{n.desc}</div>
                    <div style={{ color:'rgba(255,255,255,0.28)', fontSize:11, marginTop:6, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.04em' }}>{n.time}</div>
                  </div>

                  <div style={{ display:'flex', flexDirection:'column', gap:6, flexShrink:0 }}>
                    {!n.read && (
                      <button onClick={() => markRead(n.id)}
                        style={{ background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.25)', color:'#22c55e', borderRadius:7, padding:'5px 11px', fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:"'Oswald',sans-serif", whiteSpace:'nowrap', letterSpacing:'0.04em' }}>
                        Mark Read
                      </button>
                    )}
                    <button onClick={() => dismiss(n.id)}
                      style={{ background:'transparent', border:'none', color:'rgba(255,255,255,0.22)', cursor:'pointer', fontSize:15, padding:'4px 6px', lineHeight:1 }}>
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
