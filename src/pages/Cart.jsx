import { Link } from 'react-router-dom';

const quickPicks = [
  { img: "/tire-1.png",  name: "Michelin Defender",  price: "$142.00", oldPrice: "$179.00" },
  { img: "/oil-1.png",   name: "Synthetic 5W-30",    price: "$38.99",  oldPrice: "$52.00"  },
  { img: "/tire-2.png",  name: "Cooper Adventurer",   price: "$128.00", oldPrice: "$165.00" },
  { img: "/oil-4.png",   name: "Oil Filter Kit",      price: "$24.99",  oldPrice: "$35.00"  },
];

export default function Cart() {
  return (
    <main>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-32 pb-14"
        style={{ background: "linear-gradient(135deg,#050d18 0%,#0a1628 50%,#0d1f35 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 inset-x-0 h-0.75" style={{ background: "linear-gradient(90deg,#dc2626,#f87171,#dc2626)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="flex items-center gap-2 text-[12px] mb-8">
            <Link to="/" className="text-slate-400 hover:text-red-400 no-underline transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">Cart</span>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-white font-black text-4xl md:text-5xl tracking-tight">Shopping Cart</h1>
            <span className="px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-[13px] font-bold">0 items</span>
          </div>
        </div>
      </section>

      {/* ── EMPTY STATE ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-md mx-auto px-5 text-center">
          <div className="w-28 h-28 rounded-3xl bg-white shadow-md flex items-center justify-center mx-auto mb-8 border border-gray-100">
            <svg viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.2" strokeLinecap="round" className="w-12 h-12">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.98-1.67L23 6H6"/>
            </svg>
          </div>
          <h2 className="text-gray-900 font-black text-3xl mb-3">Your cart is empty</h2>
          <p className="text-gray-400 text-[15px] leading-relaxed mb-8">
            You haven't added anything yet. Browse our shop to find the perfect tires, oil, and parts for your vehicle.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/shop"
              className="no-underline px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-[13px] rounded-xl transition-colors text-center"
              style={{ boxShadow: "0 4px 18px rgba(220,38,38,0.3)" }}>
              Browse Products
            </Link>
            <Link to="/"
              className="no-underline px-7 py-3.5 text-gray-600 font-bold text-[13px] rounded-xl transition-colors border border-gray-200 bg-white hover:bg-gray-50 text-center">
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* ── QUICK PICKS ── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-gray-900 font-black text-2xl">Popular This Week</h2>
              <p className="text-gray-400 text-[13px] mt-1">Products other customers love</p>
            </div>
            <Link to="/shop" className="no-underline text-red-600 font-bold text-[13px] hover:text-red-700 flex items-center gap-1">
              View all
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {quickPicks.map(({ img, name, price, oldPrice }) => (
              <Link to="/shop" key={name}
                className="no-underline bg-gray-50 rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                <div className="h-28 flex items-center justify-center mb-4">
                  <img src={img} alt={name}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                    onError={e => e.target.style.display = 'none'} />
                </div>
                <h3 className="text-gray-800 font-bold text-[13px] mb-1.5 leading-snug">{name}</h3>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-red-600 font-black text-[15px]">{price}</span>
                  <span className="text-gray-300 text-[11px] line-through">{oldPrice}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMO BANNER ── */}
      <section className="py-14" style={{ background: "linear-gradient(135deg,#b91c1c,#dc2626)" }}>
        <div className="max-w-7xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-white font-black text-2xl mb-1">Free Shipping on Orders Over $99</h2>
            <p className="text-red-100 text-[14px]">Available for in-store pickup too — same day, no wait.</p>
          </div>
          <Link to="/shop"
            className="no-underline shrink-0 px-7 py-3.5 bg-white text-red-600 font-black text-[13px] rounded-xl hover:bg-red-50 transition-colors shadow-lg">
            Shop Now
          </Link>
        </div>
      </section>

    </main>
  );
}
