import { useRef, useEffect, useState, useCallback } from "react";

const cardStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600&display=swap');

  .bs-product-card {
    background: rgba(14, 22, 45, 0.6);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: transform 0.45s cubic-bezier(.22,.68,0,1.2),
                box-shadow 0.45s ease,
                background 0.45s ease,
                border-color 0.45s ease;
    will-change: transform;
  }

  .bs-product-card:hover {
    transform: translateY(-10px) scale(1.018);
    background: rgba(18, 28, 58, 0.75);
    border-color: rgba(37, 99, 235, 0.5);
    box-shadow:
      0 30px 70px rgba(0, 0, 0, 0.55),
      0 0 0 1px rgba(37, 99, 235, 0.2),
      0 0 60px rgba(37, 99, 235, 0.08),
      inset 0 1px 0 rgba(255,255,255,0.07);
  }

  /* gloss shine overlay */
  .bs-product-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      135deg,
      rgba(255,255,255,0.06) 0%,
      rgba(255,255,255,0.02) 40%,
      transparent 60%
    );
    pointer-events: none;
    z-index: 0;
    opacity: 0;
    transition: opacity 0.45s ease;
  }
  .bs-product-card:hover::before { opacity: 1; }

  /* inner glow at bottom edge */
  .bs-product-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 10%; right: 10%; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(37,99,235,0.35), transparent);
    pointer-events: none; z-index: 0;
    transform: scaleX(0);
    transition: transform 0.5s cubic-bezier(.22,.68,0,1.2);
  }
  .bs-product-card:hover::after { transform: scaleX(1); }

  /* image zoom */
  .bs-product-img {
    transition: transform 0.6s cubic-bezier(.22,.68,0,1.2),
                filter 0.4s ease;
    filter: drop-shadow(0 2px 8px rgba(0,0,0,0.12));
  }
  .bs-product-card:hover .bs-product-img {
    transform: scale(1.12) translateY(-6px);
    filter: drop-shadow(0 8px 20px rgba(0,0,0,0.2));
  }

  /* quick view */
  .bs-qv-overlay {
    transition: opacity 0.35s ease, backdrop-filter 0.35s ease;
  }

  /* top stripe */
  .bs-top-stripe {
    position: absolute; top: 0; left: 0; right: 0; height: 2.5px; z-index: 5;
    background: linear-gradient(90deg, #2563eb 0%, #dc2626 100%);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.5s cubic-bezier(.22,.68,0,1.2);
  }
  .bs-product-card:hover .bs-top-stripe { transform: scaleX(1); }

  /* bottom sweep */
  .bs-bot-line {
    position: absolute; bottom: 0; left: 16px; right: 16px;
    height: 2px; border-radius: 1px;
    background: linear-gradient(90deg, #2563eb, #dc2626);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.55s cubic-bezier(.22,.68,0,1.2);
    z-index: 5;
  }
  .bs-product-card:hover .bs-bot-line { transform: scaleX(1); }

  /* section entrance animation */
  .bs-card-enter {
    animation: bsCardEnter 0.65s cubic-bezier(.22,.68,0,1.2) both;
  }
  @keyframes bsCardEnter {
    from { opacity: 0; transform: translateY(40px) scale(0.95); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* name hover underline */
  .bs-name-link {
    display: block; text-decoration: none;
    position: relative;
  }
  .bs-name-link::after {
    content: '';
    position: absolute; bottom: -2px; left: 0; right: 0; height: 1px;
    background: #2563eb;
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s cubic-bezier(.22,.68,0,1.2);
  }
  .bs-name-link:hover::after { transform: scaleX(1); }

  /* discount badge pulse */
  .bs-disc-badge {
    animation: discPulse 2.5s ease-in-out infinite;
  }
  @keyframes discPulse {
    0%,100% { box-shadow: 0 2px 12px rgba(220,38,38,0.35); }
    50%      { box-shadow: 0 2px 20px rgba(220,38,38,0.6); }
  }

  /* view button */
  .bs-view-btn {
    position: relative; overflow: hidden;
    transition: background 0.2s, box-shadow 0.25s, transform 0.2s;
  }
  .bs-view-btn::before {
    content: '';
    position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    transition: left 0.5s;
  }
  .bs-view-btn:hover::before { left: 100%; }
  .bs-view-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(220,38,38,0.45); }

  /* section bg subtle grid pattern */
  .bs-section-bg {
    background-image:
      linear-gradient(rgba(37,99,235,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(37,99,235,0.025) 1px, transparent 1px);
    background-size: 40px 40px;
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
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);
  const discount = Math.round((1 - p.price / p.oldPrice) * 100);

  const onMove = (e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMouse({ x: 50, y: 50 }); }}
      onMouseMove={onMove}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
        transition: `opacity .65s cubic-bezier(.22,.68,0,1.2) ${index * 0.07}s,
                     transform .65s cubic-bezier(.22,.68,0,1.2) ${index * 0.07}s`,
      }}
      className="bs-product-card relative flex-none w-[230px] rounded-2xl overflow-hidden cursor-default"
    >
      {/* top stripe */}
      <div className="bs-top-stripe" />

      {/* mouse-track glow */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] transition-opacity duration-300 rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(37,99,235,0.14), transparent 60%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* discount badge */}
      <div className="bs-disc-badge absolute top-3 right-3 z-[4] px-2.5 py-1 rounded-full
                      text-[11px] font-bold tracking-wide text-white
                      bg-gradient-to-br from-red-600 to-red-800
                      font-['Barlow_Condensed',sans-serif]">
        -{discount}%
      </div>

      {/* IMAGE */}
      <div className="relative h-[185px] overflow-hidden flex items-center justify-center bg-white">
        {/* subtle hover tint */}
        <div
          className="absolute inset-0 pointer-events-none z-[2] transition-all duration-500"
          style={{ background: hovered ? "rgba(37,99,235,0.04)" : "transparent" }}
        />

        <img
          src={p.img}
          alt={p.name}
          className="bs-product-img relative z-[1] max-w-[82%] max-h-[82%] object-contain"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentNode.querySelector(".bs-ph").style.display = "flex";
          }}
        />
        <div className="bs-ph hidden absolute inset-0 z-[1] flex-col items-center justify-center text-gray-300 gap-2">
          <svg viewBox="0 0 24 24" className="w-11 h-11" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <polyline points="16 2 12 7 8 2" />
          </svg>
          <span className="text-[10px] tracking-widest uppercase text-gray-400 font-['Barlow_Condensed',sans-serif]">No Image</span>
        </div>

        {/* Quick view */}
        <div
          className="bs-qv-overlay absolute inset-0 z-[3] flex items-center justify-center
                     bg-[rgba(4,9,24,0.65)] backdrop-blur-[5px]"
          style={{ opacity: hovered ? 1 : 0, pointerEvents: hovered ? "all" : "none" }}
        >
          <a
            href={`/product-details/${p.id}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                       text-[12px] font-bold tracking-widest uppercase text-white
                       bg-blue-600 border border-blue-400/60
                       shadow-[0_4px_20px_rgba(37,99,235,0.4)]
                       hover:bg-blue-700 hover:scale-105
                       transition-all duration-200
                       font-['Barlow_Condensed',sans-serif]"
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
      <div
        className="relative px-4 pt-4 pb-[18px]"
        style={{ borderTop: "2px solid rgba(37,99,235,0.18)" }}
      >
        <span className="block text-[9.5px] font-bold tracking-[.2em] uppercase
                         text-blue-400/70 mb-1 font-['Barlow_Condensed',sans-serif]">
          {p.category}
        </span>

        <a
          href={`/product-details/${p.id}`}
          className="bs-name-link text-[15px] font-extrabold tracking-[.04em] uppercase
                     mb-2 leading-snug font-['Barlow_Condensed',sans-serif]"
          style={{ color: hovered ? "#60a5fa" : "#f0f6ff", transition: "color 0.25s" }}
        >
          {p.name}
        </a>

        <div className="flex items-center justify-between mb-3 mt-1">
          <StarRating rating={p.rating} />
          <span className="text-[10px] text-white/38 font-['Barlow',sans-serif]">{p.reviews} sold</span>
        </div>

        <div
          className="h-px mb-3 rounded transition-all duration-300"
          style={{ background: hovered ? "rgba(37,99,235,0.3)" : "rgba(255,255,255,0.07)" }}
        />

        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] text-white/35 line-through leading-none font-['Barlow',sans-serif]">
              ${p.oldPrice.toFixed(2)}
            </span>
            <span className="text-[26px] leading-none tracking-wide text-blue-400 font-['Bebas_Neue',sans-serif]">
              ${p.price.toFixed(2)}
            </span>
          </div>

          <a
            href={`/product-details/${p.id}`}
            className="bs-view-btn inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg
                       text-[11.5px] font-bold tracking-widest uppercase text-white
                       bg-gradient-to-br from-red-600 to-red-800
                       font-['Barlow_Condensed',sans-serif]"
          >
            View
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        <div className="bs-bot-line" />
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
      className="relative overflow-hidden py-[72px] px-[5%]"
      style={{ background: "linear-gradient(160deg, #060a18 0%, #09112a 50%, #060a18 100%)" }}
    >
      <style>{cardStyles}</style>
      {/* ambient orbs */}
      <div className="pointer-events-none absolute -top-[15%] -left-[6%] w-1/2 h-[150%]"
        style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.07), transparent 65%)" }} />
      <div className="pointer-events-none absolute -bottom-[15%] -right-[5%] w-[42%] h-[140%]"
        style={{ background: "radial-gradient(ellipse, rgba(220,38,38,0.05), transparent 65%)" }} />

      {/* ── HEADER ── */}
      <div
        className="relative z-[1] flex items-end justify-between flex-wrap gap-4 mb-9"
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(24px)",
          transition: "opacity .6s cubic-bezier(.22,.68,0,1.2), transform .6s cubic-bezier(.22,.68,0,1.2)",
        }}
      >
        {/* Left */}
        <div>
          {/* badge */}
          <div className="inline-flex items-center gap-2.5 mb-2
                          text-[10.5px] font-bold tracking-[.24em] uppercase text-red-500
                          font-['Barlow_Condensed',sans-serif]">
            <span className="inline-block w-5 h-[1.5px] rounded bg-gradient-to-r from-transparent to-red-500" />
            Trending Now
            <span className="inline-block w-5 h-[1.5px] rounded bg-gradient-to-l from-transparent to-red-500" />
          </div>
          <h2 className="text-[clamp(32px,4.5vw,46px)] tracking-[.05em] text-white leading-none
                         font-['Bebas_Neue',sans-serif]"
            style={{ textShadow: "0 2px 24px rgba(37,99,235,0.1)" }}>
            Best Sellers
          </h2>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          {/* see all */}
          <a href="/catalog-item"
            className="inline-flex items-center gap-1.5 text-[11.5px] font-bold tracking-[.14em] uppercase
                       text-blue-400/60 hover:text-blue-400 no-underline
                       transition-colors duration-200
                       font-['Barlow_Condensed',sans-serif] group">
            View All
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200"
              fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

          {/* dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: Math.min(MAX + 1, products.length) }).map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className="h-[3px] rounded-sm border-none p-0 cursor-pointer transition-all duration-300"
                style={{
                  width: i === cur ? 36 : 20,
                  background: i === cur ? "#dc2626" : "rgba(255,255,255,0.14)",
                  boxShadow: i === cur ? "0 0 10px rgba(220,38,38,0.4)" : "none",
                }} />
            ))}
          </div>

          {/* arrows */}
          <div className="flex gap-2">
            {[{ dir: -1, icon: "15 18 9 12 15 6" }, { dir: 1, icon: "9 18 15 12 9 6" }].map(({ dir, icon }, i) => (
              <button key={i}
                onClick={() => goTo(cur + dir)}
                disabled={dir === -1 ? cur === 0 : cur >= MAX}
                className="w-10 h-10 rounded-full flex items-center justify-center
                           border border-white/10 bg-white/[0.04]
                           text-blue-200/70
                           hover:bg-blue-700/20 hover:border-blue-500/50 hover:text-blue-400
                           hover:scale-105
                           disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100
                           transition-all duration-200">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
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