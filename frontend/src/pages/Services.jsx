import { Link } from 'react-router-dom';

const services = [
  { color: "#dc2626", icon: "🔄", title: "Tire Installation",  price: "From $25/tire",   time: "30–60 min", popular: true,  desc: "Mount, balance & TPMS reset. All major brands: Michelin, Goodyear, Cooper, Bridgestone.",  href: "/tire-service" },
  { color: "#f59e0b", icon: "🛢️",  title: "Oil Change",         price: "From $39.99",     time: "20–30 min", popular: true,  desc: "Conventional, blend, or full synthetic with filter replacement and 21-point inspection.",     href: "/oil-change" },
  { color: "#3b82f6", icon: "⚙️",  title: "Wheel Alignment",    price: "From $79.99",     time: "45–60 min", popular: false, desc: "2-wheel & 4-wheel alignment with Hunter equipment. Improves handling and tire life.",           href: "/wheel-alignment" },
  { color: "#10b981", icon: "↩️",  title: "Tire Rotation",      price: "From $19.99",     time: "20–30 min", popular: false, desc: "Regular rotation extends tire life. Recommended every 5,000–7,500 miles.",                      href: "/tire-service" },
  { color: "#8b5cf6", icon: "🛑",  title: "Brake Service",      price: "From $99/axle",   time: "60–90 min", popular: false, desc: "Pad, rotor & caliper service. Premium OEM-grade parts with 12-month warranty.",                href: "/brake-repair" },
  { color: "#ec4899", icon: "🔋",  title: "Battery Service",    price: "From $129.99",    time: "20–30 min", popular: false, desc: "Battery testing, charging system check & replacement. Free test with any service.",            href: "/battery-replacement" },
  { color: "#06b6d4", icon: "🔩",  title: "Tire Repair",        price: "From $15",        time: "15–20 min", popular: true,  desc: "Plug & patch repairs for most punctures in under 20 minutes. Walk-ins welcome.",              href: "/tire-service" },
  { color: "#84cc16", icon: "✅",  title: "21-Point Inspection", price: "Free w/ service", time: "15–20 min", popular: false, desc: "Comprehensive safety check: tires, brakes, lights, fluids, belts, and hoses.",               href: "/contacts" },
];

export default function Services() {
  return (
    <main>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-36 md:pt-48 lg:pt-52 pb-20"
        style={{ background: "linear-gradient(135deg,#050d18 0%,#0a1628 50%,#0d1f35 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 inset-x-0 h-[3px]" style={{ background: "linear-gradient(90deg,#dc2626,#f87171,#dc2626)" }} />
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.08]"
            style={{ background: "radial-gradient(circle,#dc2626,transparent 70%)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="flex items-center gap-2 text-[12px] mb-8">
            <Link to="/" className="text-slate-400 hover:text-red-400 no-underline transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">Our Services</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-white font-black leading-none tracking-tight mb-5"
              style={{ fontSize: "clamp(44px,6vw,80px)" }}>
              Our <span style={{ color: "#dc2626" }}>Services</span>
            </h1>
            <p className="text-slate-300 text-[17px] leading-relaxed max-w-xl">
              From quick oil changes to full brake overhauls — everything your vehicle needs, done right and fast.
            </p>
          </div>
        </div>
      </section>

      {/* ── QUICK STATS ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-5 py-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { icon: "⚡", text: "Same-day service available" },
              { icon: "💰", text: "Price match guarantee" },
              { icon: "🏆", text: "ASE-certified technicians" },
              { icon: "📋", text: "Transparent pricing, no surprises" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2.5 text-gray-600 text-[13px] font-medium">
                <span className="text-xl">{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID (LIGHT) ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-14">
            <p className="text-red-600 text-[11px] font-black tracking-[4px] uppercase mb-3 flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-red-600" />What We Offer<span className="w-8 h-px bg-red-600" />
            </p>
            <h2 className="text-gray-900 font-black text-4xl md:text-5xl tracking-tight">Everything Your Car Needs</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map(({ color, icon, title, price, time, popular, desc, href }) => (
              <Link key={title} to={href}
                className="no-underline bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group cursor-pointer block"
                style={{ borderColor: 'transparent' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = color}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
                {popular && (
                  <span className="absolute top-4 right-4 bg-red-600 text-white text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full uppercase">Popular</span>
                )}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-sm"
                  style={{ background: `${color}18`, border: `1.5px solid ${color}30` }}>
                  {icon}
                </div>
                <h3 className="text-gray-900 font-bold text-[16px] mb-2">{title}</h3>
                <p className="text-gray-400 text-[12.5px] leading-relaxed mb-5">{desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-red-600 font-black text-[14px]">{price}</div>
                    <div className="text-gray-300 text-[11px] mt-0.5">⏱ {time}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-200"
                    style={{ background: color }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ background: "linear-gradient(135deg,#b91c1c,#dc2626)" }}>
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h2 className="text-white font-black text-4xl mb-4 tracking-tight">Book Your Service Today</h2>
          <p className="text-red-100 text-[16px] mb-10">Most services available same-day. Walk-ins welcome for tire repairs and oil changes.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/contacts" className="no-underline px-9 py-4 bg-white text-red-600 font-black text-[14px] rounded-xl hover:bg-red-50 transition-colors shadow-lg">
              Book an Appointment
            </Link>
            <a href="tel:+681200345009" className="no-underline px-9 py-4 text-white font-bold text-[14px] rounded-xl transition-colors"
              style={{ border: "2px solid rgba(255,255,255,0.4)" }}>
              Call (+68) 120034509
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
