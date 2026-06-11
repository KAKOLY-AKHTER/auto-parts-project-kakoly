import { useRef, useEffect, useState } from "react";

export default function AboutUs() {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); observer.unobserve(entry.target); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: "🛞", title: "1,000+ Tire Brands", desc: "All major brands in stock" },
    { icon: "⚡", title: "Same-Day Service", desc: "In & out in 30 minutes" },
    { icon: "🔧", title: "Certified Technicians", desc: "ASE-certified experts" },
    { icon: "✅", title: "Price Match Guarantee", desc: "Best price, guaranteed" },
  ];

  return (
    <section className="bg-white pt-14 md:pt-16 pb-16 md:pb-20 px-5 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-500" />
            <span className="text-[11px] font-black tracking-[4px] uppercase text-red-600">Who We Are</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-500" />
          </div>
        </div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">

          {/* Left — Image block */}
          <div className={`relative transition-all duration-1000 flex flex-col ${vis ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>

            {/* Ambient glow behind card */}
            <div className="absolute -inset-3 bg-gradient-to-br from-red-600/15 via-transparent to-gray-900/20 rounded-3xl blur-2xl z-0 pointer-events-none" />

            {/* Main glass card */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.45)] flex flex-col flex-1"
              style={{ background: "linear-gradient(145deg, #111118 0%, #1b1b2a 55%, #0e0e14 100%)" }}>

              {/* Top red accent line */}
              <div className="h-[3px] w-full bg-gradient-to-r from-red-600 via-red-500 to-transparent flex-shrink-0" />

              {/* Image area */}
              <div className="relative overflow-hidden flex-1 min-h-[300px]">
                <img
                  src="/about-img.png"
                  alt="Tire Service Professional"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  style={{ filter: "brightness(1.08) contrast(1.12) saturate(1.1)" }}
                />
                {/* Top dark vignette */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/55 pointer-events-none" />

                {/* ASE Certified glass badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2"
                  style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "10px", padding: "7px 12px" }}>
                  <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-600/50">
                    <svg viewBox="0 0 24 24" fill="white" className="w-2.5 h-2.5"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  </div>
                  <div>
                    <p className="text-white text-[10px] font-black tracking-[2px] uppercase leading-none">ASE Certified</p>
                    <p className="text-white/40 text-[9px] leading-none mt-0.5 font-medium">Technicians</p>
                  </div>
                </div>

                {/* "Open Today" glass pill — top right */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2"
                  style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50px", padding: "6px 12px" }}>
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0 shadow-sm shadow-green-400" />
                  <div>
                    <p className="text-white text-[10px] font-black leading-none">Open Today</p>
                    <p className="text-white/40 text-[9px] mt-0.5">7am – 8pm</p>
                  </div>
                </div>
              </div>

              {/* Bottom stats glass panel */}
              <div className="flex divide-x" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)", backdropFilter: "blur(8px)" }}>
                {[
                  { num: "25+", label: "Yrs Experience" },
                  { num: "50K+", label: "Clients Served" },
                  { num: "4.9★", label: "Google Rating" },
                ].map(({ num, label }) => (
                  <div key={label} className="flex-1 text-center py-4"
                    style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                    <p className="text-white text-[17px] font-black leading-none tracking-tight">{num}</p>
                    <p className="text-white/35 text-[9px] uppercase tracking-[1.5px] mt-1 font-semibold">{label}</p>
                  </div>
                ))}
              </div>

              {/* Bottom red accent line */}
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />
            </div>

            {/* Bottom-right corner decoration */}
            <div className="absolute -bottom-2 -right-2 w-10 h-10 border-r-2 border-b-2 border-red-600/60 rounded-br-xl z-0 pointer-events-none" />
          </div>

          {/* Right — Content */}
          <div className={`transition-all duration-1000 delay-200 ${vis ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>

            <h2 className="text-[28px] sm:text-4xl md:text-[44px] font-black leading-[1.1] tracking-tight text-gray-900 mb-5 md:mb-6">
              Fremont's Most Trusted<br />
              <span className="text-red-600">Tire & Oil Service</span><br />
              Since 1998
            </h2>

            <p className="text-[15px] text-gray-500 leading-relaxed mb-8 max-w-[480px]">
              For over 25 years, we've kept Fremont drivers safe on the road. From premium
              tire installation to quick oil changes, our ASE-certified technicians deliver
              fast, honest, and affordable service — every time.
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-2 mb-8">
              {features.map(({ icon, title, desc }) => (
                <div key={title} className="group flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-gray-100 hover:border-red-200 hover:bg-red-50/30 transition-all duration-200 cursor-default">
                  <span className="text-base flex-shrink-0">{icon}</span>
                  <div>
                    <p className="text-[12.5px] font-bold text-gray-800 leading-tight group-hover:text-red-700 transition-colors">{title}</p>
                    <p className="text-[10.5px] text-gray-400 leading-tight">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider stats */}
            <div className="flex items-center gap-6 py-6 mb-8 border-y border-gray-100">
              {[
                { num: "30min", label: "Avg. Service Time" },
                { num: "#1", label: "Rated in Fremont" },
                { num: "100%", label: "Satisfaction Rate" },
              ].map(({ num, label }) => (
                <div key={label} className="flex-1 text-center">
                  <p className="text-2xl font-black text-gray-900">{num}</p>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <a href="/contacts"
                className="group inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:shadow-xl hover:shadow-red-600/30 hover:-translate-y-0.5">
                Book an Appointment
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a href="/about"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold text-sm transition-colors duration-200 underline-offset-4 hover:underline">
                Our Story
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
