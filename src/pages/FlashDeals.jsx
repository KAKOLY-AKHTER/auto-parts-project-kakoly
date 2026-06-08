import { useEffect, useRef, useState } from "react";

function Countdown({ targetDate }) {
  const calc = () => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    return {
      days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0"),
      hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
      minutes: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0"),
      seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const timer = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(timer);
  }, []);

  const items = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div className="flex items-center justify-center md:justify-start gap-3">
      {items.map((item, i) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
            <span className="text-xl md:text-3xl font-bold text-gray-900 tabular-nums">{item.value}</span>
          </div>
          <span className="text-[9px] md:text-[10px] uppercase tracking-[2px] text-gray-400 mt-2 font-semibold">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function FlashDeals() {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-50/40 to-transparent" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-red-100/20 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2">
          <div className="relative flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-6 md:p-10 overflow-hidden order-2 md:order-1"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "translateX(0)" : "translateX(-40px)",
              transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.03),transparent_70%)]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[440px] md:h-[440px] border-2 border-dashed border-red-200/25 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] md:w-[360px] md:h-[360px] border border-red-200/15 rounded-full" />

            <img
              src="/wheel.png"
              alt="Flash Deals"
              className="relative z-10 object-contain w-56 h-56 md:w-80 md:h-80"
              style={{
                filter: "drop-shadow(0 20px 60px rgba(220,38,38,0.15))",
                animation: vis ? "floatWheel 4s ease-in-out infinite" : "none",
              }}
            />

            <style>{`
              @keyframes floatWheel {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-8px) rotate(2deg); }
              }
            `}</style>
          </div>

          <div className="flex flex-col justify-center px-8 md:px-12 lg:px-16 py-8 order-1 md:order-2"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "translateX(0)" : "translateX(40px)",
              transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <span className="inline-block w-1 h-5 bg-red-600 rounded-full" />
              <span className="text-red-600 text-[10px] font-bold tracking-[3px] uppercase">Limited Time</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-3 leading-none tracking-tight">
              <span className="text-gray-900">Flash </span>
              <span className="text-red-600">Deals</span>
            </h2>

            <div className="w-12 h-0.5 bg-gradient-to-r from-red-600 to-red-400 rounded-full mb-4" />

            <p className="text-gray-500 text-sm max-w-sm mb-6 leading-relaxed">
              Hurry up and get <span className="text-red-600 font-bold">25% discount</span> on premium auto parts. Limited time offer!
            </p>

            <div className="mb-6">
              <Countdown targetDate="2026/12/31" />
            </div>

            <a
              href="#"
              className="group/btn inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold uppercase tracking-[2px] text-xs rounded-full transition-all duration-400 shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:-translate-y-0.5 self-start"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></svg>
              Shop Now
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-1">
                <path d="M6 12L10 8 6 4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
