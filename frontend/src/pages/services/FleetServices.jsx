import { Link } from 'react-router-dom';

const services = [
  {
    color: "#dc2626",
    bg: "#fff1f1",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
        <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: "Truck Tire Change",
    desc: "Full-service tire change for all commercial truck sizes. We come to your yard, job site, or roadside — no downtime.",
    badge: "45–90 min",
  },
  {
    color: "#d97706",
    bg: "#fffbeb",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
        <path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7"/><path d="M1 16h15"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: "Trailer Tire Change",
    desc: "Single or multi-axle trailer tires swapped fast on the spot. No tow truck needed — we handle it all.",
    badge: "30–60 min",
  },
  {
    color: "#2563eb",
    bg: "#eff6ff",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
        <ellipse cx="12" cy="12" rx="10" ry="10"/><path d="M12 8v4l3 2"/>
        <path d="M7 3.34A10 10 0 0114 2.05"/>
      </svg>
    ),
    title: "Mobile Oil Change",
    desc: "Conventional, synthetic, and diesel-grade oils for trucks and fleets. Quick service at your location.",
    badge: "30–45 min",
  },
  {
    color: "#059669",
    bg: "#f0fdf4",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    title: "Roadside Assistance",
    desc: "Stuck on the highway? We dispatch fast — tire change, jump start, or emergency repair to get you moving.",
    badge: "< 60 min ETA",
  },
  {
    color: "#7c3aed",
    bg: "#f5f3ff",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: "Mobile at Your Location",
    desc: "We come to your home, business, fleet yard, or job site. We bring the full shop to you.",
    badge: "We come to you",
  },
  {
    color: "#db2777",
    bg: "#fdf2f8",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Available 24/7",
    desc: "Day or night, weekday or weekend — always on call. No overtime charges. One call and we're on our way.",
    badge: "24 hrs · 7 days",
  },
];

const steps = [
  {
    n: "01", color: "#f87171",
    title: "Call or Book",
    desc: "Tell us your location and service needed. Available 24/7.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6z"/>
      </svg>
    ),
  },
  {
    n: "02", color: "#fbbf24",
    title: "Tech Dispatched",
    desc: "Certified technician heads to you with all equipment.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
        <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    n: "03", color: "#34d399",
    title: "Back on the Road",
    desc: "Service completed on-site. No tow, no shop visit needed.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
];

const cities = ["Fremont", "Newark", "Union City", "Hayward", "Milpitas", "San Jose", "Oakland", "Pleasanton"];

export default function FleetServices() {
  return (
    <main className="overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-start overflow-hidden pt-36 md:pt-48 lg:pt-52">
        {/* BG image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/truck-tire-change.png"
            alt="Fleet"
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.55) saturate(0.9)" }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(120deg,rgba(6,12,28,0.82) 0%,rgba(6,12,28,0.5) 55%,rgba(6,12,28,0.3) 100%)" }} />
        </div>

        {/* Top stripe */}
        <div className="absolute top-0 inset-x-0 h-[3px] z-10"
          style={{ background: "linear-gradient(90deg,#dc2626 0%,#f97316 50%,#dc2626 100%)" }} />

        <div className="max-w-7xl mx-auto px-5 md:px-[5%] relative z-10 pt-6 pb-24 w-full">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[12px] mb-8">
              <Link to="/" className="text-white/40 hover:text-red-400 no-underline transition-colors">Home</Link>
              <span className="text-white/20">/</span>
              <span className="text-white/60">Fleet & Mobile Services</span>
            </div>

            {/* Live badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-7"
              style={{ background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.35)" }}>
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span className="text-red-400 text-[11px] font-bold tracking-[3px] uppercase">Available 24/7 · Mobile Dispatch</span>
            </div>

            <h1 className="text-white font-black leading-[1.05] tracking-tight mb-5"
              style={{ fontSize: "clamp(36px,5.5vw,68px)" }}>
              We Come to You —<br />
              <span style={{ background: "linear-gradient(90deg,#dc2626,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                24 Hours a Day,
              </span>{" "}
              <span className="text-white">7 Days a Week</span>
            </h1>

            <p className="text-white/60 text-[17px] leading-relaxed mb-10 max-w-xl">
              Keeping Your Fleet Moving, Anytime, Anywhere. Mobile truck & trailer tire service, oil changes, and roadside assistance — wherever you need us.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-14">
              <a href="tel:+14156347777"
                className="no-underline inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black text-[14px] text-white hover:-translate-y-0.5 transition-all duration-300"
                style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", boxShadow: "0 8px 32px rgba(220,38,38,0.45)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6z"/>
                </svg>
                Call Now: (415) 634-7777
              </a>
              <Link to="/contacts"
                className="no-underline inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[14px] text-white transition-all duration-200 hover:bg-white/10"
                style={{ border: "1.5px solid rgba(255,255,255,0.25)" }}>
                Book Online
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              {[
                { v: "24/7", l: "Always On Call" },
                { v: "< 1hr", l: "Avg. Response" },
                { v: "50mi", l: "Service Radius" },
                { v: "100%", l: "Mobile Fleet" },
              ].map(({ v, l }) => (
                <div key={l}>
                  <div className="text-white font-black text-[30px] leading-none">{v}</div>
                  <div className="text-white/40 text-[11px] font-semibold uppercase tracking-wider mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RED STRIP ── */}
      <div className="bg-red-600 py-4">
        <div className="max-w-7xl mx-auto px-5 md:px-[5%] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <p className="text-white font-bold text-[15px] tracking-wide">Technicians dispatched directly to your location — fast, reliable, professional.</p>
          </div>
          <a href="tel:+14156347777"
            className="shrink-0 no-underline px-6 py-2.5 bg-white text-red-600 font-black text-[13px] rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap shadow-md">
            (415) 634-7777
          </a>
        </div>
      </div>

      {/* ── SERVICES GRID ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 md:px-[5%]">

          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-red-500" />
              <span className="text-red-600 text-[11px] font-black tracking-[4px] uppercase">What We Offer</span>
              <div className="h-px w-10 bg-red-500" />
            </div>
            <h2 className="text-gray-900 font-black text-[36px] md:text-[44px] tracking-tight leading-tight mb-3">
              Fleet & Mobile Services
            </h2>
            <p className="text-gray-400 text-[15px] max-w-lg mx-auto leading-relaxed">
              Everything your fleet needs, delivered to your door. No tow trucks, no downtime.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ color, bg, icon, title, desc, badge }) => (
              <div key={title}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group cursor-default"
                style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
                {/* Top color accent */}
                <div className="h-0.75 w-full rounded-full mb-6" style={{ background: color }} />
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: bg, color }}>
                  {icon}
                </div>
                <h3 className="text-gray-900 font-black text-[17px] mb-2 leading-tight">{title}</h3>
                <p className="text-gray-400 text-[13.5px] leading-relaxed mb-5">{desc}</p>
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-bold"
                  style={{ background: bg, color }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-[5%]">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-red-500" />
              <span className="text-red-600 text-[11px] font-black tracking-[4px] uppercase">Simple Process</span>
              <div className="h-px w-10 bg-red-500" />
            </div>
            <h2 className="text-gray-900 font-black text-[36px] md:text-[44px] tracking-tight">How It Works</h2>
            <p className="text-gray-400 text-[15px] mt-3">Three simple steps to get back on the road.</p>
          </div>

          {/* Steps */}
          <div className="grid sm:grid-cols-3 gap-5">
            {steps.map(({ n, color, title, desc, icon }, i) => (
              <div key={n} className="relative group">
                {/* Arrow between cards */}
                {i < 2 && (
                  <div className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-400"
                    style={{ fontSize: 14, fontWeight: 900 }}>›</div>
                )}

                {/* Card */}
                <div className="relative bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full"
                  style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}>

                  {/* Watermark number */}
                  <div className="absolute -bottom-4 -right-2 font-black leading-none select-none pointer-events-none"
                    style={{ fontSize: 110, color, opacity: 0.06 }}>{n}</div>

                  {/* Top accent bar */}
                  <div className="w-10 h-1 rounded-full mb-6" style={{ background: color }} />

                  {/* Icon box */}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${color}18`, color }}>
                    {icon}
                  </div>

                  {/* Step label */}
                  <span className="inline-block text-[11px] font-black tracking-[3px] uppercase px-2.5 py-1 rounded-full mb-3"
                    style={{ background: `${color}12`, color }}>Step {n}</span>

                  <h3 className="text-gray-900 font-black text-[20px] leading-tight mb-2">{title}</h3>
                  <p className="text-gray-400 text-[14px] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5 md:px-[5%]">
          <div className="rounded-3xl overflow-hidden border border-gray-100"
            style={{ boxShadow: "0 8px 48px rgba(0,0,0,0.08)" }}>
            <div className="flex flex-col lg:flex-row">
              {/* Left red panel */}
              <div className="lg:w-80 flex-shrink-0 p-10 flex flex-col justify-center"
                style={{ background: "linear-gradient(145deg,#dc2626,#b91c1c)" }}>
                <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <h3 className="text-white font-black text-[22px] leading-tight mb-2">Service Area</h3>
                <p className="text-red-100/70 text-[13px] leading-relaxed">
                  Fremont & Bay Area — 50-mile radius coverage, 24/7.
                </p>
                <div className="mt-6 pt-6 border-t border-white/15">
                  <div className="text-white font-black text-[32px] leading-none">50mi</div>
                  <div className="text-red-200/60 text-[11px] font-semibold uppercase tracking-wider mt-1">Coverage Radius</div>
                </div>
              </div>

              {/* Right cities panel */}
              <div className="flex-1 p-10">
                <h4 className="text-gray-900 font-black text-[20px] mb-1">Cities We Cover</h4>
                <p className="text-gray-400 text-[14px] mb-6">Not sure if we cover your area? Give us a call and we'll confirm.</p>
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {cities.map(city => (
                    <span key={city}
                      className="px-4 py-2 rounded-full text-[13px] font-semibold text-gray-700 border border-gray-200 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all duration-200 cursor-default">
                      {city}
                    </span>
                  ))}
                  <span className="px-4 py-2 rounded-full text-[13px] font-semibold text-red-600 bg-red-50 border border-red-200">
                    + More →
                  </span>
                </div>
                <a href="tel:+14156347777"
                  className="no-underline inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[13px] text-white transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", boxShadow: "0 6px 24px rgba(220,38,38,0.35)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6z"/>
                  </svg>
                  Confirm Coverage: (415) 634-7777
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/roadside-assistance.png" alt="Roadside"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.45) saturate(0.85)" }}
            onError={(e) => { e.target.style.display = "none"; }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(220,38,38,0.6),rgba(30,58,138,0.55))" }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/70 text-[11px] font-bold tracking-[3px] uppercase">Dispatching Now</span>
          </div>
          <h2 className="text-white font-black tracking-tight mb-4"
            style={{ fontSize: "clamp(32px,4.5vw,54px)", lineHeight: 1.08 }}>
            Need Immediate Help?<br />
            <span style={{ background: "linear-gradient(90deg,#fca5a5,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              We're Ready Right Now.
            </span>
          </h2>
          <p className="text-white/55 text-[16px] mb-10 leading-relaxed">
            Call us — we dispatch a technician to your location within the hour. Available 24/7, no extra charge for nights or weekends.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="tel:+14156347777"
              className="no-underline inline-flex items-center gap-2.5 px-10 py-4 rounded-xl font-black text-[15px] text-red-600 bg-white hover:bg-red-50 transition-all duration-200 hover:-translate-y-0.5"
              style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6z"/>
              </svg>
              Call (415) 634-7777
            </a>
            <Link to="/contacts"
              className="no-underline inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-[14px] text-white hover:bg-white/10 transition-all duration-200"
              style={{ border: "1.5px solid rgba(255,255,255,0.3)" }}>
              Book Online
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
