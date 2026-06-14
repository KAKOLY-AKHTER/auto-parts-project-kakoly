import { useState } from "react";

const NAV = [
  { key:"overview",  icon:"fa-chart-line",    label:"Overview"       },
  { key:"bookings",  icon:"fa-calendar-check",label:"Bookings"       },
  { key:"contacts",  icon:"fa-message",       label:"Quote Requests" },
  { key:"orders",    icon:"fa-box",           label:"Orders"         },
  { key:"products",  icon:"fa-tags",          label:"Products"       },
  { key:"customers", icon:"fa-users",         label:"Customers"      },
];

export default function AdminLayout({ active, setActive, user, onLogout, children }) {
  const [collapsed,  setCollapsed]  = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", background:"#100e22" }}>

      {/* Logo */}
      <div style={{ padding: collapsed ? "22px 0" : "22px 20px", display:"flex", alignItems:"center", gap:12, borderBottom:"1px solid rgba(255,255,255,0.1)", justifyContent: collapsed?"center":"flex-start", background:"#0c0a1c" }}>
        <div style={{ width:38, height:38, borderRadius:10, background:"linear-gradient(135deg,#e30613,#bf040f)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 4px 16px rgba(227,6,19,0.4)" }}>
          <i className="fas fa-wrench" style={{ color:"#fff", fontSize:16 }} />
        </div>
        {!collapsed && (
          <div>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:15, color:"#fff", letterSpacing:"0.08em", textTransform:"uppercase", lineHeight:1 }}>Fremont Auto</div>
            <div style={{ color:"rgba(255,255,255,0.5)", fontSize:11, marginTop:3, fontFamily:"'Inter',sans-serif" }}>Admin Panel</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex:1, padding:"16px 10px", overflowY:"auto" }}>
        {!collapsed && <div style={{ color:"rgba(255,255,255,0.3)", fontSize:10, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.12em", textTransform:"uppercase", padding:"0 8px 10px", marginBottom:4 }}>Main Menu</div>}
        {NAV.map(n => {
          const isActive = active === n.key;
          return (
            <button key={n.key} onClick={() => { setActive(n.key); setMobileOpen(false); }}
              style={{
                width:"100%", display:"flex", alignItems:"center", gap:12,
                padding: collapsed ? "13px 0" : "12px 14px",
                justifyContent: collapsed ? "center" : "flex-start",
                borderRadius:10, border:"none", cursor:"pointer", marginBottom:4,
                background: isActive ? "rgba(227,6,19,0.2)" : "transparent",
                boxShadow: isActive ? "inset 3px 0 0 #e30613" : "inset 3px 0 0 transparent",
                transition:"all 0.18s",
              }}
              onMouseEnter={e => { if(!isActive) e.currentTarget.style.background="rgba(255,255,255,0.06)"; }}
              onMouseLeave={e => { if(!isActive) e.currentTarget.style.background="transparent"; }}
              title={collapsed ? n.label : undefined}
            >
              <i className={`fas ${n.icon}`} style={{ fontSize:16, color: isActive ? "#e30613" : "rgba(255,255,255,0.65)", flexShrink:0, width:18, textAlign:"center" }} />
              {!collapsed && (
                <span style={{ fontFamily:"'Oswald',sans-serif", fontWeight:600, fontSize:14, color: isActive ? "#fff" : "rgba(255,255,255,0.75)", letterSpacing:"0.05em", textTransform:"uppercase" }}>
                  {n.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User + logout */}
      <div style={{ padding: collapsed ? "14px 10px" : "14px 16px", borderTop:"1px solid rgba(255,255,255,0.1)", background:"#0c0a1c" }}>
        {!collapsed && (
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12, background:"rgba(255,255,255,0.05)", borderRadius:10, padding:"10px 12px" }}>
            <div style={{ width:34, height:34, borderRadius:"50%", background:"rgba(227,6,19,0.25)", border:"2px solid rgba(227,6,19,0.5)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <i className="fas fa-user" style={{ color:"#e30613", fontSize:13 }} />
            </div>
            <div style={{ minWidth:0 }}>
              <div style={{ color:"#fff", fontSize:13, fontWeight:700, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.name || "Admin"}</div>
              <div style={{ color:"rgba(255,255,255,0.45)", fontSize:11, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.email}</div>
            </div>
          </div>
        )}
        <button onClick={onLogout}
          style={{ width:"100%", display:"flex", alignItems:"center", justifyContent: collapsed?"center":"flex-start", gap:8, background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:9, padding: collapsed?"11px 0":"10px 14px", color:"#f87171", fontSize:13, fontFamily:"'Oswald',sans-serif", fontWeight:700, letterSpacing:"0.07em", cursor:"pointer", transition:"all 0.18s", textTransform:"uppercase" }}
          onMouseEnter={e=>{ e.currentTarget.style.background="rgba(239,68,68,0.2)"; e.currentTarget.style.borderColor="rgba(239,68,68,0.5)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.background="rgba(239,68,68,0.12)"; e.currentTarget.style.borderColor="rgba(239,68,68,0.3)"; }}>
          <i className="fas fa-right-from-bracket" style={{ fontSize:14 }} />
          {!collapsed && "Logout"}
        </button>
      </div>
    </div>
  );

  const sidebarW = collapsed ? 64 : 240;

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#13112a", fontFamily:"'Inter',sans-serif" }}>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)}
          style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:40 }} />
      )}

      {/* Sidebar — desktop */}
      <div style={{
        width:sidebarW, minHeight:"100vh", background:"#100e22",
        borderRight:"1px solid rgba(255,255,255,0.1)", flexShrink:0,
        transition:"width 0.22s ease", position:"sticky", top:0, alignSelf:"flex-start",
        display:"flex", flexDirection:"column", overflow:"hidden",
      }}
        className="hidden lg:flex"
      >
        <SidebarContent />
        <button onClick={() => setCollapsed(c=>!c)}
          style={{ position:"absolute", top:26, right:-13, width:26, height:26, borderRadius:"50%", background:"#1e1a38", border:"1.5px solid rgba(255,255,255,0.2)", color:"rgba(255,255,255,0.7)", fontSize:10, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", zIndex:10 }}>
          <i className={`fas fa-chevron-${collapsed?"right":"left"}`} />
        </button>
      </div>

      {/* Sidebar — mobile drawer */}
      <div style={{
        position:"fixed", top:0, left:0, bottom:0, width:260,
        background:"#100e22", borderRight:"1px solid rgba(255,255,255,0.1)",
        zIndex:50, transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
        transition:"transform 0.25s cubic-bezier(0.22,1,0.36,1)",
        display:"flex", flexDirection:"column",
      }}>
        <SidebarContent />
      </div>

      {/* Main content */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>

        {/* Top bar */}
        <div style={{ height:64, background:"#100e22", borderBottom:"1px solid rgba(255,255,255,0.1)", display:"flex", alignItems:"center", paddingLeft:24, paddingRight:24, gap:16, position:"sticky", top:0, zIndex:30, boxShadow:"0 2px 20px rgba(0,0,0,0.3)" }}>
          <button className="lg:hidden" onClick={() => setMobileOpen(true)}
            style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", color:"#fff", fontSize:16, cursor:"pointer", padding:"8px 10px", borderRadius:8 }}>
            <i className="fas fa-bars" />
          </button>

          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:4, height:22, background:"#e30613", borderRadius:4 }} />
            <div style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:19, color:"#fff", letterSpacing:"0.06em", textTransform:"uppercase" }}>
              {NAV.find(n=>n.key===active)?.label || "Dashboard"}
            </div>
          </div>

          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ color:"rgba(255,255,255,0.45)", fontSize:12, fontFamily:"'Inter',sans-serif" }}>
              {new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}
            </span>
            <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(34,197,94,0.12)", border:"1px solid rgba(34,197,94,0.35)", borderRadius:99, padding:"6px 14px" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:"#22c55e", boxShadow:"0 0 8px #22c55e" }} />
              <span style={{ color:"#22c55e", fontSize:12, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.07em" }}>LIVE</span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="admin-page-content" style={{ flex:1, padding:"32px 28px", overflowY:"auto", background:"#13112a" }}>
          {children}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-page-content { padding: 16px 14px !important; }
        }
      `}</style>
    </div>
  );
}
