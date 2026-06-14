import useSEO from '../hooks/useSEO';
import { Link } from 'react-router-dom';

export default function About() {
  useSEO({
    title: "About Us — 24HR Fremont Tire & Auto",
    description: "Learn about 24HR Fremont Tire & Auto — your local mobile auto service team in Fremont, CA. ASE-certified, fully equipped, available 24/7.",
  });
  return (
    <main>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-32 pb-20"
        style={{ background: "linear-gradient(135deg,#050d18 0%,#0a1628 50%,#0d1f35 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 inset-x-0 h-[3px]" style={{ background: "linear-gradient(90deg,#dc2626,#f87171,#dc2626)" }} />
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle,#dc2626,transparent 70%)" }} />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-5"
            style={{ background: "radial-gradient(circle,#3b82f6,transparent 70%)" }} />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />
        </div>
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="flex items-center gap-2 text-[12px] mb-8">
            <Link to="/" className="text-slate-400 hover:text-red-400 no-underline transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">About Us</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)" }}>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400 text-[11px] font-bold tracking-[3px] uppercase">Est. 1998 · Fremont, CA</span>
            </div>
            <h1 className="text-white font-black leading-none tracking-tight mb-6"
              style={{ fontSize: "clamp(44px,6vw,80px)" }}>
              About <span style={{ color: "#dc2626" }}>TireOil</span>
            </h1>
            <p className="text-slate-300 text-[17px] leading-relaxed max-w-2xl mb-8">
              Fremont's most trusted tire and oil service center — family-owned since 1998, serving the Bay Area for over 25 years.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contacts" className="no-underline px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-[13px] rounded-xl transition-all duration-200"
                style={{ boxShadow: "0 4px 20px rgba(220,38,38,0.35)" }}>
                Book a Service
              </Link>
              <Link to="/services" className="no-underline px-7 py-3.5 text-white font-bold text-[13px] rounded-xl transition-colors border"
                style={{ borderColor: "rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)" }}>
                Our Services →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ background: "#dc2626" }}>
        <div className="max-w-7xl mx-auto px-5 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: "1998", lbl: "Year Founded" },
              { val: "50K+", lbl: "Vehicles Served" },
              { val: "14",   lbl: "ASE Technicians" },
              { val: "4.9★", lbl: "Google Rating" },
            ].map(({ val, lbl }) => (
              <div key={lbl}>
                <div className="text-white font-black text-4xl md:text-5xl leading-none mb-2">{val}</div>
                <div className="text-red-200 text-[12px] tracking-widest uppercase font-semibold">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY (LIGHT BG) ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-red-600 text-[11px] font-black tracking-[4px] uppercase mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-red-600" />Our Story
              </p>
              <h2 className="text-gray-900 font-black text-4xl md:text-5xl leading-tight tracking-tight mb-6">
                25+ Years Keeping<br />Fremont Moving
              </h2>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-5">
                Founded in 1998 by Robert Chen, TireOil started as a small single-bay garage with a simple mission: provide honest, expert auto care at fair prices. What began as a neighborhood shop has grown into one of Fremont's most recognized auto service centers.
              </p>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
                Today, our team of 14 ASE-certified technicians services over 500 vehicles per month. We specialize in tires, oil changes, wheel alignments, and complete vehicle maintenance — all with same-day turnaround whenever possible.
              </p>
              <div className="flex items-center gap-4">
                {[["500+", "Vehicles/month"], ["12mo", "Parts warranty"], ["7 Days", "A week open"]].map(([val, lbl]) => (
                  <div key={lbl} className="text-center p-4 rounded-xl bg-gray-50 border border-gray-100 flex-1">
                    <div className="text-red-600 font-black text-2xl leading-none mb-1">{val}</div>
                    <div className="text-gray-400 text-[10px] tracking-wide font-medium">{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img src="/tire-oil.png" alt="Service" className="rounded-2xl w-full object-cover h-56 col-span-2"
                  style={{ background: "#f3f4f6" }} onError={e => e.target.style.background = '#f3f4f6'} />
                <img src="/oil-change.png" alt="Oil change" className="rounded-2xl w-full object-cover h-40"
                  style={{ background: "#fef2f2" }} onError={e => e.target.style.background = '#fef2f2'} />
                <img src="/tire.png" alt="Tires" className="rounded-2xl w-full object-cover h-40"
                  style={{ background: "#f0fdf4" }} onError={e => e.target.style.background = '#f0fdf4'} />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-red-600 rounded-2xl flex flex-col items-center justify-center shadow-xl">
                <span className="text-white font-black text-2xl leading-none">25</span>
                <span className="text-red-200 text-[9px] tracking-widest font-bold">YRS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES (DARK) ── */}
      <section className="py-20" style={{ background: "#07101c" }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-14">
            <p className="text-red-500 text-[11px] font-black tracking-[4px] uppercase mb-3">What We Stand For</p>
            <h2 className="text-white font-black text-4xl md:text-5xl tracking-tight">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { color: "#dc2626", icon: "⚡", title: "Speed",        desc: "Same-day service on most jobs. We value your time as much as you do." },
              { color: "#f59e0b", icon: "🏆", title: "Quality",      desc: "OEM-grade parts, name-brand tires. Only the best touches your vehicle." },
              { color: "#10b981", icon: "🤝", title: "Integrity",     desc: "Honest estimates, no upselling. We recommend only what you actually need." },
              { color: "#3b82f6", icon: "💎", title: "Transparency",  desc: "Upfront pricing on every job. The quote you get is what you pay." },
            ].map(({ color, icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-7 group hover:-translate-y-1 transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 shadow-lg"
                  style={{ background: `${color}22`, border: `1px solid ${color}44` }}>
                  {icon}
                </div>
                <div className="w-8 h-0.5 mb-4 rounded-full" style={{ background: color }} />
                <h3 className="text-white font-bold text-[18px] mb-3">{title}</h3>
                <p className="text-slate-500 text-[13px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ background: "linear-gradient(135deg,#b91c1c,#dc2626,#ef4444)" }}>
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h2 className="text-white font-black text-4xl md:text-5xl mb-5 tracking-tight">
            Ready for the TireOil Difference?
          </h2>
          <p className="text-red-100 text-[16px] mb-10 max-w-lg mx-auto">
            Book today — most services available same-day, no appointment needed.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/contacts" className="no-underline px-9 py-4 bg-white text-red-600 font-black text-[14px] rounded-xl hover:bg-red-50 transition-colors shadow-xl">
              Book an Appointment
            </Link>
            <Link to="/services" className="no-underline px-9 py-4 text-white font-bold text-[14px] rounded-xl transition-colors"
              style={{ border: "2px solid rgba(255,255,255,0.4)" }}>
              View Services
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
