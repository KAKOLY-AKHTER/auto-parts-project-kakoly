import { useRef, useEffect, useState, useCallback } from "react";
import { useCart } from "../../context/CartContext";
import { PRODUCTS } from "../../data/products";

const TAG_COLORS = {
  "Best Seller": "bg-red-600 text-white",
  "Top Rated":   "bg-red-600 text-white",
  "Popular":     "bg-red-600 text-white",
  "Sale":        "bg-red-600 text-white",
};

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <svg key={s} viewBox="0 0 24 24" className="w-3 h-3"
          fill={s <= Math.round(rating) ? "#f59e0b" : "none"}
          stroke="#f59e0b" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function ProductCard({ p, index, vis }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const discount = Math.round((1 - p.price / p.oldPrice) * 100);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: p.id, name: p.name, price: p.price, img: p.img, catLabel: p.catLabel });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? (hovered ? "translateY(-5px)" : "translateY(0)") : "translateY(28px)",
        transitionProperty: "opacity, transform, box-shadow, border-color",
        transitionDuration: ".5s, .3s, .25s, .25s",
        transitionDelay: `${index * 0.07}s, 0s, 0s, 0s`,
        transitionTimingFunction: "ease",
        flexShrink: 0,
        width: 220,
        border: hovered ? "1.5px solid #dc2626" : "1.5px solid #e5e7eb",
        boxShadow: hovered ? "0 16px 48px rgba(220,38,38,0.13), 0 2px 8px rgba(0,0,0,0.06)" : "0 2px 10px rgba(0,0,0,0.05)",
        borderRadius: 14,
        overflow: "hidden",
        background: "#fff",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Tag badge */}
      {p.tag && (
        <div className={`absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide ${TAG_COLORS[p.tag]}`}>
          {p.tag}
        </div>
      )}

      {/* Discount badge */}
      {discount > 0 && (
        <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-50 text-red-600 border border-red-200">
          -{discount}%
        </div>
      )}

      {/* Image */}
      <div className="relative h-[180px] overflow-hidden bg-gray-50 flex items-center justify-center">
        <img
          src={p.img}
          alt={p.name}
          className="max-w-[85%] max-h-[85%] object-contain transition-transform duration-500 group-hover:scale-110"
          onError={e => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        {/* Fallback icon */}
        <div className="hidden absolute inset-0 flex-col items-center justify-center gap-2 text-gray-300">
          <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/>
            <line x1="12" y1="2" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="22"/>
            <line x1="2" y1="12" x2="8" y2="12"/><line x1="16" y1="12" x2="22" y2="12"/>
          </svg>
          <span className="text-[10px] uppercase tracking-widest">No Image</span>
        </div>

        {/* Hover overlay — Quick Add to Cart */}
        <div className="absolute inset-0 bg-black/45 flex items-center justify-center transition-opacity duration-250"
          style={{ opacity: hovered ? 1 : 0, pointerEvents: hovered ? "all" : "none" }}>
          <button onClick={handleQuickAdd}
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "9px 18px", borderRadius: 9, fontSize: 12, fontWeight: 800,
              fontFamily: "'Oswald', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase",
              border: "none", cursor: "pointer", transition: "all 0.2s",
              background: added ? "#16a34a" : "#e30613",
              color: "#fff",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            }}>
            {added
              ? <><svg viewBox="0 0 24 24" style={{ width:13, height:13 }} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg> Added!</>
              : <><svg viewBox="0 0 24 24" style={{ width:13, height:13 }} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> Quick Add</>
            }
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <span className="block text-[10px] font-bold tracking-[2px] uppercase text-red-600 mb-1">{p.catLabel}</span>
        <a href={`/product-details/${p.id}`}
          className="block text-[13px] font-bold text-gray-900 leading-snug mb-2 hover:text-red-600 transition-colors line-clamp-2">
          {p.name}
        </a>

        <div className="flex items-center gap-2 mb-3">
          <Stars rating={p.rating} />
          <span className="text-[10px] text-gray-400 font-medium">{p.reviews} reviews</span>
        </div>

        <div className="h-px bg-gray-100 mb-3" />

        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] text-gray-400 line-through leading-none block">${p.oldPrice.toFixed(2)}</span>
            <span className="text-[20px] font-black text-gray-900 leading-none">${p.price.toFixed(2)}</span>
          </div>
          <a href={`/product-details/${p.id}`}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg text-[11px] font-bold text-white bg-gray-900 hover:bg-red-600 transition-colors duration-200">
            View
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function BestSellers() {
  const trackRef   = useRef(null);
  const sectionRef = useRef(null);
  const vpRef      = useRef(null);
  const [vis, setVis]               = useState(false);
  const [cur, setCur]               = useState(0);
  const [dragStart, setDragStart]   = useState(null);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [maxSlide, setMaxSlide]     = useState(PRODUCTS.length - 4);
  const CARD_W = 242;

  useEffect(() => {
    const calc = () => {
      if (!vpRef.current) return;
      const vpW   = vpRef.current.offsetWidth;
      const total = PRODUCTS.length * CARD_W - 22;
      const maxTx = Math.max(0, total - vpW);
      setMaxTranslate(maxTx);
      setMaxSlide(Math.ceil(maxTx / CARD_W));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  const goTo = useCallback((n) => {
    const next = Math.max(0, Math.min(n, maxSlide));
    setCur(next);
    if (trackRef.current) {
      const px = Math.min(next * CARD_W, maxTranslate);
      trackRef.current.style.transform = `translateX(-${px}px)`;
    }
  }, [maxSlide, maxTranslate]);

  const onDragStart = e => setDragStart(e.pageX || e.touches?.[0]?.pageX || 0);
  const onDragEnd   = e => {
    if (dragStart === null) return;
    const ex = e.pageX || e.changedTouches?.[0]?.pageX || 0;
    if (Math.abs(dragStart - ex) > 50) goTo(dragStart - ex > 0 ? cur + 1 : cur - 1);
    setDragStart(null);
  };

  return (
    <section ref={sectionRef} className="bg-white py-12 md:py-16 px-[5%] overflow-hidden">

      {/* ── HEADER ── */}
      <div className="flex items-start sm:items-end justify-between flex-wrap gap-4 mb-7 md:mb-9"
        style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(18px)", transition: "opacity .5s ease, transform .5s ease" }}>

        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-red-600" />
            <span className="text-[11px] font-black tracking-[3px] uppercase text-red-600">Our Products</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
            Best <span className="text-red-600">Sellers</span>
          </h2>
          <p className="text-[13px] text-gray-400 mt-1 font-medium">Top-rated tires, oils &amp; service parts</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <a href="/shop"
            className="inline-flex items-center gap-1.5 text-[12px] font-bold text-gray-700 hover:text-red-600 transition-colors border border-gray-200 hover:border-red-300 px-4 py-2 rounded-lg">
            View All
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>

          {/* Arrows */}
          <div className="flex gap-2">
            {[{ dir: -1, pts: "15 18 9 12 15 6" }, { dir: 1, pts: "9 18 15 12 9 6" }].map(({ dir, pts }, i) => (
              <button key={i} onClick={() => goTo(cur + dir)}
                disabled={dir === -1 ? cur === 0 : cur >= maxSlide}
                className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 bg-white text-gray-500 hover:bg-red-600 hover:text-white hover:border-red-600 disabled:opacity-25 disabled:pointer-events-none transition-all duration-200 shadow-sm">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points={pts} />
                </svg>
              </button>
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: Math.min(maxSlide + 1, 6) }).map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className="h-2 rounded-full border-none p-0 cursor-pointer transition-all duration-300"
                style={{ width: i === cur ? 20 : 7, background: i === cur ? "#dc2626" : "#e5e7eb" }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── SLIDER ── */}
      <div ref={vpRef} className="overflow-hidden"
        onMouseDown={onDragStart} onMouseUp={onDragEnd} onMouseLeave={onDragEnd}
        onTouchStart={onDragStart} onTouchEnd={onDragEnd}>
        <div ref={trackRef} className="flex gap-[22px]"
          style={{ transition: "transform .5s cubic-bezier(.22,.68,0,1.2)", willChange: "transform" }}>
          {PRODUCTS.map((p, i) => <ProductCard key={p.id} p={p} index={i} vis={vis} />)}
        </div>
      </div>

      {/* ── Bottom strip ── */}
      <div className="mt-10 border-t border-gray-100 pt-6 flex flex-wrap items-center justify-between gap-4"
        style={{ opacity: vis ? 1 : 0, transition: "opacity .6s ease .3s" }}>
        <p className="text-[13px] text-gray-400">
          Showing <span className="font-bold text-gray-700">{PRODUCTS.length}</span> top products — updated weekly
        </p>
        <div className="flex items-center gap-2 text-[12px] text-gray-400">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Free shipping on orders over $99
          <span className="mx-2 text-gray-200">|</span>
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Price match guaranteed
        </div>
      </div>
    </section>
  );
}
