import { useState, useEffect } from 'react';
import { Card, SectionTitle, RedBtn, GhostBtn, Input, Select, LoadingState, EmptyState } from './shared';

import API from '../../config';
const MAKES = ['Toyota','Honda','Ford','Chevrolet','BMW','Mercedes-Benz','Nissan','Hyundai','Kia','Jeep','Dodge','Subaru','Mazda','Volkswagen','Audi','Lexus','Acura'];
const COLORS = ['#e30613','#3b82f6','#22c55e','#f59e0b','#a855f7','#ffffff','#1a1a2e','#64748b'];
const EMPTY_FORM = { year:'', make:'', model:'', trim:'', plate:'', vin:'', mileage:'', color:'#e30613', tireSize:'' };

function VehicleModal({ form, setForm, onSave, onClose, saving, error }) {
  const years = Array.from({ length:30 }, (_, i) => new Date().getFullYear() - i);
  const set = (k, v) => setForm(f => ({ ...f, [k]:v }));

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}
      onClick={onClose}>
      <div style={{ background:'#131318', border:'1px solid rgba(255,255,255,0.12)', borderRadius:18, padding:32, maxWidth:560, width:'100%', maxHeight:'90vh', overflowY:'auto' }}
        onClick={e => e.stopPropagation()}>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, color:'#fff', letterSpacing:'0.05em' }}>ADD VEHICLE</div>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.4)', cursor:'pointer', fontSize:22, lineHeight:1 }}>✕</button>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <Select label="Year" value={form.year} onChange={e => set('year', e.target.value)}>
            <option value="">Select year</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </Select>
          <Select label="Make" value={form.make} onChange={e => set('make', e.target.value)}>
            <option value="">Select make</option>
            {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
          </Select>
          <Input label="Model"          value={form.model}    onChange={e => set('model',    e.target.value)} placeholder="e.g. Camry" />
          <Input label="Trim (optional)"value={form.trim}     onChange={e => set('trim',     e.target.value)} placeholder="e.g. SE, EX" />
          <Input label="License Plate"  value={form.plate}    onChange={e => set('plate',    e.target.value)} placeholder="e.g. 7ABC123" />
          <Input label="Current Mileage"value={form.mileage}  onChange={e => set('mileage',  e.target.value)} placeholder="e.g. 42000" type="number" />
          <Input label="Tire Size"      value={form.tireSize} onChange={e => set('tireSize', e.target.value)} placeholder="e.g. 225/55R17" />
          <Input label="VIN (optional)" value={form.vin}      onChange={e => set('vin',      e.target.value)} placeholder="17-digit VIN" />
        </div>

        <div style={{ marginBottom:24 }}>
          <label style={{ display:'block', color:'rgba(255,255,255,0.55)', fontSize:11, fontWeight:700, letterSpacing:'0.09em', textTransform:'uppercase', fontFamily:"'Oswald',sans-serif", marginBottom:10 }}>Vehicle Color</label>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            {COLORS.map(c => (
              <button key={c} type="button" onClick={() => set('color', c)}
                style={{ width:34, height:34, borderRadius:'50%', background:c, border: form.color===c ? '3px solid #fff' : '2px solid rgba(255,255,255,0.2)', cursor:'pointer', flexShrink:0, boxShadow: form.color===c ? `0 0 0 2px ${c}` : 'none', transition:'all 0.15s' }} />
            ))}
          </div>
        </div>

        {error && (
          <div style={{ color:'#ef4444', fontSize:13, marginBottom:14, padding:'11px 14px', background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:9 }}>
            <i className="fas fa-circle-exclamation" style={{ marginRight:8 }} />{error}
          </div>
        )}
        <RedBtn onClick={onSave} disabled={saving} style={{ width:'100%', justifyContent:'center', padding:'14px', fontSize:13 }}>
          {saving ? <><i className="fas fa-spinner fa-spin" /> Saving…</> : <><i className="fas fa-plus" style={{ fontSize:11 }} /> Add to My Garage</>}
        </RedBtn>
      </div>
    </div>
  );
}

export default function SectionGarage({ user }) {
  const [vehicles,   setVehicles]   = useState([]);
  const [bookings,   setBookings]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [showModal,  setShowModal]  = useState(false);
  const [form,       setForm]       = useState(EMPTY_FORM);
  const [saving,     setSaving]     = useState(false);
  const [saveError,  setSaveError]  = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [deleting,   setDeleting]   = useState(null);

  useEffect(() => {
    if (!user?.email) { setLoading(false); return; }
    Promise.all([
      fetch(`${API}/vehicles?email=${encodeURIComponent(user.email)}`).then(r => r.json()).catch(() => []),
      fetch(`${API}/bookings/mine?email=${encodeURIComponent(user.email)}`).then(r => r.json()).catch(() => []),
    ]).then(([vehs, bkgs]) => {
      setVehicles(Array.isArray(vehs) ? vehs : []);
      setBookings(Array.isArray(bkgs) ? bkgs : []);
    }).finally(() => setLoading(false));
  }, [user]);

  const handleSave = async () => {
    if (!form.year || !form.make || !form.model) {
      setSaveError('Please select Year, Make and enter Model.');
      return;
    }
    setSaveError('');
    setSaving(true);
    try {
      const res = await fetch(`${API}/vehicles`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ userEmail: user.email, year: parseInt(form.year), ...form }),
      });
      if (!res.ok) throw new Error();
      const created = await res.json();
      setVehicles(v => [created, ...v]);
      setForm(EMPTY_FORM);
      setShowModal(false);
    } catch {
      setSaveError('Could not save vehicle. Please try again.');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this vehicle from your garage?')) return;
    setDeleting(id);
    try {
      await fetch(`${API}/vehicles/${id}?email=${encodeURIComponent(user.email)}`, { method:'DELETE' });
      setVehicles(v => v.filter(x => x._id !== id));
    } catch {
      /* silent */
    } finally { setDeleting(null); }
  };

  return (
    <div>
      <SectionTitle
        title="My Garage"
        sub={loading ? '' : `${vehicles.length} vehicle${vehicles.length !== 1 ? 's' : ''} registered`}
        action={<GhostBtn onClick={() => setShowModal(true)}><i className="fas fa-plus" style={{ fontSize:10 }} /> Add Vehicle</GhostBtn>}
      />

      {loading ? <LoadingState /> : vehicles.length === 0 ? (
        <EmptyState
          icon="fa-car"
          title="Your Garage is Empty"
          sub="Add your vehicles to get service reminders, maintenance history, and faster booking."
          action={<RedBtn onClick={() => setShowModal(true)}><i className="fas fa-plus" style={{ fontSize:11 }} /> Add First Vehicle</RedBtn>}
        />
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:18, alignItems:'start' }}>
          {vehicles.map(v => (
            <Card key={v._id} style={{ overflow:'hidden' }}>
              <div style={{ height:4, background:`linear-gradient(90deg,${v.color || '#e30613'},${v.color || '#e30613'}55)` }} />
              <div style={{ padding:'20px 22px' }}>
                {/* Header */}
                <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:16 }}>
                  <div style={{ width:52, height:52, borderRadius:12, background:`${v.color || '#e30613'}16`, border:`1.5px solid ${v.color || '#e30613'}38`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <i className="fas fa-car" style={{ color: v.color || '#e30613', fontSize:22 }} />
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ color:'#fff', fontSize:17, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>{v.year} {v.make} {v.model}</div>
                    <div style={{ color:'rgba(255,255,255,0.4)', fontSize:12, marginTop:2 }}>{v.trim && `${v.trim} · `}{v.plate || 'No plate'}</div>
                  </div>
                  <button onClick={() => handleDelete(v._id)} disabled={deleting === v._id}
                    style={{ background:'none', border:'none', color:'rgba(255,255,255,0.2)', cursor:'pointer', fontSize:14, padding:4, transition:'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}>
                    {deleting === v._id ? <i className="fas fa-spinner fa-spin" /> : <i className="fas fa-trash-can" />}
                  </button>
                </div>

                {/* Oil change reminder */}
                {v.mileage && (() => {
                  const OIL_INTERVAL = 5000;
                  const mileage = Number(v.mileage);
                  const nextDue = Math.ceil(mileage / OIL_INTERVAL) * OIL_INTERVAL;
                  const remaining = nextDue - mileage;
                  const urgent = remaining <= 500;
                  const soon = remaining <= 1500;
                  return (urgent || soon) ? (
                    <div style={{ marginBottom:12, padding:'10px 14px', background: urgent ? 'rgba(239,68,68,0.08)' : 'rgba(245,158,11,0.08)', border:`1px solid ${urgent ? 'rgba(239,68,68,0.3)' : 'rgba(245,158,11,0.3)'}`, borderRadius:9, display:'flex', alignItems:'center', gap:10 }}>
                      <i className={`fas fa-oil-can`} style={{ color: urgent ? '#ef4444' : '#f59e0b', fontSize:14 }} />
                      <div>
                        <div style={{ color: urgent ? '#ef4444' : '#f59e0b', fontSize:12, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>
                          {urgent ? 'Oil Change Overdue!' : `Oil Change Due Soon`}
                        </div>
                        <div style={{ color:'rgba(255,255,255,0.45)', fontSize:11 }}>
                          {remaining <= 0 ? 'Past due' : `${remaining.toLocaleString()} miles remaining`} · Next at {nextDue.toLocaleString()} mi
                        </div>
                      </div>
                    </div>
                  ) : null;
                })()}

                {/* Info grid */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:14 }}>
                  {[
                    ['Mileage',   v.mileage ? `${Number(v.mileage).toLocaleString()} mi` : '—', 'fa-gauge-high'],
                    ['Tire Size', v.tireSize || '—', 'fa-circle-dot'],
                  ].map(([k, val, icon]) => (
                    <div key={k} style={{ background:'rgba(255,255,255,0.04)', borderRadius:8, padding:'10px 12px', display:'flex', alignItems:'flex-start', gap:8 }}>
                      <i className={`fas ${icon}`} style={{ color:'rgba(255,255,255,0.28)', fontSize:12, marginTop:2, flexShrink:0 }} />
                      <div>
                        <div style={{ color:'rgba(255,255,255,0.35)', fontSize:10, textTransform:'uppercase', letterSpacing:'0.06em', fontFamily:"'Oswald',sans-serif" }}>{k}</div>
                        <div style={{ color:'#fff', fontSize:13, fontWeight:600, marginTop:2 }}>{val}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* VIN */}
                {v.vin && (
                  <div style={{ color:'rgba(255,255,255,0.22)', fontSize:11, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.04em', marginBottom:10 }}>
                    VIN: {v.vin}
                  </div>
                )}

                {/* Real maintenance history from bookings */}
                {(() => {
                  const vName = `${v.year} ${v.make} ${v.model}`.toLowerCase();
                  const vBookings = bookings.filter(b => b.vehicle && b.vehicle.toLowerCase().includes(v.make?.toLowerCase()) && b.vehicle.toLowerCase().includes(v.model?.toLowerCase()?.split(' ')[0]));
                  return (
                    <>
                      <button onClick={() => setExpandedId(expandedId === v._id ? null : v._id)}
                        style={{ width:'100%', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:9, padding:'9px 14px', color:'rgba(255,255,255,0.55)', fontSize:12, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between', fontFamily:"'Oswald',sans-serif", letterSpacing:'0.04em' }}>
                        <span><i className="fas fa-history" style={{ marginRight:6, color:'#e30613' }} />SERVICE HISTORY {vBookings.length > 0 && `(${vBookings.length})`}</span>
                        <i className={`fas fa-chevron-${expandedId === v._id ? 'up' : 'down'}`} style={{ fontSize:11 }} />
                      </button>
                      {expandedId === v._id && (
                        <div style={{ marginTop:10, borderRadius:9, overflow:'hidden' }}>
                          {vBookings.length === 0 ? (
                            <div style={{ padding:'12px 14px', background:'rgba(255,255,255,0.03)', color:'rgba(255,255,255,0.4)', fontSize:13, textAlign:'center' }}>
                              No service history for this vehicle yet.
                            </div>
                          ) : vBookings.map((b, i) => (
                            <div key={b._id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 14px', background:'rgba(255,255,255,0.03)', borderBottom: i < vBookings.length-1 ? '1px solid rgba(255,255,255,0.05)' : 'none', gap:10 }}>
                              <div>
                                <div style={{ color:'#fff', fontSize:12, fontWeight:600 }}>{b.service}</div>
                                <div style={{ color:'rgba(255,255,255,0.35)', fontSize:11, marginTop:2 }}>
                                  {b.date ? new Date(b.date).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }) : ''} {b.time ? `· ${b.time}` : ''}
                                </div>
                              </div>
                              <span style={{ fontSize:10, fontWeight:800, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.06em', textTransform:'uppercase', padding:'2px 8px', borderRadius:99,
                                background: b.status==='completed' ? 'rgba(34,197,94,0.12)' : b.status==='cancelled' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                                color: b.status==='completed' ? '#22c55e' : b.status==='cancelled' ? '#ef4444' : '#f59e0b',
                                border: `1px solid ${b.status==='completed' ? 'rgba(34,197,94,0.3)' : b.status==='cancelled' ? 'rgba(239,68,68,0.25)' : 'rgba(245,158,11,0.25)'}`,
                              }}>{b.status}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </Card>
          ))}

          {/* Ghost add card */}
          <div onClick={() => setShowModal(true)}
            style={{ background:'rgba(255,255,255,0.02)', border:'1.5px dashed rgba(255,255,255,0.1)', borderRadius:16, minHeight:180, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:10, cursor:'pointer', transition:'all 0.2s', padding:24 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(227,6,19,0.4)'; e.currentTarget.style.background='rgba(227,6,19,0.03)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.background='rgba(255,255,255,0.02)'; }}>
            <div style={{ width:48, height:48, borderRadius:12, background:'rgba(227,6,19,0.08)', border:'1px solid rgba(227,6,19,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <i className="fas fa-plus" style={{ color:'#e30613', fontSize:18 }} />
            </div>
            <span style={{ color:'rgba(255,255,255,0.4)', fontSize:13, fontWeight:600 }}>Add Another Vehicle</span>
          </div>
        </div>
      )}

      {showModal && (
        <VehicleModal form={form} setForm={setForm} onSave={handleSave} onClose={() => { setShowModal(false); setSaveError(''); }} saving={saving} error={saveError} />
      )}
    </div>
  );
}
