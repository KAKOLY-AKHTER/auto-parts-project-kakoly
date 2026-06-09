import { useState } from 'react';
import { Link } from 'react-router-dom';

const cats = ["All", "Tires", "Motor Oil", "Filters", "Brake Parts", "Engine Parts"];

const products = [
  { id: 1, img: "/tire-1.png",  name: "Michelin Defender T+H",       cat: "Tires",        catLabel: "All-Season Tires",  price: 142.00, oldPrice: 179.00, rating: 4.9, tag: "Best Seller" },
  { id: 2, img: "/oil-4.png",   name: "Full Synthetic 5W-30 Oil",    cat: "Motor Oil",    catLabel: "Motor Oil",         price: 38.99,  oldPrice: 52.00,  rating: 4.8, tag: "Top Rated"  },
  { id: 3, img: "/tire-2.png",  name: "Cooper Adventurer A/T",       cat: "Tires",        catLabel: "All-Terrain Tires", price: 128.00, oldPrice: 165.00, rating: 4.7, tag: null         },
  { id: 4, img: "/oil-1.png",   name: "Premium Oil Filter Kit",      cat: "Filters",      catLabel: "Oil Filter",        price: 24.99,  oldPrice: 35.00,  rating: 4.8, tag: "Popular"    },
  { id: 5, img: "/tire-3.png",  name: "Goodyear Assurance MaxLife",  cat: "Tires",        catLabel: "Touring Tires",     price: 156.00, oldPrice: 195.00, rating: 4.8, tag: "Sale"       },
  { id: 6, img: "/motor.png",   name: "Castrol EDGE 10W-40 Synth",   cat: "Motor Oil",    catLabel: "Motor Oil",         price: 44.99,  oldPrice: 58.00,  rating: 4.9, tag: "Top Rated"  },
  { id: 7, img: "/tire11.png",  name: "Performance Brake Pad Set",   cat: "Brake Parts",  catLabel: "Brake System",      price: 65.00,  oldPrice: 89.00,  rating: 4.7, tag: null         },
  { id: 8, img: "/oil-2.png",   name: "High-Flow Air Filter",        cat: "Engine Parts", catLabel: "Engine Parts",      price: 29.99,  oldPrice: 42.00,  rating: 4.6, tag: "Sale"       },
];

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
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? products : products.filter(p => p.cat === active);

  return (
    <main>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-32 pb-20"
        style={{ background: "linear-gradient(135deg,#050d18 0%,#0a1628 50%,#0d1f35 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 inset-x-0 h-0.75" style={{ background: "linear-gradient(90deg,#dc2626,#f87171,#dc2626)" }} />
          <div className="absolute -bottom-32 left-1/3 w-150 h-150 rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(circle,#f59e0b,transparent 70%)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="flex items-center gap-2 text-[12px] mb-8">
            <Link to="/" className="text-slate-400 hover:text-red-400 no-underline transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">Shop</span>
          </div>
          <h1 className="text-white font-black leading-none tracking-tight mb-5"
            style={{ fontSize: "clamp(44px,6vw,80px)" }}>
            Our <span style={{ color: "#dc2626" }}>Products</span>
          </h1>
          <p className="text-slate-300 text-[17px] leading-relaxed max-w-xl">
            Top-quality tires, oils, and auto parts. Competitive prices, fast in-store pickup available.
          </p>
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((p) => {
              const disc = Math.round((1 - p.price / p.oldPrice) * 100);
              return (
                <div key={p.id}
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
                      <button className="w-9 h-9 rounded-xl bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors border-none cursor-pointer shadow-sm">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4">
                          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-gray-600 font-bold text-lg">No products in this category yet.</h3>
              <button onClick={() => setActive("All")} className="mt-4 px-5 py-2 bg-red-600 text-white rounded-xl text-sm font-bold border-none cursor-pointer hover:bg-red-700">
                View All Products
              </button>
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
