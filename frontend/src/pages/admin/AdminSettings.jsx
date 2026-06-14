import { useState, useEffect } from 'react';
import API from '../../config';

const Field = ({ label, hint, value, onChange, prefix, suffix }) => (
  <div>
    <label style={{ display:'block', color:'rgba(255,255,255,0.5)', fontSize:11, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:8 }}>
      {label}
    </label>
    {hint && <p style={{ color:'rgba(255,255,255,0.3)', fontSize:12, marginBottom:8, marginTop:-4 }}>{hint}</p>}
    <div style={{ display:'flex', alignItems:'center', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:10, overflow:'hidden' }}>
      {prefix && <span style={{ padding:'0 14px', color:'rgba(255,255,255,0.4)', fontSize:14, borderRight:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.03)' }}>{prefix}</span>}
      <input
        type="number"
        step="any"
        min="0"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ flex:1, background:'transparent', border:'none', outline:'none', padding:'12px 16px', color:'#fff', fontSize:15, fontWeight:600 }}
      />
      {suffix && <span style={{ padding:'0 14px', color:'rgba(255,255,255,0.4)', fontSize:14, borderLeft:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.03)' }}>{suffix}</span>}
    </div>
  </div>
);

export default function AdminSettings({ token }) {
  const [form, setForm]     = useState({ taxRate:'', shippingCost:'', shippingThreshold:'', referralDiscount:'' });
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [error,   setError]   = useState('');

  useEffect(() => {
    fetch(`${API}/settings`)
      .then(r => r.json())
      .then(d => {
        setForm({
          taxRate:           String((d.taxRate * 100).toFixed(4)),
          shippingCost:      String(d.shippingCost),
          shippingThreshold: String(d.shippingThreshold),
          referralDiscount:  String((d.referralDiscount * 100).toFixed(0)),
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async (e) => {
    e.preventDefault();
    setError(''); setSaving(true);
    try {
      const res = await fetch(`${API}/settings`, {
        method: 'PATCH',
        headers: { 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
        body: JSON.stringify({
          taxRate:           parseFloat(form.taxRate) / 100,
          shippingCost:      parseFloat(form.shippingCost),
          shippingThreshold: parseFloat(form.shippingThreshold),
          referralDiscount:  parseFloat(form.referralDiscount) / 100,
        }),
      });
      if (!res.ok) throw new Error('Failed to save');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError('Could not save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const cardStyle = {
    background:'rgba(255,255,255,0.03)',
    border:'1px solid rgba(255,255,255,0.08)',
    borderRadius:14,
    padding:24,
    marginBottom:20,
  };

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:300 }}>
      <div style={{ color:'rgba(255,255,255,0.4)', fontSize:14 }}>Loading settings…</div>
    </div>
  );

  return (
    <div style={{ maxWidth:640 }}>
      <div style={{ marginBottom:28 }}>
        <h2 style={{ color:'#fff', fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:22, letterSpacing:'0.04em', margin:0 }}>Store Settings</h2>
        <p style={{ color:'rgba(255,255,255,0.35)', fontSize:13, marginTop:6 }}>Configure tax, shipping, and discount rates. Changes apply immediately to the cart.</p>
      </div>

      <form onSubmit={handleSave}>

        {/* Shipping */}
        <div style={cardStyle}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
            <div style={{ width:36, height:36, borderRadius:9, background:'rgba(59,130,246,0.15)', border:'1px solid rgba(59,130,246,0.25)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <i className="fas fa-truck" style={{ color:'#3b82f6', fontSize:15 }} />
            </div>
            <div>
              <div style={{ color:'#fff', fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:15, letterSpacing:'0.04em' }}>Shipping</div>
              <div style={{ color:'rgba(255,255,255,0.3)', fontSize:11 }}>Flat rate cost & free shipping threshold</div>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16 }}>
            <Field
              label="Shipping Cost"
              hint="Charged when subtotal is below threshold"
              prefix="$"
              value={form.shippingCost}
              onChange={v => set('shippingCost', v)}
            />
            <Field
              label="Free Shipping Threshold"
              hint="Orders above this get free shipping"
              prefix="$"
              value={form.shippingThreshold}
              onChange={v => set('shippingThreshold', v)}
            />
          </div>
        </div>

        {/* Tax */}
        <div style={cardStyle}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
            <div style={{ width:36, height:36, borderRadius:9, background:'rgba(245,158,11,0.15)', border:'1px solid rgba(245,158,11,0.25)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <i className="fas fa-percent" style={{ color:'#f59e0b', fontSize:15 }} />
            </div>
            <div>
              <div style={{ color:'#fff', fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:15, letterSpacing:'0.04em' }}>Sales Tax</div>
              <div style={{ color:'rgba(255,255,255,0.3)', fontSize:11 }}>Applied to order subtotal at checkout</div>
            </div>
          </div>
          <Field
            label="Tax Rate (%)"
            hint="E.g. enter 8.75 for 8.75% tax"
            suffix="%"
            value={form.taxRate}
            onChange={v => set('taxRate', v)}
          />
          <div style={{ marginTop:12, background:'rgba(245,158,11,0.06)', border:'1px solid rgba(245,158,11,0.15)', borderRadius:8, padding:'10px 14px' }}>
            <p style={{ color:'rgba(255,255,255,0.45)', fontSize:12, margin:0 }}>
              California state + Alameda County combined rate is currently <strong style={{ color:'rgba(255,255,255,0.7)' }}>8.75%</strong> (default).
            </p>
          </div>
        </div>

        {/* Referral */}
        <div style={cardStyle}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
            <div style={{ width:36, height:36, borderRadius:9, background:'rgba(168,85,247,0.15)', border:'1px solid rgba(168,85,247,0.25)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <i className="fas fa-user-plus" style={{ color:'#a855f7', fontSize:15 }} />
            </div>
            <div>
              <div style={{ color:'#fff', fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:15, letterSpacing:'0.04em' }}>Referral Discount</div>
              <div style={{ color:'rgba(255,255,255,0.3)', fontSize:11 }}>% off for new users who sign up via referral link</div>
            </div>
          </div>
          <Field
            label="Referral Discount (%)"
            hint="Applied to the referred user's first order"
            suffix="%"
            value={form.referralDiscount}
            onChange={v => set('referralDiscount', v)}
          />
        </div>

        {/* Preview */}
        <div style={{ ...cardStyle, background:'rgba(220,38,38,0.04)', border:'1px solid rgba(220,38,38,0.15)' }}>
          <div style={{ color:'rgba(255,255,255,0.5)', fontSize:11, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:14 }}>Live Preview — $100 Order</div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {[
              { label:'Subtotal',           val:`$100.00` },
              { label:`Shipping (free over $${form.shippingThreshold})`, val: 100 >= parseFloat(form.shippingThreshold) ? 'FREE' : `$${parseFloat(form.shippingCost||0).toFixed(2)}` },
              { label:`Tax (${form.taxRate}%)`, val:`$${(100 * parseFloat(form.taxRate||0) / 100).toFixed(2)}` },
              { label:`Referral Discount (${form.referralDiscount}%)`, val:`-$${(100 * parseFloat(form.referralDiscount||0) / 100).toFixed(2)}` },
            ].map(({ label, val }) => (
              <div key={label} style={{ display:'flex', justifyContent:'space-between', fontSize:13 }}>
                <span style={{ color:'rgba(255,255,255,0.4)' }}>{label}</span>
                <span style={{ color:'rgba(255,255,255,0.8)', fontWeight:600 }}>{val}</span>
              </div>
            ))}
            <div style={{ borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:10, display:'flex', justifyContent:'space-between' }}>
              <span style={{ color:'#fff', fontWeight:700 }}>Total</span>
              <span style={{ color:'#dc2626', fontWeight:800, fontSize:16 }}>
                ${Math.max(0,
                  100
                  + (100 >= parseFloat(form.shippingThreshold) ? 0 : parseFloat(form.shippingCost||0))
                  + (100 * parseFloat(form.taxRate||0) / 100)
                  - (100 * parseFloat(form.referralDiscount||0) / 100)
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {error && (
          <div style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:10, padding:'12px 16px', color:'#fca5a5', fontSize:13, marginBottom:16 }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          style={{ padding:'14px 32px', background: saved ? '#22c55e' : '#e30613', border:'none', borderRadius:11, color:'#fff', fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:14, letterSpacing:'0.08em', textTransform:'uppercase', cursor:saving?'not-allowed':'pointer', opacity:saving?0.7:1, transition:'all 0.2s', display:'flex', alignItems:'center', gap:10 }}
        >
          {saving ? (
            <><i className="fas fa-spinner fa-spin" />Saving…</>
          ) : saved ? (
            <><i className="fas fa-check" />Saved!</>
          ) : (
            <><i className="fas fa-save" />Save Settings</>
          )}
        </button>
      </form>
    </div>
  );
}
