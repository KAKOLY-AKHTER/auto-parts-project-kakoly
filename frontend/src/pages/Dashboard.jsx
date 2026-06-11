import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { StatCard, Badge, Card, RedBtn, Input } from './dashboard/shared';
import SectionOrders        from './dashboard/SectionOrders';
import SectionServices      from './dashboard/SectionServices';
import SectionGarage        from './dashboard/SectionGarage';
import SectionNotifications from './dashboard/SectionNotifications';
import SectionRewards       from './dashboard/SectionRewards';

/* ── NAV ── */
const NAV = [
  { id:'overview',       icon:'fa-gauge-high',         label:'Dashboard'        },
  { id:'orders',         icon:'fa-box',                label:'My Orders'        },
  { id:'services',       icon:'fa-screwdriver-wrench', label:'Service Requests' },
  { id:'garage',         icon:'fa-car',                label:'My Garage'        },
  { id:'notifications',  icon:'fa-bell',               label:'Notifications', badge:3 },
  { id:'rewards',        icon:'fa-star',               label:'Rewards'          },
  { id:'wishlist',       icon:'fa-heart',              label:'Wishlist'         },
  { id:'support',        icon:'fa-headset',            label:'Support'          },
  { id:'profile',        icon:'fa-user',               label:'Profile'          },
];

/* ── WISHLIST ── */
const INIT_WISHLIST = [
  { id:1, name:'Michelin Pilot Sport 4',  cat:'Tire',  price:'$189.00', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80' },
  { id:2, name:'Mobil 1 Full Synthetic',  cat:'Oil',   price:'$34.99',  img:'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=300&q=80' },
  { id:3, name:'Bosch Wiper Blades ×2',   cat:'Parts', price:'$28.00',  img:'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=300&q=80' },
  { id:4, name:'K&N High-Flow Air Filter',cat:'Parts', price:'$52.00',  img:'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=300&q=80' },
];

/* ── MINI SECTIONS (overview, wishlist, support, profile) ── */
function Overview({ user, setActive }) {
  const stats = [
    { icon:'fa-box',                value:'4',    label:'Total Orders',      sub:'1 in progress', color:'#e30613' },
    { icon:'fa-screwdriver-wrench', value:'3',    label:'Service Requests',  sub:'1 upcoming',    color:'#3b82f6' },
    { icon:'fa-car',                value:'2',    label:'My Garage',         sub:'Both active',   color:'#22c55e' },
    { icon:'fa-star',               value:'1,840',label:'Loyalty Points',    sub:'Silver tier',   color:'#f59e0b' },
    { icon:'fa-bell',               value:'3',    label:'Notifications',     sub:'Unread',        color:'#a855f7' },
  ];
  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:34, color:'#fff', letterSpacing:'0.04em', margin:0 }}>
          Welcome back, {user?.displayName?.split(' ')[0] || 'Friend'} 👋
        </h2>
        <p style={{ color:'rgba(255,255,255,0.35)', fontSize:14, margin:'6px 0 0' }}>Here's a summary of your account activity.</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))', gap:14, marginBottom:28 }}>
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:20 }}>
        {/* Recent Orders */}
        <Card style={{ padding:22 }}>
          <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:14, fontWeight:600, color:'rgba(255,255,255,0.5)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:14 }}>Recent Orders</div>
          {[
            { id:'#ORD-1055', item:'Air Filter + Oil Filter',  status:'pending',    amount:'$38.00' },
            { id:'#ORD-1051', item:'Brembo Brake Pad Set',     status:'processing', amount:'$74.00' },
            { id:'#ORD-1042', item:'Michelin Primacy 4 ×2',    status:'shipped',    amount:'$289.00' },
          ].map(o => (
            <div key={o.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
              <div>
                <div style={{ color:'#fff', fontSize:13, fontWeight:600 }}>{o.item}</div>
                <div style={{ color:'rgba(255,255,255,0.3)', fontSize:11, marginTop:2 }}>{o.id}</div>
              </div>
              <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                <span style={{ color:'#fff', fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:14 }}>{o.amount}</span>
                <Badge status={o.status} />
              </div>
            </div>
          ))}
          <button onClick={() => setActive('orders')} style={{ marginTop:14, background:'none', border:'none', color:'#e30613', fontSize:12, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.06em', cursor:'pointer', padding:0 }}>
            VIEW ALL ORDERS →
          </button>
        </Card>

        {/* Upcoming Services */}
        <Card style={{ padding:22 }}>
          <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:14, fontWeight:600, color:'rgba(255,255,255,0.5)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:14 }}>Upcoming Services</div>
          {[
            { service:'Wheel Alignment',       date:'Jun 14', time:'2:00 PM',  status:'confirmed' },
            { service:'Oil Change (Synthetic)', date:'Jun 18', time:'11:30 AM', status:'pending' },
          ].map(s => (
            <div key={s.service} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
              <div>
                <div style={{ color:'#fff', fontSize:13, fontWeight:600 }}>{s.service}</div>
                <div style={{ color:'rgba(255,255,255,0.3)', fontSize:11, marginTop:2 }}>{s.date} · {s.time}</div>
              </div>
              <Badge status={s.status} />
            </div>
          ))}
          <RedBtn onClick={() => setActive('services')} style={{ marginTop:14, padding:'8px 16px', fontSize:11 }}>
            <i className="fas fa-plus" style={{ fontSize:9 }} /> Book Service
          </RedBtn>
        </Card>

        {/* Points card */}
        <Card style={{ padding:22, background:'linear-gradient(135deg,#0e0e14,#1a0d12)', border:'1px solid rgba(227,6,19,0.2)' }}>
          <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:14, fontWeight:600, color:'rgba(255,255,255,0.5)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:10 }}>Loyalty Points</div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:52, color:'#fff', lineHeight:1, marginBottom:4 }}>1,840 <span style={{ fontSize:20, color:'rgba(255,255,255,0.4)' }}>pts</span></div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(148,163,184,0.1)', border:'1px solid rgba(148,163,184,0.3)', borderRadius:99, padding:'4px 12px', marginBottom:14 }}>
            <i className="fas fa-star" style={{ color:'#94a3b8', fontSize:11 }} />
            <span style={{ color:'#94a3b8', fontSize:12, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>Silver Member</span>
          </div>
          <div style={{ background:'rgba(255,255,255,0.08)', borderRadius:99, height:6, overflow:'hidden', marginBottom:6 }}>
            <div style={{ width:'37%', height:'100%', background:'linear-gradient(90deg,#94a3b8,#f59e0b)', borderRadius:99 }} />
          </div>
          <div style={{ color:'rgba(255,255,255,0.3)', fontSize:11 }}>3,160 pts to Gold</div>
          <button onClick={() => setActive('rewards')} style={{ marginTop:12, background:'none', border:'none', color:'#f59e0b', fontSize:12, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.06em', cursor:'pointer', padding:0 }}>
            VIEW REWARDS →
          </button>
        </Card>
      </div>
    </div>
  );
}

function Wishlist() {
  const [list, setList] = useState(INIT_WISHLIST);
  return (
    <div>
      <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, color:'#fff', letterSpacing:'0.04em', marginBottom:24 }}>Wishlist</h2>
      {list.length === 0 && <div style={{ color:'rgba(255,255,255,0.3)', textAlign:'center', padding:'60px 0' }}>Your wishlist is empty.</div>}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))', gap:16 }}>
        {list.map(p => (
          <Card key={p.id} style={{ overflow:'hidden' }}>
            <div style={{ position:'relative', height:140, background:'#0e0e14' }}>
              <img src={p.img} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.7 }} onError={e => e.target.style.display='none'} />
              <button onClick={() => setList(l => l.filter(x => x.id !== p.id))}
                style={{ position:'absolute', top:10, right:10, width:30, height:30, borderRadius:'50%', background:'rgba(0,0,0,0.65)', border:'none', color:'#ef4444', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <i className="fas fa-heart" style={{ fontSize:13 }} />
              </button>
            </div>
            <div style={{ padding:'14px 16px' }}>
              <div style={{ color:'rgba(255,255,255,0.3)', fontSize:10, textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:"'Oswald',sans-serif", marginBottom:4 }}>{p.cat}</div>
              <div style={{ color:'#fff', fontSize:14, fontWeight:600, marginBottom:10 }}>{p.name}</div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ color:'#e30613', fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:16 }}>{p.price}</span>
                <button style={{ background:'#e30613', border:'none', color:'#fff', borderRadius:6, padding:'6px 12px', fontSize:11, fontWeight:700, fontFamily:"'Oswald',sans-serif", cursor:'pointer' }}>ADD TO CART</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Support() {
  return (
    <div>
      <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, color:'#fff', letterSpacing:'0.04em', marginBottom:24 }}>Support</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:20 }}>
        <Card style={{ padding:24 }}>
          <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:15, fontWeight:600, color:'rgba(255,255,255,0.6)', letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:16 }}>Open Tickets</div>
          {[
            { id:'#TKT-412', subject:'Service appointment rescheduling', date:'Jun 10', status:'open' },
          ].map(t => (
            <div key={t.id} style={{ display:'flex', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid rgba(255,255,255,0.05)', alignItems:'center' }}>
              <div>
                <div style={{ color:'#fff', fontSize:13, fontWeight:600 }}>{t.subject}</div>
                <div style={{ color:'rgba(255,255,255,0.3)', fontSize:11, marginTop:2 }}>{t.id} · {t.date}</div>
              </div>
              <Badge status={t.status} />
            </div>
          ))}
          <RedBtn style={{ marginTop:16, padding:'9px 18px', fontSize:11 }}>
            <i className="fas fa-plus" style={{ fontSize:9 }} /> New Ticket
          </RedBtn>
        </Card>
        <Card style={{ padding:24 }}>
          <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:15, fontWeight:600, color:'rgba(255,255,255,0.6)', letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:16 }}>Contact Us Directly</div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <a href="tel:+14156347777" style={{ display:'flex', alignItems:'center', gap:12, background:'rgba(227,6,19,0.08)', border:'1px solid rgba(227,6,19,0.25)', borderRadius:10, padding:'14px 18px', textDecoration:'none', color:'#fff' }}>
              <i className="fas fa-phone" style={{ color:'#e30613', fontSize:18 }} />
              <div><div style={{ fontWeight:700, fontSize:15, fontFamily:"'Oswald',sans-serif" }}>(415) 634-7777</div><div style={{ color:'rgba(255,255,255,0.35)', fontSize:11 }}>Call or Text — 24/7</div></div>
            </a>
            <a href="/contacts" style={{ display:'flex', alignItems:'center', gap:12, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:10, padding:'14px 18px', textDecoration:'none', color:'#fff' }}>
              <i className="fas fa-envelope" style={{ color:'rgba(255,255,255,0.4)', fontSize:18 }} />
              <div><div style={{ fontWeight:700, fontSize:15, fontFamily:"'Oswald',sans-serif" }}>Send a Message</div><div style={{ color:'rgba(255,255,255,0.35)', fontSize:11 }}>We reply within 2 hours</div></div>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Profile({ user }) {
  const [name, setName]   = useState(user?.displayName || '');
  const [saved, setSaved] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: name });
      setSaved(true); setTimeout(() => setSaved(false), 2500);
    }
  };

  return (
    <div>
      <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, color:'#fff', letterSpacing:'0.04em', marginBottom:24 }}>Profile</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20 }}>
        <Card style={{ padding:28, display:'flex', flexDirection:'column', alignItems:'center', gap:14 }}>
          <div style={{ width:88, height:88, borderRadius:'50%', background:'#e30613', display:'flex', alignItems:'center', justifyContent:'center', fontSize:34, fontWeight:800, color:'#fff', fontFamily:"'Oswald',sans-serif", border:'3px solid rgba(227,6,19,0.4)' }}>
            {(user?.displayName || user?.email || 'U')[0].toUpperCase()}
          </div>
          <div style={{ textAlign:'center' }}>
            <div style={{ color:'#fff', fontSize:18, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>{user?.displayName || 'User'}</div>
            <div style={{ color:'rgba(255,255,255,0.35)', fontSize:13, marginTop:4 }}>{user?.email}</div>
          </div>
          <div style={{ background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.25)', color:'#22c55e', borderRadius:99, padding:'4px 14px', fontSize:12, fontWeight:600 }}>
            <i className="fas fa-circle-check" style={{ marginRight:6, fontSize:10 }} />Verified Account
          </div>
        </Card>
        <form onSubmit={handleSave}>
          <Card style={{ padding:28 }}>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:15, fontWeight:600, color:'rgba(255,255,255,0.5)', letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:18 }}>Edit Info</div>
            <Input label="Full Name" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" />
            <Input label="Email" value={user?.email || ''} disabled style={{ opacity:0.4, cursor:'not-allowed' }} />
            <RedBtn type="submit" style={{ width:'100%', justifyContent:'center', marginTop:4, padding:'12px' }}>
              {saved ? <><i className="fas fa-check" /> Saved!</> : 'Save Changes'}
            </RedBtn>
          </Card>
        </form>
      </div>
    </div>
  );
}

/* ── MAIN DASHBOARD ── */
export default function Dashboard() {
  const [user,     setUser]     = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [active,      setActive]      = useState('overview');
  const [sideOpen,    setSideOpen]    = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) { navigate('/login'); return; }
      setUser(u); setLoading(false);
    });
    return () => unsub();
  }, [navigate]);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:5000/api/bookings/mine?email=${encodeURIComponent(user.email)}`)
      .then(r => r.json())
      .then(data => {
        const count = Array.isArray(data)
          ? data.filter(b => b.status === 'pending' || b.status === 'confirmed').length
          : 0;
        setUnreadCount(count);
      })
      .catch(() => {});
  }, [user]);

  const handleLogout = async () => { await signOut(auth); navigate('/'); };

  if (loading) return (
    <div style={{ minHeight:'100vh', background:'#080808', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ color:'#e30613', fontSize:30, fontFamily:"'Bebas Neue',sans-serif", letterSpacing:'0.1em' }}>
        <i className="fas fa-spinner fa-spin" style={{ marginRight:12 }} />Loading...
      </div>
    </div>
  );

  const SECTIONS = {
    overview:      <Overview user={user} setActive={setActive} />,
    orders:        <SectionOrders user={user} />,
    services:      <SectionServices user={user} />,
    garage:        <SectionGarage user={user} />,
    notifications: <SectionNotifications user={user} />,
    rewards:       <SectionRewards user={user} />,
    wishlist:      <Wishlist />,
    support:       <Support />,
    profile:       <Profile user={user} />,
  };

  return (
    <div style={{ minHeight:'100vh', background:'#080808', display:'flex', fontFamily:"'Inter',sans-serif" }}>

      {/* Mobile overlay */}
      {sideOpen && <div onClick={() => setSideOpen(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', zIndex:40 }} />}

      {/* ── SIDEBAR ── */}
      <aside style={{ width:252, flexShrink:0, background:'#0e0e14', borderRight:'1px solid rgba(255,255,255,0.06)', display:'flex', flexDirection:'column', position:'fixed', top:0, left:0, bottom:0, zIndex:50, transition:'transform 0.25s ease' }}
        className={`dash-sidebar${sideOpen ? ' open' : ''}`}>

        {/* Logo */}
        <div style={{ padding:'18px 20px 14px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
          <a href="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:36, height:36, background:'#e30613', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <i className="fas fa-circle-dot" style={{ color:'#fff', fontSize:16 }} />
            </div>
            <div>
              <div style={{ color:'#fff', fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:14, lineHeight:1 }}>24HR FREMONT</div>
              <div style={{ color:'#e30613', fontSize:10, fontWeight:600, letterSpacing:'0.1em' }}>TIRE & AUTO</div>
            </div>
          </a>
        </div>

        {/* User info */}
        <div style={{ padding:'14px 18px', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:40, height:40, borderRadius:'50%', background:'#e30613', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, fontWeight:800, color:'#fff', fontFamily:"'Oswald',sans-serif", flexShrink:0 }}>
            {(user?.displayName || user?.email || 'U')[0].toUpperCase()}
          </div>
          <div style={{ overflow:'hidden' }}>
            <div style={{ color:'#fff', fontSize:13, fontWeight:700, fontFamily:"'Oswald',sans-serif", whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{user?.displayName || 'User'}</div>
            <div style={{ color:'rgba(255,255,255,0.3)', fontSize:11, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{user?.email}</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:'10px 8px', overflowY:'auto' }}>
          {NAV.map(n => {
            const isActive = active === n.id;
            return (
              <button key={n.id} onClick={() => { setActive(n.id); setSideOpen(false); }}
                style={{ width:'100%', display:'flex', alignItems:'center', gap:11, padding:'10px 13px', borderRadius:10, border:'none', background: isActive ? 'rgba(227,6,19,0.12)' : 'transparent', color: isActive ? '#fff' : 'rgba(255,255,255,0.45)', cursor:'pointer', textAlign:'left', marginBottom:2, transition:'all 0.15s ease', position:'relative' }}>
                <div style={{ width:31, height:31, borderRadius:8, background: isActive ? 'rgba(227,6,19,0.2)' : 'rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <i className={`fas ${n.icon}`} style={{ color: isActive ? '#e30613' : 'rgba(255,255,255,0.35)', fontSize:13 }} />
                </div>
                <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:14, fontWeight:600, letterSpacing:'0.04em', flex:1 }}>{n.label}</span>
                {n.id === 'notifications' && unreadCount > 0 && (
                  <div style={{ width:18, height:18, borderRadius:'50%', background:'#e30613', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:800, color:'#fff', flexShrink:0 }}>{unreadCount}</div>
                )}
                {isActive && <div style={{ position:'absolute', left:0, top:'20%', bottom:'20%', width:3, borderRadius:'0 3px 3px 0', background:'#e30613' }} />}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding:'10px 8px', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={handleLogout}
            style={{ width:'100%', display:'flex', alignItems:'center', gap:11, padding:'10px 13px', borderRadius:10, border:'none', background:'transparent', color:'rgba(255,255,255,0.35)', cursor:'pointer', transition:'all 0.15s ease' }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(239,68,68,0.1)'; e.currentTarget.style.color='#ef4444'; }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(255,255,255,0.35)'; }}>
            <div style={{ width:31, height:31, borderRadius:8, background:'rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <i className="fas fa-right-from-bracket" style={{ fontSize:13 }} />
            </div>
            <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:14, fontWeight:600, letterSpacing:'0.04em' }}>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex:1, marginLeft:252, display:'flex', flexDirection:'column', minHeight:'100vh' }} className="dash-main">

        {/* Top header */}
        <header style={{ height:62, background:'#0e0e14', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 26px', position:'sticky', top:0, zIndex:30 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <button onClick={() => setSideOpen(!sideOpen)} className="dash-hamburger"
              style={{ background:'none', border:'none', color:'#fff', cursor:'pointer', padding:4, display:'none' }}>
              <i className="fas fa-bars" style={{ fontSize:18 }} />
            </button>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:18, fontWeight:600, color:'#fff', letterSpacing:'0.05em' }}>
              {NAV.find(n => n.id === active)?.label}
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <button onClick={() => setActive('notifications')} style={{ position:'relative', width:38, height:38, borderRadius:8, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.09)', color:'rgba(255,255,255,0.6)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <i className="fas fa-bell" style={{ fontSize:15 }} />
              {unreadCount > 0 && <div style={{ position:'absolute', top:-4, right:-4, width:16, height:16, borderRadius:'50%', background:'#e30613', fontSize:9, fontWeight:800, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}>{unreadCount}</div>}
            </button>
            <a href="/" style={{ display:'inline-flex', alignItems:'center', gap:6, color:'rgba(255,255,255,0.4)', textDecoration:'none', fontSize:12, fontFamily:"'Oswald',sans-serif", fontWeight:600, letterSpacing:'0.05em', padding:'7px 14px', borderRadius:8, border:'1px solid rgba(255,255,255,0.08)' }}
              onMouseEnter={e => { e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='rgba(255,255,255,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.color='rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; }}>
              <i className="fas fa-house" style={{ fontSize:11 }} /> Home
            </a>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex:1, padding:'28px 26px', maxWidth:1140, width:'100%' }}>
          {SECTIONS[active]}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dash-sidebar { transform: translateX(-100%); }
          .dash-sidebar.open { transform: translateX(0) !important; }
          .dash-main { margin-left: 0 !important; }
          .dash-hamburger { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
