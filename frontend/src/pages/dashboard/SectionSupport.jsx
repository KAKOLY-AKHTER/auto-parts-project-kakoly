import { useState, useEffect, useRef } from 'react';
import { Card, SectionTitle, RedBtn, LoadingState, EmptyState } from './shared';
import API from '../../config';

const STATUS_COLOR = { open:'#f59e0b', replied:'#22c55e', closed:'rgba(255,255,255,0.3)' };

function TicketThread({ ticket, userEmail, onUpdate, onClose }) {
  const [reply, setReply]   = useState('');
  const [sending, setSending] = useState(false);
  const [closing, setClosing] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }); }, [ticket.messages]);

  const sendReply = async () => {
    if (!reply.trim()) return;
    setSending(true);
    try {
      const res = await fetch(`${API}/tickets/${ticket._id}/reply?email=${encodeURIComponent(userEmail)}`, {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ text: reply }),
      });
      if (!res.ok) throw new Error();
      onUpdate(await res.json());
      setReply('');
    } catch { /* silent */ } finally { setSending(false); }
  };

  const closeTicket = async () => {
    setClosing(true);
    try {
      const res = await fetch(`${API}/tickets/${ticket._id}/close?email=${encodeURIComponent(userEmail)}`, { method:'PATCH' });
      if (!res.ok) throw new Error();
      onUpdate(await res.json());
    } catch { /* silent */ } finally { setClosing(false); }
  };

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.88)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }} onClick={onClose}>
      <div style={{ background:'#131318', border:'1px solid rgba(255,255,255,0.12)', borderRadius:18, padding:0, maxWidth:'min(580px,95vw)', width:'100%', maxHeight:'90vh', display:'flex', flexDirection:'column', overflow:'hidden' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding:'20px 24px', borderBottom:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
          <div>
            <div style={{ color:'#fff', fontWeight:700, fontSize:15, fontFamily:"'Oswald',sans-serif" }}>{ticket.subject}</div>
            <div style={{ color:'rgba(255,255,255,0.35)', fontSize:11, marginTop:2 }}>#{ticket._id?.slice(-8).toUpperCase()} · <span style={{ color: STATUS_COLOR[ticket.status] }}>{ticket.status?.toUpperCase()}</span></div>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            {ticket.status !== 'closed' && (
              <button onClick={closeTicket} disabled={closing}
                style={{ padding:'6px 14px', borderRadius:7, border:'1px solid rgba(255,255,255,0.15)', background:'transparent', color:'rgba(255,255,255,0.4)', fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:"'Oswald',sans-serif" }}>
                {closing ? <i className="fas fa-spinner fa-spin" /> : 'Close Ticket'}
              </button>
            )}
            <button onClick={onClose} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.4)', cursor:'pointer', fontSize:20, padding:'0 4px' }}>✕</button>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex:1, overflowY:'auto', padding:'20px 24px', display:'flex', flexDirection:'column', gap:12 }}>
          {ticket.messages?.map((msg, i) => (
            <div key={i} style={{ display:'flex', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row', gap:10 }}>
              <div style={{ width:32, height:32, borderRadius:'50%', background: msg.sender === 'user' ? 'rgba(227,6,19,0.2)' : 'rgba(59,130,246,0.2)', border:`1px solid ${msg.sender === 'user' ? 'rgba(227,6,19,0.4)' : 'rgba(59,130,246,0.4)'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:12 }}>
                <i className={`fas ${msg.sender === 'user' ? 'fa-user' : 'fa-headset'}`} style={{ color: msg.sender === 'user' ? '#e30613' : '#60a5fa' }} />
              </div>
              <div style={{ maxWidth:'75%' }}>
                <div style={{ background: msg.sender === 'user' ? 'rgba(227,6,19,0.1)' : 'rgba(59,130,246,0.1)', border:`1px solid ${msg.sender === 'user' ? 'rgba(227,6,19,0.2)' : 'rgba(59,130,246,0.2)'}`, borderRadius:12, padding:'10px 14px' }}>
                  <div style={{ color:'#fff', fontSize:13, lineHeight:1.55 }}>{msg.text}</div>
                </div>
                <div style={{ color:'rgba(255,255,255,0.25)', fontSize:10, marginTop:4, textAlign: msg.sender === 'user' ? 'right' : 'left', fontFamily:"'Oswald',sans-serif" }}>
                  {msg.sender === 'user' ? 'You' : 'Support'} · {new Date(msg.createdAt).toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' })}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Reply box */}
        {ticket.status !== 'closed' && (
          <div style={{ padding:'16px 24px', borderTop:'1px solid rgba(255,255,255,0.07)', flexShrink:0 }}>
            <div style={{ display:'flex', gap:10 }}>
              <textarea value={reply} onChange={e => setReply(e.target.value)} placeholder="Type your message…" rows={2}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendReply(); }}}
                style={{ flex:1, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.13)', borderRadius:10, padding:'10px 14px', color:'#fff', fontSize:13, outline:'none', resize:'none', fontFamily:'inherit' }} />
              <RedBtn onClick={sendReply} disabled={sending || !reply.trim()} style={{ alignSelf:'flex-end', padding:'10px 18px' }}>
                {sending ? <i className="fas fa-spinner fa-spin" /> : <i className="fas fa-paper-plane" />}
              </RedBtn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NewTicketModal({ user, onDone, onClose }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const SUBJECTS = ['Service appointment issue','Order problem','Billing question','Technical support','General inquiry','Damaged product'];

  const handleSubmit = async () => {
    if (!subject || !message.trim()) { setError('Please select a subject and write your message.'); return; }
    setError(''); setLoading(true);
    try {
      const res = await fetch(`${API}/tickets`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ userEmail: user.email, userName: user.displayName || 'Customer', subject, message }),
      });
      if (!res.ok) throw new Error((await res.json()).message);
      onDone(await res.json());
    } catch (e) { setError(e.message || 'Could not create ticket.'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.88)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }} onClick={onClose}>
      <div style={{ background:'#131318', border:'1px solid rgba(255,255,255,0.12)', borderRadius:18, padding:28, maxWidth:'min(500px,95vw)', width:'100%' }} onClick={e => e.stopPropagation()}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:22 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, color:'#fff', letterSpacing:'0.05em' }}>NEW SUPPORT TICKET</div>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.4)', cursor:'pointer', fontSize:20 }}>✕</button>
        </div>

        <div style={{ marginBottom:14 }}>
          <label style={{ display:'block', color:'rgba(255,255,255,0.55)', fontSize:11, fontWeight:700, letterSpacing:'0.09em', textTransform:'uppercase', fontFamily:"'Oswald',sans-serif", marginBottom:6 }}>Subject</label>
          <select value={subject} onChange={e => setSubject(e.target.value)}
            style={{ width:'100%', background:'#1a1a24', border:'1px solid rgba(255,255,255,0.13)', borderRadius:10, padding:'11px 14px', color: subject ? '#fff' : 'rgba(255,255,255,0.35)', fontSize:14, outline:'none', boxSizing:'border-box' }}>
            <option value="">Select subject…</option>
            {SUBJECTS.map(s => <option key={s} value={s} style={{ background:'#1a1a24', color:'#fff' }}>{s}</option>)}
          </select>
        </div>

        <div style={{ marginBottom:18 }}>
          <label style={{ display:'block', color:'rgba(255,255,255,0.55)', fontSize:11, fontWeight:700, letterSpacing:'0.09em', textTransform:'uppercase', fontFamily:"'Oswald',sans-serif", marginBottom:6 }}>Message</label>
          <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5} placeholder="Describe your issue in detail…"
            style={{ width:'100%', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.13)', borderRadius:10, padding:'11px 14px', color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box', resize:'vertical', fontFamily:'inherit' }} />
        </div>

        {error && <div style={{ color:'#ef4444', fontSize:13, marginBottom:14, padding:'10px 14px', background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:8 }}>{error}</div>}

        <RedBtn onClick={handleSubmit} disabled={loading} style={{ width:'100%', justifyContent:'center', padding:'14px' }}>
          {loading ? <><i className="fas fa-spinner fa-spin" /> Creating…</> : <><i className="fas fa-ticket" style={{ fontSize:11 }} /> Submit Ticket</>}
        </RedBtn>
      </div>
    </div>
  );
}

export default function SectionSupport({ user }) {
  const [tickets,     setTickets]     = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [showNew,     setShowNew]     = useState(false);
  const [openTicket,  setOpenTicket]  = useState(null);

  useEffect(() => {
    if (!user?.email) { setLoading(false); return; }
    fetch(`${API}/tickets/mine?email=${encodeURIComponent(user.email)}`)
      .then(r => r.json()).then(d => setTickets(Array.isArray(d) ? d : [])).catch(() => {}).finally(() => setLoading(false));
  }, [user]);

  const handleNew = (ticket) => { setTickets(t => [ticket, ...t]); setShowNew(false); setOpenTicket(ticket); };
  const handleUpdate = (updated) => {
    setTickets(t => t.map(x => x._id === updated._id ? updated : x));
    setOpenTicket(updated);
  };

  return (
    <div>
      <SectionTitle
        title="Support Tickets"
        sub={loading ? '' : `${tickets.length} ticket${tickets.length !== 1 ? 's' : ''}`}
        action={
          <RedBtn onClick={() => setShowNew(true)}>
            <i className="fas fa-plus" style={{ fontSize:11 }} /> New Ticket
          </RedBtn>
        }
      />

      {/* Contact bar */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(220px,100%),1fr))', gap:12, marginBottom:24 }}>
        <a href="tel:+14156347777" style={{ display:'flex', alignItems:'center', gap:12, background:'rgba(227,6,19,0.07)', border:'1px solid rgba(227,6,19,0.2)', borderRadius:12, padding:'14px 18px', textDecoration:'none', color:'#fff' }}>
          <i className="fas fa-phone" style={{ color:'#e30613', fontSize:18 }} />
          <div><div style={{ fontWeight:700, fontSize:14, fontFamily:"'Oswald',sans-serif" }}>(415) 634-7777</div><div style={{ color:'rgba(255,255,255,0.4)', fontSize:11 }}>Call or Text — 24/7</div></div>
        </a>
        <a href="/contacts" style={{ display:'flex', alignItems:'center', gap:12, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, padding:'14px 18px', textDecoration:'none', color:'#fff' }}>
          <i className="fas fa-envelope" style={{ color:'rgba(255,255,255,0.4)', fontSize:18 }} />
          <div><div style={{ fontWeight:700, fontSize:14, fontFamily:"'Oswald',sans-serif" }}>Send a Message</div><div style={{ color:'rgba(255,255,255,0.4)', fontSize:11 }}>We reply within 2 hours</div></div>
        </a>
      </div>

      {loading ? <LoadingState /> : tickets.length === 0 ? (
        <EmptyState icon="fa-headset" title="No Support Tickets" sub="Have an issue? Create a support ticket and our team will get back to you."
          action={<RedBtn onClick={() => setShowNew(true)}><i className="fas fa-plus" style={{ fontSize:11 }} /> Create First Ticket</RedBtn>}
        />
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {tickets.map(t => (
            <Card key={t._id} onClick={() => setOpenTicket(t)} style={{ padding:'18px 22px', cursor:'pointer' }}
              onMouseEnter={e => e.currentTarget.style.borderColor='rgba(227,6,19,0.3)'}
              onMouseLeave={e => e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ color:'#fff', fontSize:14, fontWeight:700, fontFamily:"'Oswald',sans-serif", marginBottom:4 }}>{t.subject}</div>
                  <div style={{ color:'rgba(255,255,255,0.35)', fontSize:12 }}>
                    #{t._id?.slice(-8).toUpperCase()} · {t.messages?.length} message{t.messages?.length !== 1 ? 's' : ''} · {new Date(t.createdAt).toLocaleDateString('en-US', { month:'short', day:'numeric' })}
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ background:`${STATUS_COLOR[t.status]}18`, border:`1px solid ${STATUS_COLOR[t.status]}40`, color:STATUS_COLOR[t.status], borderRadius:99, padding:'3px 12px', fontSize:10, fontWeight:800, fontFamily:"'Oswald',sans-serif", letterSpacing:'0.06em', textTransform:'uppercase', whiteSpace:'nowrap' }}>{t.status}</span>
                  <i className="fas fa-chevron-right" style={{ color:'rgba(255,255,255,0.25)', fontSize:11 }} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {showNew     && <NewTicketModal user={user} onDone={handleNew} onClose={() => setShowNew(false)} />}
      {openTicket  && <TicketThread ticket={openTicket} userEmail={user.email} onUpdate={handleUpdate} onClose={() => setOpenTicket(null)} />}
    </div>
  );
}
