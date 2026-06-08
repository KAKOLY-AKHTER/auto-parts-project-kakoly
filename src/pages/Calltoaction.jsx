import { useEffect, useRef, useState } from "react";

export default function CallToAction() {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500&display=swap');
        @keyframes ctaUp  { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ctaImg { from{opacity:0;transform:translateY(52px) scale(.95)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes shine  { from{left:-80%} to{left:170%} }
        .anim-txt  { animation: ctaUp  0.75s cubic-bezier(.22,.68,0,1.2) both; }
        .anim-img  { animation: ctaImg 1.0s  cubic-bezier(.22,.68,0,1.2) 0.2s both; }
        .btn-shine:hover .shine-layer { animation: shine 0.55s ease forwards; }
      `}</style>

      <section
        ref={ref}
        className="relative overflow-hidden bg-white pb-20"
      >
        {/* ── BG IMAGE — full cover, very subtle ── */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{ backgroundImage:"url('/bg1.png')", opacity: 0.06 }}
        />

        {/* top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] z-10"
          style={{ background:"linear-gradient(90deg,#dc2626 0%,#1d4ed8 50%,#dc2626 100%)" }} />

        {/* ── TEXT BLOCK ── */}
        <div className={`relative z-10 pt-16 pb-4 px-6 text-center ${vis ? "anim-txt" : "opacity-0"}`}>

          {/* eyebrow */}
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-red-600" />
            <span className="font-['Barlow_Condensed'] text-[10px] font-bold tracking-[0.3em] uppercase text-red-600">
              Your Trusted Parts Store
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-red-600" />
          </div>

          {/* headline */}
          <h2
            className="font-['Bebas_Neue'] uppercase leading-[1.05] mb-3 text-gray-900"
            style={{ fontSize:"clamp(38px,6.5vw,76px)", letterSpacing:"0.03em" }}
          >
            All Kinds of Parts That You
            <br />
            Need Can Find{" "}
            <span className="text-red-600">Here</span>
          </h2>

          {/* sub */}
          <p className="font-['Barlow'] text-[15px] text-gray-500 leading-relaxed mb-8 max-w-[460px] mx-auto">
            Premium OEM &amp; aftermarket parts for every make and model.
            Fast delivery across Bangladesh.
          </p>

          {/* Shop Now button */}
          <a
            href="/catalog-item"
            className="btn-shine group relative inline-flex items-center gap-3 overflow-hidden no-underline rounded-full px-10 py-[14px] bg-red-600 text-white transition-all duration-250 hover:-translate-y-[3px] hover:shadow-[0_14px_40px_rgba(220,38,38,0.45)]"
            style={{
              fontFamily:"'Barlow Condensed',sans-serif",
              fontSize:14, fontWeight:800,
              letterSpacing:"0.16em",
              textTransform:"uppercase",
              boxShadow:"0 8px 32px rgba(220,38,38,0.3)",
            }}
          >
            <span className="shine-layer absolute top-0 w-[55%] h-full bg-white/20 skew-x-[-16deg] pointer-events-none" style={{ left:"-80%" }} />
            <svg className="w-4 h-4 flex-shrink-0 transition-transform duration-250 group-hover:translate-x-1"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
            Shop Now
          </a>
        </div>

        {/* ── IMAGE BLOCK ── */}
        <div className={`relative z-10 ${vis ? "anim-img" : "opacity-0"}`}>
          {/* floor fade */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

          <div className="flex justify-center">
            <img
              src="/bg1.png"
              alt="Auto Parts Service"
              className="w-full max-w-[900px] object-contain transition-transform duration-700 hover:scale-[1.012]"
              style={{ filter:"drop-shadow(0 8px 40px rgba(0,0,0,0.12))" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}