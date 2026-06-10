import { useState, useEffect, useRef } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ShoppingCart, LogOut } from "lucide-react";

const topBar = [
  { icon: "fa-clock",            href: "/emergency-service", titleRed: "24/7", titleRedSub: "EMERGENCY SERVICE", desc: "Day or Night, We're Here" },
  { icon: "fa-location-dot",     href: "/mobile-service",   title: "WE COME TO YOU",  desc: "Home • Business • Roadside\nFleet Yard • Job Site" },
  { icon: "fa-screwdriver-wrench", href: "/auto-service",   title: "AUTO SERVICE",    desc: "Diagnostics • Brake Service\nTune-Ups & More" },
  { icon: "fa-oil-can",          href: "/oil-change",       title: "OIL CHANGE",      desc: "Full Synthetic • Synthetic Blend\nFilter Replacement" },
  { icon: "fa-shield-halved",    href: "/fast-response",    title: "FAST RESPONSE",   desc: "Reliable Service\nYou Can Count On" },
  { icon: "fa-truck",            href: "/tire-service",     title: "TIRE SERVICE",    desc: "Truck • Trailer • Auto\nNew & Used Tires" },
];

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Auto Service", href: "/auto-service",
    children: [
      { label: "Tire Service & Repair",  href: "/auto-service" },
      { label: "Oil Change",             href: "/auto-service" },
      { label: "Brake Repair",           href: "/auto-service" },
      { label: "Wheel Alignment",        href: "/auto-service" },
      { label: "Battery Replacement",    href: "/auto-service", dividerBefore: true },
      { label: "A/C Evaluation",         href: "/auto-service" },
    ],
  },
  {
    label: "Fleet & Mobile", href: "/fleet-services",
    children: [
      { label: "Truck Tire Change",              href: "/fleet-services" },
      { label: "Trailer Tire Change",            href: "/fleet-services" },
      { label: "Oil Change",                     href: "/fleet-services" },
      { label: "Roadside Assistance",            href: "/fleet-services" },
      { label: "Mobile Service at Your Location",href: "/fleet-services", dividerBefore: true },
      { label: "Available 24/7",                 href: "/fleet-services" },
    ],
  },
  {
    label: "Shop", href: "/shop",
    children: [
      { label: "All Products", href: "/shop" },
      { label: "Tires",        href: "/shop" },
      { label: "Motor Oil",    href: "/shop" },
      { label: "Brake Parts",  href: "/shop", dividerBefore: true },
      { label: "Engine Parts", href: "/shop" },
    ],
  },
  {
    label: "About Us", href: "/about",
    children: [
      { label: "Our Story",     href: "/about" },
      { label: "Why Choose Us", href: "/why-us" },
      { label: "Our Team",      href: "/about" },
    ],
  },
  {
    label: "Blog", href: "/blog",
    children: [
      { label: "Latest News",       href: "/blog" },
      { label: "Tire Tips",         href: "/blog" },
      { label: "Oil & Engine Care", href: "/blog", dividerBefore: true },
    ],
  },
  { label: "Contact", href: "/contacts" },
];

function NavItem({ item, active }) {
  const hasChildren = !!item.children?.length;
  return (
    <div className="relative group">
      <a
        href={item.href || "#"}
        className="relative inline-flex items-center gap-1.25 px-3 py-4.5 text-[13px] font-bold tracking-[0.07em] uppercase no-underline transition-colors duration-150 hover:text-white"
        style={{
          fontFamily: "'Barlow Condensed',sans-serif",
          color: active ? "#e30613" : "rgba(255,255,255,0.82)",
        }}
      >
        {item.label}
        {hasChildren && (
          <svg className="w-2.5 h-2.5 opacity-50 group-hover:opacity-90 transition-transform duration-200 group-hover:rotate-180"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
        {/* active indicator */}
        {active && (
          <span className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-sm"
            style={{ background: "#e30613" }} />
        )}
        {!active && (
          <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-sm scale-x-0 origin-left transition-transform duration-200 group-hover:scale-x-100"
            style={{ background: "#e30613" }} />
        )}
      </a>

      {hasChildren && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 translate-y-1 min-w-52.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-999">
          <div className="absolute -top-1.25 left-1/2 -translate-x-1/2 w-0 h-0"
            style={{ borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderBottom: "6px solid #e30613" }} />
          <div
            className="border border-white/10 border-t-2 border-t-[#e30613] rounded-b-xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
            style={{ background: "rgba(10,10,16,0.97)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
          >
            {item.children.map((c) => (
              <div key={c.label}>
                {c.dividerBefore && <div className="h-px bg-white/10 my-1" />}
                <a
                  href={c.href}
                  className="group/dd flex items-center gap-2 px-3 py-2 text-[12.5px] font-semibold text-white/65 no-underline rounded-lg transition-all duration-150 hover:text-white hover:bg-white/6 hover:pl-4"
                  style={{ fontFamily: "'Barlow',sans-serif" }}
                >
                  <span className="text-[#e30613] text-sm opacity-0 -translate-x-1 group-hover/dd:opacity-100 group-hover/dd:translate-x-0 transition-all duration-150">›</span>
                  {c.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function getDefaultAvatar(user) {
  const name = user?.displayName || user?.email?.split("@")[0] || "User";
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=c00&color=fff&bold=true&size=128`;
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded]     = useState(null);
  const [user, setUser]             = useState(null);
  const [userDdOpen, setUserDdOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const userRef  = useRef(null);
  const activePath = typeof window !== "undefined" ? window.location.pathname : "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    const h = (e) => { if (userRef.current && !userRef.current.contains(e.target)) setUserDdOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const handleLogout = async () => {
    try { await signOut(auth); setUserDdOpen(false); setMobileOpen(false); }
    catch (err) { console.error(err); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;600;700&display=swap');

        @keyframes hdrIn        { from{opacity:0;transform:translateY(-100%)} to{opacity:1;transform:translateY(0)} }
        @keyframes hdrItemDown  { from{opacity:0;transform:translateY(-18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes hdrLogoIn    { from{opacity:0;transform:translateX(-30px) scale(0.92)} to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes hdrNavIn     { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes hdrRightIn   { from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes iconPulse    { 0%,100%{box-shadow:0 0 12px rgba(227,6,19,0.3),inset 0 0 8px rgba(227,6,19,0.1)} 50%{box-shadow:0 0 22px rgba(227,6,19,0.55),inset 0 0 14px rgba(227,6,19,0.2)} }
        @keyframes spinRing     { to { transform: rotate(360deg); } }

        .hdr-anim { animation: hdrIn 0.55s cubic-bezier(.22,.68,0,1.2) both; }

        /* ── TOP BAR ITEM BOX HOVER ── */
        .hdr-toplink {
          position: relative;
          transition: background 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease;
          cursor: pointer;
        }
        .hdr-toplink:hover {
          background: rgba(255,255,255,0.05) !important;
          box-shadow:
            inset 4px  0    0 rgba(255,255,255,0.88),
            inset -4px 0    0 rgba(255,255,255,0.88),
            inset 0    3px  0 rgba(255,255,255,0.88),
            inset 0   -3px  0 rgba(255,255,255,0.88);
          transform: translateY(-2px);
        }
        .hdr-icon-ring {
          border: 2px dashed rgba(227,6,19,0.5) !important;
          transition: border-color 0.22s;
        }
        .hdr-toplink:hover .hdr-icon-ring {
          animation: spinRing 1.3s linear infinite;
          border-color: #e30613 !important;
        }
        .hdr-toplink:hover .hdr-icon-circle {
          box-shadow: 0 0 26px rgba(227,6,19,0.65), inset 0 0 16px rgba(227,6,19,0.25) !important;
          border-color: #ff2030 !important;
          transform: scale(1.08);
          transition: all 0.22s ease;
        }
        .hdr-toplink:hover .hdr-tb-title { color: #fff !important; }
        .hdr-toplink:hover .hdr-tb-red   { color: #ff3040 !important; text-shadow: 0 0 12px rgba(227,6,19,0.6); }
        .hdr-toplink:hover .hdr-tb-desc  { color: rgba(220,220,220,0.9) !important; }
        .hdr-toplink:active { transform: translateY(0); }

        .hdr-topitem { animation: hdrItemDown 0.5s cubic-bezier(.22,.68,0,1.15) both; }
        .hdr-topitem:nth-child(1) { animation-delay: 0.08s; }
        .hdr-topitem:nth-child(2) { animation-delay: 0.16s; }
        .hdr-topitem:nth-child(3) { animation-delay: 0.24s; }
        .hdr-topitem:nth-child(4) { animation-delay: 0.32s; }
        .hdr-topitem:nth-child(5) { animation-delay: 0.40s; }
        .hdr-topitem:nth-child(6) { animation-delay: 0.48s; }

        .hdr-logo  { animation: hdrLogoIn 0.6s cubic-bezier(.22,.68,0,1.2) 0.2s both; }
        .hdr-right { animation: hdrRightIn 0.6s cubic-bezier(.22,.68,0,1.15) 0.3s both; }

        .hdr-navitem { animation: hdrNavIn 0.45s cubic-bezier(.22,.68,0,1.15) both; }
        .hdr-navitem:nth-child(1) { animation-delay: 0.25s; }
        .hdr-navitem:nth-child(2) { animation-delay: 0.32s; }
        .hdr-navitem:nth-child(3) { animation-delay: 0.39s; }
        .hdr-navitem:nth-child(4) { animation-delay: 0.46s; }
        .hdr-navitem:nth-child(5) { animation-delay: 0.53s; }
        .hdr-navitem:nth-child(6) { animation-delay: 0.60s; }
        .hdr-navitem:nth-child(7) { animation-delay: 0.67s; }

        .hdr-icon-circle { animation: iconPulse 2.8s ease-in-out 0.8s infinite; }
      `}</style>

      <div className="hdr-anim fixed top-0 left-0 right-0 z-999">

        {/* ══ TOP SERVICES BAR ══ */}
        <div className="hidden lg:flex bg-black border-b-2 border-[#e30613]">
          {topBar.map(({ icon, href, title, titleRed, titleRedSub, desc }, i) => (
            <a
              key={i}
              href={href}
              className="hdr-topitem hdr-toplink flex items-center gap-3 flex-1 px-4 py-2.5 no-underline"
              style={{
                borderRight: i < topBar.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
            >
              {/* Icon circle */}
              <div
                className="hdr-icon-circle flex items-center justify-center shrink-0 rounded-full"
                style={{
                  width: 54, height: 54,
                  background: "radial-gradient(circle, rgba(227,6,19,0.18) 0%, rgba(0,0,0,0.6) 100%)",
                  border: "2px solid #e30613",
                  boxShadow: "0 0 12px rgba(227,6,19,0.3), inset 0 0 8px rgba(227,6,19,0.1)",
                  position: "relative",
                }}
              >
                <i className={`fas ${icon}`} style={{ color: "#fff", fontSize: 20 }} />
                {/* ring accent */}
                <div className="hdr-icon-ring" style={{
                  position: "absolute", inset: 3, borderRadius: "50%",
                  border: "2px dashed rgba(227,6,19,0.5)",
                  pointerEvents: "none",
                }} />
              </div>

              {/* Text */}
              <div>
                {titleRed ? (
                  <>
                    <div className="hdr-tb-red" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 22, fontWeight: 900, color: "#e30613", lineHeight: 1, transition: "color 0.22s,text-shadow 0.22s" }}>
                      {titleRed}
                    </div>
                    <div className="hdr-tb-red" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 800, color: "#e30613", letterSpacing: "0.06em", lineHeight: 1.2, transition: "color 0.22s" }}>
                      {titleRedSub}
                    </div>
                  </>
                ) : (
                  <div className="hdr-tb-title" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13.5, fontWeight: 900, color: "#e0e0e0", letterSpacing: "0.04em", lineHeight: 1.2, transition: "color 0.22s" }}>
                    {title}
                  </div>
                )}
                {desc.split("\n").map((line, j) => (
                  <p key={j} className="hdr-tb-desc" style={{ fontSize: 11, color: "rgba(190,190,190,0.65)", lineHeight: 1.35, margin: 0, transition: "color 0.22s" }}>{line}</p>
                ))}
              </div>
            </a>
          ))}
        </div>

        {/* ══ MAIN NAVBAR ══ */}
        <div
          className="flex items-center justify-between px-5 md:px-8 transition-all duration-300"
          style={{
            height: scrolled ? 68 : 76,
            background: scrolled ? "rgba(8,8,12,0.98)" : "#0e0e14",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
            boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.6)" : "none",
          }}
        >

          {/* LOGO */}
          <a href="/" className="hdr-logo flex items-center gap-3 no-underline shrink-0">
            <img
              src="/tire-oil-removebg-preview.png"
              alt="24HR Fremont Tire"
              style={{
                height: 62,
                width: "auto",
                objectFit: "contain",
                filter: "brightness(2.0) contrast(1.2) drop-shadow(0 0 14px rgba(255,255,255,0.65)) drop-shadow(0 2px 22px rgba(220,38,38,0.8))",
              }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <div className="hidden sm:block leading-tight">
              <div className="text-white font-black text-[18px]" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
                24hr Fremont Tire
              </div>
              <div className="font-semibold text-[11px] tracking-wider" style={{ color: "#e30613" }}>
                Fremont, CA · Since 1998
              </div>
            </div>
          </a>

          {/* NAV */}
          <nav className="hidden lg:flex items-center">
            {navItems.map((item, idx) => (
              <div key={item.label} className="hdr-navitem" style={{ "--i": idx }}>
                <NavItem item={item} active={activePath === item.href} />
              </div>
            ))}
          </nav>

          {/* RIGHT */}
          <div className="hdr-right flex items-center gap-2">

            {/* Call button */}
            <a
              href="tel:+14156347777"
              className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-lg no-underline border border-[#e30613] hover:bg-[#e30613]/10 transition-colors duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-[#e30613] flex items-center justify-center shrink-0">
                <i className="fas fa-phone text-white text-[12px]" />
              </div>
              <div>
                <div className="text-[9px] font-bold tracking-[2px] uppercase leading-none" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Call or Text
                </div>
                <div className="font-black text-white text-[15px] leading-tight tracking-wide" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
                  (415) 634-7777
                </div>
              </div>
            </a>

            {/* Auth */}
            {user ? (
              <div className="relative" ref={userRef}>
                <img
                  src={user.photoURL || getDefaultAvatar(user)}
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover cursor-pointer border-2 border-[#e30613]/50 hover:border-[#e30613] transition-colors"
                  onClick={() => setUserDdOpen(!userDdOpen)}
                  onError={(e) => { e.target.src = getDefaultAvatar(user); }}
                />
                <div
                  className={`absolute top-[calc(100%+12px)] right-0 w-64 rounded-b-xl p-3 shadow-2xl z-1000 transition-all duration-200 ${userDdOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"}`}
                  style={{ background: "rgba(8,8,14,0.98)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderTop: "2px solid #e30613" }}
                >
                  <div className="flex items-center gap-3 px-2 pb-3 mb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <img
                      src={user.photoURL || getDefaultAvatar(user)} alt="Profile"
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#e30613]/40 shrink-0"
                      onError={(e) => { e.target.src = getDefaultAvatar(user); }}
                    />
                    <div>
                      <div className="font-extrabold text-[14px] text-white" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
                        {user.displayName || user.email?.split("@")[0]}
                      </div>
                      <div className="text-[11px] break-all" style={{ color: "rgba(255,255,255,0.35)" }}>{user.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border-none text-white font-black text-[12px] tracking-widest uppercase cursor-pointer hover:bg-red-700 transition-colors"
                    style={{ background: "#e30613", fontFamily: "'Barlow Condensed',sans-serif" }}
                  >
                    <LogOut size={13} /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <a href="/login"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-[12px] font-bold tracking-wider uppercase text-white/80 no-underline hover:text-white hover:border-white/50 transition-all"
                  style={{ fontFamily: "'Barlow Condensed',sans-serif", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                  Log In
                </a>
                <a href="/signup"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-[12px] font-extrabold tracking-wider uppercase text-white no-underline hover:bg-red-700 transition-colors"
                  style={{ fontFamily: "'Barlow Condensed',sans-serif", background: "#e30613" }}>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
                    <line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
                  </svg>
                  Sign Up
                </a>
              </>
            )}

            <a href="/cart"
              className="relative flex items-center justify-center w-9 h-9 rounded-md no-underline text-white/70 hover:text-white hover:border-[#e30613] transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.18)" }}>
              <ShoppingCart size={16} />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-white text-[9px] font-black flex items-center justify-center"
                style={{ background: "#e30613" }}>0</span>
            </a>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-md text-white/70 hover:text-white hover:border-[#e30613] transition-all cursor-pointer"
              style={{ border: "1px solid rgba(255,255,255,0.18)", background: "transparent" }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ══ MOBILE MENU ══ */}
        {mobileOpen && (
          <div
            className="lg:hidden px-6 pb-5 pt-3 shadow-2xl"
            style={{ background: "rgba(8,8,14,0.98)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            {navItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      className="flex items-center justify-between w-full py-3 text-[13px] font-bold tracking-wider uppercase border-none bg-transparent cursor-pointer hover:text-white transition-colors"
                      style={{ fontFamily: "'Barlow Condensed',sans-serif", color: "rgba(255,255,255,0.75)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                      onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    >
                      {item.label}
                      <svg style={{ width: 11, height: 11, transform: expanded === item.label ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {expanded === item.label && (
                      <div className="pl-4 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                        {item.children.map((c) => (
                          <a key={c.label} href={c.href}
                            className="block py-2 text-[13px] no-underline hover:text-white transition-colors"
                            style={{ color: "rgba(255,255,255,0.5)" }}>
                            {c.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a href={item.href}
                    className="flex py-3 text-[13px] font-bold tracking-wider uppercase no-underline hover:text-white transition-colors"
                    style={{ fontFamily: "'Barlow Condensed',sans-serif", color: "rgba(255,255,255,0.75)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    {item.label}
                  </a>
                )}
              </div>
            ))}
            <div className="flex gap-2 mt-4">
              {user ? (
                <button onClick={handleLogout}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border-none text-white font-black text-[12px] tracking-widest uppercase cursor-pointer hover:bg-red-700 transition-colors"
                  style={{ background: "#e30613" }}>
                  <LogOut size={13} /> Logout
                </button>
              ) : (
                <>
                  <a href="/login" className="flex-1 flex items-center justify-center py-2.5 text-[12px] font-bold tracking-wider uppercase text-white no-underline rounded-lg"
                    style={{ border: "1px solid rgba(255,255,255,0.22)" }}>Log In</a>
                  <a href="/signup" className="flex-1 flex items-center justify-center py-2.5 text-[12px] font-extrabold tracking-wider uppercase text-white no-underline rounded-lg"
                    style={{ background: "#e30613" }}>Sign Up</a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
