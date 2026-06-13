import { useState, useEffect } from "react";
import API from "../../config";
import { StatusBadge, fmtDate } from "./AdminOverview";

export default function AdminContacts({ token }) {
  const [contacts, setContacts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState("all");
  const [search,   setSearch]   = useState("");
  const [expanded, setExpanded] = useState(null);
  const [marking,  setMarking]  = useState(null);

  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  useEffect(() => {
    fetch(`${API}/contacts`, { headers })
      .then(r => r.json()).then(d => setContacts(Array.isArray(d) ? d : []))
      .catch(()=>{}).finally(()=>setLoading(false));
  }, []);

  const markRead = async (id) => {
    setMarking(id);
    try {
      const res = await fetch(`${API}/contacts/${id}/read`, { method:"PATCH", headers });
      if (res.ok) setContacts(prev => prev.map(c => c._id===id ? {...c, read:true} : c));
    } finally { setMarking(null); }
  };

  const markAllRead = async () => {
    const unread = contacts.filter(c=>!c.read);
    for (const c of unread) {
      await fetch(`${API}/contacts/${c._id}/read`, { method:"PATCH", headers }).catch(()=>{});
    }
    setContacts(prev => prev.map(c => ({...c, read:true})));
  };

  const filtered = contacts
    .filter(c => {
      if (filter === "unread") return !c.read;
      if (filter === "read")   return c.read;
      return true;
    })
    .filter(c => {
      const q = search.toLowerCase();
      return !q || c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q) || c.phone?.includes(q) || c.subject?.toLowerCase().includes(q);
    })
    .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

  const unreadCount = contacts.filter(c=>!c.read).length;

  return (
    <div>
      {/* Header actions */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22, flexWrap:"wrap" }}>
        <div style={{ display:"flex", gap:10, flex:1, flexWrap:"wrap", alignItems:"center" }}>
          <div style={{ position:"relative", flex:"1 1 220px" }}>
            <i className="fas fa-search" style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.3)", fontSize:13, pointerEvents:"none" }} />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, email, subject…"
              style={{ width:"100%", background:"rgba(255,255,255,0.09)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:9, outline:"none", color:"#fff", fontSize:13, fontFamily:"'Inter',sans-serif", padding:"9px 12px 9px 34px", boxSizing:"border-box" }} />
          </div>
          <div style={{ display:"flex", gap:6 }}>
            {["all","unread","read"].map(f => (
              <button key={f} onClick={()=>setFilter(f)}
                style={{ padding:"7px 14px", borderRadius:99, border:`1px solid ${filter===f?"#e30613":"rgba(255,255,255,0.1)"}`, background:filter===f?"rgba(227,6,19,0.14)":"transparent", color:filter===f?"#fff":"rgba(255,255,255,0.5)", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Oswald',sans-serif", textTransform:"capitalize", letterSpacing:"0.05em" }}>
                {f}{f==="unread" && unreadCount>0 && <span style={{ marginLeft:5, background:"#e30613", borderRadius:99, padding:"1px 6px", color:"#fff", fontSize:10 }}>{unreadCount}</span>}
              </button>
            ))}
          </div>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead}
            style={{ background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.3)", color:"#22c55e", borderRadius:9, padding:"8px 16px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Oswald',sans-serif", letterSpacing:"0.05em", display:"flex", alignItems:"center", gap:7, whiteSpace:"nowrap" }}>
            <i className="fas fa-check-double" style={{ fontSize:11 }} /> Mark All Read
          </button>
        )}
      </div>

      {/* Cards */}
      {loading ? (
        <div style={{ padding:40, textAlign:"center", color:"rgba(255,255,255,0.3)" }}><i className="fas fa-spinner fa-spin" style={{ fontSize:22 }} /></div>
      ) : filtered.length === 0 ? (
        <div style={{ padding:40, textAlign:"center", color:"rgba(255,255,255,0.5)", fontFamily:"'Oswald',sans-serif", fontSize:16 }}>No requests found</div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {filtered.map(c => {
            const isOpen = expanded === c._id;
            return (
              <div key={c._id} style={{ background: c.read?"#1c1933":"rgba(227,6,19,0.04)", border:`1px solid ${c.read?"rgba(255,255,255,0.07)":"rgba(227,6,19,0.2)"}`, borderRadius:12, overflow:"hidden", transition:"all 0.2s" }}>
                {/* Row */}
                <div style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 18px", cursor:"pointer" }}
                  onClick={() => setExpanded(isOpen ? null : c._id)}>
                  <div style={{ width:40, height:40, borderRadius:10, background: c.read?"rgba(255,255,255,0.09)":"rgba(227,6,19,0.12)", border:`1px solid ${c.read?"rgba(255,255,255,0.08)":"rgba(227,6,19,0.3)"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <i className="fas fa-user" style={{ color: c.read?"rgba(255,255,255,0.55)":"#e30613", fontSize:14 }} />
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:2 }}>
                      <span style={{ color:"#fff", fontSize:14, fontWeight:700 }}>{c.name}</span>
                      {!c.read && <div style={{ width:7, height:7, borderRadius:"50%", background:"#e30613", boxShadow:"0 0 5px #e30613" }} />}
                    </div>
                    <div style={{ color:"rgba(255,255,255,0.45)", fontSize:12, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                      {c.subject || c.message?.slice(0,60) || "—"}
                    </div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:5, flexShrink:0 }}>
                    <StatusBadge status={c.read?"read":"unread"} />
                    <span style={{ color:"rgba(255,255,255,0.5)", fontSize:10 }}>{fmtDate(c.createdAt)}</span>
                  </div>
                  <i className={`fas fa-chevron-${isOpen?"up":"down"}`} style={{ color:"rgba(255,255,255,0.5)", fontSize:11, marginLeft:8 }} />
                </div>

                {/* Expanded details */}
                {isOpen && (
                  <div style={{ padding:"0 18px 18px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:12, marginTop:14, marginBottom:14 }}>
                      {[
                        { icon:"fa-envelope", label:"Email",   value:c.email },
                        { icon:"fa-phone",    label:"Phone",   value:c.phone || "—" },
                        { icon:"fa-tag",      label:"Subject", value:c.subject || "—" },
                      ].map(f => (
                        <div key={f.label} style={{ background:"rgba(255,255,255,0.08)", borderRadius:8, padding:"10px 14px" }}>
                          <div style={{ color:"rgba(255,255,255,0.55)", fontSize:10, fontWeight:600, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>
                            <i className={`fas ${f.icon}`} style={{ marginRight:5, fontSize:9 }} />{f.label}
                          </div>
                          <div style={{ color:"#fff", fontSize:13 }}>{f.value}</div>
                        </div>
                      ))}
                    </div>
                    {c.message && (
                      <div style={{ background:"#1c1933", borderLeft:"3px solid rgba(227,6,19,0.5)", borderRadius:"0 8px 8px 0", padding:"12px 16px", marginBottom:14 }}>
                        <div style={{ color:"rgba(255,255,255,0.55)", fontSize:10, fontWeight:600, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:6 }}>Message</div>
                        <p style={{ color:"rgba(255,255,255,0.75)", fontSize:13, lineHeight:1.65, margin:0 }}>{c.message}</p>
                      </div>
                    )}
                    <div style={{ display:"flex", gap:8 }}>
                      {c.phone && (
                        <a href={`tel:${c.phone}`}
                          style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.3)", color:"#22c55e", borderRadius:8, padding:"8px 14px", fontSize:12, fontWeight:700, textDecoration:"none", fontFamily:"'Oswald',sans-serif", letterSpacing:"0.05em" }}>
                          <i className="fas fa-phone" style={{ fontSize:11 }} /> Call Back
                        </a>
                      )}
                      {c.email && (
                        <a href={`mailto:${c.email}`}
                          style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(59,130,246,0.1)", border:"1px solid rgba(59,130,246,0.3)", color:"#60a5fa", borderRadius:8, padding:"8px 14px", fontSize:12, fontWeight:700, textDecoration:"none", fontFamily:"'Oswald',sans-serif", letterSpacing:"0.05em" }}>
                          <i className="fas fa-envelope" style={{ fontSize:11 }} /> Reply Email
                        </a>
                      )}
                      {!c.read && (
                        <button onClick={()=>markRead(c._id)} disabled={marking===c._id}
                          style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.6)", borderRadius:8, padding:"8px 14px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Oswald',sans-serif", letterSpacing:"0.05em" }}>
                          {marking===c._id ? <i className="fas fa-spinner fa-spin" /> : <i className="fas fa-check" style={{ fontSize:11 }} />} Mark Read
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
