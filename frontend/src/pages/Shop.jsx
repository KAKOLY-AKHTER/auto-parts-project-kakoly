import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { auth } from '../firebase';
import API from '../config';

const cats = ["All", "Tires", "Motor Oil", "Filters", "Brake Parts", "Engine Parts"];

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} viewBox="0 0 20 20" className="w-3 h-3"
          fill={i <= Math.round(rating) ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="1">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Shop() {
  const [products,    setProducts]    = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [active,      setActive]      = useState("All");
  const [search,      setSearch]      = useState("");
  const [added,       setAdded]       = useState(null);
  const [wishlisted,  setWishlisted]  = useState(new Set());
  const [wishToast,   setWishToast]   = useState(null);
  const { addItem, count }            = useCart();

  const filtered = products.filter(p => {
    const matchCat    = active === "All" || p.cat === active;
    const q           = search.trim().toLowerCase();
    const matchSearch = !q || p.name?.toLowerCase().includes(q) || p.catLabel?.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  useEffect(() => {
    fetch(`${API}/products`)
      .then(r => r.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => {
      if (!u?.email) { setWishlisted(new Set()); return; }
      fetch(`${API}/wishlist?email=${encodeURIComponent(u.email)}`)
        .then(r => r.json())
        .then(items => { if (Array.isArray(items)) setWishlisted(new Set(items.map(i => i.productId))); })
        .catch(() => {});
    });
    return () => unsub();
  }, []);

  const pid = (p) => p._id || p.id;

  const handleAdd = (p) => {
    addItem({ id: pid(p), name: p.name, price: p.price, img: p.img, catLabel: p.catLabel });
    setAdded(pid(p));
    setTimeout(() => setAdded(null), 1400);
  };

  const toggleWishlist = async (p) => {
    const user = auth.currentUser;
    if (!user) { window.location.href = '/login'; return; }
    const id = pid(p);
    const inList = wishlisted.has(id);
    setWishlisted(prev => { const s = new Set(prev); inList ? s.delete(id) : s.add(id); return s; });
    if (inList) {
      await fetch(`${API}/wishlist/${id}?email=${encodeURIComponent(user.email)}`, { method:'DELETE' }).catch(() => {});
      setWishToast('Removed from wishlist');
    } else {
      await fetch(`${API}/wishlist`, { method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ email: user.email, item: { productId: id, name: p.name, price: p.price, image: p.img, category: p.catLabel || p.cat } })
      }).catch(() => {});
      setWishToast('Saved to wishlist!');
    }
    setTimeout(() => setWishToast(null), 1800);
  };

  return (
    <main>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
      {/* Cart toast */}
      {added && (
        <div style={{ position:'fixed', bottom:28, right:28, zIndex:9999, background:'#16a34a', color:'#fff', borderRadius:12, padding:'13px 20px', display:'flex', alignItems:'center', gap:10, boxShadow:'0 8px 32px rgba(0,0,0,0.3)', fontFamily:"'Oswald',sans-serif", fontSize:14, fontWeight:700, letterSpacing:'0.05em', animation:'slideUp 0.3s ease' }}>
          <i className="fas fa-circle-check" />
          Added to cart!
          <a href="/cart" style={{ marginLeft:6, color:'#bbf7d0', fontSize:12, fontWeight:600, letterSpacing:'0.04em' }}>VIEW CART ({count})</a>
        </div>
      )}
      {/* Wishlist toast */}
      {wishToast && (
        <div style={{ position:'fixed', bottom:28, left:28, zIndex:9999, background:'#e30613', color:'#fff', borderRadius:12, padding:'13px 20px', display:'flex', alignItems:'center', gap:10, boxShadow:'0 8px 32px rgba(0,0,0,0.3)', fontFamily:"'Oswald',sans-serif", fontSize:14, fontWeight:700, letterSpacing:'0.05em', animation:'slideUp 0.3s ease' }}>
          <i className="fas fa-heart" /> {wishToast}
        </div>
      )}

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-36 md:pt-48 lg:pt-52 pb-24"
        style={{ background: "linear-gradient(135deg,#050d18 0%,#0a1628 55%,#0d1f35 100%)" }}>

        {/* bg accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 inset-x-0 h-[3px]" style={{ background:"linear-gradient(90deg,#1d4ed8,#dc2626 50%,#1d4ed8)" }} />
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-[0.07]"
            style={{ background:"radial-gradient(circle,#dc2626,transparent 70%)" }} />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.05]"
            style={{ background:"radial-gradient(circle,#3b82f6,transparent 70%)" }} />
        </div>

        <div className="max-w-5xl mx-auto px-5 relative z-10 text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-[12px] mb-7">
            <Link to="/" className="text-slate-500 hover:text-red-400 no-underline transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">Shop</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{ background:'rgba(220,38,38,0.1)', border:'1px solid rgba(220,38,38,0.25)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
            <span className="text-red-400 text-[11px] font-black tracking-[3px] uppercase">Parts & Tires Store</span>
          </div>

          <h1 className="text-white font-black leading-none tracking-tight mb-4"
            style={{ fontSize:"clamp(40px,6vw,72px)" }}>
            Find the Right <span style={{ color:"#dc2626" }}>Parts</span> for Your Vehicle
          </h1>
          <p className="text-slate-400 text-[16px] leading-relaxed max-w-2xl mx-auto mb-10">
            Search from our full catalog of tires, motor oils, filters, brake parts and more.
          </p>

          {/* ── SEARCH FORM ── */}
          <div className="max-w-2xl mx-auto">
            <div className="flex items-stretch gap-0 rounded-2xl overflow-hidden"
              style={{ background:'rgba(255,255,255,0.07)', border:'1.5px solid rgba(255,255,255,0.15)', backdropFilter:'blur(12px)', boxShadow:'0 8px 40px rgba(0,0,0,0.4)' }}>
              {/* Search icon */}
              <div className="flex items-center pl-5 pr-3 shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-5 h-5 text-slate-400">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
              </div>
              {/* Input */}
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search tires, oil, brake parts, filters…"
                className="flex-1 py-4 text-[15px] font-medium outline-none bg-transparent"
                style={{ color:'#fff', minWidth:0 }}
              />
              {/* Clear button */}
              {search && (
                <button onClick={() => setSearch("")}
                  className="flex items-center px-4 border-none bg-transparent cursor-pointer text-slate-500 hover:text-white transition-colors shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
              {/* Search button */}
              <button className="px-7 m-1.5 rounded-xl font-black text-[13px] tracking-[1.5px] uppercase text-white border-none cursor-pointer shrink-0 transition-all"
                style={{ background:'linear-gradient(135deg,#dc2626,#b91c1c)', boxShadow:'0 4px 16px rgba(220,38,38,0.4)', fontFamily:"'Oswald',sans-serif" }}>
                Search
              </button>
            </div>

            {/* Result count */}
            {search && (
              <p className="text-slate-400 text-[13px] mt-3">
                <span className="text-white font-semibold">{filtered.length}</span> result{filtered.length !== 1 ? 's' : ''} for "<span className="text-red-400 font-semibold">{search}</span>"
              </p>
            )}

            {/* Quick searches */}
            {!search && (
              <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
                <span className="text-slate-500 text-[12px]">Popular:</span>
                {["All-Terrain Tires","Synthetic Oil","Brake Pads","Oil Filter","Performance Tires"].map(q => (
                  <button key={q} onClick={() => setSearch(q)}
                    className="px-3 py-1 rounded-full text-[11.5px] font-semibold cursor-pointer transition-all border-none"
                    style={{ background:'rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.6)', border:'1px solid rgba(255,255,255,0.1)' }}
                    onMouseEnter={e => { e.currentTarget.style.background='rgba(220,38,38,0.15)'; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='rgba(220,38,38,0.4)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.07)'; e.currentTarget.style.color='rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; }}>
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-5 flex flex-wrap items-center justify-center gap-8">
          {[
            { icon: "🚚", text: "Free shipping over $99" },
            { icon: "🔄", text: "30-day returns" },
            { icon: "🏆", text: "OEM-quality parts" },
            { icon: "💰", text: "Price match guaranteed" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-gray-500 text-[12.5px] font-medium">
              <span>{icon}</span>{text}
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">

          {/* Category filter */}
          <div className="flex gap-2.5 mb-10 overflow-x-auto pb-2">
            {cats.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                className="shrink-0 px-5 py-2 rounded-full text-[12.5px] font-semibold border-none cursor-pointer transition-all duration-200"
                style={active === cat
                  ? { background: "#dc2626", color: "#fff", boxShadow: "0 2px 12px rgba(220,38,38,0.25)" }
                  : { background: "#fff", color: "#6b7280", border: "1px solid #e5e7eb" }}>
                {cat}
              </button>
            ))}
          </div>

          {loading && (
            <div className="text-center py-20 text-gray-400 font-semibold">Loading products…</div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((p) => {
              const id   = pid(p);
              const disc = Math.round((1 - p.price / (p.oldPrice || p.price + 1)) * 100);
              return (
                <div key={id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="relative h-44 flex items-center justify-center bg-gray-50 overflow-hidden">
                    <img src={p.img} alt={p.name}
                      className="max-h-full max-w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                      onError={e => e.target.style.display = 'none'} />
                    {p.tag && (
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-black tracking-wide px-2 py-0.5 rounded-full uppercase">
                        {p.tag}
                      </span>
                    )}
                    <span className="absolute top-3 right-3 bg-white text-red-600 text-[9px] font-black px-2 py-0.5 rounded-full border border-red-100">
                      -{disc}%
                    </span>
                    <button onClick={(e) => { e.stopPropagation(); toggleWishlist(p); }}
                      className="absolute bottom-3 right-3 w-7 h-7 rounded-full flex items-center justify-center border-none cursor-pointer transition-all"
                      style={{ background: wishlisted.has(id) ? '#ef4444' : 'rgba(0,0,0,0.45)' }}
                      title={wishlisted.has(id) ? 'Remove from wishlist' : 'Save to wishlist'}>
                      <i className="fas fa-heart" style={{ fontSize:11, color:'#fff' }} />
                    </button>
                  </div>

                  <div className="p-4">
                    <p className="text-red-600 text-[9.5px] font-black tracking-[2px] uppercase mb-1.5">{p.catLabel}</p>
                    <h3 className="text-gray-900 font-bold text-[13px] leading-snug mb-2 line-clamp-2">{p.name}</h3>
                    <div className="flex items-center gap-1.5 mb-3">
                      <Stars rating={p.rating} />
                      <span className="text-gray-300 text-[10px]">{p.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-gray-300 text-[10px] line-through block leading-none">${p.oldPrice.toFixed(2)}</span>
                        <span className="text-gray-900 font-black text-[19px] leading-tight">${p.price.toFixed(2)}</span>
                      </div>
                      <button
                        onClick={() => handleAdd(p)}
                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all border-none cursor-pointer shadow-sm"
                        style={{ background: added === id ? '#16a34a' : '#dc2626' }}
                        title="Add to cart"
                      >
                        {added === id
                          ? <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4"><polyline points="20 6 9 17 4 12"/></svg>
                          : <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        }
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-gray-600 font-bold text-lg">
                {search ? `No results for "${search}"` : "No products in this category yet."}
              </h3>
              <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
                {search && (
                  <button onClick={() => setSearch("")} className="px-5 py-2 bg-red-600 text-white rounded-xl text-sm font-bold border-none cursor-pointer hover:bg-red-700">
                    Clear Search
                  </button>
                )}
                <button onClick={() => { setActive("All"); setSearch(""); }} className="px-5 py-2 bg-gray-200 text-gray-700 rounded-xl text-sm font-bold border-none cursor-pointer hover:bg-gray-300">
                  View All Products
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-gray-900 font-black text-2xl mb-1">Need help choosing the right product?</h2>
            <p className="text-gray-400 text-[14px]">Our team will find the perfect fit for your vehicle.</p>
          </div>
          <Link to="/contacts" className="no-underline shrink-0 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-[13px] rounded-xl transition-colors"
            style={{ boxShadow: "0 4px 18px rgba(220,38,38,0.3)" }}>
            Ask an Expert
          </Link>
        </div>
      </section>

    </main>
  );
}
