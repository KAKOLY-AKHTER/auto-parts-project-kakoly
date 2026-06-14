import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0d1117] relative overflow-hidden">

      {/* subtle bg glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/3 rounded-full blur-[100px]" />
      </div>

      {/* ── TOP CTA STRIP ── */}
      <div className="border-b border-slate-800/60 relative z-10">
        <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-600/15 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" className="w-4 h-4">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
            </div>
            <div>
              <p className="text-white text-[13px] font-bold leading-none">Need help? Call us today</p>
              <p className="text-slate-200 text-[11px] mt-0.5">(415) 634-7777 — Available 24/7</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-100 text-[12px] hidden md:block">Same-day tire &amp; oil service available</span>
            <Link
              to="/contacts"
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-[11px] font-black tracking-[1.5px] uppercase rounded transition-colors duration-200 no-underline"
              style={{ boxShadow: "0 4px 16px rgba(220,38,38,0.25)" }}
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>

      {/* ── MAIN COLUMNS ── */}
      <div className="max-w-7xl mx-auto px-5 py-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="relative inline-block mb-1">
              <div className="absolute inset-0 bg-linear-to-r from-red-500/20 via-amber-400/20 to-red-500/20 rounded-full blur-3xl scale-150" />
              <img
                src="/tire-oil-removebg-preview.png"
                alt="TireOil"
                className="h-28 md:h-32 object-contain relative z-10"
                style={{ filter: "brightness(1.9) contrast(1.2) saturate(1.15) drop-shadow(0 0 16px rgba(255,255,255,0.65)) drop-shadow(0 2px 24px rgba(220,38,38,0.7))" }}
              />
            </div>
            <p className="text-slate-200 text-[13px] leading-relaxed mb-4">
              Fremont's trusted tire &amp; oil service since 1998. ASE-certified techs, same-day service, and prices you can count on.
            </p>
            <div className="flex items-center gap-2">
              {[
                "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
                "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
              ].map((d, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800/60 hover:bg-red-600 text-slate-400 hover:text-white transition-all duration-300 hover:scale-110">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d={d} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            {
              title: "Information",
              links: [
                { label: "Our Company",  to: "/about" },
                { label: "Contact Us",   to: "/contacts" },
                { label: "Our Services", to: "/services" },
                { label: "Why Us?",      to: "/why-us" },
                { label: "Careers",      to: "/careers" },
              ],
            },
            {
              title: "Quick Links",
              links: [
                { label: "About",   to: "/about" },
                { label: "Blog",    to: "/blog" },
                { label: "Shop",    to: "/shop" },
                { label: "Cart",    to: "/cart" },
                { label: "Contact", to: "/contacts" },
              ],
            },
            {
              title: "Support",
              links: [
                { label: "Blog",           to: "/blog" },
                { label: "Contact",        to: "/contacts" },
                { label: "FAQ",            to: "/faq" },
                { label: "Return Policy",   to: "/return-policy" },
                { label: "Privacy Policy",  to: "/privacy-policy" },
                { label: "Terms of Service",to: "/terms" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white text-[11px] font-black uppercase tracking-[2px] mb-5 relative pb-3 pt-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-red-600">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to}
                      className="text-slate-100 text-[13px] hover:text-white transition-all duration-300 inline-flex items-center gap-2.5 group no-underline">
                      <span className="w-1 h-1 bg-red-500 rounded-full group-hover:bg-red-400 transition-colors duration-300" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Store Info */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-white text-[11px] font-black uppercase tracking-[2px] mb-5 relative pb-3 pt-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-red-600">
              Store Info
            </h4>
            <div className="space-y-4">

              {[
                {
                  icon: <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>,
                  circle: <circle cx="12" cy="10" r="3"/>,
                  text: "2005 Stokes Isle Ap. 896, Fremont, CA 94538",
                },
                {
                  icon: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>,
                  circle: null,
                  text: "(415) 634-7777",
                },
                {
                  icon: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>,
                  circle: <polyline points="22,6 12,13 2,6"/>,
                  text: "support@tireoil.com",
                },
              ].map(({ icon, circle, text }, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="w-7 h-7 rounded-full bg-slate-800/60 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-red-600/20 transition-colors duration-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" className="w-3.5 h-3.5">
                      {icon}{circle}
                    </svg>
                  </div>
                  <p className="text-slate-100 text-[13px] leading-relaxed pt-0.5">{text}</p>
                </div>
              ))}

              {/* Hours */}
              <div className="mt-5 pt-4 border-t border-slate-800/60">
                <p className="text-[10px] font-black tracking-[2px] uppercase text-red-600 mb-2">Hours</p>
                <div className="space-y-1">
                  {[
                    ["Mon – Fri", "7:00 am – 7:00 pm"],
                    ["Saturday",  "7:00 am – 6:00 pm"],
                    ["Sunday",    "9:00 am – 5:00 pm"],
                  ].map(([day, hrs]) => (
                    <div key={day} className="flex justify-between text-[12px]">
                      <span className="text-slate-200">{day}</span>
                      <span className="text-white font-semibold">{hrs}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-slate-800/50 relative z-10">
        <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-slate-200 text-[12px]">
            © 2026 <span className="text-white font-bold">TireOil</span>. All rights reserved.
          </p>

          {/* Trust badges */}
          <div className="flex items-center gap-4">
            {["ASE Certified", "Price Match", "Same-Day Service"].map((badge) => (
              <div key={badge} className="flex items-center gap-1.5 text-[11px] text-white font-medium">
                <svg viewBox="0 0 24 24" className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
