import { useState, useEffect } from "react";
import API from "../../config";

const CARD = { background:"#1c1933", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:"22px 24px" };
const SEC_TITLE = { fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:15, color:"#fff", letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:18, display:"flex", alignItems:"center", gap:8 };

function StatCard({ icon, label, value, sub, color, loading }) {
  return (
    <div style={{ ...CARD, borderTop:`3px solid ${color}`, display:"flex", alignItems:"center", gap:18 }}>
      <div style={{ width:52, height:52, borderRadius:14, background:`${color}20`, border:`1.5px solid ${color}50`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        <i className={`fas ${icon}`} style={{ color, fontSize:22 }} />
      </div>
      <div style={{ flex:1 }}>
        <div style={{ color:"rgba(255,255,255,0.65)", fontSize:12, fontWeight:600, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:5 }}>{label}</div>
        <div style={{ color:"#fff", fontSize:32, fontWeight:800, fontFamily:"'Oswald',sans-serif", lineHeight:1 }}>
          {loading ? <span style={{ color:"rgba(255,255,255,0.15)", fontSize:22 }}>Loading…</span> : value}
        </div>
        {sub && <div style={{ color:"rgba(255,255,255,0.45)", fontSize:12, marginTop:4 }}>{sub}</div>}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending:    { bg:"rgba(234,179,8,0.15)",  border:"rgba(234,179,8,0.5)",   color:"#fbbf24", label:"Pending"   },
    confirmed:  { bg:"rgba(59,130,246,0.15)", border:"rgba(59,130,246,0.5)",  color:"#60a5fa", label:"Confirmed" },
    completed:  { bg:"rgba(34,197,94,0.15)",  border:"rgba(34,197,94,0.5)",   color:"#4ade80", label:"Completed" },
    cancelled:  { bg:"rgba(239,68,68,0.15)",  border:"rgba(239,68,68,0.5)",   color:"#f87171", label:"Cancelled" },
    shipped:    { bg:"rgba(139,92,246,0.15)", border:"rgba(139,92,246,0.5)",  color:"#c4b5fd", label:"Shipped"   },
    delivered:  { bg:"rgba(34,197,94,0.15)",  border:"rgba(34,197,94,0.5)",   color:"#4ade80", label:"Delivered" },
    read:       { bg:"rgba(255,255,255,0.07)",border:"rgba(255,255,255,0.2)", color:"rgba(255,255,255,0.6)", label:"Read" },
    unread:     { bg:"rgba(227,6,19,0.15)",   border:"rgba(227,6,19,0.5)",    color:"#ff4d4d", label:"New"       },
    processing: { bg:"rgba(59,130,246,0.15)", border:"rgba(59,130,246,0.5)",  color:"#60a5fa", label:"Processing"},
  };
  const s = map[status] || map.pending;
  return (
    <span style={{ background:s.bg, border:`1px solid ${s.border}`, color:s.color, borderRadius:99, padding:"4px 12px", fontSize:11, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.05em", whiteSpace:"nowrap" }}>
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
      fetch(`${API}/bookings`, { headers }).then(r=>r.json()).catch(()=>[]),
      fetch(`${API}/contacts`, { headers }).then(r=>r.json()).catch(()=>[]),
      fetch(`${API}/orders`,   { headers }).then(r=>r.json()).catch(()=>[]),
    ]).then(([b, c, o]) => {
      setBookings(Array.isArray(b) ? b : []);
      setContacts(Array.isArray(c) ? c : []);
      setOrders(Array.isArray(o)   ? o : []);
    }).finally(() => setLoading(false));
  }, []);

  const pendingBookings = bookings.filter(b => b.status === "pending").length;
  const todayBookings   = bookings.filter(b => {
    const d = new Date(b.createdAt), now = new Date();
    return d.getDate()===now.getDate() && d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear();
  }).length;
  const unreadContacts = contacts.filter(c => !c.read).length;
  const totalRevenue   = orders.filter(o=>o.status!=="cancelled").reduce((s,o)=>s+(o.total||0),0);
  const pendingOrders  = orders.filter(o=>o.status==="pending").length;

  const svcCount = {};
  bookings.forEach(b => { if (b.service) svcCount[b.service] = (svcCount[b.service]||0)+1; });
  const topServices   = Object.entries(svcCount).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const maxSvc        = topServices[0]?.[1] || 1;

  const recentBookings = [...bookings].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,5);
  const recentContacts = [...contacts].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,5);

  const statusColors = { pending:"#fbbf24", confirmed:"#60a5fa", completed:"#4ade80", cancelled:"#f87171" };

  return (
    <div>
      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16, marginBottom:28 }}>
        <StatCard icon="fa-calendar-check" label="Total Bookings"   value={bookings.length}  sub={`${todayBookings} today`}             color="#4ade80" loading={loading} />
        <StatCard icon="fa-clock"          label="Pending Bookings" value={pendingBookings}   sub="Awaiting confirmation"                color="#fbbf24" loading={loading} />
        <StatCard icon="fa-message"        label="New Requests"     value={unreadContacts}    sub={`${contacts.length} total messages`}  color="#e30613" loading={loading} />
        <StatCard icon="fa-dollar-sign"    label="Revenue"          value={`$${totalRevenue.toLocaleString(undefined,{minimumFractionDigits:0,maximumFractionDigits:0})}`} sub={`${pendingOrders} orders pending`} color="#60a5fa" loading={loading} />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(min(280px,100%),1fr))", gap:18, marginBottom:24 }}>

        {/* Popular services */}
        <div style={CARD}>
          <div style={SEC_TITLE}>
            <i className="fas fa-fire" style={{ color:"#e30613", fontSize:14 }} /> Popular Services
          </div>
          {loading ? (
            <div style={{ color:"rgba(255,255,255,0.4)", fontSize:13, textAlign:"center", padding:"20px 0" }}>Loading…</div>
          ) : topServices.length === 0 ? (
            <div style={{ color:"rgba(255,255,255,0.35)", fontSize:13, textAlign:"center", padding:"20px 0" }}>No bookings yet</div>
          ) : topServices.map(([svc, count]) => (
            <div key={svc} style={{ marginBottom:14 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <span style={{ color:"rgba(255,255,255,0.85)", fontSize:13, fontWeight:500 }}>{svc}</span>
                <span style={{ color:"#e30613", fontSize:13, fontWeight:700 }}>{count} bookings</span>
              </div>
              <div style={{ height:6, borderRadius:99, background:"rgba(255,255,255,0.08)" }}>
                <div style={{ height:"100%", borderRadius:99, background:"linear-gradient(90deg,#e30613,#ff6b6b)", width:`${(count/maxSvc)*100}%`, transition:"width 0.6s ease" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Booking status */}
        <div style={CARD}>
          <div style={SEC_TITLE}>
            <i className="fas fa-chart-pie" style={{ color:"#60a5fa", fontSize:14 }} /> Booking Status
          </div>
          {["pending","confirmed","completed","cancelled"].map(status => {
            const cnt = bookings.filter(b=>b.status===status).length;
            const pct = bookings.length ? Math.round((cnt/bookings.length)*100) : 0;
            const col = statusColors[status];
            return (
              <div key={status} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                <div style={{ width:12, height:12, borderRadius:4, background:col, flexShrink:0 }} />
                <span style={{ color:"rgba(255,255,255,0.75)", fontSize:13, textTransform:"capitalize", flex:1, fontWeight:500 }}>{status}</span>
                <span style={{ color:"#fff", fontSize:15, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>{cnt}</span>
                <div style={{ width:60, height:6, borderRadius:99, background:"rgba(255,255,255,0.08)", overflow:"hidden" }}>
                  <div style={{ height:"100%", borderRadius:99, background:col, width:`${pct}%`, transition:"width 0.5s" }} />
                </div>
                <span style={{ color:"rgba(255,255,255,0.4)", fontSize:11, width:32, textAlign:"right" }}>{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent bookings */}
      <div style={{ ...CARD, marginBottom:18 }}>
        <div style={SEC_TITLE}>
          <i className="fas fa-calendar-check" style={{ color:"#4ade80", fontSize:14 }} /> Recent Bookings
        </div>
        {loading ? (
          <div style={{ color:"rgba(255,255,255,0.4)", fontSize:13, textAlign:"center", padding:"16px 0" }}>Loading…</div>
        ) : recentBookings.length === 0 ? (
          <div style={{ color:"rgba(255,255,255,0.35)", fontSize:13, textAlign:"center", padding:"16px 0" }}>No bookings yet</div>
        ) : (
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", minWidth:500 }}>
              <thead>
                <tr style={{ borderBottom:"2px solid rgba(255,255,255,0.08)" }}>
                  {["Name","Service","Phone","Date","Status"].map(h=>(
                    <th key={h} style={{ color:"rgba(255,255,255,0.5)", fontSize:11, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", padding:"0 14px 12px 0", textAlign:"left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(b=>(
                  <tr key={b._id} style={{ borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                    <td style={{ padding:"13px 14px 13px 0", color:"#fff", fontSize:14, fontWeight:600 }}>{b.name}</td>
                    <td style={{ padding:"13px 14px 13px 0", color:"rgba(255,255,255,0.75)", fontSize:13 }}>{b.service}</td>
                    <td style={{ padding:"13px 14px 13px 0", color:"rgba(255,255,255,0.65)", fontSize:13 }}>{b.phone}</td>
                    <td style={{ padding:"13px 14px 13px 0", color:"rgba(255,255,255,0.55)", fontSize:12, whiteSpace:"nowrap" }}>{fmtDate(b.createdAt)}</td>
                    <td style={{ padding:"13px 0 13px 0" }}><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent contacts */}
      <div style={CARD}>
        <div style={SEC_TITLE}>
          <i className="fas fa-message" style={{ color:"#e30613", fontSize:14 }} /> Recent Quote Requests
        </div>
        {loading ? (
          <div style={{ color:"rgba(255,255,255,0.4)", fontSize:13, textAlign:"center", padding:"16px 0" }}>Loading…</div>
        ) : recentContacts.length === 0 ? (
          <div style={{ color:"rgba(255,255,255,0.35)", fontSize:13, textAlign:"center", padding:"16px 0" }}>No requests yet</div>
        ) : recentContacts.map(c=>(
          <div key={c._id} style={{ display:"flex", alignItems:"center", gap:14, padding:"13px 0", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ width:40, height:40, borderRadius:10, background: c.read?"rgba(255,255,255,0.06)":"rgba(227,6,19,0.15)", border:`1.5px solid ${c.read?"rgba(255,255,255,0.1)":"rgba(227,6,19,0.4)"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <i className="fas fa-user" style={{ color: c.read?"rgba(255,255,255,0.4)":"#e30613", fontSize:14 }} />
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ color:"#fff", fontSize:14, fontWeight:600 }}>{c.name}</div>
              <div style={{ color:"rgba(255,255,255,0.5)", fontSize:12, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", marginTop:2 }}>{c.subject || c.message?.slice(0,55)}</div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:5 }}>
              <StatusBadge status={c.read?"read":"unread"} />
              <span style={{ color:"rgba(255,255,255,0.35)", fontSize:11 }}>{fmtDate(c.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
