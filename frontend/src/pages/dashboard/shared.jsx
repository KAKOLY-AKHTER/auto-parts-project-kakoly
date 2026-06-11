export const STATUS_MAP = {
  completed:  { bg:'rgba(34,197,94,0.14)',   color:'#22c55e', label:'Completed'  },
  pending:    { bg:'rgba(234,179,8,0.14)',   color:'#eab308', label:'Pending'    },
  cancelled:  { bg:'rgba(239,68,68,0.14)',  color:'#ef4444', label:'Cancelled'  },
  confirmed:  { bg:'rgba(59,130,246,0.14)', color:'#3b82f6', label:'Confirmed'  },
  processing: { bg:'rgba(168,85,247,0.14)', color:'#a855f7', label:'Processing' },
  shipped:    { bg:'rgba(34,197,94,0.14)',   color:'#22c55e', label:'Shipped'    },
  delivered:  { bg:'rgba(34,197,94,0.14)',   color:'#22c55e', label:'Delivered'  },
  open:       { bg:'rgba(234,179,8,0.14)',   color:'#eab308', label:'Open'       },
  resolved:   { bg:'rgba(34,197,94,0.14)',   color:'#22c55e', label:'Resolved'   },
};

export function Badge({ status }) {
  const s = STATUS_MAP[status] || STATUS_MAP.pending;
  return (
    <span style={{ background:s.bg, color:s.color, border:`1px solid ${s.color}55`, borderRadius:99, padding:'4px 13px', fontSize:11, fontWeight:800, letterSpacing:'0.07em', textTransform:'uppercase', fontFamily:"'Oswald',sans-serif", whiteSpace:'nowrap' }}>
      {s.label}
    </span>
  );
}

export function StatCard({ icon, label, value, sub, color }) {
  return (
    <div style={{ background:'linear-gradient(135deg,#0f0f17 0%,#13131e 100%)', border:`1px solid ${color}28`, borderRadius:16, padding:'22px 20px', boxShadow:`0 4px 20px ${color}0a`, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${color},${color}44)` }} />
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12 }}>
        <div>
          <div style={{ fontSize:32, fontWeight:700, color:'#fff', lineHeight:1, fontFamily:"'Oswald',sans-serif", letterSpacing:'-0.01em' }}>{value}</div>
          <div style={{ fontSize:13, color:'rgba(255,255,255,0.6)', marginTop:6, fontWeight:500 }}>{label}</div>
          {sub && <div style={{ fontSize:11, color, marginTop:4, fontWeight:800, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.06em', textTransform:'uppercase' }}>{sub}</div>}
        </div>
        <div style={{ width:46, height:46, borderRadius:12, background:`${color}14`, border:`1.5px solid ${color}38`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <i className={`fas ${icon}`} style={{ color, fontSize:19 }} />
        </div>
      </div>
    </div>
  );
}

export function SectionTitle({ title, action, sub }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:28, flexWrap:'wrap', gap:12 }}>
      <div>
        <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:36, color:'#fff', letterSpacing:'0.05em', margin:0, lineHeight:1 }}>{title}</h2>
        {sub && <p style={{ color:'rgba(255,255,255,0.45)', fontSize:13, marginTop:6, marginBottom:0 }}>{sub}</p>}
      </div>
      {action && <div style={{ marginTop:4 }}>{action}</div>}
    </div>
  );
}

export function Card({ children, style, accent }) {
  return (
    <div style={{ background:'#0f0f17', border:'1px solid rgba(255,255,255,0.09)', borderRadius:16, boxShadow:'0 4px 24px rgba(0,0,0,0.35)', position:'relative', overflow: accent ? 'hidden' : undefined, ...style }}>
      {accent && <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${accent},${accent}55)` }} />}
      {children}
    </div>
  );
}

export function RedBtn({ children, onClick, style, type = 'button', disabled }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      style={{ display:'inline-flex', alignItems:'center', gap:8, background: disabled ? 'rgba(227,6,19,0.35)' : '#e30613', border:'none', color:'#fff', padding:'10px 22px', borderRadius:9, fontSize:12, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.07em', textTransform:'uppercase', cursor: disabled ? 'not-allowed' : 'pointer', transition:'background 0.15s', ...style }}>
      {children}
    </button>
  );
}

export function GhostBtn({ children, onClick, style }) {
  return (
    <button type="button" onClick={onClick}
      style={{ display:'inline-flex', alignItems:'center', gap:8, background:'transparent', border:'1.5px solid rgba(255,255,255,0.2)', color:'rgba(255,255,255,0.8)', padding:'10px 20px', borderRadius:9, fontSize:12, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.06em', textTransform:'uppercase', cursor:'pointer', transition:'all 0.15s', ...style }}>
      {children}
    </button>
  );
}

export function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom:14 }}>
      {label && <label style={{ display:'block', color:'rgba(255,255,255,0.55)', fontSize:11, fontWeight:700, letterSpacing:'0.09em', textTransform:'uppercase', fontFamily:"'Oswald',sans-serif", marginBottom:6 }}>{label}</label>}
      <input {...props} style={{ width:'100%', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.13)', borderRadius:9, padding:'11px 14px', color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box', fontFamily:"'Inter',sans-serif", ...props.style }} />
    </div>
  );
}

export function Select({ label, children, ...props }) {
  return (
    <div style={{ marginBottom:14 }}>
      {label && <label style={{ display:'block', color:'rgba(255,255,255,0.55)', fontSize:11, fontWeight:700, letterSpacing:'0.09em', textTransform:'uppercase', fontFamily:"'Oswald',sans-serif", marginBottom:6 }}>{label}</label>}
      <select {...props} style={{ width:'100%', background:'#1a1a26', border:'1px solid rgba(255,255,255,0.13)', borderRadius:9, padding:'11px 14px', color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box', fontFamily:"'Inter',sans-serif", cursor:'pointer', ...props.style }}>
        {children}
      </select>
    </div>
  );
}

export function LoadingState({ label = 'Loading…' }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'72px 0', gap:14, flexDirection:'column' }}>
      <i className="fas fa-spinner fa-spin" style={{ fontSize:26, color:'#e30613' }} />
      <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:15, letterSpacing:'0.08em', color:'rgba(255,255,255,0.4)', textTransform:'uppercase' }}>{label}</span>
    </div>
  );
}

export function EmptyState({ icon, title, sub, action }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'72px 24px', textAlign:'center' }}>
      <div style={{ width:76, height:76, borderRadius:20, background:'rgba(227,6,19,0.07)', border:'1.5px solid rgba(227,6,19,0.18)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:22 }}>
        <i className={`fas ${icon}`} style={{ color:'rgba(227,6,19,0.55)', fontSize:30 }} />
      </div>
      <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:22, fontWeight:700, color:'rgba(255,255,255,0.75)', letterSpacing:'0.04em', marginBottom:8 }}>{title}</div>
      {sub && <div style={{ color:'rgba(255,255,255,0.4)', fontSize:14, maxWidth:320, lineHeight:1.65 }}>{sub}</div>}
      {action && <div style={{ marginTop:24 }}>{action}</div>}
    </div>
  );
}
