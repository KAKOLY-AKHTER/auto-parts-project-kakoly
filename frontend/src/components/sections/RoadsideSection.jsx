import { useEffect, useRef, useState } from "react";

const checks = [
  "Emergency Tire Changes",
  "Flat Tire Repairs",
  "Jump Starts",
  "Battery Assistance",
  "24/7 Emergency",
  "No Tow Truck Needed",
];

const stats = [
  { value: "< 60", unit: "min", label: "Response" },
  { value: "24/7", unit: "",    label: "Available" },
  { value: "50+",  unit: "mi",  label: "Coverage"  },
];

export default function RoadsideSection() {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-gray-100 py-12 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-[5%]">
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">

          {/* ── LEFT — TEXT CARD ── */}
          <div
            className="flex flex-col justify-center"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "translateX(0)" : "translateX(-32px)",
              transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.1s",
            }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 mb-7 self-start">
              <div className="flex -space-x-1.5">
                {["#dc2626","#2563eb","#d97706","#059669"].map((c, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white text-[8px] font-black"
                    style={{ background: c }}
                  >
                    {["T","M","J","B"][i]}
                  </div>
                ))}
              </div>
              <span className="text-gray-600 text-[12px] font-semibold tracking-wide">Roadside Assistance 24/7</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Heading */}
            <h2
              className="text-gray-900 font-black leading-[1.08] tracking-tight mb-1.5"
              style={{ fontSize: "clamp(24px,2.8vw,42px)" }}
            >
              Stuck on the Road?<br />We Fix It Right Now —
            </h2>
            <h2
              className="font-black leading-[1.08] tracking-tight"
              style={{
                fontSize: "clamp(24px,2.8vw,42px)",
                background: "linear-gradient(90deg,#dc2626,#f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Guaranteed.
            </h2>

            {/* Red underline accent */}
            <div
              className="w-14 h-0.75 rounded-full mt-4 mb-6"
              style={{ background: "linear-gradient(90deg,#dc2626,#f97316)" }}
            />

            {/* Description */}
            <p className="text-gray-500 text-[15px] leading-[1.75] mb-7" style={{ maxWidth: "420px" }}>
              24-hour mobile tire service, jump starts, and battery assistance.
              Certified technicians dispatched directly to your location —
              fast, professional, no tow truck needed.
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-6 mb-7 pb-7 border-b border-gray-100">
              {stats.map(({ value, unit, label }) => (
                <div key={label} className="text-center">
                  <div className="flex items-baseline gap-0.5 justify-center">
                    <span className="text-gray-900 font-black text-[24px] leading-none">{value}</span>
                    {unit && <span className="text-red-500 font-black text-[12px]">{unit}</span>}
                  </div>
                  <p className="text-gray-400 text-[10.5px] font-semibold uppercase tracking-widest mt-1">{label}</p>
                </div>
              ))}
              <div className="ml-2 h-10 w-px bg-gray-150 hidden sm:block" />
              <div className="hidden sm:flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-600 text-[12px] font-bold">Live</span>
                </div>
                <span className="text-gray-400 text-[11px]">Dispatching Now</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-7">
              <a
                href="/fleet-services"
                className="no-underline inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-[13px] text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", boxShadow: "0 8px 28px rgba(220,38,38,0.38)" }}
              >
                Book Mobile Service
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <a
                href="tel:+14156347777"
                className="no-underline inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-[13px] text-gray-700 bg-white border border-gray-200 hover:border-red-300 hover:text-red-600 hover:shadow-lg transition-all duration-200"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                </svg>
                Call 24/7 Support
              </a>
            </div>

            {/* Checklist — 2 col, 3 rows */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {checks.map((c) => (
                <div key={c} className="flex items-center gap-2.5">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg,rgba(220,38,38,0.12),rgba(249,115,22,0.12))" }}
                  >
                    <svg viewBox="0 0 12 12" fill="none" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" className="w-3 h-3">
                      <polyline points="2 6 5 9 10 3"/>
                    </svg>
                  </div>
                  <span className="text-gray-600 text-[13px] font-medium">{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — IMAGE GRID (stretches to match left card height) ── */}
          <div
            className="hidden lg:flex gap-3 rounded-3xl overflow-hidden"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "translateX(0)" : "translateX(32px)",
              transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.25s",
              minHeight: "480px",
            }}
          >
            {/* Col 1 — large top, small bottom */}
            <div className="flex flex-col gap-3 flex-1">
              <div
                className="relative overflow-hidden rounded-2xl bg-gray-200 group"
                style={{ flex: "1.6" }}
              >
                <img
                  src="/bg-img7.png"
                  alt="Roadside Assistance"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.target.style.display="none"; }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div
                className="relative overflow-hidden rounded-2xl bg-gray-200 group"
                style={{ flex: "1" }}
              >
                <img
                  src="/bg-img1.png"
                  alt="Mobile Mechanic"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.target.style.display="none"; }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Col 2 — small top, large bottom */}
            <div className="flex flex-col gap-3 flex-1">
              <div
                className="relative overflow-hidden rounded-2xl bg-gray-200 group"
                style={{ flex: "1" }}
              >
                <img
                  src="/tire.png"
                  alt="Truck Tire Change"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.target.style.display="none"; }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div
                className="relative overflow-hidden rounded-2xl bg-gray-200 group"
                style={{ flex: "1.6" }}
              >
                <img
                  src="/bg-img6.png"
                  alt="Tire Repair Service"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.target.style.display="none"; }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
