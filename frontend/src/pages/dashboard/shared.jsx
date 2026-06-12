export const STATUS_MAP = {
  completed:  { bg:'rgba(34,197,94,0.15)',   color:'#22c55e', label:'Completed'  },
  pending:    { bg:'rgba(234,179,8,0.15)',   color:'#eab308', label:'Pending'    },
  cancelled:  { bg:'rgba(239,68,68,0.15)',  color:'#ef4444', label:'Cancelled'  },
  confirmed:  { bg:'rgba(59,130,246,0.15)', color:'#3b82f6', label:'Confirmed'  },
  processing: { bg:'rgba(168,85,247,0.15)', color:'#a855f7', label:'Processing' },
  shipped:    { bg:'rgba(34,197,94,0.15)',   color:'#22c55e', label:'Shipped'    },
  delivered:  { bg:'rgba(34,197,94,0.15)',   color:'#22c55e', label:'Delivered'  },
  open:       { bg:'rgba(234,179,8,0.15)',   color:'#eab308', label:'Open'       },
  resolved:   { bg:'rgba(34,197,94,0.15)',   color:'#22c55e', label:'Resolved'   },
};

export function Badge({ status }) {
  const s = STATUS_MAP[status] || STATUS_MAP.pending;
  return (
    <span style={{ background:s.bg, color:s.color, border:`1px solid ${s.color}66`, borderRadius:99, padding:'4px 13px', fontSize:11, fontWeight:800, letterSpacing:'0.07em', textTransform:'uppercase', fontFamily:"'Oswald',sans-serif", whiteSpace:'nowrap' }}>
      {s.label}
    </span>
  );
}

export function StatCard({ icon, label, value, sub, color }) {
  return (
    <div style={{ background:`linear-gradient(145deg,#12121f 0%,#0e0e1a 100%)`, border:`1px solid ${color}40`, borderRadius:16, padding:'22px 20px', boxShadow:`0 4px 28px ${color}18, 0 1px 0 ${color}20 inset`, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${color},${color}55)`, borderRadius:'16px 16px 0 0' }} />
      <div style={{ position:'absolute', bottom:-20, right:-10, width:80, height:80, borderRadius:'50%', background:`${color}08`, pointerEvents:'none' }} />
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12 }}>
        <div>
          <div style={{ fontSize:34, fontWeight:700, color:'#fff', lineHeight:1, fontFamily:"'Oswald',sans-serif", letterSpacing:'-0.01em' }}>{value}</div>
          <div style={{ fontSize:13, color:'rgba(255,255,255,0.65)', marginTop:7, fontWeight:600 }}>{label}</div>
          {sub && <div style={{ fontSize:11, color, marginTop:5, fontWeight:800, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.06em', textTransform:'uppercase', background:`${color}14`, border:`1px solid ${color}30`, borderRadius:99, padding:'2px 10px', display:'inline-block', marginLeft:-2 }}>{sub}</div>}
        </div>
        <div style={{ width:48, height:48, borderRadius:13, background:`${color}18`, border:`1.5px solid ${color}50`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:`0 0 14px ${color}20` }}>
          <i className={`fas ${icon}`} style={{ color, fontSize:20 }} />
        </div>
      </div>
    </div>
  );
}

export function SectionTitle({ title, action, sub }) {
  return (
    <div style={{ marginBottom:28 }}>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
            <div style={{ width:4, height:28, background:'linear-gradient(180deg,#e30613,#e3061388)', borderRadius:4 }} />
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, color:'#fff', letterSpacing:'0.06em', margin:0, lineHeight:1 }}>{title}</h2>
          </div>
          {sub && <p style={{ color:'rgba(255,255,255,0.5)', fontSize:13, margin:'0 0 0 14px' }}>{sub}</p>}
        </div>
        {action && <div style={{ marginTop:4 }}>{action}</div>}
      </div>
      <div style={{ height:1, background:'linear-gradient(90deg,rgba(227,6,19,0.35),rgba(255,255,255,0.05) 40%,transparent)', marginTop:16 }} />
    </div>
  );
}

export function Card({ children, style, accent }) {
  return (
    <div style={{ background:'linear-gradient(145deg,#12121f,#0e0e1a)', border:'1px solid rgba(255,255,255,0.11)', borderRadius:16, boxShadow:'0 6px 32px rgba(0,0,0,0.45)', position:'relative', overflow: accent ? 'hidden' : undefined, ...style }}>
      {accent && <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${accent},${accent}55)`, borderRadius:'16px 16px 0 0' }} />}
      {children}
    </div>
  );
}

export function RedBtn({ children, onClick, style, type = 'button', disabled }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      style={{ display:'inline-flex', alignItems:'center', gap:8, background: disabled ? 'rgba(227,6,19,0.35)' : 'linear-gradient(135deg,#e30613,#c0050f)', border:'none', color:'#fff', padding:'10px 22px', borderRadius:9, fontSize:12, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.07em', textTransform:'uppercase', cursor: disabled ? 'not-allowed' : 'pointer', boxShadow: disabled ? 'none' : '0 4px 14px rgba(227,6,19,0.35)', transition:'all 0.15s', ...style }}>
      {children}
    </button>
  );
}

export function GhostBtn({ children, onClick, style }) {
  return (
    <button type="button" onClick={onClick}
      style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.04)', border:'1.5px solid rgba(255,255,255,0.18)', color:'rgba(255,255,255,0.8)', padding:'10px 20px', borderRadius:9, fontSize:12, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.06em', textTransform:'uppercase', cursor:'pointer', transition:'all 0.15s', ...style }}>
      {children}
    </button>
  );
}

export function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom:14 }}>
      {label && <label style={{ display:'block', color:'rgba(255,255,255,0.65)', fontSize:11, fontWeight:700, letterSpacing:'0.09em', textTransform:'uppercase', fontFamily:"'Oswald',sans-serif", marginBottom:6 }}>{label}</label>}
      <input {...props} style={{ width:'100%', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.18)', borderRadius:9, padding:'11px 14px', color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box', fontFamily:"'Inter',sans-serif", transition:'border-color 0.15s', ...props.style }} />
    </div>
  );
}

export function Select({ label, children, ...props }) {
  return (
    <div style={{ marginBottom:14 }}>
      {label && <label style={{ display:'block', color:'rgba(255,255,255,0.65)', fontSize:11, fontWeight:700, letterSpacing:'0.09em', textTransform:'uppercase', fontFamily:"'Oswald',sans-serif", marginBottom:6 }}>{label}</label>}
      <select {...props} style={{ width:'100%', background:'#1a1a2e', border:'1px solid rgba(255,255,255,0.18)', borderRadius:9, padding:'11px 14px', color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box', fontFamily:"'Inter',sans-serif", cursor:'pointer', ...props.style }}>
        {children}
      </select>
    </div>
  );
}

export function LoadingState({ label = 'Loading…' }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'80px 0', gap:14, flexDirection:'column' }}>
      <div style={{ width:52, height:52, borderRadius:'50%', border:'3px solid rgba(227,6,19,0.2)', borderTopColor:'#e30613', animation:'spin 0.8s linear infinite' }} />
      <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:14, letterSpacing:'0.1em', color:'rgba(255,255,255,0.45)', textTransform:'uppercase' }}>{label}</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export function EmptyState({ icon, title, sub, action }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'72px 24px', textAlign:'center' }}>
      <div style={{ width:80, height:80, borderRadius:22, background:'rgba(227,6,19,0.08)', border:'1.5px solid rgba(227,6,19,0.25)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:22, boxShadow:'0 0 32px rgba(227,6,19,0.1)' }}>
        <i className={`fas ${icon}`} style={{ color:'rgba(227,6,19,0.6)', fontSize:32 }} />
      </div>
      <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:22, fontWeight:700, color:'rgba(255,255,255,0.85)', letterSpacing:'0.05em', marginBottom:8 }}>{title}</div>
      {sub && <div style={{ color:'rgba(255,255,255,0.45)', fontSize:14, maxWidth:340, lineHeight:1.7 }}>{sub}</div>}
      {action && <div style={{ marginTop:24 }}>{action}</div>}
    </div>
  );
}
