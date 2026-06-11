import { useState, useEffect } from 'react';
import { Card, SectionTitle, RedBtn, GhostBtn, Input, LoadingState, EmptyState } from './shared';
import API from '../../config';

const LABELS = ['Home','Work','Other'];
const EMPTY = { label:'Home', name:'', phone:'', line1:'', line2:'', city:'', state:'', zip:'', country:'US', isDefault:false };

function AddressModal({ form, setForm, onSave, onClose, saving, error }) {
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }} onClick={onClose}>
      <div style={{ background:'#131318', border:'1px solid rgba(255,255,255,0.12)', borderRadius:18, padding:28, maxWidth:520, width:'100%', maxHeight:'90vh', overflowY:'auto' }} onClick={e => e.stopPropagation()}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:22 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, color:'#fff', letterSpacing:'0.05em' }}>ADD ADDRESS</div>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.4)', cursor:'pointer', fontSize:20 }}>✕</button>
        </div>

        {/* Label */}
        <div style={{ display:'flex', gap:8, marginBottom:18 }}>
          {LABELS.map(l => (
            <button key={l} onClick={() => set('label', l)}
              style={{ flex:1, padding:'9px', borderRadius:9, border:`1px solid ${form.label===l ? '#e30613' : 'rgba(255,255,255,0.12)'}`, background: form.label===l ? 'rgba(227,6,19,0.12)' : 'transparent', color: form.label===l ? '#fff' : 'rgba(255,255,255,0.5)', cursor:'pointer', fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:13 }}>
              {l}
            </button>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <Input label="Full Name" value={form.name} onChange={e => set('name', e.target.value)} placeholder="John Doe" />
          <Input label="Phone (optional)" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 (415) 000-0000" />
          <div style={{ gridColumn:'1/-1' }}>
            <Input label="Address Line 1" value={form.line1} onChange={e => set('line1', e.target.value)} placeholder="123 Main Street" />
          </div>
          <div style={{ gridColumn:'1/-1' }}>
            <Input label="Address Line 2 (optional)" value={form.line2} onChange={e => set('line2', e.target.value)} placeholder="Apt, Suite, Unit…" />
          </div>
          <Input label="City" value={form.city} onChange={e => set('city', e.target.value)} placeholder="Fremont" />
          <Input label="State" value={form.state} onChange={e => set('state', e.target.value)} placeholder="CA" />
          <Input label="ZIP Code" value={form.zip} onChange={e => set('zip', e.target.value)} placeholder="94536" />
          <Input label="Country" value={form.country} onChange={e => set('country', e.target.value)} placeholder="US" />
        </div>

        <label style={{ display:'flex', alignItems:'center', gap:10, marginTop:16, marginBottom:20, cursor:'pointer' }}>
          <input type="checkbox" checked={form.isDefault} onChange={e => set('isDefault', e.target.checked)}
            style={{ width:16, height:16, accentColor:'#e30613', cursor:'pointer' }} />
          <span style={{ color:'rgba(255,255,255,0.65)', fontSize:13 }}>Set as default address</span>
        </label>

        {error && <div style={{ color:'#ef4444', fontSize:13, marginBottom:14, padding:'10px 14px', background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:8 }}><i className="fas fa-circle-exclamation" style={{ marginRight:7 }} />{error}</div>}

        <RedBtn onClick={onSave} disabled={saving} style={{ width:'100%', justifyContent:'center', padding:'14px' }}>
          {saving ? <><i className="fas fa-spinner fa-spin" /> Saving…</> : <><i className="fas fa-location-dot" style={{ fontSize:12 }} /> Save Address</>}
        </RedBtn>
      </div>
    </div>
  );
}

const LABEL_ICON = { Home:'fa-house', Work:'fa-briefcase', Other:'fa-location-dot' };

export default function SectionAddressBook({ user }) {
  const [addresses,  setAddresses]  = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [showModal,  setShowModal]  = useState(false);
  const [form,       setForm]       = useState(EMPTY);
  const [saving,     setSaving]     = useState(false);
  const [saveError,  setSaveError]  = useState('');
  const [settingDef, setSettingDef] = useState(null);
  const [deleting,   setDeleting]   = useState(null);

  useEffect(() => {
    if (!user?.email) { setLoading(false); return; }
    fetch(`${API}/addresses?email=${encodeURIComponent(user.email)}`)
      .then(r => r.json()).then(d => setAddresses(Array.isArray(d) ? d : [])).catch(() => {}).finally(() => setLoading(false));
  }, [user]);

  const handleSave = async () => {
    if (!form.name || !form.line1 || !form.city || !form.zip) {
      setSaveError('Please fill in Name, Address, City and ZIP.'); return;
    }
    setSaveError(''); setSaving(true);
    try {
      const res = await fetch(`${API}/addresses`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ userEmail: user.email, ...form }),
      });
      if (!res.ok) throw new Error((await res.json()).message);
      const created = await res.json();
      setAddresses(a => form.isDefault ? [created, ...a.map(x => ({ ...x, isDefault:false }))] : [created, ...a]);
      setForm(EMPTY); setShowModal(false);
    } catch (e) { setSaveError(e.message || 'Could not save.'); }
    finally { setSaving(false); }
  };

  const handleSetDefault = async (id) => {
    setSettingDef(id);
    try {
      await fetch(`${API}/addresses/${id}/default?email=${encodeURIComponent(user.email)}`, { method:'PATCH' });
      setAddresses(a => a.map(x => ({ ...x, isDefault: x._id === id })));
    } catch { /* silent */ }
    finally { setSettingDef(null); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this address?')) return;
    setDeleting(id);
    try {
      await fetch(`${API}/addresses/${id}?email=${encodeURIComponent(user.email)}`, { method:'DELETE' });
      setAddresses(a => a.filter(x => x._id !== id));
    } catch { /* silent */ }
    finally { setDeleting(null); }
  };

  return (
    <div>
      <SectionTitle
        title="Address Book"
        sub={loading ? '' : `${addresses.length} address${addresses.length !== 1 ? 'es' : ''} saved`}
        action={
          <GhostBtn onClick={() => setShowModal(true)}>
            <i className="fas fa-plus" style={{ fontSize:10 }} /> Add Address
          </GhostBtn>
        }
      />

      {loading ? <LoadingState /> : addresses.length === 0 ? (
        <EmptyState
          icon="fa-location-dot"
          title="No Addresses Saved"
          sub="Save your shipping and billing addresses for faster checkout."
          action={<RedBtn onClick={() => setShowModal(true)}><i className="fas fa-plus" style={{ fontSize:11 }} /> Add First Address</RedBtn>}
        />
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:16 }}>
          {addresses.map(addr => (
            <Card key={addr._id} style={{ padding:'20px 22px', border: addr.isDefault ? '1px solid rgba(227,6,19,0.35)' : undefined, position:'relative' }}>
              {addr.isDefault && (
                <div style={{ position:'absolute', top:14, right:14, background:'#e30613', color:'#fff', fontSize:9, fontWeight:800, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.07em', borderRadius:99, padding:'3px 10px' }}>DEFAULT</div>
              )}
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                <div style={{ width:36, height:36, borderRadius:9, background:'rgba(227,6,19,0.1)', border:'1px solid rgba(227,6,19,0.25)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <i className={`fas ${LABEL_ICON[addr.label] || 'fa-location-dot'}`} style={{ color:'#e30613', fontSize:14 }} />
                </div>
                <div style={{ color:'#fff', fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:15, letterSpacing:'0.04em' }}>{addr.label}</div>
              </div>
              <div style={{ color:'#fff', fontSize:14, fontWeight:600, marginBottom:4 }}>{addr.name}</div>
              {addr.phone && <div style={{ color:'rgba(255,255,255,0.4)', fontSize:12, marginBottom:4 }}>{addr.phone}</div>}
              <div style={{ color:'rgba(255,255,255,0.55)', fontSize:13, lineHeight:1.6 }}>
                {addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}<br />
                {addr.city}{addr.state ? `, ${addr.state}` : ''} {addr.zip}<br />
                {addr.country}
              </div>
              <div style={{ display:'flex', gap:8, marginTop:14 }}>
                {!addr.isDefault && (
                  <button onClick={() => handleSetDefault(addr._id)} disabled={settingDef === addr._id}
                    style={{ flex:1, padding:'7px 12px', borderRadius:7, border:'1px solid rgba(227,6,19,0.35)', background:'rgba(227,6,19,0.07)', color:'#e30613', fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:"'Oswald',sans-serif" }}>
                    {settingDef === addr._id ? <i className="fas fa-spinner fa-spin" /> : 'Set Default'}
                  </button>
                )}
                <button onClick={() => handleDelete(addr._id)} disabled={deleting === addr._id}
                  style={{ padding:'7px 12px', borderRadius:7, border:'1px solid rgba(255,255,255,0.1)', background:'transparent', color:'rgba(255,255,255,0.3)', fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:"'Oswald',sans-serif" }}
                  onMouseEnter={e => { e.currentTarget.style.color='#ef4444'; e.currentTarget.style.borderColor='rgba(239,68,68,0.35)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color='rgba(255,255,255,0.3)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; }}>
                  {deleting === addr._id ? <i className="fas fa-spinner fa-spin" /> : <i className="fas fa-trash-can" />}
                </button>
              </div>
            </Card>
          ))}

          {/* Add card */}
          <div onClick={() => setShowModal(true)}
            style={{ background:'rgba(255,255,255,0.02)', border:'1.5px dashed rgba(255,255,255,0.1)', borderRadius:16, minHeight:180, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:10, cursor:'pointer', padding:24 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(227,6,19,0.4)'; e.currentTarget.style.background='rgba(227,6,19,0.03)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.background='rgba(255,255,255,0.02)'; }}>
            <div style={{ width:44, height:44, borderRadius:12, background:'rgba(227,6,19,0.08)', border:'1px solid rgba(227,6,19,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <i className="fas fa-plus" style={{ color:'#e30613', fontSize:18 }} />
            </div>
            <span style={{ color:'rgba(255,255,255,0.4)', fontSize:13, fontWeight:600 }}>Add New Address</span>
          </div>
        </div>
      )}

      {showModal && (
        <AddressModal form={form} setForm={setForm} onSave={handleSave} onClose={() => { setShowModal(false); setSaveError(''); }} saving={saving} error={saveError} />
      )}
    </div>
  );
}
