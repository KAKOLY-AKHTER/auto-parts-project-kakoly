import { useState, useEffect } from 'react';
import { Badge, Card, SectionTitle, RedBtn, Select, Input, LoadingState, EmptyState } from './shared';

import API from '../../config';

function fmtDate(raw) {
  if (!raw) return '';
  try {
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    return d.toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
  } catch { return raw; }
}

const SERVICES = [
  'Tire Service & Repair','Oil Change','Brake Repair','Wheel Alignment',
  'Battery Replacement','A/C Evaluation','Truck Tire Change',
  'Trailer Tire Change','Roadside Assistance','Mobile Service',
];
const TIME_SLOTS = ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'];

function BookingForm({ onDone, user, vehicles }) {
  const [form, setForm] = useState({ service:'', vehicle:'', date:'', time:'', notes:'' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error,   setError]   = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const minDate = new Date(); minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.service || !form.date || !form.time) { setError('Please fill in service, date, and time.'); return; }
    setError(''); setLoading(true);
    try {
      const res = await fetch(`${API}/bookings`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          name:    user?.displayName || 'Customer',
          email:   user?.email || '',
          phone:   'N/A',
          service: form.service,
          vehicle: form.vehicle,
          date:    form.date,
          time:    form.time,
          notes:   form.notes,
        }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || `Server error ${res.status}`);
      }
      const created = await res.json();
      setSuccess(created);
      onDone(created);
    } catch (err) {
      setError(err.message || 'Could not submit booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div style={{ background:'rgba(34,197,94,0.06)', border:'1px solid rgba(34,197,94,0.22)', borderRadius:16, padding:40, textAlign:'center', marginBottom:28 }}>
      <div style={{ width:70, height:70, borderRadius:'50%', background:'rgba(34,197,94,0.12)', border:'2px solid #22c55e', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 18px' }}>
        <i className="fas fa-circle-check" style={{ color:'#22c55e', fontSize:32 }} />
      </div>
      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, color:'#fff', letterSpacing:'0.05em', marginBottom:8 }}>Booking Confirmed!</div>
      <div style={{ color:'rgba(255,255,255,0.55)', fontSize:14, marginBottom:6, lineHeight:1.7 }}>
        <strong style={{ color:'#fff' }}>{success.service}</strong> — {success.date} at {success.time}
      </div>
      <div style={{ color:'rgba(255,255,255,0.35)', fontSize:12, marginBottom:24 }}>A confirmation has been sent to {user?.email}</div>
      <RedBtn onClick={() => setSuccess(null)}>
        <i className="fas fa-plus" style={{ fontSize:11 }} /> Book Another
      </RedBtn>
    </div>
  );

  return (
    <Card style={{ padding:28, marginBottom:24 }} accent="#e30613">
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:22, paddingTop:6 }}>
        <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:18, fontWeight:700, color:'#fff', letterSpacing:'0.05em' }}>BOOK NEW SERVICE</div>
        <button onClick={() => onDone(null)} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.35)', cursor:'pointer', fontSize:20, lineHeight:1 }}>✕</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:12 }}>
          <Select label="Service Type" value={form.service} onChange={e => set('service', e.target.value)} required>
            <option value="">Select a service…</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </Select>
          {vehicles.length > 0 && (
            <Select label="Your Vehicle" value={form.vehicle} onChange={e => set('vehicle', e.target.value)}>
              <option value="">Select vehicle…</option>
              {vehicles.map(v => <option key={v._id} value={`${v.year} ${v.make} ${v.model}`}>{v.year} {v.make} {v.model} {v.trim}</option>)}
            </Select>
          )}
          <Input label="Date" type="date" value={form.date} min={minDateStr} onChange={e => set('date', e.target.value)} required />
        </div>

        <div style={{ marginBottom:14 }}>
          <label style={{ display:'block', color:'rgba(255,255,255,0.55)', fontSize:11, fontWeight:700, letterSpacing:'0.09em', textTransform:'uppercase', fontFamily:"'Oswald',sans-serif", marginBottom:8 }}>Select Time</label>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {TIME_SLOTS.map(t => (
              <button key={t} type="button" onClick={() => set('time', t)}
                style={{ padding:'9px 15px', borderRadius:9, border:`1px solid ${form.time===t ? '#e30613' : 'rgba(255,255,255,0.12)'}`, background: form.time===t ? 'rgba(227,6,19,0.18)' : 'rgba(255,255,255,0.05)', color: form.time===t ? '#fff' : 'rgba(255,255,255,0.6)', fontSize:13, fontWeight:600, cursor:'pointer', transition:'all 0.15s' }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom:20 }}>
          <label style={{ display:'block', color:'rgba(255,255,255,0.55)', fontSize:11, fontWeight:700, letterSpacing:'0.09em', textTransform:'uppercase', fontFamily:"'Oswald',sans-serif", marginBottom:6 }}>Notes (optional)</label>
          <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={3}
            placeholder="Describe the issue or any special requests…"
            style={{ width:'100%', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.13)', borderRadius:10, padding:'12px 14px', color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box', resize:'vertical', fontFamily:"'Inter',sans-serif" }} />
        </div>

        {error && (
          <div style={{ color:'#ef4444', fontSize:13, marginBottom:14, padding:'11px 14px', background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:9 }}>
            <i className="fas fa-circle-exclamation" style={{ marginRight:8 }} />{error}
          </div>
        )}

        <RedBtn type="submit" style={{ width:'100%', justifyContent:'center', padding:'14px', fontSize:13 }}>
          {loading
            ? <><i className="fas fa-spinner fa-spin" /> Processing…</>
            : <><i className="fas fa-calendar-check" style={{ fontSize:13 }} /> Confirm Booking</>}
        </RedBtn>
      </form>
    </Card>
  );
}

export default function SectionServices({ user }) {
  const [bookings,  setBookings]  = useState([]);
  const [vehicles,  setVehicles]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [showForm,  setShowForm]  = useState(false);

  useEffect(() => {
    if (!user?.email) {
      Promise.resolve().then(() => setLoading(false));
      return;
    }
    Promise.all([
      fetch(`${API}/bookings/mine?email=${encodeURIComponent(user.email)}`).then(r => r.json()).catch(() => []),
      fetch(`${API}/vehicles?email=${encodeURIComponent(user.email)}`).then(r => r.json()).catch(() => []),
    ]).then(([bkgs, vehs]) => {
      setBookings(Array.isArray(bkgs) ? bkgs : []);
      setVehicles(Array.isArray(vehs) ? vehs : []);
    }).finally(() => setLoading(false));
  }, [user]);

  const handleDone = (created) => {
    if (created) setBookings(b => [created, ...b]);
    setShowForm(false);
  };

  return (
    <div>
      <SectionTitle
        title="Service Requests"
        sub={loading ? '' : `${bookings.length} booking${bookings.length !== 1 ? 's' : ''} on record`}
        action={!showForm && (
          <RedBtn onClick={() => setShowForm(true)}>
            <i className="fas fa-calendar-plus" style={{ fontSize:11 }} /> Book Service
          </RedBtn>
        )}
      />

      {showForm && <BookingForm onDone={handleDone} user={user} vehicles={vehicles} />}

      {loading ? <LoadingState /> : bookings.length === 0 && !showForm ? (
        <EmptyState
          icon="fa-screwdriver-wrench"
          title="No Bookings Yet"
          sub="Schedule your first service appointment — tire, oil, brake, alignment and more."
          action={<RedBtn onClick={() => setShowForm(true)}><i className="fas fa-calendar-plus" style={{ fontSize:11 }} /> Book Your First Service</RedBtn>}
        />
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {bookings.map(b => (
            <Card key={b._id} style={{ padding:'20px 24px' }}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
                <div>
                  <div style={{ color:'#fff', fontSize:16, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.03em', marginBottom:8 }}>{b.service}</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:14, fontSize:12, color:'rgba(255,255,255,0.55)' }}>
                    {b.vehicle && <span><i className="fas fa-car" style={{ color:'#e30613', marginRight:5 }} />{b.vehicle}</span>}
                    {b.date    && <span><i className="fas fa-calendar" style={{ color:'#e30613', marginRight:5 }} />{fmtDate(b.date)}</span>}
                    {b.time    && <span><i className="fas fa-clock" style={{ color:'#e30613', marginRight:5 }} />{b.time}</span>}
                  </div>
                  <div style={{ color:'rgba(255,255,255,0.22)', fontSize:11, marginTop:7, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.04em' }}>
                    REF: {b._id?.slice(-8).toUpperCase()}
                  </div>
                </div>
                <Badge status={b.status || 'pending'} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
