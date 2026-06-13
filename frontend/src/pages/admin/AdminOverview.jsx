import { useState, useEffect } from "react";
import API from "../../config";

function StatCard({ icon, label, value, sub, color, loading }) {
  return (
    <div style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${color}22`, borderRadius:14, padding:"20px 22px", display:"flex", alignItems:"center", gap:16 }}>
      <div style={{ width:48, height:48, borderRadius:12, background:`${color}18`, border:`1px solid ${color}35`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        <i className={`fas ${icon}`} style={{ color, fontSize:20 }} />
      </div>
      <div>
        <div style={{ color:"rgba(255,255,255,0.45)", fontSize:11, fontWeight:600, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>{label}</div>
        <div style={{ color:"#fff", fontSize:28, fontWeight:700, fontFamily:"'Oswald',sans-serif", lineHeight:1 }}>
          {loading ? <span style={{ color:"rgba(255,255,255,0.2)" }}>—</span> : value}
        </div>
        {sub && <div style={{ color:"rgba(255,255,255,0.35)", fontSize:11, marginTop:3 }}>{sub}</div>}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending:   { bg:"rgba(234,179,8,0.12)",   border:"rgba(234,179,8,0.35)",   color:"#eab308",  label:"Pending" },
    confirmed: { bg:"rgba(59,130,246,0.12)",  border:"rgba(59,130,246,0.35)",  color:"#60a5fa",  label:"Confirmed" },
    completed: { bg:"rgba(34,197,94,0.12)",   border:"rgba(34,197,94,0.35)",   color:"#22c55e",  label:"Completed" },
    cancelled: { bg:"rgba(239,68,68,0.12)",   border:"rgba(239,68,68,0.35)",   color:"#f87171",  label:"Cancelled" },
    shipped:   { bg:"rgba(139,92,246,0.12)",  border:"rgba(139,92,246,0.35)",  color:"#a78bfa",  label:"Shipped" },
    delivered: { bg:"rgba(34,197,94,0.12)",   border:"rgba(34,197,94,0.35)",   color:"#22c55e",  label:"Delivered" },
    read:      { bg:"rgba(255,255,255,0.05)", border:"rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.4)", label:"Read" },
    unread:    { bg:"rgba(227,6,19,0.12)",    border:"rgba(227,6,19,0.3)",     color:"#e30613",  label:"New" },
  };
  const s = map[status] || map.pending;
  return (
    <span style={{ background:s.bg, border:`1px solid ${s.border}`, color:s.color, borderRadius:99, padding:"3px 10px", fontSize:11, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.05em", whiteSpace:"nowrap" }}>
      {s.label}
    </span>
  );
}

function fmtDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" });
}

export { StatusBadge, fmtDate };

export default function AdminOverview({ token }) {
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [orders,   setOrders]   = useState([]);
  const [loading,  setLoading]  = useState(true);

  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  useEffect(() => {
    Promise.all([
      fetch(`${API}/bookings`,  { headers }).then(r=>r.json()).catch(()=>[]),
      fetch(`${API}/contacts`,  { headers }).then(r=>r.json()).catch(()=>[]),
      fetch(`${API}/orders`,    { headers }).then(r=>r.json()).catch(()=>[]),
    ]).then(([b, c, o]) => {
      setBookings(Array.isArray(b) ? b : []);
      setContacts(Array.isArray(c) ? c : []);
      setOrders(Array.isArray(o)   ? o : []);
    }).finally(() => setLoading(false));
  }, []);

  const pendingBookings = bookings.filter(b => b.status === "pending").length;
  const todayBookings   = bookings.filter(b => {
    const d = new Date(b.createdAt); const now = new Date();
    return d.getDate()===now.getDate() && d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear();
  }).length;
  const unreadContacts  = contacts.filter(c => !c.read).length;
  const totalRevenue    = orders.filter(o=>o.status!=="cancelled").reduce((s,o)=>s+(o.total||0),0);
  const pendingOrders   = orders.filter(o=>o.status==="pending").length;

  // Service popularity
  const svcCount = {};
  bookings.forEach(b => { if (b.service) svcCount[b.service] = (svcCount[b.service]||0)+1; });
  const topServices = Object.entries(svcCount).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const maxSvc = topServices[0]?.[1] || 1;

  // Recent items
  const recentBookings = [...bookings].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,5);
  const recentContacts = [...contacts].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,5);

  return (
    <div>
      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:14, marginBottom:28 }}>
        <StatCard icon="fa-calendar-check" label="Total Bookings"   value={bookings.length}  sub={`${todayBookings} today`}      color="#22c55e"  loading={loading} />
        <StatCard icon="fa-clock"          label="Pending Bookings" value={pendingBookings}   sub="Need confirmation"             color="#eab308"  loading={loading} />
        <StatCard icon="fa-message"        label="New Requests"     value={unreadContacts}    sub={`${contacts.length} total`}    color="#e30613"  loading={loading} />
        <StatCard icon="fa-box"            label="Pending Orders"   value={pendingOrders}     sub={`$${totalRevenue.toFixed(0)} revenue`} color="#3b82f6" loading={loading} />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:28 }}>
        {/* Popular services */}
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, padding:"20px 22px" }}>
          <div style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:14, color:"#fff", letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:18 }}>
            <i className="fas fa-fire" style={{ color:"#e30613", marginRight:8, fontSize:12 }} />Popular Services
          </div>
          {loading ? <div style={{ color:"rgba(255,255,255,0.25)", fontSize:13 }}>Loading…</div> :
            topServices.length === 0 ? <div style={{ color:"rgba(255,255,255,0.25)", fontSize:13 }}>No data yet</div> :
            topServices.map(([svc, count]) => (
              <div key={svc} style={{ marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                  <span style={{ color:"rgba(255,255,255,0.75)", fontSize:12 }}>{svc}</span>
                  <span style={{ color:"#e30613", fontSize:12, fontWeight:700 }}>{count}</span>
                </div>
                <div style={{ height:5, borderRadius:99, background:"rgba(255,255,255,0.06)" }}>
                  <div style={{ height:"100%", borderRadius:99, background:"linear-gradient(90deg,#e30613,#ff4d4d)", width:`${(count/maxSvc)*100}%`, transition:"width 0.6s ease" }} />
                </div>
              </div>
            ))
          }
        </div>

        {/* Booking status breakdown */}
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, padding:"20px 22px" }}>
          <div style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:14, color:"#fff", letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:18 }}>
            <i className="fas fa-chart-pie" style={{ color:"#3b82f6", marginRight:8, fontSize:12 }} />Booking Status
          </div>
          {[
            { status:"pending",   color:"#eab308" },
            { status:"confirmed", color:"#60a5fa" },
            { status:"completed", color:"#22c55e" },
            { status:"cancelled", color:"#f87171" },
          ].map(({ status, color }) => {
            const cnt = bookings.filter(b=>b.status===status).length;
            const pct = bookings.length ? Math.round((cnt/bookings.length)*100) : 0;
            return (
              <div key={status} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                <div style={{ width:10, height:10, borderRadius:"50%", background:color, flexShrink:0 }} />
                <span style={{ color:"rgba(255,255,255,0.6)", fontSize:12, textTransform:"capitalize", flex:1 }}>{status}</span>
                <span style={{ color:"#fff", fontSize:12, fontWeight:700 }}>{cnt}</span>
                <span style={{ color:"rgba(255,255,255,0.3)", fontSize:11 }}>{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent bookings */}
      <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, padding:"20px 22px", marginBottom:18 }}>
        <div style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:14, color:"#fff", letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:16 }}>
          <i className="fas fa-calendar-check" style={{ color:"#22c55e", marginRight:8, fontSize:12 }} />Recent Bookings
        </div>
        {loading ? <div style={{ color:"rgba(255,255,255,0.25)", fontSize:13 }}>Loading…</div> :
          recentBookings.length === 0 ? <div style={{ color:"rgba(255,255,255,0.25)", fontSize:13 }}>No bookings yet</div> :
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr>
                  {["Name","Service","Phone","Date","Status"].map(h => (
                    <th key={h} style={{ color:"rgba(255,255,255,0.35)", fontSize:10, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", padding:"0 12px 10px 0", textAlign:"left", whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(b => (
                  <tr key={b._id} style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding:"10px 12px 10px 0", color:"#fff", fontSize:13 }}>{b.name}</td>
                    <td style={{ padding:"10px 12px 10px 0", color:"rgba(255,255,255,0.65)", fontSize:12 }}>{b.service}</td>
                    <td style={{ padding:"10px 12px 10px 0", color:"rgba(255,255,255,0.65)", fontSize:12 }}>{b.phone}</td>
                    <td style={{ padding:"10px 12px 10px 0", color:"rgba(255,255,255,0.45)", fontSize:12, whiteSpace:"nowrap" }}>{fmtDate(b.createdAt)}</td>
                    <td style={{ padding:"10px 0 10px 0" }}><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </div>

      {/* Recent contacts */}
      <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, padding:"20px 22px" }}>
        <div style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:14, color:"#fff", letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:16 }}>
          <i className="fas fa-message" style={{ color:"#e30613", marginRight:8, fontSize:12 }} />Recent Quote Requests
        </div>
        {loading ? <div style={{ color:"rgba(255,255,255,0.25)", fontSize:13 }}>Loading…</div> :
          recentContacts.length === 0 ? <div style={{ color:"rgba(255,255,255,0.25)", fontSize:13 }}>No requests yet</div> :
          recentContacts.map(c => (
            <div key={c._id} style={{ display:"flex", alignItems:"center", gap:14, padding:"10px 0", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ width:36, height:36, borderRadius:9, background: c.read?"rgba(255,255,255,0.04)":"rgba(227,6,19,0.12)", border:`1px solid ${c.read?"rgba(255,255,255,0.08)":"rgba(227,6,19,0.3)"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <i className="fas fa-user" style={{ color: c.read?"rgba(255,255,255,0.3)":"#e30613", fontSize:13 }} />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ color:"#fff", fontSize:13, fontWeight:600 }}>{c.name}</div>
                <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.subject || c.message?.slice(0,50)}</div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                <StatusBadge status={c.read?"read":"unread"} />
                <span style={{ color:"rgba(255,255,255,0.25)", fontSize:10 }}>{fmtDate(c.createdAt)}</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
