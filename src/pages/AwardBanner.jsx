import { useEffect, useRef, useState } from "react";

export default function AwardBanner() {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.3 }
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <div ref={ref} className="px-5 md:px-[5%] py-10 md:py-12 bg-white">

      {/* Outer border wrapper */}
      <div
        className="max-w-5xl mx-auto"
        style={{
          borderRadius: 7,
          padding: 5,
          background: "#242427",
          boxShadow: vis ? "0 16px 56px rgba(0,0,0,0.45), 0 4px 16px rgba(80,162,255,0.10)" : "0 8px 40px rgba(0,0,0,0.35)",
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
          transition: "opacity .7s ease, transform .7s cubic-bezier(.22,.68,0,1.2), box-shadow .7s ease",
        }}
      >
        {/* Inner border wrapper */}
        <div
          className="relative flex items-stretch overflow-hidden"
          style={{
            border: "4.5px solid #50a2ff",
            borderRadius: 3,
            background: "linear-gradient(160deg, #1c1c1e 0%, #2a2a2e 40%, #1a1a1c 100%)",
          }}
        >
          {/* glassy top sheen */}
          <div className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              height: "50%",
              background: "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 100%)",
            }} />

          {/* ── LEFT: Brand + Year ── */}
          <div
            className="relative flex items-center px-8 py-5"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateX(-16px)",
              transition: "opacity .6s ease .25s, transform .6s ease .25s",
            }}
          >
            <div>
              <p className="text-white font-black leading-none tracking-tight"
                style={{ fontSize: 24, fontStyle: "italic" }}>
                TireOil
              </p>
              <div className="mt-2 px-3 py-0.5 text-center"
                style={{ background: "#50a2ff", borderRadius: 2 }}>
                <span className="text-white font-black tracking-widest" style={{ fontSize: 14 }}>
                  2026
                </span>
              </div>
            </div>
          </div>

          {/* ── DIVIDER ── */}
          <div
            style={{
              width: "1.5px",
              background: "rgba(80,162,255,0.55)",
              margin: "12px 0",
              transform: vis ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "top",
              transition: "transform .5s ease .35s",
            }}
          />

          {/* ── RIGHT: Award text ── */}
          <div
            className="relative flex flex-col justify-center px-8 py-5"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateX(16px)",
              transition: "opacity .6s ease .3s, transform .6s ease .3s",
            }}
          >
            <p className="text-white font-semibold mb-0.5"
              style={{ fontSize: 11, letterSpacing: "0.26em", textTransform: "uppercase", opacity: 0.75 }}>
              California's
            </p>
            <p className="text-white font-black leading-none"
              style={{ fontSize: "clamp(18px, 3vw, 33px)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Best-in-State Auto Service
            </p>
            <p className="text-white mt-2"
              style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.55 }}>
              Powered by{" "}
              <span style={{ opacity: 1, color: "rgba(255,255,255,0.80)", fontStyle: "italic", fontWeight: 700 }}>
                Google Reviews
              </span>
            </p>
          </div>

          {/* right glow */}
          <div className="absolute right-0 top-0 bottom-0 w-28 pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(80,162,255,0.05))" }} />
        </div>
      </div>

    </div>
  );
}
