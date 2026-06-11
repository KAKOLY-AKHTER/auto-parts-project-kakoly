import { Link } from 'react-router-dom';

const sections = [
  {
    num: "01", color: "#dc2626", title: "Return Policy",
    items: [
      "Unused and unopened products may be returned within 30 days of purchase with original receipt.",
      "Products must be in their original packaging, undamaged and uninstalled.",
      "Special orders and custom tire sizes are non-returnable once ordered.",
      "Installed tires and parts are not eligible for return but are covered under our warranty.",
    ],
  },
  {
    num: "02", color: "#f59e0b", title: "Refund Policy",
    items: [
      "Approved refunds are processed within 5–7 business days to your original payment method.",
      "Cash purchases are refunded via check or store credit at our discretion.",
      "Shipping charges are non-refundable unless the return is due to our error.",
      "Core charges will be refunded once the core is returned in acceptable condition.",
    ],
  },
  {
    num: "03", color: "#10b981", title: "Money Back Guarantee",
    items: [
      "If you are not 100% satisfied with our service, contact us within 7 days and we will make it right.",
      "We'll re-perform the service at no charge, or issue a full refund — your choice.",
      "This guarantee applies to labor charges. Parts are handled separately under the Return Policy.",
      "To initiate a claim, bring your vehicle and receipt to our shop or call (+68) 120034509.",
    ],
  },
  {
    num: "04", color: "#3b82f6", title: "Warranty Policy",
    items: [
      "All labor carries a 12-month / 12,000-mile warranty from the date of service.",
      "Parts warranties vary by manufacturer — most carry 12 to 24 months of coverage.",
      "Warranty claims require your original service invoice and must be initiated at our Fremont location.",
      "Warranty is void if the vehicle was modified after service or if damage is due to accident or misuse.",
    ],
  },
];

export default function ReturnPolicy() {
  return (
    <main>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-32 pb-20"
        style={{ background: "linear-gradient(135deg,#050d18 0%,#0a1628 50%,#0d1f35 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 inset-x-0 h-0.75" style={{ background: "linear-gradient(90deg,#dc2626,#f87171,#dc2626)" }} />
          <div className="absolute -top-40 right-0 w-150 h-150 rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(circle,#dc2626,transparent 70%)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="flex items-center gap-2 text-[12px] mb-8">
            <Link to="/" className="text-slate-400 hover:text-red-400 no-underline transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">Return Policy</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" }}>
            <svg viewBox="0 0 20 20" fill="#10b981" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span className="text-emerald-400 text-[11px] font-bold tracking-[3px] uppercase">100% Satisfaction Guaranteed</span>
          </div>
          <h1 className="text-white font-black leading-none tracking-tight mb-5"
            style={{ fontSize: "clamp(38px,5vw,70px)" }}>
            Return &amp; Refund <span style={{ color: "#dc2626" }}>Policy</span>
          </h1>
          <p className="text-slate-300 text-[16px] leading-relaxed max-w-xl mb-3">
            We stand behind every service and product. Here's exactly how returns, refunds, and our money-back guarantee work.
          </p>
          <p className="text-slate-600 text-[12px]">Last updated: January 1, 2026</p>
        </div>
      </section>

      {/* ── GUARANTEE CARD ── */}
      <section className="bg-white py-10">
        <div className="max-w-5xl mx-auto px-5">
          <div className="rounded-3xl p-8 flex flex-col sm:flex-row gap-6 items-start"
            style={{ background: "linear-gradient(135deg,#fef2f2,#fff5f5)", border: "2px solid #fecaca" }}>
            <div className="w-14 h-14 rounded-2xl bg-red-600 flex items-center justify-center shrink-0 shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" className="w-7 h-7">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
            </div>
            <div>
              <h3 className="text-gray-900 font-black text-[20px] mb-2">100% Satisfaction Guarantee</h3>
              <p className="text-gray-500 text-[14px] leading-relaxed">
                Not happy with our work? We'll fix it for free <strong>or</strong> give you a full refund — no hassle, no questions asked. Your satisfaction is our #1 priority and we mean it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── POLICY SECTIONS ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid sm:grid-cols-2 gap-6">
            {sections.map(({ num, color, title, items }) => (
              <div key={title} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-[15px] shrink-0"
                    style={{ background: color }}>
                    {num}
                  </span>
                  <h2 className="text-gray-900 font-bold text-[18px]">{title}</h2>
                </div>
                <ul className="space-y-3.5">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-500 text-[13.5px] leading-relaxed">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: `${color}18` }}>
                        <svg viewBox="0 0 12 12" fill={color} className="w-2.5 h-2.5">
                          <path d="M10 3L4.5 8.5 2 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ background: "linear-gradient(135deg,#b91c1c,#dc2626)" }}>
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h2 className="text-white font-black text-4xl mb-4 tracking-tight">Have a Question?</h2>
          <p className="text-red-100 text-[16px] mb-10 max-w-lg mx-auto">
            Contact us directly and we'll resolve your issue the same day.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/contacts" className="no-underline px-9 py-4 bg-white text-red-600 font-black text-[14px] rounded-xl hover:bg-red-50 transition-colors shadow-lg">
              Contact Support
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
