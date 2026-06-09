import { useEffect, useRef, useState } from "react";

const stats = [
  { num: "25+",  label: "Yrs Experience" },
  { num: "50K+", label: "Customers"      },
  { num: "4.9★", label: "Rating"         },
];

const checks = [
  "Over 50,000 satisfied customers",
  "Same-day tire &amp; oil service",
  "Price match — we beat any quote",
];

export default function CallToAction() {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.08 }
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative bg-white overflow-hidden">

      {/* diagonal gray shape — right half */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[48%] pointer-events-none"
        style={{
          background: "linear-gradient(145deg, #f5f5f5 0%, #eeeeee 100%)",
          clipPath: "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      />

      {/* red top-right accent line */}
      <div className="absolute top-0 right-0 w-[48%] h-[3px] pointer-events-none bg-red-600" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-[5%]">
        <div className="grid lg:grid-cols-2 gap-0 items-center min-h-[480px]">

          {/* ── LEFT: Text ── */}
          <div
            className="py-14 md:py-20 pr-8"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateX(-20px)",
              transition: "opacity .6s ease, transform .6s ease",
            }}
          >
            {/* label */}
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-[2px] bg-red-600" />
              <span className="text-[11px] font-black tracking-[3px] uppercase text-red-600">
                Tire &amp; Oil Specialists
              </span>
            </div>

            {/* headline */}
            <h2
              className="font-black text-gray-900 leading-[1.05] tracking-tight mb-5"
              style={{ fontSize: "clamp(30px, 4vw, 52px)" }}
            >
              Fast. Honest.<br />
              <span className="text-red-600">Guaranteed.</span>
            </h2>

            <p className="text-[15px] text-gray-500 leading-relaxed mb-8 max-w-[380px]">
              Fremont's most trusted tire &amp; oil service since 1998.
              ASE-certified technicians, same-day service, and prices you can trust.
            </p>

            {/* trust points */}
            <div className="flex flex-col gap-2.5 mb-9">
              {checks.map((t, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-[13.5px] font-semibold text-gray-700" dangerouslySetInnerHTML={{ __html: t }} />
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="/contacts"
                className="group inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-7 py-3.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                style={{ boxShadow: "0 4px 20px rgba(220,38,38,0.30)" }}
              >
                Book an Appointment
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <a
                href="/catalog-item"
                className="inline-flex items-center font-bold text-sm px-7 py-3.5 rounded-lg border border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-all duration-200"
              >
                Shop Products
              </a>
            </div>

            {/* stats */}
            <div className="flex items-center gap-6 mt-9 pt-7 border-t border-gray-100">
              {stats.map(({ num, label }) => (
                <div key={label}>
                  <p className="text-[19px] font-black text-gray-900 leading-none">{num}</p>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Image ── */}
          <div
            className="relative flex items-center justify-center py-10"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateX(20px)",
              transition: "opacity .7s ease .15s, transform .7s ease .15s",
            }}
          >
            <img
              src="/bg1.png"
              alt="Tire & Oil Service"
              className="w-full max-w-[560px] object-contain hover:scale-[1.015] transition-transform duration-700"
              style={{ filter: "drop-shadow(0 16px 48px rgba(0,0,0,0.14))" }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
