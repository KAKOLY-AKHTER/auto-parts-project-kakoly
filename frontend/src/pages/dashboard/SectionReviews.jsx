import { useState, useEffect } from 'react';
import { Card, SectionTitle, RedBtn, LoadingState, EmptyState, Select } from './shared';
import API from '../../config';

function Stars({ value, onChange, size = 22 }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display:'flex', gap:4 }}>
      {[1,2,3,4,5].map(n => (
        <span key={n}
          onClick={() => onChange && onChange(n)}
          onMouseEnter={() => onChange && setHover(n)}
          onMouseLeave={() => onChange && setHover(0)}
          style={{ fontSize:size, cursor: onChange ? 'pointer' : 'default', color: n <= (hover || value) ? '#f59e0b' : 'rgba(255,255,255,0.15)', transition:'color 0.1s', lineHeight:1 }}>
          ★
        </span>
      ))}
    </div>
  );
}

const SERVICES = [
  'Tire Service & Repair','Oil Change','Brake Repair','Wheel Alignment',
  'Battery Replacement','A/C Evaluation','Roadside Assistance','Mobile Service',
];

function ReviewForm({ user, onDone, onClose }) {
  const [type,    setType]    = useState('service');
  const [refName, setRefName] = useState('');
  const [rating,  setRating]  = useState(0);
  const [title,   setTitle]   = useState('');
  const [body,    setBody]    = useState('');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const handleSubmit = async () => {
    if (!refName || !rating) { setError('Please select what you are reviewing and give a star rating.'); return; }
    setError(''); setLoading(true);
    try {
      const res = await fetch(`${API}/reviews`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ userEmail: user.email, userName: user.displayName || 'Customer', type, refId: refName, refName, rating, title, body }),
      });
      if (!res.ok) throw new Error((await res.json()).message);
      onDone(await res.json());
    } catch (e) { setError(e.message || 'Could not submit review.'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }} onClick={onClose}>
      <div style={{ background:'#131318', border:'1px solid rgba(255,255,255,0.12)', borderRadius:18, padding:28, maxWidth:'min(500px,95vw)', width:'100%', maxHeight:'90vh', overflowY:'auto' }} onClick={e => e.stopPropagation()}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:22 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, color:'#fff', letterSpacing:'0.05em' }}>WRITE A REVIEW</div>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.4)', cursor:'pointer', fontSize:20 }}>✕</button>
        </div>

        {/* Type toggle */}
        <div style={{ display:'flex', gap:8, marginBottom:18 }}>
          {[['service','fa-screwdriver-wrench','Service'],['product','fa-box','Product']].map(([val,icon,label]) => (
            <button key={val} onClick={() => { setType(val); setRefName(''); }}
              style={{ flex:1, padding:'10px', borderRadius:9, border:`1px solid ${type===val ? '#e30613' : 'rgba(255,255,255,0.12)'}`, background: type===val ? 'rgba(227,6,19,0.12)' : 'transparent', color: type===val ? '#fff' : 'rgba(255,255,255,0.5)', cursor:'pointer', fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:13, letterSpacing:'0.05em' }}>
              <i className={`fas ${icon}`} style={{ marginRight:7 }} />{label}
            </button>
          ))}
        </div>

        {/* What to review */}
        <div style={{ marginBottom:16 }}>
          <label style={{ display:'block', color:'rgba(255,255,255,0.55)', fontSize:11, fontWeight:700, letterSpacing:'0.09em', textTransform:'uppercase', fontFamily:"'Oswald',sans-serif", marginBottom:6 }}>
            {type === 'service' ? 'Which Service?' : 'Product Name'}
          </label>
          {type === 'service' ? (
            <Select value={refName} onChange={e => setRefName(e.target.value)}>
              <option value="">Select service…</option>
              {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
            </Select>
          ) : (
            <input value={refName} onChange={e => setRefName(e.target.value)} placeholder="e.g. Michelin Pilot Sport 4"
              style={{ width:'100%', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.13)', borderRadius:10, padding:'11px 14px', color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box' }} />
          )}
        </div>

        {/* Stars */}
        <div style={{ marginBottom:18 }}>
          <label style={{ display:'block', color:'rgba(255,255,255,0.55)', fontSize:11, fontWeight:700, letterSpacing:'0.09em', textTransform:'uppercase', fontFamily:"'Oswald',sans-serif", marginBottom:8 }}>Your Rating</label>
          <Stars value={rating} onChange={setRating} size={32} />
          {rating > 0 && <div style={{ color:'rgba(255,255,255,0.4)', fontSize:12, marginTop:5 }}>{['','Poor','Fair','Good','Very Good','Excellent'][rating]}</div>}
        </div>

        {/* Title */}
        <div style={{ marginBottom:12 }}>
          <label style={{ display:'block', color:'rgba(255,255,255,0.55)', fontSize:11, fontWeight:700, letterSpacing:'0.09em', textTransform:'uppercase', fontFamily:"'Oswald',sans-serif", marginBottom:6 }}>Review Title (optional)</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Summarize your experience…"
            style={{ width:'100%', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.13)', borderRadius:10, padding:'11px 14px', color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box' }} />
        </div>

        {/* Body */}
        <div style={{ marginBottom:18 }}>
          <label style={{ display:'block', color:'rgba(255,255,255,0.55)', fontSize:11, fontWeight:700, letterSpacing:'0.09em', textTransform:'uppercase', fontFamily:"'Oswald',sans-serif", marginBottom:6 }}>Your Review (optional)</label>
          <textarea value={body} onChange={e => setBody(e.target.value)} rows={4} placeholder="Tell us about your experience…"
            style={{ width:'100%', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.13)', borderRadius:10, padding:'11px 14px', color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box', resize:'vertical', fontFamily:'inherit' }} />
        </div>

        {error && <div style={{ color:'#ef4444', fontSize:13, marginBottom:14, padding:'10px 14px', background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:8 }}><i className="fas fa-circle-exclamation" style={{ marginRight:7 }} />{error}</div>}

        <RedBtn onClick={handleSubmit} disabled={loading} style={{ width:'100%', justifyContent:'center', padding:'14px' }}>
          {loading ? <><i className="fas fa-spinner fa-spin" /> Submitting…</> : <><i className="fas fa-star" style={{ fontSize:11 }} /> Submit Review</>}
        </RedBtn>
      </div>
    </div>
  );
}

function ReviewCard({ review, onDelete }) {
  const [deleting, setDeleting] = useState(false);
  const date = review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' }) : '';

  const handleDelete = async () => {
    if (!window.confirm('Delete this review?')) return;
    setDeleting(true);
    await onDelete(review._id);
    setDeleting(false);
  };

  return (
    <Card style={{ padding:'20px 24px' }}>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12, marginBottom:10 }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
            <span style={{ background: review.type === 'service' ? 'rgba(34,197,94,0.1)' : 'rgba(59,130,246,0.1)', border:`1px solid ${review.type === 'service' ? 'rgba(34,197,94,0.3)' : 'rgba(59,130,246,0.3)'}`, borderRadius:6, padding:'2px 10px', fontSize:10, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.06em', color: review.type === 'service' ? '#22c55e' : '#60a5fa', textTransform:'uppercase' }}>
              {review.type}
            </span>
            <Stars value={review.rating} size={15} />
          </div>
          <div style={{ color:'#fff', fontSize:15, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>{review.refName}</div>
          {review.title && <div style={{ color:'rgba(255,255,255,0.7)', fontSize:13, fontWeight:600, marginTop:4 }}>{review.title}</div>}
        </div>
        <button onClick={handleDelete} disabled={deleting}
          style={{ background:'none', border:'none', color:'rgba(255,255,255,0.2)', cursor:'pointer', fontSize:14, padding:4, flexShrink:0 }}
          onMouseEnter={e => e.currentTarget.style.color='#ef4444'} onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.2)'}>
          {deleting ? <i className="fas fa-spinner fa-spin" /> : <i className="fas fa-trash-can" />}
        </button>
      </div>
      {review.body && <div style={{ color:'rgba(255,255,255,0.5)', fontSize:13, lineHeight:1.6, marginBottom:8 }}>{review.body}</div>}
      <div style={{ color:'rgba(255,255,255,0.25)', fontSize:11, fontFamily:"'Oswald',sans-serif" }}>{date}</div>
    </Card>
  );
}

export default function SectionReviews({ user }) {
  const [reviews,   setReviews]   = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [showForm,  setShowForm]  = useState(false);
  const [success,   setSuccess]   = useState(false);

  useEffect(() => {
    if (!user?.email) { setLoading(false); return; }
    fetch(`${API}/reviews/mine?email=${encodeURIComponent(user.email)}`)
      .then(r => r.json()).then(d => setReviews(Array.isArray(d) ? d : [])).catch(() => {}).finally(() => setLoading(false));
  }, [user]);

  const handleDone = (review) => {
    setReviews(r => [review, ...r]);
    setShowForm(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/reviews/${id}?email=${encodeURIComponent(user.email)}`, { method:'DELETE' });
    setReviews(r => r.filter(x => x._id !== id));
  };

  return (
    <div>
      <SectionTitle
        title="Reviews & Ratings"
        sub={loading ? '' : `${reviews.length} review${reviews.length !== 1 ? 's' : ''} submitted`}
        action={
          <RedBtn onClick={() => setShowForm(true)}>
            <i className="fas fa-star" style={{ fontSize:11 }} /> Write a Review
          </RedBtn>
        }
      />

      {success && (
        <div style={{ background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.25)', borderRadius:12, padding:'14px 20px', marginBottom:20, color:'#22c55e', fontWeight:600, fontSize:13 }}>
          <i className="fas fa-circle-check" style={{ marginRight:8 }} /> Review submitted successfully!
        </div>
      )}

      {loading ? <LoadingState /> : reviews.length === 0 ? (
        <EmptyState
          icon="fa-star"
          title="No Reviews Yet"
          sub="Share your experience with our services and products. Your feedback helps us improve."
          action={<RedBtn onClick={() => setShowForm(true)}><i className="fas fa-star" style={{ fontSize:11 }} /> Write First Review</RedBtn>}
        />
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {reviews.map(r => <ReviewCard key={r._id} review={r} onDelete={handleDelete} />)}
        </div>
      )}

      {showForm && <ReviewForm user={user} onDone={handleDone} onClose={() => setShowForm(false)} />}
    </div>
  );
}
