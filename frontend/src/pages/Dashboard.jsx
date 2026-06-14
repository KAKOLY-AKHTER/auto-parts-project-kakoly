import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import API from '../config';
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { StatCard, Badge, Card, RedBtn, Input } from './dashboard/shared';
import { useCart } from '../context/CartContext';
import SectionOrders        from './dashboard/SectionOrders';
import SectionServices      from './dashboard/SectionServices';
import SectionGarage        from './dashboard/SectionGarage';
import SectionNotifications from './dashboard/SectionNotifications';
import SectionRewards       from './dashboard/SectionRewards';
import SectionReviews       from './dashboard/SectionReviews';
import SectionAddressBook   from './dashboard/SectionAddressBook';
import SectionSupport       from './dashboard/SectionSupport';
import SectionReferral      from './dashboard/SectionReferral';

/* ── NAV ── */
const NAV = [
  { id:'overview',       icon:'fa-gauge-high',         label:'Dashboard'        },
  { id:'orders',         icon:'fa-box',                label:'My Orders'        },
  { id:'services',       icon:'fa-screwdriver-wrench', label:'Service Requests' },
  { id:'garage',         icon:'fa-car',                label:'My Garage'        },
  { id:'notifications',  icon:'fa-bell',               label:'Notifications' },
  { id:'rewards',        icon:'fa-star',               label:'Rewards'          },
  { id:'wishlist',       icon:'fa-heart',              label:'Wishlist'         },
  { id:'reviews',        icon:'fa-star-half-stroke',   label:'Reviews'          },
  { id:'addresses',      icon:'fa-location-dot',       label:'Address Book'     },
  { id:'referral',       icon:'fa-users',              label:'Referral'         },
  { id:'support',        icon:'fa-headset',            label:'Support'          },
  { id:'profile',        icon:'fa-user',               label:'Profile'          },
];


/* ── MINI SECTIONS (overview, wishlist, profile) ── */
function Overview({ user, setActive }) {
  const [orders,   setOrders]   = useState([]);
  const [bookings, setBookings] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    if (!user?.email) { setLoading(false); return; }
    const e = encodeURIComponent(user.email);
    Promise.all([
      fetch(`${API}/orders/mine?email=${e}`).then(r => r.json()).catch(() => []),
      fetch(`${API}/bookings/mine?email=${e}`).then(r => r.json()).catch(() => []),
      fetch(`${API}/vehicles?email=${e}`).then(r => r.json()).catch(() => []),
    ]).then(([ords, bkgs, vehs]) => {
      setOrders(Array.isArray(ords) ? ords : []);
      setBookings(Array.isArray(bkgs) ? bkgs : []);
      setVehicles(Array.isArray(vehs) ? vehs : []);
    }).finally(() => setLoading(false));
  }, [user]);

  const points = bookings.length * 50 + orders.reduce((s, o) => s + Math.floor((o.total || 0)), 0);
  const tier   = points >= 5000 ? { name:'Gold',   color:'#f59e0b', next:null,  icon:'fa-crown'  }
               : points >= 1000 ? { name:'Silver',  color:'#94a3b8', next:5000,  icon:'fa-star'   }
               :                  { name:'Bronze',  color:'#cd7f32', next:1000,  icon:'fa-medal'  };
  const progress = tier.next ? Math.min(((points - (tier.name==='Silver'?1000:0)) / (tier.next - (tier.name==='Silver'?1000:0))) * 100, 100) : 100;

  const recentOrders   = [...orders].sort((a,b) => new Date(b.createdAt)-new Date(a.createdAt)).slice(0,3);
  const upcoming       = bookings.filter(b => b.status==='pending'||b.status==='confirmed')
                                 .sort((a,b) => new Date(a.date)-new Date(b.date)).slice(0,3);
  const activeOrders   = orders.filter(o => !['delivered','cancelled'].includes(o.status)).length;
  const upcomingSvc    = bookings.filter(b => b.status==='pending'||b.status==='confirmed').length;

  const fmtDate = (raw) => { try { return new Date(raw).toLocaleDateString('en-US',{month:'short',day:'numeric'}); } catch { return raw; } };

  const stats = [
    { icon:'fa-box',                value: loading ? '—' : orders.length.toString(),    label:'Total Orders',     sub: loading ? '' : `${activeOrders} in progress`, color:'#e30613' },
    { icon:'fa-screwdriver-wrench', value: loading ? '—' : bookings.length.toString(),  label:'Service Requests', sub: loading ? '' : `${upcomingSvc} upcoming`,      color:'#3b82f6' },
    { icon:'fa-car',                value: loading ? '—' : vehicles.length.toString(),  label:'My Garage',        sub: loading ? '' : `${vehicles.length} vehicle${vehicles.length!==1?'s':''}`, color:'#22c55e' },
    { icon:'fa-star',               value: loading ? '—' : points.toLocaleString(),     label:'Loyalty Points',   sub: loading ? '' : `${tier.name} tier`,            color:'#f59e0b' },
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
          {recentOrders.length === 0 ? (
            <div style={{ color:'rgba(255,255,255,0.25)', fontSize:13, padding:'10px 0' }}>No orders yet.</div>
          ) : recentOrders.map(o => (
            <div key={o._id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
              <div>
                <div style={{ color:'#fff', fontSize:13, fontWeight:600 }}>{o.items?.[0]?.name || 'Order'}{o.items?.length > 1 ? ` +${o.items.length-1} more` : ''}</div>
                <div style={{ color:'rgba(255,255,255,0.3)', fontSize:11, marginTop:2 }}>#{o._id?.slice(-8).toUpperCase()}</div>
              </div>
              <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                <span style={{ color:'#fff', fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:14 }}>${o.total?.toFixed(2)}</span>
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
          {upcoming.length === 0 ? (
            <div style={{ color:'rgba(255,255,255,0.25)', fontSize:13, padding:'10px 0' }}>No upcoming bookings.</div>
          ) : upcoming.map(b => (
            <div key={b._id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
              <div>
                <div style={{ color:'#fff', fontSize:13, fontWeight:600 }}>{b.service}</div>
                <div style={{ color:'rgba(255,255,255,0.3)', fontSize:11, marginTop:2 }}>{fmtDate(b.date)} · {b.time}</div>
              </div>
              <Badge status={b.status} />
            </div>
          ))}
          <RedBtn onClick={() => setActive('services')} style={{ marginTop:14, padding:'8px 16px', fontSize:11 }}>
            <i className="fas fa-plus" style={{ fontSize:9 }} /> Book Service
          </RedBtn>
        </Card>

        {/* Points card */}
        <Card style={{ padding:22, background:'linear-gradient(135deg,#0e0e14,#1a0d12)', border:'1px solid rgba(227,6,19,0.2)' }}>
          <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:14, fontWeight:600, color:'rgba(255,255,255,0.5)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:10 }}>Loyalty Points</div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:52, color:'#fff', lineHeight:1, marginBottom:4 }}>
            {loading ? '—' : points.toLocaleString()} <span style={{ fontSize:20, color:'rgba(255,255,255,0.4)' }}>pts</span>
          </div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:`${tier.color}14`, border:`1px solid ${tier.color}36`, borderRadius:99, padding:'4px 12px', marginBottom:14 }}>
            <i className={`fas ${tier.icon}`} style={{ color:tier.color, fontSize:11 }} />
            <span style={{ color:tier.color, fontSize:12, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>{tier.name} Member</span>
          </div>
          {tier.next && (
            <>
              <div style={{ background:'rgba(255,255,255,0.08)', borderRadius:99, height:6, overflow:'hidden', marginBottom:6 }}>
                <div style={{ width:`${progress}%`, height:'100%', background:`linear-gradient(90deg,${tier.color},#f59e0b)`, borderRadius:99, transition:'width 0.5s' }} />
              </div>
              <div style={{ color:'rgba(255,255,255,0.3)', fontSize:11 }}>{(tier.next - points).toLocaleString()} pts to {tier.name==='Bronze'?'Silver':'Gold'}</div>
            </>
          )}
          <button onClick={() => setActive('rewards')} style={{ marginTop:12, background:'none', border:'none', color:tier.color, fontSize:12, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.06em', cursor:'pointer', padding:0 }}>
            VIEW REWARDS →
          </button>
        </Card>
      </div>
    </div>
  );
}

function Wishlist({ user }) {
  const [list,    setList]    = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    if (!user?.email) { setLoading(false); return; }
    fetch(`${API}/wishlist?email=${encodeURIComponent(user.email)}`)
      .then(r => r.json()).then(d => setList(Array.isArray(d) ? d : []))
      .catch(() => {}).finally(() => setLoading(false));
  }, [user]);

  const removeItem = async (productId) => {
    setList(l => l.filter(x => x.productId !== productId));
    await fetch(`${API}/wishlist/${productId}?email=${encodeURIComponent(user.email)}`, { method:'DELETE' }).catch(() => {});
  };

  const handleAddToCart = (p) => {
    addItem({ id: p.productId, name: p.name, price: p.price, img: p.image, catLabel: p.category });
  };

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24, flexWrap:'wrap', gap:12 }}>
        <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, color:'#fff', letterSpacing:'0.04em', margin:0 }}>Wishlist</h2>
        <a href="/shop" style={{ display:'inline-flex', alignItems:'center', gap:7, background:'#e30613', color:'#fff', border:'none', borderRadius:9, padding:'9px 18px', fontSize:12, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.06em', textDecoration:'none' }}>
          <i className="fas fa-shop" style={{ fontSize:11 }} /> Browse Shop
        </a>
      </div>
      {loading ? (
        <div style={{ color:'rgba(255,255,255,0.3)', textAlign:'center', padding:'60px 0' }}><i className="fas fa-spinner fa-spin" style={{ marginRight:8 }} />Loading...</div>
      ) : list.length === 0 ? (
        <div style={{ textAlign:'center', padding:'60px 20px' }}>
          <i className="fas fa-heart" style={{ fontSize:36, color:'rgba(255,255,255,0.1)', display:'block', marginBottom:14 }} />
          <div style={{ color:'rgba(255,255,255,0.4)', fontSize:15, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.05em', marginBottom:6 }}>Your wishlist is empty</div>
          <div style={{ color:'rgba(255,255,255,0.25)', fontSize:13 }}>Click the heart icon on any product in the shop to save it here.</div>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))', gap:16 }}>
          {list.map(p => (
            <Card key={p.productId} style={{ overflow:'hidden' }}>
              <div style={{ position:'relative', height:140, background:'#0e0e14', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <img src={p.image} alt={p.name} style={{ maxHeight:'100%', maxWidth:'100%', objectFit:'contain', padding:12, opacity:0.9 }} onError={e => e.target.style.display='none'} />
                <button onClick={() => removeItem(p.productId)}
                  style={{ position:'absolute', top:10, right:10, width:30, height:30, borderRadius:'50%', background:'rgba(0,0,0,0.65)', border:'none', color:'#ef4444', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}
                  title="Remove from wishlist">
                  <i className="fas fa-heart" style={{ fontSize:13 }} />
                </button>
              </div>
              <div style={{ padding:'14px 16px' }}>
                <div style={{ color:'rgba(255,255,255,0.3)', fontSize:10, textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:"'Oswald',sans-serif", marginBottom:4 }}>{p.category}</div>
                <div style={{ color:'#fff', fontSize:14, fontWeight:600, marginBottom:10, lineHeight:1.35 }}>{p.name}</div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{ color:'#e30613', fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:16 }}>${Number(p.price).toFixed(2)}</span>
                  <button onClick={() => handleAddToCart(p)} style={{ background:'#e30613', border:'none', color:'#fff', borderRadius:6, padding:'6px 12px', fontSize:11, fontWeight:700, fontFamily:"'Oswald',sans-serif", cursor:'pointer', letterSpacing:'0.04em' }}>ADD TO CART</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function AvatarImg({ photoURL, displayName, email, size = 88, fontSize = 34 }) {
  const [imgError, setImgError] = useState(false);
  const initial = (displayName || email || 'U')[0].toUpperCase();
  if (photoURL && !imgError) {
    return (
      <img src={photoURL} alt="avatar" onError={() => setImgError(true)}
        style={{ width:size, height:size, borderRadius:'50%', objectFit:'cover', border:'3px solid rgba(227,6,19,0.4)' }} />
    );
  }
  return (
    <div style={{ width:size, height:size, borderRadius:'50%', background:'#1a1a2e', border:'3px solid rgba(227,6,19,0.4)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
      <svg viewBox="0 0 24 24" fill="none" style={{ width:size*0.52, height:size*0.52 }}>
        <circle cx="12" cy="8" r="4" fill="rgba(227,6,19,0.7)" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="rgba(227,6,19,0.7)" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </svg>
    </div>
  );
}

function Profile({ user }) {
  const [name,     setName]     = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [saved,    setSaved]    = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: name, photoURL: photoURL || null });
      setSaved(true); setTimeout(() => setSaved(false), 2500);
    }
  };

  const currentPhoto = photoURL || user?.photoURL;

  return (
    <div>
      <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, color:'#fff', letterSpacing:'0.04em', marginBottom:24 }}>Profile</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20 }}>
        <Card style={{ padding:28, display:'flex', flexDirection:'column', alignItems:'center', gap:14 }}>
          <AvatarImg photoURL={currentPhoto} displayName={name || user?.displayName} email={user?.email} size={88} />
          <div style={{ textAlign:'center' }}>
            <div style={{ color:'#fff', fontSize:18, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>{user?.displayName || name || 'User'}</div>
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
            <Input label="Photo URL (optional)" value={photoURL} onChange={e => setPhotoURL(e.target.value)} placeholder="https://example.com/photo.jpg" />
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
    fetch(`${API}/bookings/mine?email=${encodeURIComponent(user.email)}`)
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
    wishlist:      <Wishlist user={user} />,
    reviews:       <SectionReviews user={user} />,
    addresses:     <SectionAddressBook user={user} />,
    referral:      <SectionReferral user={user} />,
    support:       <SectionSupport user={user} />,
    profile:       <Profile user={user} />,
  };

  return (
    <div style={{ minHeight:'100vh', background:'#07070e', display:'flex', fontFamily:"'Inter',sans-serif" }}>

      {/* Mobile overlay */}
      {sideOpen && <div onClick={() => setSideOpen(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', zIndex:40, backdropFilter:'blur(2px)' }} />}

      {/* ── SIDEBAR ── */}
      <aside style={{ width:256, flexShrink:0, background:'linear-gradient(180deg,#0d0d1a 0%,#0a0a14 100%)', borderRight:'1px solid rgba(255,255,255,0.09)', display:'flex', flexDirection:'column', position:'fixed', top:0, left:0, bottom:0, zIndex:50, transition:'transform 0.25s ease', boxShadow:'4px 0 24px rgba(0,0,0,0.4)' }}
        className={`dash-sidebar${sideOpen ? ' open' : ''}`}>

        {/* Logo */}
        <div style={{ padding:'20px 20px 16px', borderBottom:'1px solid rgba(255,255,255,0.08)', background:'rgba(227,6,19,0.04)' }}>
          <a href="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:11 }}>
            <div style={{ width:38, height:38, background:'linear-gradient(135deg,#e30613,#c0050f)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 4px 14px rgba(227,6,19,0.4)' }}>
              <i className="fas fa-circle-dot" style={{ color:'#fff', fontSize:17 }} />
            </div>
            <div>
              <div style={{ color:'#fff', fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:14, lineHeight:1 }}>24HR FREMONT</div>
              <div style={{ color:'#e30613', fontSize:10, fontWeight:700, letterSpacing:'0.12em', marginTop:2 }}>TIRE & AUTO</div>
            </div>
          </a>
        </div>

        {/* User info */}
        <div style={{ padding:'14px 16px', borderBottom:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', gap:12, background:'rgba(255,255,255,0.02)' }}>
          <AvatarImg photoURL={user?.photoURL} displayName={user?.displayName} email={user?.email} size={42} fontSize={16} />
          <div style={{ overflow:'hidden', flex:1 }}>
            <div style={{ color:'#fff', fontSize:13, fontWeight:700, fontFamily:"'Oswald',sans-serif", whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', letterSpacing:'0.03em' }}>{user?.displayName || 'User'}</div>
            <div style={{ color:'rgba(255,255,255,0.4)', fontSize:11, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', marginTop:2 }}>{user?.email}</div>
          </div>
          <div style={{ width:8, height:8, borderRadius:'50%', background:'#22c55e', flexShrink:0, boxShadow:'0 0 6px #22c55e' }} />
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:'12px 10px', overflowY:'auto' }}>
          {NAV.map(n => {
            const isActive = active === n.id;
            return (
              <button key={n.id} onClick={() => { setActive(n.id); setSideOpen(false); }}
                style={{ width:'100%', display:'flex', alignItems:'center', gap:11, padding:'10px 12px', borderRadius:11, border: isActive ? '1px solid rgba(227,6,19,0.3)' : '1px solid transparent', background: isActive ? 'linear-gradient(135deg,rgba(227,6,19,0.15),rgba(227,6,19,0.08))' : 'transparent', color: isActive ? '#fff' : 'rgba(255,255,255,0.5)', cursor:'pointer', textAlign:'left', marginBottom:3, transition:'all 0.15s ease', position:'relative', boxShadow: isActive ? '0 2px 12px rgba(227,6,19,0.15)' : 'none' }}>
                <div style={{ width:32, height:32, borderRadius:9, background: isActive ? 'rgba(227,6,19,0.25)' : 'rgba(255,255,255,0.07)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border: isActive ? '1px solid rgba(227,6,19,0.4)' : '1px solid rgba(255,255,255,0.08)' }}>
                  <i className={`fas ${n.icon}`} style={{ color: isActive ? '#e30613' : 'rgba(255,255,255,0.4)', fontSize:13 }} />
                </div>
                <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:14, fontWeight: isActive ? 700 : 600, letterSpacing:'0.04em', flex:1 }}>{n.label}</span>
                {n.id === 'notifications' && unreadCount > 0 && (
                  <div style={{ minWidth:20, height:20, borderRadius:99, background:'#e30613', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:800, color:'#fff', flexShrink:0, padding:'0 5px', boxShadow:'0 2px 8px rgba(227,6,19,0.5)' }}>{unreadCount}</div>
                )}
                {isActive && <div style={{ position:'absolute', left:0, top:'15%', bottom:'15%', width:3, borderRadius:'0 3px 3px 0', background:'linear-gradient(180deg,#e30613,#e3061388)' }} />}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding:'10px 10px 14px', borderTop:'1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={handleLogout}
            style={{ width:'100%', display:'flex', alignItems:'center', gap:11, padding:'10px 12px', borderRadius:11, border:'1px solid transparent', background:'transparent', color:'rgba(255,255,255,0.4)', cursor:'pointer', transition:'all 0.15s ease' }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(239,68,68,0.1)'; e.currentTarget.style.color='#ef4444'; e.currentTarget.style.borderColor='rgba(239,68,68,0.25)'; }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor='transparent'; }}>
            <div style={{ width:32, height:32, borderRadius:9, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <i className="fas fa-right-from-bracket" style={{ fontSize:13 }} />
            </div>
            <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:14, fontWeight:600, letterSpacing:'0.04em' }}>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex:1, marginLeft:256, display:'flex', flexDirection:'column', minHeight:'100vh' }} className="dash-main">

        {/* Top header */}
        <header style={{ height:64, background:'linear-gradient(180deg,#0d0d1a,#0a0a14)', borderBottom:'1px solid rgba(255,255,255,0.09)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 28px', position:'sticky', top:0, zIndex:30, boxShadow:'0 2px 16px rgba(0,0,0,0.3)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <button onClick={() => setSideOpen(!sideOpen)} className="dash-hamburger"
              style={{ background:'none', border:'none', color:'#fff', cursor:'pointer', padding:4, display:'none' }}>
              <i className="fas fa-bars" style={{ fontSize:18 }} />
            </button>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <button onClick={() => setActive('notifications')}
              style={{ position:'relative', width:40, height:40, borderRadius:10, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', color:'rgba(255,255,255,0.7)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.15s' }}>
              <i className="fas fa-bell" style={{ fontSize:15 }} />
              {unreadCount > 0 && <div style={{ position:'absolute', top:-5, right:-5, minWidth:17, height:17, borderRadius:99, background:'#e30613', fontSize:9, fontWeight:800, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', padding:'0 4px', boxShadow:'0 2px 6px rgba(227,6,19,0.6)' }}>{unreadCount}</div>}
            </button>
            <a href="/"
              style={{ display:'inline-flex', alignItems:'center', gap:6, color:'rgba(255,255,255,0.6)', textDecoration:'none', fontSize:12, fontFamily:"'Oswald',sans-serif", fontWeight:700, letterSpacing:'0.06em', padding:'8px 16px', borderRadius:9, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.04)', transition:'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='rgba(255,255,255,0.25)'; e.currentTarget.style.background='rgba(255,255,255,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.color='rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'; e.currentTarget.style.background='rgba(255,255,255,0.04)'; }}>
              <i className="fas fa-house" style={{ fontSize:11 }} /> Home
            </a>
          </div>
        </header>

        {/* Page content */}
        <main className="dash-content" style={{ flex:1, padding:'30px 28px', maxWidth:1160, width:'100%' }}>
          {SECTIONS[active]}
        </main>
      </div>

      <style>{`
        .dash-nav-btn:hover { background: rgba(255,255,255,0.05) !important; color: rgba(255,255,255,0.8) !important; }
        @media (max-width: 768px) {
          .dash-sidebar { transform: translateX(-100%); }
          .dash-sidebar.open { transform: translateX(0) !important; }
          .dash-main { margin-left: 0 !important; }
          .dash-hamburger { display: flex !important; }
          .dash-content { padding: 18px 14px !important; }
        }
      `}</style>
    </div>
  );
}
