import { useState } from "react";

const NAV = [
  { key:"overview",  icon:"fa-chart-line",        label:"Overview" },
  { key:"bookings",  icon:"fa-calendar-check",     label:"Bookings" },
  { key:"contacts",  icon:"fa-message",            label:"Quote Requests" },
  { key:"orders",    icon:"fa-box",                label:"Orders" },
  { key:"products",  icon:"fa-tags",               label:"Products" },
  { key:"customers", icon:"fa-users",              label:"Customers" },
];

export default function AdminLayout({ active, setActive, user, onLogout, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      {/* Logo */}
      <div style={{ padding: collapsed ? "20px 0" : "20px 20px", display:"flex", alignItems:"center", gap:12, borderBottom:"1px solid rgba(255,255,255,0.07)", justifyContent: collapsed?"center":"flex-start" }}>
        <div style={{ width:36, height:36, borderRadius:9, background:"#e30613", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <i className="fas fa-wrench" style={{ color:"#fff", fontSize:16 }} />
        </div>
        {!collapsed && (
          <div>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:14, color:"#fff", letterSpacing:"0.07em", textTransform:"uppercase", lineHeight:1 }}>Fremont Auto</div>
            <div style={{ color:"rgba(255,255,255,0.4)", fontSize:10, marginTop:2 }}>Admin Panel</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex:1, padding:"12px 8px", overflowY:"auto" }}>
        {NAV.map(n => {
          const isActive = active === n.key;
          return (
            <button key={n.key} onClick={() => { setActive(n.key); setMobileOpen(false); }}
              style={{
                width:"100%", display:"flex", alignItems:"center", gap:12,
                padding: collapsed ? "12px 0" : "11px 14px",
                justifyContent: collapsed ? "center" : "flex-start",
                borderRadius:10, border:"none", cursor:"pointer", marginBottom:3,
                background: isActive ? "rgba(227,6,19,0.18)" : "transparent",
                borderLeft: isActive ? "3px solid #e30613" : "3px solid transparent",
                transition:"all 0.18s",
              }}
              title={collapsed ? n.label : undefined}
            >
              <i className={`fas ${n.icon}`} style={{ fontSize:15, color: isActive ? "#e30613" : "rgba(255,255,255,0.5)", flexShrink:0 }} />
              {!collapsed && (
                <span style={{ fontFamily:"'Oswald',sans-serif", fontWeight:600, fontSize:13, color: isActive ? "#fff" : "rgba(255,255,255,0.6)", letterSpacing:"0.05em", textTransform:"uppercase" }}>
                  {n.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User + logout */}
      <div style={{ padding: collapsed ? "12px 8px" : "12px 16px", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
        {!collapsed && (
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:"rgba(227,6,19,0.2)", border:"1px solid rgba(227,6,19,0.4)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <i className="fas fa-user" style={{ color:"#e30613", fontSize:12 }} />
            </div>
            <div style={{ minWidth:0 }}>
              <div style={{ color:"#fff", fontSize:12, fontWeight:600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.name || "Admin"}</div>
              <div style={{ color:"rgba(255,255,255,0.35)", fontSize:10, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.email}</div>
            </div>
          </div>
        )}
        <button onClick={onLogout}
          style={{ width:"100%", display:"flex", alignItems:"center", justifyContent: collapsed?"center":"flex-start", gap:8, background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:8, padding: collapsed?"10px 0":"9px 12px", color:"#f87171", fontSize:12, fontFamily:"'Oswald',sans-serif", fontWeight:600, letterSpacing:"0.07em", cursor:"pointer" }}>
          <i className="fas fa-right-from-bracket" style={{ fontSize:13 }} />
          {!collapsed && "LOGOUT"}
        </button>
      </div>
    </div>
  );

  const sidebarW = collapsed ? 64 : 220;

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#07050f", fontFamily:"'Inter',sans-serif" }}>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)}
          style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", zIndex:40 }} />
      )}

      {/* Sidebar — desktop */}
      <div style={{
        width:sidebarW, minHeight:"100vh", background:"rgba(255,255,255,0.03)",
        borderRight:"1px solid rgba(255,255,255,0.07)", flexShrink:0,
        transition:"width 0.22s ease", position:"sticky", top:0, alignSelf:"flex-start",
        display:"flex", flexDirection:"column",
      }}
        className="hidden lg:flex"
      >
        <SidebarContent />
        {/* Collapse toggle */}
        <button onClick={() => setCollapsed(c=>!c)}
          style={{ position:"absolute", top:24, right:-12, width:24, height:24, borderRadius:"50%", background:"#1a1828", border:"1px solid rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.5)", fontSize:10, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <i className={`fas fa-chevron-${collapsed?"right":"left"}`} />
        </button>
      </div>

      {/* Sidebar — mobile drawer */}
      <div style={{
        position:"fixed", top:0, left:0, bottom:0, width:240,
        background:"#0d0b1a", borderRight:"1px solid rgba(255,255,255,0.08)",
        zIndex:50, transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
        transition:"transform 0.25s cubic-bezier(0.22,1,0.36,1)",
        display:"flex", flexDirection:"column",
      }}>
        <SidebarContent />
      </div>

      {/* Main content */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
        {/* Top bar */}
        <div style={{ height:60, background:"rgba(255,255,255,0.03)", borderBottom:"1px solid rgba(255,255,255,0.07)", display:"flex", alignItems:"center", paddingLeft:20, paddingRight:20, gap:14, position:"sticky", top:0, zIndex:30 }}>
          <button className="lg:hidden" onClick={() => setMobileOpen(true)}
            style={{ background:"none", border:"none", color:"rgba(255,255,255,0.6)", fontSize:18, cursor:"pointer", padding:4 }}>
            <i className="fas fa-bars" />
          </button>
          <div style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:17, color:"#fff", letterSpacing:"0.06em", textTransform:"uppercase" }}>
            {NAV.find(n=>n.key===active)?.label || "Dashboard"}
          </div>
          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8, background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.25)", borderRadius:99, padding:"5px 12px" }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:"#22c55e", boxShadow:"0 0 6px #22c55e" }} />
            <span style={{ color:"#22c55e", fontSize:11, fontWeight:600, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.07em" }}>LIVE</span>
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex:1, padding:"28px 24px", overflowY:"auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
