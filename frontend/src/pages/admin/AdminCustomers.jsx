import { useState, useEffect } from "react";
import API from "../../config";
import { fmtDate } from "./AdminOverview";

export default function AdminCustomers({ token }) {
  const [customers, setCustomers] = useState([]);
  const [orders,    setOrders]    = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [search,    setSearch]    = useState("");
  const [expanded,  setExpanded]  = useState(null);

  const headers = { Authorization:`Bearer ${token}`, "Content-Type":"application/json" };

  useEffect(() => {
    Promise.all([
      fetch(`${API}/users`,  { headers }).then(r=>r.json()).catch(()=>[]),
      fetch(`${API}/orders`, { headers }).then(r=>r.json()).catch(()=>[]),
    ]).then(([u, o]) => {
      setCustomers(Array.isArray(u) ? u : []);
      setOrders(Array.isArray(o) ? o : []);
    }).finally(() => setLoading(false));
  }, []);

  const getCustomerOrders = (email) => orders.filter(o => o.userEmail?.toLowerCase() === email?.toLowerCase());
  const getRevenue = (email) => getCustomerOrders(email).filter(o=>o.status!=="cancelled").reduce((s,o)=>s+(o.total||0),0);

  const filtered = customers.filter(c =>
    !search ||
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = orders.filter(o=>o.status!=="cancelled").reduce((s,o)=>s+(o.total||0),0);

  return (
    <div>
      {/* Summary */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:10, marginBottom:22 }}>
        {[
          { label:"Total Customers", value:customers.length, color:"#fff" },
          { label:"With Orders",     value:customers.filter(c=>getCustomerOrders(c.email).length>0).length, color:"#22c55e" },
          { label:"No Orders Yet",   value:customers.filter(c=>getCustomerOrders(c.email).length===0).length, color:"rgba(255,255,255,0.65)" },
          { label:"Total Revenue",   value:`$${totalRevenue.toFixed(0)}`, color:"#e30613" },
        ].map(s=>(
          <div key={s.label} style={{ background:"#1c1933", border:"1px solid rgba(255,255,255,0.13)", borderRadius:10, padding:"12px 16px", textAlign:"center" }}>
            <div style={{ color:s.color, fontSize:s.label.includes("Revenue")?18:24, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>{s.value}</div>
            <div style={{ color:"rgba(255,255,255,0.65)", fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", fontFamily:"'Oswald',sans-serif", marginTop:2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ position:"relative", marginBottom:18 }}>
        <i className="fas fa-search" style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.3)", fontSize:13, pointerEvents:"none" }} />
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or email…"
          style={{ width:"100%", background:"rgba(255,255,255,0.09)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:9, outline:"none", color:"#fff", fontSize:13, fontFamily:"'Inter',sans-serif", padding:"10px 12px 10px 36px", boxSizing:"border-box" }} />
      </div>

      {/* List */}
      {loading ? (
        <div style={{ padding:40, textAlign:"center", color:"rgba(255,255,255,0.3)" }}><i className="fas fa-spinner fa-spin" style={{ fontSize:22 }} /></div>
      ) : filtered.length===0 ? (
        <div style={{ padding:40, textAlign:"center", color:"rgba(255,255,255,0.5)", fontFamily:"'Oswald',sans-serif", fontSize:16 }}>No customers found</div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {filtered.map(c => {
            const cOrders  = getCustomerOrders(c.email);
            const revenue  = getRevenue(c.email);
            const isOpen   = expanded === c._id;
            return (
              <div key={c._id} style={{ background:"#1c1933", border:"1px solid rgba(255,255,255,0.13)", borderRadius:12, overflow:"hidden" }}>
                {/* Row */}
                <div style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 18px", cursor:"pointer" }}
                  onClick={()=>setExpanded(isOpen?null:c._id)}>
                  <div style={{ width:40, height:40, borderRadius:"50%", background:"rgba(227,6,19,0.1)", border:"1px solid rgba(227,6,19,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <i className="fas fa-user" style={{ color:"#e30613", fontSize:14 }} />
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ color:"#fff", fontSize:14, fontWeight:600 }}>{c.name}</div>
                    <div style={{ color:"rgba(255,255,255,0.65)", fontSize:12 }}>{c.email}</div>
                  </div>
                  <div style={{ display:"flex", gap:20, flexShrink:0, alignItems:"center" }}>
                    <div style={{ textAlign:"center" }}>
                      <div style={{ color:"#fff", fontSize:16, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>{cOrders.length}</div>
                      <div style={{ color:"rgba(255,255,255,0.55)", fontSize:10, textTransform:"uppercase" }}>Orders</div>
                    </div>
                    <div style={{ textAlign:"center" }}>
                      <div style={{ color:"#e30613", fontSize:16, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>${revenue.toFixed(0)}</div>
                      <div style={{ color:"rgba(255,255,255,0.55)", fontSize:10, textTransform:"uppercase" }}>Spent</div>
                    </div>
                    <div style={{ color:"rgba(255,255,255,0.5)", fontSize:10, textAlign:"right" }}>
                      <div>Joined</div>
                      <div>{fmtDate(c.createdAt)}</div>
                    </div>
                  </div>
                  <i className={`fas fa-chevron-${isOpen?"up":"down"}`} style={{ color:"rgba(255,255,255,0.5)", fontSize:11, marginLeft:8 }} />
                </div>

                {/* Expanded — order history */}
                {isOpen && (
                  <div style={{ padding:"0 18px 18px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ marginTop:14, fontFamily:"'Oswald',sans-serif", fontWeight:600, fontSize:12, color:"rgba(255,255,255,0.65)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:10 }}>Order History</div>
                    {cOrders.length === 0 ? (
                      <div style={{ color:"rgba(255,255,255,0.5)", fontSize:13 }}>No orders yet</div>
                    ) : (
                      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                        {cOrders.map(o => (
                          <div key={o._id} style={{ display:"flex", alignItems:"center", gap:14, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:8, padding:"10px 14px" }}>
                            <span style={{ color:"rgba(255,255,255,0.3)", fontSize:11, fontFamily:"'Oswald',sans-serif" }}>#{o._id?.slice(-8).toUpperCase()}</span>
                            <span style={{ color:"rgba(255,255,255,0.55)", fontSize:12, flex:1 }}>{o.items?.length||0} item{o.items?.length!==1?"s":""}</span>
                            <span style={{ color:"#e30613", fontSize:13, fontWeight:700 }}>${(o.total||0).toFixed(2)}</span>
                            <span style={{ background: o.status==="delivered"?"rgba(34,197,94,0.12)":o.status==="cancelled"?"rgba(239,68,68,0.1)":"rgba(234,179,8,0.1)", border:`1px solid ${o.status==="delivered"?"rgba(34,197,94,0.3)":o.status==="cancelled"?"rgba(239,68,68,0.25)":"rgba(234,179,8,0.3)"}`, color:o.status==="delivered"?"#22c55e":o.status==="cancelled"?"#f87171":"#eab308", borderRadius:99, padding:"2px 9px", fontSize:11, fontWeight:700, fontFamily:"'Oswald',sans-serif", textTransform:"capitalize" }}>{o.status}</span>
                            <span style={{ color:"rgba(255,255,255,0.5)", fontSize:11 }}>{fmtDate(o.createdAt)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div style={{ marginTop:12, display:"flex", gap:8 }}>
                      <a href={`mailto:${c.email}`} style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(59,130,246,0.1)", border:"1px solid rgba(59,130,246,0.25)", borderRadius:7, padding:"7px 14px", color:"#60a5fa", fontSize:12, fontWeight:600, fontFamily:"'Oswald',sans-serif", textDecoration:"none", letterSpacing:"0.05em" }}>
                        <i className="fas fa-envelope" /> Email Customer
                      </a>
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
