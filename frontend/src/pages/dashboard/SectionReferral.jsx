import { useState, useEffect } from 'react';
import { Card, SectionTitle } from './shared';
import API from '../../config';

function b64(str) {
  try { return btoa(unescape(encodeURIComponent(str))); } catch { return str; }
}

export default function SectionReferral({ user }) {
  const [copied, setCopied] = useState(false);
  const [stats,  setStats]  = useState({ friendsJoined: 0, rewardsEarned: 0, bonusPoints: 0 });

  useEffect(() => {
    if (!user?.email) return;
    fetch(`${API}/referrals/stats?email=${encodeURIComponent(user.email)}`)
      .then(r => r.json())
      .then(d => setStats(d))
      .catch(() => {});
  }, [user?.email]);

  const fullB64 = user?.email ? b64(user.email).replace(/=/g, '') : '';
  const code    = fullB64.slice(0, 8).toUpperCase() || 'XXXXXX';
  const refLink = `${window.location.origin}/signup?ref=${fullB64}`;

  const copy = () => {
    navigator.clipboard.writeText(refLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const PERKS = [
    { icon:'fa-user-plus', color:'#22c55e', title:'Friend Signs Up',       desc:'They get 10% off their first order' },
    { icon:'fa-star',      color:'#f59e0b', title:'Friend Makes a Purchase', desc:'You earn 200 bonus loyalty points' },
    { icon:'fa-gift',      color:'#a855f7', title:'No Limit',               desc:'Refer as many friends as you want' },
  ];

  return (
    <div>
      <SectionTitle title="Referral Program" sub="Invite friends — both of you earn rewards" />

      {/* Hero card */}
      <Card style={{ padding:32, marginBottom:20, background:'linear-gradient(135deg,#0f0f17,#1a0d12)', border:'1px solid rgba(227,6,19,0.2)', textAlign:'center' }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, color:'#fff', letterSpacing:'0.05em', marginBottom:8 }}>
          Share & Earn Together
        </div>
        <div style={{ color:'rgba(255,255,255,0.5)', fontSize:14, marginBottom:28, maxWidth:420, margin:'0 auto 28px' }}>
          Give your friends 10% off their first order. You earn 200 loyalty points for each friend who shops with us.
        </div>

        <div style={{ display:'flex', gap:8, maxWidth:480, margin:'0 auto', flexWrap:'wrap' }}>
          <div style={{ flex:1, minWidth:0, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:10, padding:'12px 16px', color:'#fff', fontSize:13, fontFamily:'monospace', textAlign:'left', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {refLink}
          </div>
          <button onClick={copy}
            style={{ padding:'12px 20px', borderRadius:10, background: copied ? '#22c55e' : '#e30613', border:'none', color:'#fff', fontWeight:700, fontSize:12, cursor:'pointer', fontFamily:"'Oswald',sans-serif", letterSpacing:'0.06em', flexShrink:0, transition:'background 0.2s', alignSelf:'stretch' }}>
            {copied ? <><i className="fas fa-check" style={{ marginRight:6 }} />Copied!</> : <><i className="fas fa-copy" style={{ marginRight:6 }} />Copy Link</>}
          </button>
        </div>

        <div style={{ marginTop:20, display:'inline-flex', alignItems:'center', gap:10, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:99, padding:'8px 20px' }}>
          <span style={{ color:'rgba(255,255,255,0.4)', fontSize:12 }}>Your code:</span>
          <span style={{ color:'#e30613', fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:'0.1em' }}>{code}</span>
        </div>
      </Card>

      {/* Live stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:14, marginBottom:20 }}>
        {[
          { val: stats.friendsJoined, lbl: 'Friends Joined',  icon: 'fa-user-plus',  color: '#22c55e' },
          { val: stats.rewardsEarned, lbl: 'Rewards Earned',  icon: 'fa-gift',       color: '#f59e0b' },
          { val: stats.bonusPoints,   lbl: 'Bonus Points',    icon: 'fa-star',       color: '#a855f7' },
        ].map(s => (
          <Card key={s.lbl} style={{ padding:20, textAlign:'center' }}>
            <i className={`fas ${s.icon}`} style={{ color: s.color, fontSize: 20, marginBottom: 10, display: 'block' }} />
            <div style={{ color:'#fff', fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:26, marginBottom:4 }}>{s.val}</div>
            <div style={{ color:'rgba(255,255,255,0.4)', fontSize:11, letterSpacing:'0.06em', textTransform:'uppercase' }}>{s.lbl}</div>
          </Card>
        ))}
      </div>

      {/* How it works */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:14, marginBottom:20 }}>
        {PERKS.map(p => (
          <Card key={p.title} style={{ padding:22, textAlign:'center' }}>
            <div style={{ width:52, height:52, borderRadius:14, background:`${p.color}14`, border:`1.5px solid ${p.color}30`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 14px' }}>
              <i className={`fas ${p.icon}`} style={{ color:p.color, fontSize:20 }} />
            </div>
            <div style={{ color:'#fff', fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:14, letterSpacing:'0.04em', marginBottom:6 }}>{p.title}</div>
            <div style={{ color:'rgba(255,255,255,0.4)', fontSize:12, lineHeight:1.55 }}>{p.desc}</div>
          </Card>
        ))}
      </div>

      {/* Share buttons */}
      <Card style={{ padding:22 }}>
        <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:14, fontWeight:700, color:'rgba(255,255,255,0.6)', letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:14 }}>Share Via</div>
        <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
          {[
            { label:'WhatsApp', icon:'fa-whatsapp', color:'#25d366', href:`https://wa.me/?text=Get 10% off at 24HR Fremont Tire & Auto! Use my link: ${encodeURIComponent(refLink)}` },
            { label:'Facebook', icon:'fa-facebook', color:'#1877f2', href:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(refLink)}` },
            { label:'Twitter',  icon:'fa-x-twitter', color:'#fff',   href:`https://twitter.com/intent/tweet?text=Get 10% off auto services! ${encodeURIComponent(refLink)}` },
            { label:'Email',    icon:'fa-envelope',  color:'#e30613', href:`mailto:?subject=10% off at 24HR Fremont Tire & Auto&body=Use my referral link: ${refLink}` },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'9px 18px', borderRadius:9, border:`1px solid ${s.color}30`, background:`${s.color}10`, color:s.color, textDecoration:'none', fontSize:12, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.05em' }}>
              <i className={`fab ${s.icon}`} style={{ fontSize:14 }} />{s.label}
            </a>
          ))}
        </div>
      </Card>
    </div>
  );
}
