import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#05080f] border-t border-slate-800/50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/3 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 py-6 md:py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="relative inline-block mb-0">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-amber-400/20 to-red-500/20 rounded-full blur-3xl scale-150" />
              <img src="/logo.png" alt="AutoParts" className="h-28 md:h-32 object-contain relative z-10"
                style={{ filter: "drop-shadow(0 0 30px rgba(220,38,38,0.3)) drop-shadow(0 0 60px rgba(245,158,11,0.15))" }}
              />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed -mt-2 mb-2">
              Lukas is the best parts shop for your car accessories. What kind of parts do you need you can get here.
            </p>
            <div className="flex items-center gap-2 mb-2">
              {[
                { path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                { path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
                { path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
              ].map((icon, i) => (
                <a key={i} href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/60 hover:bg-red-600 text-slate-400 hover:text-white transition-all duration-300 hover:scale-110">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d={icon.path} /></svg>
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Information", links: ["Our company", "Contact us", "Our services", "Why We?", "Careers"] },
            { title: "Quicklink", links: ["About", "Blog", "Shop", "Cart", "Contact"] },
            { title: "Support", links: ["Blog", "Contact", "Return Policy", "Online Support", "Money Back"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white text-sm font-bold uppercase tracking-[2px] mb-4 relative pb-3 pt-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[2px] after:bg-red-600">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-500 text-sm hover:text-white transition-all duration-300 inline-flex items-center gap-2.5 group">
                      <span className="w-[3px] h-[3px] bg-slate-600 rounded-full group-hover:bg-white transition-colors duration-300" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-[2px] mb-4 relative pb-3 pt-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[2px] after:bg-red-600">Store Info</h4>
            <div className="text-slate-500 text-sm leading-relaxed space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="w-7 h-7 rounded-full bg-slate-800/60 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-red-600/20 transition-colors duration-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" className="w-3.5 h-3.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <p className="pt-0.5">2005 Stokes Isle Ap. 896, Washington 10010, USA</p>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="w-7 h-7 rounded-full bg-slate-800/60 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-red-600/20 transition-colors duration-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" className="w-3.5 h-3.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <a href="https://example.com" className="pt-0.5 hover:text-white transition-colors duration-300">https://example.com</a>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="w-7 h-7 rounded-full bg-slate-800/60 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-red-600/20 transition-colors duration-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" className="w-3.5 h-3.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                </div>
                <p className="pt-0.5">(+68) 120034509</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800/50 relative z-10">
        <div className="max-w-7xl mx-auto px-5 py-6 flex flex-col md:flex-row items-center justify-between justify-center gap-4">
          <p className="text-slate-600 text-sm">© 2026 24hrfremonttireservice. All Rights Reserved by Nexvia.com.</p>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
