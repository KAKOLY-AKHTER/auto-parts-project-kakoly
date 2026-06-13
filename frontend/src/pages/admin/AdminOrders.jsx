import { useState, useEffect } from "react";
import API from "../../config";
import { StatusBadge, fmtDate } from "./AdminOverview";

const ORDER_STATUSES = ["pending","processing","shipped","delivered","cancelled"];

export default function AdminOrders({ token }) {
  const [orders,   setOrders]   = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState("all");
  const [search,   setSearch]   = useState("");
  const [expanded, setExpanded] = useState(null);
  const [updating, setUpdating] = useState(null);

  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  useEffect(() => {
    fetch(`${API}/orders`, { headers })
      .then(r => r.json()).then(d => setOrders(Array.isArray(d) ? d : []))
      .catch(()=>{}).finally(()=>setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      const res = await fetch(`${API}/orders/${id}/status`, {
        method:"PATCH", headers, body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setOrders(prev => prev.map(o => o._id===id ? updated : o));
      }
    } finally { setUpdating(null); }
  };

  const filtered = orders
    .filter(o => filter==="all" || o.status===filter)
    .filter(o => {
      const q = search.toLowerCase();
      return !q || o.userName?.toLowerCase().includes(q) || o.userEmail?.toLowerCase().includes(q) || o._id?.includes(q);
    })
    .sort((a,b) => new Date(b.createdAt)-new Date(a.createdAt));

  const totalRevenue = orders.filter(o=>o.status!=="cancelled").reduce((s,o)=>s+(o.total||0),0);
  const countBy = (s) => orders.filter(o=>o.status===s).length;

  return (
    <div>
      {/* Summary */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:10, marginBottom:22 }}>
        {[
          { label:"Total Orders",  value:orders.length,      color:"#fff" },
          { label:"Pending",       value:countBy("pending"),  color:"#eab308" },
          { label:"Shipped",       value:countBy("shipped"),  color:"#a78bfa" },
          { label:"Delivered",     value:countBy("delivered"),color:"#22c55e" },
          { label:"Revenue",       value:`$${totalRevenue.toFixed(0)}`, color:"#e30613" },
        ].map(s => (
          <div key={s.label} style={{ background:"#1c1933", border:"1px solid rgba(255,255,255,0.13)", borderRadius:10, padding:"12px 16px", textAlign:"center" }}>
            <div style={{ color:s.color, fontSize:s.label==="Revenue"?20:24, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>{s.value}</div>
            <div style={{ color:"rgba(255,255,255,0.65)", fontSize:11, textTransform:"uppercase", letterSpacing:"0.08em", fontFamily:"'Oswald',sans-serif" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display:"flex", gap:10, marginBottom:18, flexWrap:"wrap", alignItems:"center" }}>
        <div style={{ position:"relative", flex:"1 1 220px" }}>
          <i className="fas fa-search" style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.3)", fontSize:13, pointerEvents:"none" }} />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search customer, email, order ID…"
            style={{ width:"100%", background:"rgba(255,255,255,0.09)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:9, outline:"none", color:"#fff", fontSize:13, fontFamily:"'Inter',sans-serif", padding:"9px 12px 9px 34px", boxSizing:"border-box" }} />
        </div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {["all",...ORDER_STATUSES].map(f => (
            <button key={f} onClick={()=>setFilter(f)}
              style={{ padding:"7px 14px", borderRadius:99, border:`1px solid ${filter===f?"#e30613":"rgba(255,255,255,0.1)"}`, background:filter===f?"rgba(227,6,19,0.14)":"transparent", color:filter===f?"#fff":"rgba(255,255,255,0.5)", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Oswald',sans-serif", textTransform:"capitalize", letterSpacing:"0.05em" }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Orders list */}
      {loading ? (
        <div style={{ padding:40, textAlign:"center", color:"rgba(255,255,255,0.3)" }}><i className="fas fa-spinner fa-spin" style={{ fontSize:22 }} /></div>
      ) : filtered.length === 0 ? (
        <div style={{ padding:40, textAlign:"center", color:"rgba(255,255,255,0.5)", fontFamily:"'Oswald',sans-serif", fontSize:16 }}>No orders found</div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {filtered.map(o => {
            const isOpen = expanded === o._id;
            const orderId = o._id?.slice(-8).toUpperCase();
            return (
              <div key={o._id} style={{ background:"#1c1933", border:"1px solid rgba(255,255,255,0.13)", borderRadius:12, overflow:"hidden" }}>
                {/* Row */}
                <div style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 18px", cursor:"pointer" }}
                  onClick={() => setExpanded(isOpen?null:o._id)}>
                  <div style={{ width:40, height:40, borderRadius:9, background:"rgba(59,130,246,0.1)", border:"1px solid rgba(59,130,246,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <i className="fas fa-box" style={{ color:"#60a5fa", fontSize:14 }} />
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:2 }}>
                      <span style={{ color:"#fff", fontSize:14, fontWeight:700 }}>{o.userName || "Customer"}</span>
                      <span style={{ color:"rgba(255,255,255,0.3)", fontSize:11, fontFamily:"'Oswald',sans-serif" }}>#{orderId}</span>
                    </div>
                    <div style={{ color:"rgba(255,255,255,0.45)", fontSize:12 }}>
                      {o.items?.length || 0} item{o.items?.length!==1?"s":""} · {o.userEmail}
                    </div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:5, flexShrink:0 }}>
                    <span style={{ color:"#e30613", fontSize:16, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>${(o.total||0).toFixed(2)}</span>
                    <StatusBadge status={o.status} />
                  </div>
                  <span style={{ color:"rgba(255,255,255,0.5)", fontSize:10, marginLeft:8, whiteSpace:"nowrap" }}>{fmtDate(o.createdAt)}</span>
                  <i className={`fas fa-chevron-${isOpen?"up":"down"}`} style={{ color:"rgba(255,255,255,0.5)", fontSize:11 }} />
                </div>

                {/* Expanded */}
                {isOpen && (
                  <div style={{ padding:"0 18px 18px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
                    {/* Items table */}
                    {o.items?.length > 0 && (
                      <div style={{ marginTop:14, marginBottom:14, background:"#1c1933", borderRadius:8, overflow:"hidden" }}>
                        <table style={{ width:"100%", borderCollapse:"collapse" }}>
                          <thead>
                            <tr style={{ background:"#1c1933" }}>
                              {["Product","Qty","Price","Subtotal"].map(h=>(
                                <th key={h} style={{ color:"rgba(255,255,255,0.55)", fontSize:11, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.08em", textTransform:"uppercase", padding:"9px 12px", textAlign:"left" }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {o.items.map((item,i) => (
                              <tr key={i} style={{ borderTop:"1px solid rgba(255,255,255,0.13)" }}>
                                <td style={{ padding:"9px 12px", color:"#fff", fontSize:13 }}>{item.name}</td>
                                <td style={{ padding:"9px 12px", color:"rgba(255,255,255,0.55)", fontSize:13 }}>×{item.qty}</td>
                                <td style={{ padding:"9px 12px", color:"rgba(255,255,255,0.55)", fontSize:13 }}>${(item.price||0).toFixed(2)}</td>
                                <td style={{ padding:"9px 12px", color:"#fff", fontSize:13, fontWeight:600 }}>${((item.price||0)*(item.qty||1)).toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div style={{ textAlign:"right", padding:"10px 12px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
                          <span style={{ color:"rgba(255,255,255,0.5)", fontSize:13, marginRight:10 }}>Total:</span>
                          <span style={{ color:"#e30613", fontSize:18, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>${(o.total||0).toFixed(2)}</span>
                        </div>
                      </div>
                    )}

                    {/* Update status */}
                    <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                      <span style={{ color:"rgba(255,255,255,0.5)", fontSize:12, fontFamily:"'Oswald',sans-serif", fontWeight:600, letterSpacing:"0.07em", textTransform:"uppercase" }}>Update Status:</span>
                      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                        {ORDER_STATUSES.map(s => (
                          <button key={s} onClick={()=>updateStatus(o._id,s)} disabled={o.status===s||updating===o._id}
                            style={{ padding:"6px 12px", borderRadius:7, border:`1px solid ${o.status===s?"rgba(227,6,19,0.5)":"rgba(255,255,255,0.1)"}`, background:o.status===s?"rgba(227,6,19,0.14)":"transparent", color:o.status===s?"#fff":"rgba(255,255,255,0.5)", fontSize:11, fontWeight:600, cursor:o.status===s?"default":"pointer", fontFamily:"'Oswald',sans-serif", textTransform:"capitalize", letterSpacing:"0.05em", transition:"all 0.15s" }}>
                            {s}
                          </button>
                        ))}
                        {updating===o._id && <i className="fas fa-spinner fa-spin" style={{ color:"#e30613", fontSize:14 }} />}
                      </div>
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
