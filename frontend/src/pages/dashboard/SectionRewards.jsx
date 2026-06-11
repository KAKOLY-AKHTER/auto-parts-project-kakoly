import { useState, useEffect } from 'react';
import { Card, SectionTitle, LoadingState, EmptyState } from './shared';

import API from '../../config';

function fmtDate(raw) {
  if (!raw) return '';
  try {
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    return d.toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
  } catch { return raw; }
}

const TIERS = [
  { name:'Bronze', min:0,    max:999,  color:'#cd7f32', icon:'fa-medal',  perks:['5% points on services','Birthday bonus points','Member-only offers'] },
  { name:'Silver', min:1000, max:4999, color:'#94a3b8', icon:'fa-star',   perks:['8% points on services','Priority booking','Free tire rotation/year','Birthday double points'] },
  { name:'Gold',   min:5000, max:null, color:'#f59e0b', icon:'fa-crown',  perks:['12% points on services','Free oil change/year','VIP support line','Exclusive Gold discounts','Free roadside call/year'] },
];

const REDEEM_OPTIONS = [
  { label:'$5 Off Next Service',  cost:50,  icon:'fa-tag' },
  { label:'$10 Off Next Service', cost:100, icon:'fa-tag' },
  { label:'Free Oil Change',      cost:300, icon:'fa-oil-can' },
  { label:'Free Tire Rotation',   cost:200, icon:'fa-circle-dot' },
];

const POINTS_PER_BOOKING = 50;

export default function SectionRewards({ user }) {
  const [bookings, setBookings] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [redeemed, setRedeemed] = useState(null);
  const [spent,    setSpent]    = useState(0);

  useEffect(() => {
    if (!user?.email) { setLoading(false); return; }
    fetch(`${API}/bookings/mine?email=${encodeURIComponent(user.email)}`)
      .then(r => r.json())
      .then(data => setBookings(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  const earned = bookings.length * POINTS_PER_BOOKING;
  const points = Math.max(0, earned - spent);

  const currentTier = TIERS.find(t => points >= t.min && (t.max === null || points <= t.max)) || TIERS[0];
  const nextTier    = TIERS[TIERS.indexOf(currentTier) + 1];
  const progress    = nextTier ? ((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100 : 100;

  const handleRedeem = (opt) => {
    if (points < opt.cost) return;
    setSpent(s => s + opt.cost);
    setRedeemed(opt.label);
    setTimeout(() => setRedeemed(null), 3500);
  };

  return (
    <div>
      <SectionTitle
        title="Rewards & Loyalty"
        sub={loading ? '' : `${currentTier.name} member · ${points.toLocaleString()} points balance`}
      />

      {loading ? <LoadingState /> : bookings.length === 0 ? (
        <>
          {/* Show the program structure even for new users */}
          <div style={{ background:'linear-gradient(135deg,#0f0f17,#1a0d12)', border:'1px solid rgba(227,6,19,0.18)', borderRadius:16, padding:32, marginBottom:20, textAlign:'center' }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, color:'#fff', letterSpacing:'0.05em', marginBottom:6 }}>Earn Points on Every Visit</div>
            <div style={{ color:'rgba(255,255,255,0.5)', fontSize:14, maxWidth:400, margin:'0 auto 22px', lineHeight:1.65 }}>
              Book a service to start earning loyalty points. Redeem them for discounts, free services, and exclusive member perks.
            </div>
            <div style={{ display:'flex', justifyContent:'center', gap:14, flexWrap:'wrap' }}>
              {TIERS.map(tier => (
                <div key={tier.name} style={{ display:'inline-flex', alignItems:'center', gap:8, background:`${tier.color}12`, border:`1px solid ${tier.color}30`, borderRadius:99, padding:'8px 16px' }}>
                  <i className={`fas ${tier.icon}`} style={{ color:tier.color, fontSize:14 }} />
                  <span style={{ color:tier.color, fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:14 }}>{tier.name}</span>
                </div>
              ))}
            </div>
          </div>
          <EmptyState
            icon="fa-star"
            title="No Points Yet"
            sub={`Each completed service earns you ${POINTS_PER_BOOKING} points. Reach Silver at 1,000 pts and Gold at 5,000 pts.`}
          />
        </>
      ) : (
        <>
          {/* Points hero */}
          <Card style={{ padding:28, marginBottom:20, background:'linear-gradient(135deg,#0f0f17,#1a0d12)', border:'1px solid rgba(227,6,19,0.18)' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
              <div>
                <div style={{ color:'rgba(255,255,255,0.45)', fontSize:12, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:4 }}>Your Points Balance</div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:64, color:'#fff', lineHeight:1, letterSpacing:'0.03em' }}>
                  {points.toLocaleString()}
                  <span style={{ fontSize:22, color:'rgba(255,255,255,0.4)', marginLeft:8 }}>pts</span>
                </div>
              </div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:12, background:`${currentTier.color}16`, border:`1.5px solid ${currentTier.color}48`, borderRadius:14, padding:'14px 22px' }}>
                <i className={`fas ${currentTier.icon}`} style={{ color:currentTier.color, fontSize:24 }} />
                <div>
                  <div style={{ color:currentTier.color, fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:'0.05em', lineHeight:1 }}>{currentTier.name} Member</div>
                  <div style={{ color:'rgba(255,255,255,0.4)', fontSize:12, marginTop:2 }}>
                    {nextTier ? `${(nextTier.min - points).toLocaleString()} pts to ${nextTier.name}` : 'Maximum tier reached!'}
                  </div>
                </div>
              </div>
            </div>

            {nextTier && (
              <div style={{ marginTop:22 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:7 }}>
                  <span style={{ color:currentTier.color, fontSize:12, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>{currentTier.name} — {points.toLocaleString()} pts</span>
                  <span style={{ color:'rgba(255,255,255,0.4)', fontSize:12, fontFamily:"'Oswald',sans-serif" }}>{nextTier.name} — {nextTier.min.toLocaleString()} pts</span>
                </div>
                <div style={{ background:'rgba(255,255,255,0.08)', borderRadius:99, height:8, overflow:'hidden' }}>
                  <div style={{ width:`${Math.min(progress, 100)}%`, height:'100%', background:`linear-gradient(90deg,${currentTier.color},${nextTier.color})`, borderRadius:99, transition:'width 0.6s ease' }} />
                </div>
                <div style={{ color:'rgba(255,255,255,0.35)', fontSize:11, marginTop:5 }}>
                  {Math.round(progress)}% progress to {nextTier.name}
                </div>
              </div>
            )}
          </Card>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:20, marginBottom:20 }}>
            {/* Redeem */}
            <Card style={{ padding:24 }}>
              <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:16, fontWeight:700, color:'rgba(255,255,255,0.7)', letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:16 }}>Redeem Points</div>
              {redeemed && (
                <div style={{ background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.22)', borderRadius:9, padding:'11px 14px', marginBottom:14, color:'#22c55e', fontSize:13, fontWeight:600 }}>
                  <i className="fas fa-circle-check" style={{ marginRight:7 }} /> Redeemed: {redeemed}
                </div>
              )}
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {REDEEM_OPTIONS.map(opt => {
                  const canRedeem = points >= opt.cost;
                  return (
                    <div key={opt.label} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:11, padding:'12px 16px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                        <i className={`fas ${opt.icon}`} style={{ color: canRedeem ? '#e30613' : 'rgba(255,255,255,0.2)', fontSize:15 }} />
                        <div>
                          <div style={{ color: canRedeem ? '#fff' : 'rgba(255,255,255,0.3)', fontSize:13, fontWeight:600 }}>{opt.label}</div>
                          <div style={{ color:'rgba(255,255,255,0.35)', fontSize:11 }}>{opt.cost} points</div>
                        </div>
                      </div>
                      <button onClick={() => handleRedeem(opt)} disabled={!canRedeem}
                        style={{ background: canRedeem ? '#e30613' : 'rgba(255,255,255,0.07)', border:'none', color: canRedeem ? '#fff' : 'rgba(255,255,255,0.2)', borderRadius:8, padding:'7px 15px', fontSize:12, fontWeight:700, fontFamily:"'Oswald',sans-serif", cursor: canRedeem ? 'pointer' : 'not-allowed', letterSpacing:'0.05em', transition:'background 0.15s' }}>
                        {canRedeem ? 'Redeem' : 'Locked'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Tier perks */}
            <Card style={{ padding:24 }}>
              <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:16, fontWeight:700, color:'rgba(255,255,255,0.7)', letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:16 }}>Tier Perks</div>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {TIERS.map(tier => {
                  const isActive = tier.name === currentTier.name;
                  return (
                    <div key={tier.name} style={{ background: isActive ? `${tier.color}0e` : 'rgba(255,255,255,0.03)', border:`1px solid ${isActive ? tier.color+'38' : 'rgba(255,255,255,0.07)'}`, borderRadius:11, padding:'12px 16px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                        <i className={`fas ${tier.icon}`} style={{ color:tier.color, fontSize:14 }} />
                        <span style={{ color:tier.color, fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:14, letterSpacing:'0.04em' }}>{tier.name}</span>
                        <span style={{ color:'rgba(255,255,255,0.28)', fontSize:11 }}>({tier.min.toLocaleString()}{tier.max ? `–${tier.max.toLocaleString()}` : '+'} pts)</span>
                        {isActive && <span style={{ background:tier.color, color:'#000', borderRadius:99, padding:'2px 8px', fontSize:9, fontWeight:800, marginLeft:'auto' }}>CURRENT</span>}
                      </div>
                      <ul style={{ margin:0, padding:'0 0 0 16px' }}>
                        {tier.perks.map(p => <li key={p} style={{ color: isActive ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.28)', fontSize:12, marginBottom:3 }}>{p}</li>)}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Points history from real bookings */}
          <Card style={{ padding:24 }}>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:16, fontWeight:700, color:'rgba(255,255,255,0.7)', letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:16 }}>Points History</div>
            {bookings.length === 0 ? (
              <div style={{ color:'rgba(255,255,255,0.3)', textAlign:'center', padding:'24px 0', fontSize:13 }}>No activity yet.</div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column' }}>
                {bookings.map((b, i) => (
                  <div key={b._id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 0', borderBottom: i < bookings.length-1 ? '1px solid rgba(255,255,255,0.05)' : 'none', gap:12 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                      <div style={{ width:38, height:38, borderRadius:9, background:'rgba(34,197,94,0.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <i className="fas fa-arrow-trend-up" style={{ color:'#22c55e', fontSize:13 }} />
                      </div>
                      <div>
                        <div style={{ color:'#fff', fontSize:13, fontWeight:500 }}>{b.service}</div>
                        <div style={{ color:'rgba(255,255,255,0.35)', fontSize:11, marginTop:2 }}>{fmtDate(b.date)}</div>
                      </div>
                    </div>
                    <div style={{ color:'#22c55e', fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:16, flexShrink:0 }}>
                      +{POINTS_PER_BOOKING} pts
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
