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
      { icon: "fa-circle-dot",     label: "Tire Service & Repair",  href: "/auto-service" },
      { icon: "fa-oil-can",        label: "Oil Change",             href: "/auto-service" },
      { icon: "fa-circle-stop",    label: "Brake Repair",           href: "/auto-service" },
      { icon: "fa-rotate",         label: "Wheel Alignment",        href: "/auto-service" },
      { icon: "fa-battery-half",   label: "Battery Replacement",    href: "/auto-service", dividerBefore: true },
      { icon: "fa-snowflake",      label: "A/C Evaluation",         href: "/auto-service" },
    ],
  },
  {
    label: "Fleet & Mobile", href: "/fleet-services",
    children: [
      { icon: "fa-truck",          label: "Truck Tire Change",              href: "/fleet-services" },
      { icon: "fa-trailer",        label: "Trailer Tire Change",            href: "/fleet-services" },
      { icon: "fa-oil-can",        label: "Oil Change",                     href: "/fleet-services" },
      { icon: "fa-road",           label: "Roadside Assistance",            href: "/fleet-services" },
      { icon: "fa-location-dot",   label: "Mobile Service at Your Location",href: "/fleet-services", dividerBefore: true },
      { icon: "fa-clock",          label: "Available 24/7",                 href: "/fleet-services" },
    ],
  },
  {
    label: "Shop", href: "/shop",
    children: [
      { icon: "fa-store",          label: "All Products", href: "/shop" },
      { icon: "fa-circle-dot",     label: "Tires",        href: "/shop" },
      { icon: "fa-oil-can",        label: "Motor Oil",    href: "/shop" },
      { icon: "fa-circle-stop",    label: "Brake Parts",  href: "/shop", dividerBefore: true },
      { icon: "fa-gears",          label: "Engine Parts", href: "/shop" },
    ],
  },
  {
    label: "About Us", href: "/about",
    children: [
      { icon: "fa-book-open",      label: "Our Story",     href: "/about" },
      { icon: "fa-trophy",         label: "Why Choose Us", href: "/why-us" },
      { icon: "fa-users",          label: "Our Team",      href: "/about" },
    ],
  },
  {
    label: "Blog", href: "/blog",
    children: [
      { icon: "fa-newspaper",      label: "Latest News",       href: "/blog" },
      { icon: "fa-lightbulb",      label: "Tire Tips",         href: "/blog" },
      { icon: "fa-wrench",         label: "Oil & Engine Care", href: "/blog", dividerBefore: true },
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
          fontFamily: "'Oswald',sans-serif",
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
        <div className="dd-panel absolute top-full left-1/2 -translate-x-1/2 translate-y-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto z-999"
          style={{ minWidth: 280, width: "max-content" }}>
          {/* caret */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0 h-0"
            style={{ borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderBottom: "7px solid #e30613" }} />
          <div className="dd-box"
            style={{ background: "rgba(12,10,20,0.6)", backdropFilter: "blur(32px) saturate(1.8)", WebkitBackdropFilter: "blur(32px) saturate(1.8)", border: "1px solid rgba(255,255,255,0.13)", borderTop: "2px solid #e30613", borderRadius: "0 0 14px 14px", boxShadow: "0 28px 64px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.07)", padding: "6px 6px 8px" }}
          >
            {item.children.map((c) => (
              <div key={c.label}>
                {c.dividerBefore && (
                  <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(227,6,19,0.4),transparent)", margin: "5px 6px" }} />
                )}
                <a
                  href={c.href}
                  className="dd-item flex items-center gap-3 px-3 py-2 no-underline rounded-lg"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {/* icon box */}
                  <div className="dd-icon flex items-center justify-center shrink-0"
                    style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(227,6,19,0.1)", border: "1px solid rgba(227,6,19,0.25)", transition: "all 0.2s ease" }}>
                    <i className={`fas ${c.icon || "fa-chevron-right"}`} style={{ color: "#e30613", fontSize: 10 }} />
                  </div>
                  {/* label */}
                  <span className="dd-label" style={{ fontFamily: "'Inter',sans-serif", fontSize: 13.5, fontWeight: 500, color: "rgba(255,255,255,0.88)", letterSpacing: "0.01em", transition: "color 0.18s ease" }}>
                    {c.label}
                  </span>
                  {/* arrow */}
                  <svg className="dd-arrow ml-auto shrink-0 pl-3" style={{ width: 14, height: 14, color: "rgba(227,6,19,0)", transition: "all 0.18s ease" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
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
          border: 1.5px solid rgba(255,255,255,0.13);
          border-radius: 6px;
          margin: 4px 3px;
          transition: background 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease, border-color 0.22s ease;
          cursor: pointer;
          text-decoration: none;
        }
        .hdr-toplink:hover {
          background: rgba(255,255,255,0.06) !important;
          border-color: rgba(255,255,255,0.9) !important;
          box-shadow:
            0 0 0 2px rgba(255,255,255,0.18),
            0 6px 24px rgba(0,0,0,0.4);
          transform: translateY(-2px);
        }
        .hdr-icon-ring {
          border: 2px dashed rgba(255,255,255,0.45) !important;
          transition: border-color 0.22s;
        }
        .hdr-toplink:hover .hdr-icon-ring {
          animation: spinRing 1.3s linear infinite;
          border-color: rgba(255,255,255,0.95) !important;
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

        /* ── HEADER CALL BUTTON ── */
        @keyframes phoneRingHdr {
          0%   { transform: rotate(0deg); }
          15%  { transform: rotate(-20deg) scale(1.14); }
          35%  { transform: rotate(16deg) scale(1.12); }
          55%  { transform: rotate(-10deg) scale(1.06); }
          75%  { transform: rotate(7deg) scale(1.03); }
          90%  { transform: rotate(-3deg); }
          100% { transform: rotate(0deg); }
        }
        .hdr-callbtn {
          display: none; align-items: center; gap: 10px;
          padding: 7px 14px; border-radius: 8px; text-decoration: none;
          border: 1.5px solid #e30613;
          background: transparent;
          transition: background 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          cursor: pointer;
        }
        .hdr-callbtn:hover {
          background: #e30613;
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 8px 28px rgba(227,6,19,0.6), 0 0 0 3px rgba(227,6,19,0.22);
        }
        .hdr-callbtn:active { transform: translateY(0) scale(0.98); }
        .hdr-cb-dot {
          width: 32px; height: 32px; border-radius: 50%;
          background: #e30613; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          transition: background 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
        }
        .hdr-callbtn:hover .hdr-cb-dot {
          background: rgba(255,255,255,0.25);
          transform: scale(1.12);
          box-shadow: 0 0 16px rgba(255,255,255,0.35);
        }
        .hdr-callbtn:hover .hdr-cb-phone { animation: phoneRingHdr 0.52s ease both; }
        .hdr-cb-label { font-size: 9px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; line-height: 1; color: rgba(255,255,255,0.5); transition: color 0.22s ease; }
        .hdr-callbtn:hover .hdr-cb-label { color: rgba(255,255,255,0.9); }
        .hdr-cb-num { font-family: 'Oswald', sans-serif; font-weight: 700; color: #fff; font-size: 15px; line-height: 1.3; letter-spacing: 0.05em; }

        /* ── NAV AUTH + CART BUTTONS ── */
        @keyframes iconBob {
          0%,100% { transform: translateY(0); }
          35%     { transform: translateY(-4px); }
          65%     { transform: translateY(-1.5px); }
        }
        @keyframes cartWobble {
          0%,100% { transform: rotate(0deg) scale(1); }
          20%     { transform: rotate(-15deg) scale(1.12); }
          45%     { transform: rotate(11deg) scale(1.1); }
          65%     { transform: rotate(-6deg); }
          82%     { transform: rotate(4deg); }
        }
        @keyframes badgePop {
          0%,100% { transform: scale(1); }
          50%     { transform: scale(1.45); box-shadow: 0 0 10px rgba(227,6,19,0.8); }
        }
        .nav-login {
          display: none; align-items: center; gap: 6px;
          padding: 8px 16px; border-radius: 6px; text-decoration: none;
          font-family: 'Oswald',sans-serif; font-size: 12px; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.8); border: 1px solid rgba(255,255,255,0.2);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
        }
        .nav-login:hover {
          transform: translateY(-2px) scale(1.05);
          color: #fff; border-color: rgba(255,255,255,0.75);
          background: rgba(255,255,255,0.07);
          box-shadow: 0 6px 20px rgba(255,255,255,0.1), 0 0 0 2px rgba(255,255,255,0.1);
        }
        .nav-login:active  { transform: translateY(0) scale(0.97); }
        .nav-login:hover svg { animation: iconBob 0.5s ease both; }

        .nav-signup {
          display: none; align-items: center; gap: 6px;
          padding: 8px 16px; border-radius: 6px; text-decoration: none;
          font-family: 'Oswald',sans-serif; font-size: 12px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #fff; background: #e30613;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .nav-signup:hover {
          transform: translateY(-2px) scale(1.06);
          background: #f4071a;
          box-shadow: 0 8px 30px rgba(227,6,19,0.65), 0 0 0 3px rgba(227,6,19,0.22);
        }
        .nav-signup:active { transform: translateY(0) scale(0.97); }
        .nav-signup:hover svg { animation: iconBob 0.45s ease both; }

        .nav-cart {
          position: relative; display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 6px; text-decoration: none;
          color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.18);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
        }
        .nav-cart:hover {
          transform: translateY(-2px) scale(1.1);
          color: #fff; border-color: #e30613;
          background: rgba(227,6,19,0.1);
          box-shadow: 0 6px 22px rgba(227,6,19,0.38), 0 0 0 2px rgba(227,6,19,0.15);
        }
        .nav-cart:active { transform: translateY(0) scale(0.97); }
        .nav-cart:hover .nav-cart-icon { animation: cartWobble 0.52s ease both; }
        .nav-cart:hover .nav-cart-badge { animation: badgePop 0.38s ease both; }

        /* show auth/call buttons at correct breakpoints */
        @media (min-width: 640px) {
          .nav-login  { display: inline-flex; }
          .nav-signup { display: inline-flex; }
        }
        @media (min-width: 768px) {
          .hdr-callbtn { display: flex; }
        }

        /* ── DROPDOWN ITEMS ── */
        @keyframes ddItemIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .dd-item {
          position: relative;
          transition: background 0.18s ease, padding-left 0.18s ease;
        }
        .dd-item:hover {
          background: rgba(227,6,19,0.08);
          padding-left: 14px !important;
        }
        .dd-item:hover .dd-label {
          color: #fff !important;
        }
        .dd-item:hover .dd-icon {
          background: rgba(227,6,19,0.22) !important;
          border-color: #e30613 !important;
          box-shadow: 0 0 12px rgba(227,6,19,0.4);
        }
        .dd-item:hover .dd-arrow {
          color: rgba(227,6,19,0.85) !important;
          transform: translateX(2px);
        }
        .dd-panel { transition: opacity 0.2s ease, transform 0.2s cubic-bezier(.22,.68,0,1.15); }

        /* ── TOP SERVICE BAR RESPONSIVE ── */
        .hdr-topbar { scrollbar-width: none; -ms-overflow-style: none; }
        .hdr-topbar::-webkit-scrollbar { display: none; }
        @media (min-width: 768px) and (max-width: 1023px) {
          .hdr-toplink { padding: 6px 10px !important; min-width: max-content; margin: 2px 2px !important; }
          .hdr-icon-circle { width: 36px !important; height: 36px !important; }
          .hdr-icon-ring { inset: 2px !important; }
          .hdr-tb-desc { display: none !important; }
          .hdr-tb-title { font-size: 12px !important; letter-spacing: 0.03em !important; }
          .hdr-tb-red:first-child { font-size: 18px !important; }
          .hdr-tb-red + .hdr-tb-red { font-size: 10px !important; }
        }
      `}</style>

      <div className="hdr-anim fixed top-0 left-0 right-0 z-999">

        {/* ══ TOP SERVICES BAR ══ */}
        <div className="hidden md:flex bg-black border-b-2 border-[#e30613] overflow-x-auto hdr-topbar">
          {topBar.map(({ icon, href, title, titleRed, titleRedSub, desc }, i) => (
            <a
              key={i}
              href={href}
              className="hdr-topitem hdr-toplink flex items-center gap-3 flex-1 px-4 py-2.5 no-underline"
              style={{
                borderRight: i < topBar.length - 1 ? "2px solid rgba(255,255,255,0.28)" : "none",
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
                    <div className="hdr-tb-red" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, fontWeight: 400, color: "#e30613", lineHeight: 1, letterSpacing: "0.05em", transition: "color 0.22s,text-shadow 0.22s" }}>
                      {titleRed}
                    </div>
                    <div className="hdr-tb-red" style={{ fontFamily: "'Oswald',sans-serif", fontSize: 12, fontWeight: 600, color: "#e30613", letterSpacing: "0.08em", lineHeight: 1.2, transition: "color 0.22s" }}>
                      {titleRedSub}
                    </div>
                  </>
                ) : (
                  <div className="hdr-tb-title" style={{ fontFamily: "'Oswald',sans-serif", fontSize: 15, fontWeight: 600, color: "#fff", letterSpacing: "0.06em", lineHeight: 1.2, transition: "color 0.22s" }}>
                    {title}
                  </div>
                )}
                {desc.split("\n").map((line, j) => (
                  <p key={j} className="hdr-tb-desc" style={{ fontSize: 13, color: "rgba(230,230,230,0.92)", lineHeight: 1.45, margin: 0, transition: "color 0.22s" }}>{line}</p>
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
                height: 78,
                width: "auto",
                objectFit: "contain",
                filter: [
                  "brightness(2.4)",
                  "contrast(1.25)",
                  "saturate(1.2)",
                  "drop-shadow(0 0 10px rgba(255,255,255,0.9))",
                  "drop-shadow(0 0 22px rgba(255,255,255,0.55))",
                  "drop-shadow(0 0 30px rgba(220,38,38,0.85))",
                  "drop-shadow(0 4px 18px rgba(220,38,38,0.6))",
                ].join(" "),
              }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <div className="hidden sm:block leading-tight">
              <div className="text-white font-black text-[20px]" style={{ fontFamily: "'Oswald',sans-serif", letterSpacing: "0.04em" }}>
                24hr Fremont Tire
              </div>
              <div className="font-bold text-[12px] tracking-wider" style={{ color: "#e30613" }}>
                Fremont, CA
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
            <a href="tel:+14156347777" className="hdr-callbtn hidden md:flex">
              <div className="hdr-cb-dot">
                <i className="fas fa-phone hdr-cb-phone text-white text-[12px]" />
              </div>
              <div>
                <div className="hdr-cb-label">Call or Text</div>
                <div className="hdr-cb-num">(415) 634-7777</div>
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
                      <div className="font-extrabold text-[14px] text-white" style={{ fontFamily: "'Oswald',sans-serif" }}>
                        {user.displayName || user.email?.split("@")[0]}
                      </div>
                      <div className="text-[11px] break-all" style={{ color: "rgba(255,255,255,0.35)" }}>{user.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border-none text-white font-black text-[12px] tracking-widest uppercase cursor-pointer hover:bg-red-700 transition-colors"
                    style={{ background: "#e30613", fontFamily: "'Oswald',sans-serif" }}
                  >
                    <LogOut size={13} /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <a href="/login" className="nav-login hidden sm:inline-flex">
                  <svg style={{ width:13,height:13,flexShrink:0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                  Log In
                </a>
                <a href="/signup" className="nav-signup hidden sm:inline-flex">
                  <svg style={{ width:13,height:13,flexShrink:0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
                    <line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
                  </svg>
                  Sign Up
                </a>
              </>
            )}

            <a href="/cart" className="nav-cart">
              <ShoppingCart size={16} className="nav-cart-icon" />
              <span className="nav-cart-badge absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-white text-[9px] font-black flex items-center justify-center"
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
                      style={{ fontFamily: "'Oswald',sans-serif", color: "rgba(255,255,255,0.75)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
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
                    style={{ fontFamily: "'Oswald',sans-serif", color: "rgba(255,255,255,0.75)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
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
