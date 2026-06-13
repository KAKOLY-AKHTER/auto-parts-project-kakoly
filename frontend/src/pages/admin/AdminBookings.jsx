import { useState, useEffect } from "react";
import API from "../../config";
import { StatusBadge, fmtDate } from "./AdminOverview";

const STATUSES = ["pending","confirmed","completed","cancelled"];

export default function AdminBookings({ token }) {
  const [bookings, setBookings] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState("all");
  const [search,   setSearch]   = useState("");
  const [updating, setUpdating] = useState(null);

  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  useEffect(() => {
    fetch(`${API}/bookings`, { headers })
      .then(r => r.json()).then(d => setBookings(Array.isArray(d) ? d : []))
      .catch(() => {}).finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      const res = await fetch(`${API}/bookings/${id}/status`, {
        method:"PATCH", headers,
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setBookings(prev => prev.map(b => b._id === id ? updated : b));
      }
    } finally { setUpdating(null); }
  };

  const filtered = bookings
    .filter(b => filter === "all" || b.status === filter)
    .filter(b => {
      const q = search.toLowerCase();
      return !q || b.name?.toLowerCase().includes(q) || b.phone?.includes(q) || b.service?.toLowerCase().includes(q) || b.email?.toLowerCase().includes(q);
    })
    .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

  const countBy = (s) => bookings.filter(b => b.status === s).length;

  return (
    <div>
      {/* Summary */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:10, marginBottom:22 }}>
        {[
          { label:"Total",     value:bookings.length,  color:"#fff" },
          { label:"Pending",   value:countBy("pending"),   color:"#eab308" },
          { label:"Confirmed", value:countBy("confirmed"), color:"#60a5fa" },
          { label:"Completed", value:countBy("completed"), color:"#22c55e" },
          { label:"Cancelled", value:countBy("cancelled"), color:"#f87171" },
        ].map(s => (
          <div key={s.label} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, padding:"12px 16px", textAlign:"center" }}>
            <div style={{ color:s.color, fontSize:24, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>{s.value}</div>
            <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11, textTransform:"uppercase", letterSpacing:"0.08em", fontFamily:"'Oswald',sans-serif" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters + search */}
      <div style={{ display:"flex", gap:10, marginBottom:18, flexWrap:"wrap", alignItems:"center" }}>
        <div style={{ position:"relative", flex:"1 1 220px" }}>
          <i className="fas fa-search" style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.3)", fontSize:13, pointerEvents:"none" }} />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, phone, service…"
            style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:9, outline:"none", color:"#fff", fontSize:13, fontFamily:"'Inter',sans-serif", padding:"9px 12px 9px 34px", boxSizing:"border-box" }} />
        </div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {["all",...STATUSES].map(f => (
            <button key={f} onClick={()=>setFilter(f)}
              style={{ padding:"7px 14px", borderRadius:99, border:`1px solid ${filter===f?"#e30613":"rgba(255,255,255,0.1)"}`, background:filter===f?"rgba(227,6,19,0.14)":"transparent", color:filter===f?"#fff":"rgba(255,255,255,0.5)", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Oswald',sans-serif", textTransform:"capitalize", letterSpacing:"0.05em" }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, overflow:"hidden" }}>
        {loading ? (
          <div style={{ padding:40, textAlign:"center", color:"rgba(255,255,255,0.3)" }}><i className="fas fa-spinner fa-spin" style={{ fontSize:22 }} /></div>
        ) : filtered.length === 0 ? (
          <div style={{ padding:40, textAlign:"center", color:"rgba(255,255,255,0.25)", fontFamily:"'Oswald',sans-serif", fontSize:16 }}>No bookings found</div>
        ) : (
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:"rgba(255,255,255,0.03)" }}>
                  {["Customer","Service","Phone","Email","Date","Status","Action"].map(h => (
                    <th key={h} style={{ color:"rgba(255,255,255,0.4)", fontSize:10, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", padding:"12px 14px", textAlign:"left", whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b._id} style={{ borderTop:"1px solid rgba(255,255,255,0.05)", transition:"background 0.15s" }}
                    onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.02)"}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <td style={{ padding:"13px 14px" }}>
                      <div style={{ color:"#fff", fontSize:13, fontWeight:600 }}>{b.name}</div>
                    </td>
                    <td style={{ padding:"13px 14px", color:"rgba(255,255,255,0.65)", fontSize:12, maxWidth:160 }}>
                      <div style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.service}</div>
                    </td>
                    <td style={{ padding:"13px 14px", color:"rgba(255,255,255,0.65)", fontSize:12, whiteSpace:"nowrap" }}>
                      <a href={`tel:${b.phone}`} style={{ color:"rgba(255,255,255,0.65)", textDecoration:"none" }}>{b.phone}</a>
                    </td>
                    <td style={{ padding:"13px 14px", color:"rgba(255,255,255,0.45)", fontSize:12, maxWidth:180 }}>
                      <div style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.email}</div>
                    </td>
                    <td style={{ padding:"13px 14px", color:"rgba(255,255,255,0.45)", fontSize:12, whiteSpace:"nowrap" }}>{fmtDate(b.createdAt)}</td>
                    <td style={{ padding:"13px 14px" }}><StatusBadge status={b.status} /></td>
                    <td style={{ padding:"13px 14px" }}>
                      <select value={b.status}
                        onChange={e => updateStatus(b._id, e.target.value)}
                        disabled={updating === b._id}
                        style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:7, color:"#fff", fontSize:11, fontFamily:"'Oswald',sans-serif", padding:"6px 10px", cursor:"pointer", outline:"none" }}>
                        {STATUSES.map(s => <option key={s} value={s} style={{ background:"#1a1828" }}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                      </select>
                      {updating === b._id && <i className="fas fa-spinner fa-spin" style={{ color:"#e30613", fontSize:12, marginLeft:8 }} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
