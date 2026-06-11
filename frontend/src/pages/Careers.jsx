import { Link } from 'react-router-dom';

const openings = [
  { title: "Tire Technician",          dept: "Service",          type: "Full-time", badge: "#dc2626", desc: "Mount, balance, and install tires. Experience with Hunter equipment preferred. We'll train motivated candidates." },
  { title: "Lube & Oil Technician",    dept: "Service",          type: "Full-time", badge: "#f59e0b", desc: "Perform oil changes, fluid checks, and basic vehicle inspections. Great entry-level role with a clear career path." },
  { title: "Service Advisor",          dept: "Customer Service", type: "Full-time", badge: "#3b82f6", desc: "Greet customers, write service orders, and coordinate with technicians. Strong communication skills required." },
  { title: "Assistant Shop Manager",   dept: "Management",       type: "Full-time", badge: "#10b981", desc: "Support daily shop operations, scheduling, and quality control. 2+ years of auto shop experience preferred." },
];

const benefits = [
  { color: "#dc2626", icon: "💰", title: "Competitive Pay",    desc: "Above-market hourly rates with monthly performance bonuses." },
  { color: "#f59e0b", icon: "📚", title: "Paid Training",      desc: "We pay for ASE certification courses, study materials, and exam fees." },
  { color: "#10b981", icon: "🏥", title: "Health Benefits",    desc: "Medical, dental, and vision coverage for all full-time employees." },
  { color: "#3b82f6", icon: "🚀", title: "Career Growth",      desc: "Clear advancement path from technician to senior roles and management." },
  { color: "#8b5cf6", icon: "🛠️", title: "Tools Provided",     desc: "Professional-grade tools and uniforms provided at no cost to you." },
  { color: "#ec4899", icon: "🤝", title: "Great Team Culture", desc: "Family-run shop with a welcoming, supportive environment every day." },
];

export default function Careers() {
  return (
    <main>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-32 pb-20"
        style={{ background: "linear-gradient(135deg,#050d18 0%,#0a1628 50%,#0d1f35 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 inset-x-0 h-0.75" style={{ background: "linear-gradient(90deg,#dc2626,#f87171,#dc2626)" }} />
          <div className="absolute -top-32 -left-32 w-150 h-150 rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(circle,#3b82f6,transparent 70%)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="flex items-center gap-2 text-[12px] mb-8">
            <Link to="/" className="text-slate-400 hover:text-red-400 no-underline transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">Careers</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-[11px] font-bold tracking-[3px] uppercase">4 Open Positions</span>
          </div>
          <h1 className="text-white font-black leading-none tracking-tight mb-5"
            style={{ fontSize: "clamp(44px,6vw,80px)" }}>
            Join Our <span style={{ color: "#dc2626" }}>Team</span>
          </h1>
          <p className="text-slate-300 text-[17px] leading-relaxed max-w-xl">
            We're looking for passionate, skilled people who take pride in their work. Grow your career at one of Fremont's most trusted auto shops.
          </p>
        </div>
      </section>

      {/* ── BENEFITS (LIGHT) ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-14">
            <p className="text-red-600 text-[11px] font-black tracking-[4px] uppercase mb-3">Why Work Here</p>
            <h2 className="text-gray-900 font-black text-4xl tracking-tight">Great Perks, Better People</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(({ color, icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-7 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-sm group-hover:scale-110 transition-transform"
                  style={{ background: `${color}14`, border: `1.5px solid ${color}25` }}>
                  {icon}
                </div>
                <h3 className="text-gray-900 font-bold text-[17px] mb-2">{title}</h3>
                <p className="text-gray-400 text-[13px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN POSITIONS (DARK) ── */}
      <section className="py-20" style={{ background: "#07101c" }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="mb-12">
            <p className="text-red-500 text-[11px] font-black tracking-[4px] uppercase mb-3 flex items-center gap-2">
              <span className="w-8 h-px bg-red-600" />Now Hiring
            </p>
            <h2 className="text-white font-black text-4xl tracking-tight">Open Positions</h2>
          </div>
          <div className="space-y-4">
            {openings.map(({ title, dept, type, badge, desc }) => (
              <div key={title} className="rounded-2xl p-7 flex flex-col sm:flex-row sm:items-center gap-6 hover:-translate-y-0.5 transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white font-black text-lg"
                  style={{ background: badge }}>
                  {title[0]}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-white font-bold text-[17px]">{title}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/5 text-slate-400">{dept}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                      style={{ background: `${badge}20`, color: badge }}>{type}</span>
                  </div>
                  <p className="text-slate-500 text-[13px] leading-relaxed">{desc}</p>
                </div>
                <a href="mailto:careers@tireoil.com"
                  className="shrink-0 no-underline px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-[12px] font-bold rounded-xl transition-colors text-center">
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ background: "linear-gradient(135deg,#b91c1c,#dc2626)" }}>
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h2 className="text-white font-black text-4xl mb-4 tracking-tight">Don't See Your Role?</h2>
          <p className="text-red-100 text-[16px] mb-10 max-w-lg mx-auto">
            Send us your resume and we'll keep it on file. We're always growing and new roles come up often.
          </p>
          <a href="mailto:careers@tireoil.com"
            className="no-underline px-9 py-4 bg-white text-red-600 font-black text-[14px] rounded-xl hover:bg-red-50 transition-colors shadow-lg inline-flex items-center gap-2">
            Send Your Resume
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </section>

    </main>
  );
}
