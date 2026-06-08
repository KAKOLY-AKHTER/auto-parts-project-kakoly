import { useRef, useEffect, useState, useCallback } from "react";

const cardStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .bs-product-card {
    background: linear-gradient(135deg, #eff6ff, #ffffff);
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    will-change: transform;
  }

  .bs-product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06);
    border-color: #2563eb;
  }

  .bs-product-img {
    transition: transform 0.4s ease;
  }
  .bs-product-card:hover .bs-product-img {
    transform: scale(1.08);
  }

  .bs-qv-overlay {
    transition: opacity 0.25s ease;
  }
  .bs-name-link {
    display: block; text-decoration: none;
    color: #111827;
    transition: color 0.2s ease;
  }
  .bs-name-link:hover {
    color: #2563eb;
  }
  .bs-view-btn {
    transition: all 0.2s ease;
  }
  .bs-view-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37,99,235,0.35);
  }
  .bs-disc-badge {
    box-shadow: 0 2px 8px rgba(220,38,38,0.25);
  }
`;


const products = [
  { id: 1, img: "/best1.png", name: "Brake Disc Set",     category: "Brake System",  price: 70.00,  oldPrice: 78.00,   rating: 4.8, reviews: 124 },
  { id: 2, img: "/best2.png", name: "Engine Filter Kit",  category: "Engine Parts",  price: 800.00, oldPrice: 1200.00, rating: 4.9, reviews: 89  },
  { id: 3, img: "/best3.png", name: "Suspension Arm",     category: "Suspension",    price: 145.00, oldPrice: 180.00,  rating: 4.7, reviews: 56  },
  { id: 4, img: "/best4.png", name: "Spark Plug Set",     category: "Electrical",    price: 38.00,  oldPrice: 55.00,   rating: 4.6, reviews: 201 },
  { id: 5, img: "/best1.png", name: "Air Filter Premium", category: "Engine Parts",  price: 52.00,  oldPrice: 68.00,   rating: 4.8, reviews: 77  },
  { id: 6, img: "/best2.png", name: "Shock Absorber",     category: "Suspension",    price: 220.00, oldPrice: 290.00,  rating: 4.9, reviews: 143 },
  { id: 7, img: "/best3.png", name: "Timing Belt Kit",    category: "Engine Parts",  price: 95.00,  oldPrice: 130.00,  rating: 4.7, reviews: 62  },
  { id: 8, img: "/best4.png", name: "LED Headlight Pair", category: "Electrical",    price: 175.00, oldPrice: 240.00,  rating: 4.8, reviews: 95  },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} viewBox="0 0 24 24" className="w-2.5 h-2.5"
          fill={s <= Math.round(rating) ? "#f59e0b" : "none"}
          stroke="#f59e0b" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className="text-[10px] text-white/40 ml-1 font-['Barlow',sans-serif]">({rating})</span>
    </div>
  );
}

function ProductCard({ p, index, vis }) {
  const [hovered, setHovered] = useState(false);
  const discount = Math.round((1 - p.price / p.oldPrice) * 100);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(32px)",
        transition: `opacity .5s ease ${index * 0.06}s, transform .5s ease ${index * 0.06}s`,
      }}
      className="bs-product-card relative flex-none w-[230px] cursor-pointer"
    >
      {/* discount badge */}
      {discount > 0 && (
        <div className="bs-disc-badge absolute top-3 right-3 z-[4] px-2 py-1 rounded-md
                        text-[11px] font-bold text-white bg-red-600">
          -{discount}%
        </div>
      )}

      {/* IMAGE */}
      <div className="relative h-[185px] flex items-center justify-center bg-gray-50">
        <img
          src={p.img}
          alt={p.name}
          className="bs-product-img relative z-[1] max-w-[80%] max-h-[80%] object-contain"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentNode.querySelector(".bs-ph").style.display = "flex";
          }}
        />
        <div className="bs-ph hidden absolute inset-0 z-[1] flex-col items-center justify-center text-gray-400 gap-2">
          <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <polyline points="16 2 12 7 8 2" />
          </svg>
          <span className="text-[10px] tracking-widest uppercase text-gray-400">No Image</span>
        </div>

        {/* Quick view overlay */}
        <div
          className="bs-qv-overlay absolute inset-0 z-[3] flex items-center justify-center
                     bg-black/50"
          style={{ opacity: hovered ? 1 : 0, pointerEvents: hovered ? "all" : "none" }}
        >
          <a
            href={`/product-details/${p.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg
                       text-xs font-semibold text-white bg-blue-600
                       hover:bg-blue-700 transition-all duration-200"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Quick View
          </a>
        </div>
      </div>

      {/* INFO */}
      <div className="p-4">
        <span className="block text-[10px] font-semibold tracking-wider uppercase text-blue-600 mb-1">
          {p.category}
        </span>

        <a href={`/product-details/${p.id}`} className="bs-name-link text-sm font-semibold text-gray-900 leading-snug mb-2">
          {p.name}
        </a>

        <div className="flex items-center justify-between mt-2 mb-3">
          <StarRating rating={p.rating} />
          <span className="text-[10px] text-gray-400">{p.reviews} sold</span>
        </div>

        <div className="h-px bg-gray-100 mb-3" />

        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] text-gray-400 line-through block leading-none">
              ${p.oldPrice.toFixed(2)}
            </span>
            <span className="text-xl font-bold text-gray-900 leading-none mt-0.5 block">
              ${p.price.toFixed(2)}
            </span>
          </div>

          <a
            href={`/product-details/${p.id}`}
            className="bs-view-btn inline-flex items-center gap-1 px-3 py-2 rounded-lg
                       text-xs font-semibold text-white bg-blue-600"
          >
            View
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
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
  const [vis, setVis] = useState(false);
  const [cur, setCur] = useState(0);
  const [dragStart, setDragStart] = useState(null);

  const CARD_W   = 252;  // card 230px + gap 22px
  const vpRef    = useRef(null);

  // Compute exact max translate so last card ends flush with viewport
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [maxSlide, setMaxSlide] = useState(products.length - 4);

  useEffect(() => {
    const calcMax = () => {
      if (!vpRef.current) return;
      const vpW = vpRef.current.offsetWidth;
      // total track width = N cards * cardW - last gap
      const totalW = products.length * CARD_W - 22;
      // max we can translate = totalW - vpW (can't go further than this)
      const maxTx = Math.max(0, totalW - vpW);
      setMaxTranslate(maxTx);
      // for dots/arrows: how many steps
      const steps = Math.ceil(maxTx / CARD_W);
      setMaxSlide(steps);
    };
    calcMax();
    window.addEventListener("resize", calcMax);
    return () => window.removeEventListener("resize", calcMax);
  }, [CARD_W]);

  const MAX = maxSlide;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  const goTo = useCallback((n) => {
    const next = Math.max(0, Math.min(n, MAX));
    setCur(next);
    if (trackRef.current) {
      // Cap actual pixel shift so last card is flush with viewport edge
      const px = Math.min(next * CARD_W, maxTranslate);
      trackRef.current.style.transform = `translateX(-${px}px)`;
    }
  }, [maxSlide, maxTranslate]);

  const onDragStart = (e) => setDragStart(e.pageX || e.touches?.[0]?.pageX || 0);
  const onDragEnd   = (e) => {
    if (dragStart === null) return;
    const ex = e.pageX || e.changedTouches?.[0]?.pageX || 0;
    if (Math.abs(dragStart - ex) > 50) goTo(dragStart - ex > 0 ? cur + 1 : cur - 1);
    setDragStart(null);
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-gray-50 py-16 md:py-20 px-[5%]"
    >
      <style>{cardStyles}</style>

      {/* ── HEADER ── */}
      <div
        className="flex items-end justify-between flex-wrap gap-4 mb-10"
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(20px)",
          transition: "opacity .5s ease, transform .5s ease",
        }}
      >
        {/* Left */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-1">
            Trending Now
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gray-900">Best </span>
            <span className="text-red-600">Sellers</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">Top-rated parts our customers love</p>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          {/* see all */}
          <a href="/catalog-item"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 no-underline transition-colors">
            View All
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

          {/* dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: Math.min(MAX + 1, products.length) }).map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className="h-2 rounded-full border-none p-0 cursor-pointer transition-all duration-300"
                style={{
                  width: i === cur ? 24 : 8,
                  background: i === cur ? "#2563eb" : "#d1d5db",
                }} />
            ))}
          </div>

          {/* arrows */}
          <div className="flex gap-2">
            {[{ dir: -1, icon: "15 18 9 12 15 6" }, { dir: 1, icon: "9 18 15 12 9 6" }].map(({ dir, icon }, i) => (
              <button key={i}
                onClick={() => goTo(cur + dir)}
                disabled={dir === -1 ? cur === 0 : cur >= MAX}
                className="w-9 h-9 rounded-full flex items-center justify-center
                           border border-gray-200 bg-white text-gray-500
                           hover:bg-blue-600 hover:text-white hover:border-blue-600
                           disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 disabled:hover:border-gray-200
                           transition-all duration-200 shadow-sm">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points={icon} />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── SLIDER ── */}
      <div
        ref={vpRef}
        className="overflow-hidden relative z-[1]"
        onMouseDown={onDragStart} onMouseUp={onDragEnd} onMouseLeave={onDragEnd}
        onTouchStart={onDragStart} onTouchEnd={onDragEnd}
      >
        <div
          ref={trackRef}
          className="flex gap-[22px]"
          style={{ transition: "transform .55s cubic-bezier(.22,.68,0,1.2)", willChange: "transform" }}
        >
          {products.map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} vis={vis} />
          ))}
        </div>
      </div>
    </section>
  );
}