import { useState, useEffect } from 'react';
import { Card, SectionTitle, RedBtn, GhostBtn, Input, Select, LoadingState, EmptyState } from './shared';

const API = 'http://localhost:5000/api';
const MAKES = ['Toyota','Honda','Ford','Chevrolet','BMW','Mercedes-Benz','Nissan','Hyundai','Kia','Jeep','Dodge','Subaru','Mazda','Volkswagen','Audi','Lexus','Acura'];
const COLORS = ['#e30613','#3b82f6','#22c55e','#f59e0b','#a855f7','#ffffff','#1a1a2e','#64748b'];
const EMPTY_FORM = { year:'', make:'', model:'', trim:'', plate:'', vin:'', mileage:'', color:'#e30613', tireSize:'' };

function VehicleModal({ form, setForm, onSave, onClose, saving }) {
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

        <RedBtn onClick={onSave} disabled={saving} style={{ width:'100%', justifyContent:'center', padding:'14px', fontSize:13 }}>
          {saving ? <><i className="fas fa-spinner fa-spin" /> Saving…</> : <><i className="fas fa-plus" style={{ fontSize:11 }} /> Add to My Garage</>}
        </RedBtn>
      </div>
    </div>
  );
}

export default function SectionGarage({ user }) {
  const [vehicles,   setVehicles]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [showModal,  setShowModal]  = useState(false);
  const [form,       setForm]       = useState(EMPTY_FORM);
  const [saving,     setSaving]     = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [deleting,   setDeleting]   = useState(null);

  useEffect(() => {
    if (!user?.email) { setLoading(false); return; }
    fetch(`${API}/vehicles?email=${encodeURIComponent(user.email)}`)
      .then(r => r.json())
      .then(data => setVehicles(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  const handleSave = async () => {
    if (!form.year || !form.make || !form.model) return;
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
      /* silent — could add toast */
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

                {/* History toggle (empty for real vehicles) */}
                <button onClick={() => setExpandedId(expandedId === v._id ? null : v._id)}
                  style={{ width:'100%', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:9, padding:'9px 14px', color:'rgba(255,255,255,0.55)', fontSize:12, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between', fontFamily:"'Oswald',sans-serif", letterSpacing:'0.04em' }}>
                  <span><i className="fas fa-history" style={{ marginRight:6, color:'#e30613' }} />SERVICE HISTORY</span>
                  <i className={`fas fa-chevron-${expandedId === v._id ? 'up' : 'down'}`} style={{ fontSize:11 }} />
                </button>

                {expandedId === v._id && (
                  <div style={{ marginTop:10, padding:'12px 14px', background:'rgba(255,255,255,0.03)', borderRadius:9, color:'rgba(255,255,255,0.4)', fontSize:13, textAlign:'center' }}>
                    No service history recorded yet. Completed appointments will appear here.
                  </div>
                )}
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
        <VehicleModal form={form} setForm={setForm} onSave={handleSave} onClose={() => setShowModal(false)} saving={saving} />
      )}
    </div>
  );
}
