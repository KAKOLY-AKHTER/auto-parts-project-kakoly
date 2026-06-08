import { useState, useEffect, useRef } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { LogOut } from "lucide-react";

const navItems = [
  { label: "Home", children: [
    { label: "Home 1", href: "/" }, { label: "Home 2", href: "/home-2" },
    { label: "Home 3", href: "/home-3" }, { label: "Home 4", href: "/home-4" },
    { label: "Home Elementor", href: "/home-elementor" },
  ]},
  { label: "Catalog", children: [
    { label: "Category", href: "/catalog-category" }, { label: "Brand", href: "/catalog-brand" },
    { label: "Product", href: "/catalog-item" }, { label: "Woo Shop", href: "/shop", dividerBefore: true },
  ]},
  { label: "Features", children: [
    { label: "Shortcodes", href: "/shortcodes" }, { label: "Typography", href: "/typography" },
    { label: "Gallery", href: "/gallery" }, { label: "Service Plus", href: "/service-plus" },
    { label: "Privacy Policy", href: "/privacy-policy", dividerBefore: true },
  ]},
  { label: "About Us", children: [
    { label: "Our Benefits", href: "/our-benefits" }, { label: "Our Team", href: "/our-team" },
  ]},
  { label: "News", children: [
    { label: "Blog Excerpt", href: "/blog-excerpt" },
    { label: "Blog Classic 2 Col", href: "/blog-classic-2-columns" },
    { label: "Blog Classic 3 Col", href: "/blog-classic-3-columns" },
    { label: "Portfolio 2 Col", href: "/blog-portfolio-2-columns", dividerBefore: true },
    { label: "Portfolio 3 Col", href: "/blog-portfolio-3-columns" },
    { label: "Portfolio 4 Col", href: "/blog-portfolio-4-columns" },
    { label: "Chess 2 Col", href: "/blog-chess-2-columns", dividerBefore: true },
    { label: "Chess 4 Col", href: "/blog-chess-4-columns" },
    { label: "Chess 6 Col", href: "/blog-chess-6-columns" },
  ]},
  { label: "Contacts", href: "/contacts" },
];

function NavItem({ item }) {
  const hasChildren = item.children?.length > 0;
  return (
    <div className="relative group">
      <a
        href={item.href || "#"}
        className="relative inline-flex items-center gap-[5px] px-[13px] py-2 font-['Barlow_Condensed'] text-[12px] font-bold tracking-[0.11em] uppercase text-[rgba(190,215,255,0.78)] no-underline rounded-md transition-all duration-200 hover:text-white hover:bg-white/[0.07]"
      >
        {item.label}
        {hasChildren && (
          <svg className="w-[10px] h-[10px] opacity-40 transition-transform duration-200 group-hover:rotate-180 group-hover:opacity-90"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
        {/* underline */}
        <span className="absolute bottom-[5px] left-[13px] right-[13px] h-[1.5px] rounded-sm scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
          style={{ background: "linear-gradient(90deg,#1d4ed8,#dc2626)" }} />
      </a>

      {hasChildren && (
        <div className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 -translate-y-2 min-w-[192px] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-[500]">
          {/* caret */}
          <div className="absolute top-[-5px] left-1/2 -translate-x-1/2 w-0 h-0"
            style={{ borderLeft:"6px solid transparent", borderRight:"6px solid transparent", borderBottom:"6px solid #dc2626" }} />
          <div className="bg-[rgba(6,12,30,0.97)] backdrop-blur-2xl border border-blue-800/20 border-t-[2px] border-t-red-600 rounded-b-xl p-[7px] shadow-[0_20px_56px_rgba(0,0,0,0.65)]">
            {item.children.map((c) => (
              <div key={c.label}>
                {c.dividerBefore && <div className="h-px bg-blue-900/30 my-[5px]" />}
                <a
                  href={c.href}
                  className="group/dd flex items-center gap-2 px-3 py-2 font-['Barlow'] text-[12.5px] font-semibold text-[rgba(170,200,245,0.78)] no-underline rounded-md transition-all duration-150 hover:text-white hover:bg-white/[0.06] hover:pl-4"
                >
                  <span className="text-red-500 text-sm opacity-0 -translate-x-1 group-hover/dd:opacity-100 group-hover/dd:translate-x-0 transition-all duration-150">›</span>
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
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1e40af&color=fff&bold=true&size=128`;
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded]     = useState(null);
  const [user, setUser]             = useState(null);
  const [userDdOpen, setUserDdOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const userRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
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
    catch (e) { console.error(e); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;600;700&display=swap');
        @keyframes headerIn { from{opacity:0;transform:translateY(-100%)} to{opacity:1;transform:translateY(0)} }
        @keyframes mobileIn { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        .anim-header { animation: headerIn 0.7s cubic-bezier(.22,.68,0,1.2) both; }
        .anim-mobile { animation: mobileIn 0.3s cubic-bezier(.22,.68,0,1.2) both; }
      `}</style>

      <div className="anim-header absolute top-0 left-0 right-0 z-[999]">

        {/* ── TOP STRIPE ── */}
        <div className="h-[2.5px]" style={{ background:"linear-gradient(90deg,#1d4ed8 0%,#1d4ed8 42%,#dc2626 58%,#dc2626 100%)" }} />

        {/* ── BAR ── */}
        <div className={`relative grid items-center px-10 transition-all duration-300 ${scrolled ? "h-16 bg-[rgba(6,11,26,0.94)] backdrop-blur-2xl shadow-[0_2px_40px_rgba(0,0,0,0.5)] border-b border-white/[0.07]" : "h-[72px] bg-[rgba(4,8,20,0.2)] backdrop-blur-md border-b border-white/[0.06]"}`}
          style={{ gridTemplateColumns: "auto 1fr auto" }}>

          {/* bottom inner glow */}
          <div className="absolute bottom-0 left-[15%] right-[15%] h-px pointer-events-none"
            style={{ background:"linear-gradient(90deg,transparent,rgba(29,78,216,0.2),transparent)" }} />

          {/* LOGO */}
          <a href="/" className="group flex items-center gap-3 no-underline flex-shrink-0">
            <img
              src="/auto-logo-removebg-preview (1).png"
              alt="AutoParts"
              className="h-[52px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              style={{ filter:"brightness(1.18) contrast(1.06) drop-shadow(0 2px 12px rgba(30,64,175,0.5))" }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <div className="w-px h-[30px] flex-shrink-0" style={{ background:"linear-gradient(to bottom,transparent,rgba(255,255,255,0.15),transparent)" }} />
            <span className="font-['Bebas_Neue'] text-[26px] tracking-[0.16em] uppercase text-[#e8eeff] leading-none whitespace-nowrap">
              AUTO<em className="not-italic text-red-500">PARTS</em>
            </span>
          </a>

          {/* NAV — center */}
          <nav className="hidden lg:flex items-center justify-center gap-[2px]">
            {navItems.map((item) => <NavItem key={item.label} item={item} />)}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-[10px] justify-end">
            {user ? (
              <div className="relative" ref={userRef}>
                <img
                  src={user.photoURL || getDefaultAvatar(user)}
                  alt="Profile"
                  className="w-[38px] h-[38px] rounded-full object-cover border-2 border-blue-700/60 cursor-pointer transition-all duration-200 hover:border-blue-400 hover:shadow-[0_0_16px_rgba(59,130,246,0.45)] hover:scale-105"
                  onClick={() => setUserDdOpen(!userDdOpen)}
                  onError={(e) => { e.target.src = getDefaultAvatar(user); }}
                />
                {/* user dropdown */}
                <div className={`absolute top-[calc(100%+14px)] right-0 w-[268px] bg-[rgba(5,10,25,0.97)] backdrop-blur-2xl border border-blue-800/25 border-t-2 border-t-red-600 rounded-b-xl p-[14px] shadow-[0_24px_60px_rgba(0,0,0,0.7)] z-[1000] transition-all duration-250 ${userDdOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"}`}>
                  <div className="flex items-center gap-3 px-[10px] pb-[15px] border-b border-blue-900/30 mb-3">
                    <img src={user.photoURL || getDefaultAvatar(user)} alt="Profile"
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-700/50 flex-shrink-0"
                      onError={(e) => { e.target.src = getDefaultAvatar(user); }} />
                    <div>
                      <div className="font-['Barlow_Condensed'] text-[15px] font-extrabold tracking-wide text-white">
                        {user.displayName || user.email?.split("@")[0]}
                      </div>
                      <div className="text-[11px] text-[rgba(170,200,245,0.5)] mt-1 break-all">{user.email}</div>
                    </div>
                  </div>
                  <button onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-[11px] px-4 rounded-lg bg-gradient-to-br from-red-600 to-red-800 border-none text-white font-['Barlow_Condensed'] text-[13px] font-extrabold tracking-[0.1em] uppercase cursor-pointer transition-all duration-200 hover:from-red-700 hover:to-red-900 hover:shadow-[0_4px_20px_rgba(220,38,38,0.45)] hover:-translate-y-px">
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <a href="/login"
                  className="hidden sm:inline-flex items-center gap-[7px] px-[18px] py-2 font-['Barlow_Condensed'] text-[13px] font-bold tracking-[0.12em] uppercase text-blue-400 bg-blue-900/[0.06] border border-blue-700/45 rounded-md no-underline transition-all duration-200 hover:text-blue-200 hover:border-blue-500 hover:bg-blue-900/20 hover:shadow-[0_0_18px_rgba(29,78,216,0.25)]">
                  <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  Log In
                </a>
                <a href="/signup"
                  className="hidden sm:inline-flex items-center gap-[7px] px-5 py-2 font-['Barlow_Condensed'] text-[13px] font-extrabold tracking-[0.12em] uppercase text-white bg-gradient-to-br from-red-600 to-red-800 border border-red-500/40 rounded-md no-underline transition-all duration-200 hover:from-red-700 hover:to-red-900 hover:shadow-[0_4px_22px_rgba(220,38,38,0.5)] hover:-translate-y-[2px]">
                  <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
                  </svg>
                  Sign Up
                </a>
              </>
            )}

            {/* mobile toggle */}
            <button
              className="lg:hidden flex items-center justify-center w-[38px] h-[38px] bg-blue-900/[0.07] border border-blue-700/35 rounded-md text-[rgba(190,215,255,0.8)] cursor-pointer transition-all duration-200 hover:text-blue-400 hover:border-blue-500 hover:bg-blue-900/20"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        {mobileOpen && (
          <div className="anim-mobile lg:hidden bg-[rgba(4,8,22,0.97)] backdrop-blur-2xl border-t border-blue-900/20 px-7 pb-6 pt-3 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      className="flex items-center justify-between w-full py-3 font-['Barlow_Condensed'] text-[13px] font-bold tracking-[0.1em] uppercase text-[rgba(190,215,255,0.78)] bg-transparent border-none border-b border-blue-900/20 cursor-pointer transition-colors duration-150 hover:text-blue-400"
                      onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    >
                      {item.label}
                      <svg className="transition-transform duration-200"
                        style={{ width:11, height:11, transform: expanded===item.label?"rotate(180deg)":"none" }}
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>
                    {expanded === item.label && (
                      <div className="pl-4 pb-3 border-b border-blue-900/10">
                        {item.children.map((c) => (
                          <a key={c.label} href={c.href}
                            className="block py-[7px] font-['Barlow'] text-[12px] text-[rgba(150,185,240,0.65)] no-underline transition-colors duration-150 hover:text-blue-400">
                            {c.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a href={item.href}
                    className="flex items-center justify-between w-full py-3 font-['Barlow_Condensed'] text-[13px] font-bold tracking-[0.1em] uppercase text-[rgba(190,215,255,0.78)] border-b border-blue-900/20 no-underline transition-colors duration-150 hover:text-blue-400">
                    {item.label}
                  </a>
                )}
              </div>
            ))}
            {user ? (
              <button onClick={handleLogout}
                className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-br from-red-600 to-red-800 border-none text-white font-['Barlow_Condensed'] text-[13px] font-extrabold tracking-[0.1em] uppercase cursor-pointer">
                <LogOut size={14} /> Logout
              </button>
            ) : (
              <div className="flex gap-[10px] mt-5">
                <a href="/login" className="flex-1 flex items-center justify-center gap-2 py-2 font-['Barlow_Condensed'] text-[13px] font-bold tracking-[0.1em] uppercase text-blue-400 bg-blue-900/[0.06] border border-blue-700/45 rounded-md no-underline">Log In</a>
                <a href="/signup" className="flex-1 flex items-center justify-center gap-2 py-2 font-['Barlow_Condensed'] text-[13px] font-extrabold tracking-[0.1em] uppercase text-white bg-gradient-to-br from-red-600 to-red-800 rounded-md no-underline">Sign Up</a>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}