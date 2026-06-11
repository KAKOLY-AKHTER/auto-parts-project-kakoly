import { Link } from 'react-router-dom';

const features = [
  { color: "#dc2626", num: "01", title: "ASE-Certified Technicians", desc: "Every tech on our team holds an active ASE certification — tested, trained, and trusted with your vehicle." },
  { color: "#f59e0b", num: "02", title: "Same-Day Service",          desc: "We know your time matters. Most jobs are done in under an hour, often same-day with no prior booking needed." },
  { color: "#10b981", num: "03", title: "Price Match Guarantee",     desc: "Found a lower price locally? We'll match it. You get expert service at the best possible price — guaranteed." },
  { color: "#3b82f6", num: "04", title: "Transparent Pricing",       desc: "Every estimate is detailed and agreed upon before work starts. The quote you get is exactly what you pay." },
  { color: "#8b5cf6", num: "05", title: "12-Month Parts Warranty",   desc: "All labor and parts carry a 12-month / 12,000-mile warranty. We stand behind every service we perform." },
  { color: "#ec4899", num: "06", title: "Open 7 Days a Week",        desc: "Mon–Fri 7am–7pm, Saturday 7am–6pm, Sunday 9am–5pm. We're here when you need us, even weekends." },
];

const testimonials = [
  { name: "Maria S.", role: "Fremont Resident", stars: 5, text: "Best tire shop in the Bay Area. Fast, honest, and priced fairly. I've been coming here for 8 years and never been disappointed." },
  { name: "James T.", role: "Fleet Manager",    stars: 5, text: "We bring all 12 of our company vehicles here. TireOil is the only shop we trust for quick turnaround and quality work." },
  { name: "Aisha K.", role: "Bay Area Driver",  stars: 5, text: "Went in for an oil change and they noticed my brakes were low. Fixed everything same day. Super transparent about the cost." },
];

export default function WhyUs() {
  return (
    <main>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-32 pb-20"
        style={{ background: "linear-gradient(135deg,#050d18 0%,#0a1628 50%,#0d1f35 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 inset-x-0 h-[3px]" style={{ background: "linear-gradient(90deg,#dc2626,#f87171,#dc2626)" }} />
          <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full opacity-[0.08]"
            style={{ background: "radial-gradient(circle,#dc2626,transparent 70%)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="flex items-center gap-2 text-[12px] mb-8">
            <Link to="/" className="text-slate-400 hover:text-red-400 no-underline transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">Why Choose Us</span>
          </div>
          <h1 className="text-white font-black leading-none tracking-tight mb-5"
            style={{ fontSize: "clamp(44px,6vw,80px)" }}>
            Why <span style={{ color: "#dc2626" }}>TireOil?</span>
          </h1>
          <p className="text-slate-300 text-[17px] leading-relaxed max-w-xl">
            We're not just another auto shop. Here's exactly what sets us apart — and why 50,000+ Bay Area drivers trust us.
          </p>
        </div>
      </section>

      {/* ── FEATURES (LIGHT) ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {features.map(({ color, num, title, desc }) => (
              <div key={title}
                className="rounded-2xl p-7 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl transition-all duration-300 group-hover:h-1.5"
                  style={{ background: color }} />
                <span className="text-[11px] font-black tracking-[3px] mb-4 block" style={{ color }}>
                  {num}
                </span>
                <h3 className="text-gray-900 font-bold text-[18px] mb-3">{title}</h3>
                <p className="text-gray-400 text-[13.5px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section className="py-16" style={{ background: "#07101c" }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: "25+",   lbl: "Years Experience",   color: "#dc2626" },
              { val: "50K+",  lbl: "Happy Customers",    color: "#f59e0b" },
              { val: "100K+", lbl: "Services Completed", color: "#10b981" },
              { val: "4.9",   lbl: "Star Rating",        color: "#3b82f6" },
            ].map(({ val, lbl, color }) => (
              <div key={lbl} className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="font-black text-4xl md:text-5xl leading-none mb-2" style={{ color }}>{val}</div>
                <div className="text-slate-500 text-[12px] tracking-wide uppercase font-medium">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS (LIGHT) ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-14">
            <p className="text-red-600 text-[11px] font-black tracking-[4px] uppercase mb-3">What Customers Say</p>
            <h2 className="text-gray-900 font-black text-4xl tracking-tight">Real Reviews from Real Drivers</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, stars, text }) => (
              <div key={name} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <div className="flex gap-0.5 mb-4">
                  {Array(stars).fill(0).map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" fill="#f59e0b" className="w-4 h-4">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-[14px] leading-relaxed mb-5 italic">"{text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-black text-[13px]">
                    {name[0]}
                  </div>
                  <div>
                    <div className="text-gray-900 font-bold text-[13px]">{name}</div>
                    <div className="text-gray-400 text-[11px]">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ background: "linear-gradient(135deg,#b91c1c,#dc2626)" }}>
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h2 className="text-white font-black text-4xl mb-5 tracking-tight">Come Experience the Difference</h2>
          <p className="text-red-100 text-[16px] mb-10">Open 7 days a week. Walk-ins always welcome.</p>
          <Link to="/contacts" className="no-underline px-9 py-4 bg-white text-red-600 font-black text-[14px] rounded-xl hover:bg-red-50 transition-colors shadow-lg">
            Book an Appointment
          </Link>
        </div>
      </section>

    </main>
  );
}
