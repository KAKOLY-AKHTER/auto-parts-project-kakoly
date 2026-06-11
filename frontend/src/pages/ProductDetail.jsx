import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProduct, getRelated } from '../data/products';

function Stars({ rating, size = 'md' }) {
  const sz = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <svg key={s} viewBox="0 0 24 24" className={sz}
          fill={s <= Math.round(rating) ? '#f59e0b' : 'none'}
          stroke="#f59e0b" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function RelatedCard({ p }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const discount = Math.round((1 - p.price / p.oldPrice) * 100);

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem({ id: p.id, name: p.name, price: p.price, img: p.img, catLabel: p.catLabel });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div onClick={() => navigate(`/product-details/${p.id}`)}
      style={{ cursor:'pointer', border:'1.5px solid #e5e7eb', borderRadius:14, overflow:'hidden', background:'#fff', transition:'all 0.2s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor='#dc2626'; e.currentTarget.style.boxShadow='0 8px 28px rgba(220,38,38,0.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor='#e5e7eb'; e.currentTarget.style.boxShadow='none'; }}>
      <div style={{ height:160, background:'#f9fafb', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
        <img src={p.img} alt={p.name} style={{ maxWidth:'80%', maxHeight:'80%', objectFit:'contain' }} onError={e => e.target.style.opacity=0} />
        {discount > 0 && (
          <div style={{ position:'absolute', top:10, right:10, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:6, fontSize:10, fontWeight:700, padding:'2px 7px' }}>-{discount}%</div>
        )}
      </div>
      <div style={{ padding:'14px 16px' }}>
        <div style={{ fontSize:10, fontWeight:700, color:'#dc2626', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:4 }}>{p.catLabel}</div>
        <div style={{ fontSize:13, fontWeight:700, color:'#111', lineHeight:1.35, marginBottom:8, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{p.name}</div>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
          <Stars rating={p.rating} size="sm" />
          <span style={{ fontSize:10, color:'#9ca3af' }}>{p.reviews}</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
          <div>
            <div style={{ fontSize:10, color:'#9ca3af', textDecoration:'line-through' }}>${p.oldPrice.toFixed(2)}</div>
            <div style={{ fontSize:18, fontWeight:900, color:'#111', fontFamily:"'Oswald',sans-serif" }}>${p.price.toFixed(2)}</div>
          </div>
          <button onClick={handleAdd}
            style={{ background: added ? '#16a34a' : '#111', color:'#fff', border:'none', borderRadius:8, padding:'8px 14px', fontSize:11, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.05em', cursor:'pointer', display:'flex', alignItems:'center', gap:6, transition:'background 0.2s' }}>
            {added ? <><i className="fas fa-check" style={{ fontSize:10 }} /> Added!</> : <><i className="fas fa-cart-plus" style={{ fontSize:11 }} /> Add</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, count } = useCart();
  const product = getProduct(id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [toast, setToast] = useState(false);
  const [activeTab, setActiveTab] = useState('desc');

  if (!product) {
    return (
      <div style={{ minHeight:'60vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16, padding:40 }}>
        <i className="fas fa-box-open" style={{ fontSize:48, color:'#d1d5db' }} />
        <div style={{ fontSize:22, fontWeight:800, color:'#111', fontFamily:"'Oswald',sans-serif" }}>Product Not Found</div>
        <button onClick={() => navigate('/shop')}
          style={{ background:'#e30613', color:'#fff', border:'none', borderRadius:10, padding:'12px 28px', fontSize:13, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.06em', cursor:'pointer' }}>
          Back to Shop
        </button>
      </div>
    );
  }

  const related = getRelated(product);
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, img: product.img, catLabel: product.catLabel });
    }
    setAdded(true);
    setToast(true);
    setTimeout(() => setAdded(false), 2000);
    setTimeout(() => setToast(false), 3500);
  };

  const TABS = [
    { key:'desc',     label:'Description' },
    { key:'features', label:'Features' },
    { key:'specs',    label:'Specifications' },
    { key:'compat',   label:'Compatibility' },
  ];

  return (
    <div style={{ background:'#f8f9fa', minHeight:'100vh', paddingTop:144 }}>

      {/* ── FLOATING TOAST ── */}
      <div style={{
        position:'fixed', bottom:28, right:28, zIndex:9999,
        background:'#111', color:'#fff', borderRadius:14,
        padding:'14px 20px', display:'flex', alignItems:'center', gap:14,
        boxShadow:'0 8px 32px rgba(0,0,0,0.22)',
        transform: toast ? 'translateY(0)' : 'translateY(120px)',
        opacity: toast ? 1 : 0,
        transition:'all 0.35s cubic-bezier(.22,.68,0,1.2)',
        pointerEvents: toast ? 'all' : 'none',
        minWidth:260,
      }}>
        <i className="fas fa-cart-check" style={{ color:'#e30613', fontSize:20, flexShrink:0 }} />
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.04em' }}>Added to Cart!</div>
          <div style={{ fontSize:11, color:'rgba(255,255,255,0.55)', marginTop:1 }}>{product.name}</div>
        </div>
        <a href="/cart" style={{ background:'#e30613', color:'#fff', borderRadius:8, padding:'7px 14px', fontSize:11, fontWeight:800, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.06em', textDecoration:'none', textTransform:'uppercase', whiteSpace:'nowrap' }}>
          View Cart ({count})
        </a>
      </div>

      {/* ── BREADCRUMB ── */}
      <div style={{ background:'#fff', borderBottom:'1px solid #f0f0f0' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'12px 32px', display:'flex', alignItems:'center', gap:8, fontSize:12, color:'#9ca3af', fontFamily:"'Oswald',sans-serif", fontWeight:500, letterSpacing:'0.03em' }}>
          <a href="/" style={{ color:'#9ca3af', textDecoration:'none' }}
            onMouseEnter={e => e.target.style.color='#e30613'}
            onMouseLeave={e => e.target.style.color='#9ca3af'}>Home</a>
          <i className="fas fa-chevron-right" style={{ fontSize:9 }} />
          <a href="/shop" style={{ color:'#9ca3af', textDecoration:'none' }}
            onMouseEnter={e => e.target.style.color='#e30613'}
            onMouseLeave={e => e.target.style.color='#9ca3af'}>Shop</a>
          <i className="fas fa-chevron-right" style={{ fontSize:9 }} />
          <span style={{ color:'#374151', fontWeight:700 }}>{product.name}</span>
        </div>
      </div>

      {/* ── MAIN PRODUCT SECTION ── */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'40px 32px 64px' }}>

        {/* Two-column grid */}
        <div style={{ display:'grid', gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)', gap:48, alignItems:'flex-start', marginBottom:48 }}
          className="product-grid">

          {/* ── LEFT: Image ── */}
          <div>
            <div style={{ background:'#fff', borderRadius:20, border:'1.5px solid #f0f0f0', overflow:'hidden', boxShadow:'0 4px 24px rgba(0,0,0,0.06)', position:'relative', padding:40, display:'flex', alignItems:'center', justifyContent:'center', minHeight:380 }}>
              {product.badge && (
                <div style={{ position:'absolute', top:18, left:18, background:'#e30613', color:'#fff', borderRadius:8, fontSize:11, fontWeight:800, padding:'4px 12px', fontFamily:"'Oswald',sans-serif", letterSpacing:'0.06em', textTransform:'uppercase' }}>
                  {product.badge}
                </div>
              )}
              {discount > 0 && (
                <div style={{ position:'absolute', top:18, right:18, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:8, fontSize:12, fontWeight:800, padding:'4px 12px', fontFamily:"'Oswald',sans-serif" }}>
                  -{discount}% OFF
                </div>
              )}
              <img src={product.img} alt={product.name}
                style={{ maxWidth:'85%', maxHeight:320, objectFit:'contain' }}
                onError={e => { e.target.style.opacity = 0; }} />
            </div>

            {/* Trust badges */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginTop:16 }}>
              {[
                { icon:'fa-shield-halved', label:'Genuine Parts' },
                { icon:'fa-truck',         label:'Fast Shipping' },
                { icon:'fa-rotate-left',   label:'Easy Returns' },
              ].map(b => (
                <div key={b.icon} style={{ background:'#fff', border:'1px solid #f0f0f0', borderRadius:10, padding:'10px 8px', display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
                  <i className={`fas ${b.icon}`} style={{ color:'#e30613', fontSize:16 }} />
                  <span style={{ fontSize:10, fontWeight:700, color:'#374151', textAlign:'center', fontFamily:"'Oswald',sans-serif", letterSpacing:'0.04em', textTransform:'uppercase' }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Info ── */}
          <div>
            {/* Category + tag */}
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
              <span style={{ background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:6, fontSize:11, fontWeight:800, padding:'3px 10px', fontFamily:"'Oswald',sans-serif", letterSpacing:'0.06em', textTransform:'uppercase' }}>
                {product.catLabel}
              </span>
              {product.tag && (
                <span style={{ background:'#e30613', color:'#fff', borderRadius:6, fontSize:11, fontWeight:800, padding:'3px 10px', fontFamily:"'Oswald',sans-serif", letterSpacing:'0.06em', textTransform:'uppercase' }}>
                  {product.tag}
                </span>
              )}
            </div>

            {/* Name */}
            <h1 style={{ fontSize:32, fontWeight:900, color:'#111', fontFamily:"'Oswald',sans-serif", letterSpacing:'0.02em', lineHeight:1.15, margin:'0 0 14px' }}>
              {product.name}
            </h1>

            {/* Rating row */}
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20, paddingBottom:20, borderBottom:'1px solid #f0f0f0', flexWrap:'wrap' }}>
              <Stars rating={product.rating} />
              <span style={{ fontSize:14, fontWeight:700, color:'#111' }}>{product.rating}</span>
              <span style={{ fontSize:13, color:'#9ca3af' }}>({product.reviews} reviews)</span>
              <span style={{ fontSize:12, color:'#16a34a', fontWeight:700 }}>
                <i className="fas fa-circle-check" style={{ marginRight:4 }} />In Stock
              </span>
            </div>

            {/* Price */}
            <div style={{ marginBottom:24 }}>
              <div style={{ display:'flex', alignItems:'baseline', gap:12, flexWrap:'wrap' }}>
                <span style={{ fontSize:42, fontWeight:900, color:'#111', fontFamily:"'Oswald',sans-serif", lineHeight:1 }}>${product.price.toFixed(2)}</span>
                <span style={{ fontSize:18, color:'#9ca3af', textDecoration:'line-through', fontWeight:500 }}>${product.oldPrice.toFixed(2)}</span>
                <span style={{ fontSize:14, fontWeight:800, color:'#dc2626', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:6, padding:'2px 8px' }}>Save ${(product.oldPrice - product.price).toFixed(2)}</span>
              </div>
              <div style={{ fontSize:12, color:'#9ca3af', marginTop:6 }}>
                <i className="fas fa-truck" style={{ marginRight:5, color:'#16a34a' }} />
                Free shipping on orders over $99
              </div>
            </div>

            {/* Short desc */}
            <p style={{ fontSize:14, color:'#6b7280', lineHeight:1.7, marginBottom:24 }}>{product.desc}</p>

            {/* Qty + Add to Cart */}
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16, flexWrap:'wrap' }}>
              <div style={{ display:'flex', alignItems:'center', border:'1.5px solid #e5e7eb', borderRadius:10, overflow:'hidden' }}>
                <button onClick={() => setQty(q => Math.max(1, q-1))}
                  style={{ width:42, height:50, background:'#f9fafb', border:'none', fontSize:20, color:'#374151', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700 }}>−</button>
                <span style={{ width:52, textAlign:'center', fontSize:16, fontWeight:800, color:'#111', fontFamily:"'Oswald',sans-serif" }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}
                  style={{ width:42, height:50, background:'#f9fafb', border:'none', fontSize:20, color:'#374151', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700 }}>+</button>
              </div>

              <button onClick={handleAddToCart}
                style={{ flex:1, minWidth:200, height:50, background: added ? '#16a34a' : '#e30613', color:'#fff', border:'none', borderRadius:10, fontSize:14, fontWeight:800, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.07em', textTransform:'uppercase', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:10, transition:'all 0.2s', boxShadow: added ? '0 4px 16px rgba(22,163,74,0.3)' : '0 4px 16px rgba(227,6,19,0.3)' }}>
                {added
                  ? <><i className="fas fa-check" /> Added to Cart!</>
                  : <><i className="fas fa-cart-shopping" /> Add to Cart · ${(product.price * qty).toFixed(2)}</>
                }
              </button>
            </div>

            <a href="/cart"
              style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, width:'100%', height:46, background:'#111', color:'#fff', borderRadius:10, fontSize:13, fontWeight:800, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.07em', textTransform:'uppercase', textDecoration:'none', transition:'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background='#1f2937'}
              onMouseLeave={e => e.currentTarget.style.background='#111'}>
              <i className="fas fa-bag-shopping" /> View Cart {count > 0 && `(${count})`}
            </a>
          </div>
        </div>

        {/* ── TABS ── */}
        <div style={{ background:'#fff', borderRadius:16, border:'1px solid #f0f0f0', overflow:'hidden', marginBottom:48 }}>
          {/* Tab headers */}
          <div style={{ display:'flex', borderBottom:'1px solid #f0f0f0', overflowX:'auto' }}>
            {TABS.map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                style={{ padding:'16px 24px', border:'none', background:'none', cursor:'pointer', fontSize:13, fontWeight:800, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.06em', textTransform:'uppercase', color: activeTab === t.key ? '#e30613' : '#6b7280', borderBottom: activeTab === t.key ? '3px solid #e30613' : '3px solid transparent', transition:'all 0.2s', whiteSpace:'nowrap' }}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{ padding:'28px 32px' }}>
            {activeTab === 'desc' && (
              <p style={{ fontSize:15, color:'#374151', lineHeight:1.8, maxWidth:780, margin:0 }}>{product.desc}</p>
            )}

            {activeTab === 'features' && (
              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:12 }}>
                {product.features.map((f, i) => (
                  <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:12, fontSize:14, color:'#374151' }}>
                    <i className="fas fa-circle-check" style={{ color:'#e30613', marginTop:2, flexShrink:0 }} />
                    {f}
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'specs' && (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:12 }}>
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} style={{ background:'#f9fafb', borderRadius:10, padding:'14px 16px', border:'1px solid #f0f0f0' }}>
                    <div style={{ fontSize:10, fontWeight:700, color:'#9ca3af', letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:"'Oswald',sans-serif", marginBottom:4 }}>{k}</div>
                    <div style={{ fontSize:15, fontWeight:800, color:'#111', fontFamily:"'Oswald',sans-serif" }}>{v}</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'compat' && (
              <div>
                <div style={{ fontSize:13, color:'#6b7280', marginBottom:16 }}>This product is compatible with the following vehicles:</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
                  {product.compat.map((c, i) => (
                    <span key={i} style={{ background:'#f9fafb', border:'1px solid #e5e7eb', borderRadius:8, padding:'8px 14px', fontSize:13, fontWeight:600, color:'#374151' }}>
                      <i className="fas fa-car" style={{ marginRight:7, color:'#e30613', fontSize:11 }} />{c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RELATED PRODUCTS ── */}
        {related.length > 0 && (
          <div style={{ marginBottom:64 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
              <div style={{ width:4, height:28, background:'#e30613', borderRadius:4 }} />
              <h2 style={{ fontSize:24, fontWeight:900, color:'#111', fontFamily:"'Oswald',sans-serif", letterSpacing:'0.03em', margin:0 }}>Related Products</h2>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:20 }}>
              {related.map(p => <RelatedCard key={p.id} p={p} />)}
            </div>
          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 768px) {
          .product-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </div>
  );
}
