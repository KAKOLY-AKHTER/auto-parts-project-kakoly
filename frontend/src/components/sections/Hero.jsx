import { useState, useEffect } from "react";
import API from "../../config";

const SLIDES = ["/red-tire1.png","/red-oil.png", "/red-tire2.png", "/red-oil1.png"];

const checks = [
  { label:"Tires",               icon:"fa-circle-dot" },
  { label:"Oil Change",          icon:"fa-oil-can" },
  { label:"Auto Service",        icon:"fa-screwdriver-wrench" },
  { label:"Roadside Assistance", icon:"fa-truck-medical" },
];

const SERVICES = [
  { value:"Tire Service & Repair",  icon:"fa-circle-dot",           label:"Tire Service" },
  { value:"Oil Change",             icon:"fa-oil-can",              label:"Oil Change" },
  { value:"Brake Repair",           icon:"fa-circle-stop",          label:"Brake Repair" },
  { value:"Wheel Alignment",        icon:"fa-car",                  label:"Wheel Align" },
  { value:"Battery Replacement",    icon:"fa-car-battery",          label:"Battery" },
  { value:"A/C Evaluation",         icon:"fa-snowflake",            label:"A/C Service" },
  { value:"Roadside Assistance",    icon:"fa-truck-medical",        label:"Roadside" },
  { value:"Mobile Service",         icon:"fa-mobile-screen-button", label:"Mobile" },
];

const stats = [
  { icon:"fa-truck",       title:"Fully Equipped",          desc:"Mobile Service Trucks",    href:"/fully-equipped" },
  { icon:"fa-users",       title:"Experienced Technicians", desc:"Trained & Certified",      href:"/our-technicians" },
  { icon:"fa-certificate", title:"Quality Parts & Oils",    desc:"Top Brands You Trust",     href:"/quality-parts" },
  { icon:"fa-tag",         title:"Honest Pricing",          desc:"No Hidden Fees",           href:"/pricing" },
  { icon:"fa-handshake",   title:"Satisfaction Guaranteed", desc:"We Stand Behind Our Work", href:"/satisfaction" },
];

const CSS = `
  @keyframes fadeLeft  { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:none} }
  @keyframes fadeUp    { from{opacity:0;transform:translateY(30px)}  to{opacity:1;transform:none} }
  @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
  @keyframes barSlide  { from{opacity:0;transform:scaleX(0.6) translateX(-40px)} to{opacity:1;transform:none} }
  @keyframes dotPulse  { 0%,100%{transform:scale(1)} 50%{transform:scale(1.3)} }
  @keyframes checkPop  { from{opacity:0;transform:scale(0.5)} to{opacity:1;transform:none} }
  @keyframes statRise  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
  @keyframes formSlide { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
  @keyframes btnGlow   { 0%,100%{box-shadow:0 0 28px rgba(227,6,19,0.5)} 50%{box-shadow:0 0 44px rgba(227,6,19,0.82)} }

  /* ── stat bar ── */
  .stat-link {
    display:flex; align-items:center; gap:14px; padding:20px 22px;
    text-decoration:none; position:relative; overflow:hidden;
    border-right:1px solid rgba(255,255,255,0.07);
    transition:background 0.25s,box-shadow 0.25s;
  }
  .stat-link::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(135deg,rgba(227,6,19,0.08),transparent 60%);
    opacity:0; transition:opacity 0.25s;
  }
  .stat-link:hover { background:rgba(227,6,19,0.06); }
  .stat-link:hover::after { opacity:1; }
  .stat-icon {
    width:52px; height:52px; border-radius:50%; flex-shrink:0;
    background:radial-gradient(circle,rgba(227,6,19,0.18),rgba(0,0,0,0.5));
    border:1.5px solid rgba(227,6,19,0.4);
    display:flex; align-items:center; justify-content:center;
    transition:box-shadow 0.25s,border-color 0.25s;
  }
  .stat-link:hover .stat-icon { border-color:#e30613; box-shadow:0 0 20px rgba(227,6,19,0.55); }
  .stat-title {
    font-family:'Oswald',sans-serif; font-size:15px; font-weight:600;
    color:#fff; text-transform:uppercase; letter-spacing:0.07em; line-height:1.2;
    transition:color 0.2s;
  }
  .stat-link:hover .stat-title { color:#e30613; }
  .stat-desc { font-family:'Inter',sans-serif; font-size:12px; color:rgba(200,200,210,0.7); margin-top:3px; }
  .stat-arrow { margin-left:auto; font-size:14px; color:rgba(227,6,19,0); transition:color 0.2s,transform 0.2s; flex-shrink:0; }
  .stat-link:hover .stat-arrow { color:rgba(227,6,19,0.8); transform:translateX(3px); }

  /* ── HERO ── */
  .hero-wrap {
    position:relative;
    min-height:100vh;
    display:grid;
    grid-template-columns:1fr;
    padding-top:70px;
    background:#07060f;
    overflow:hidden;
  }
  .hero-bg {
    position:absolute; inset:0; z-index:1;
  }
  .hero-bg img {
    position:absolute; inset:0; width:100%; height:100%;
    object-fit:cover; object-position:right center;
    transition:opacity 1.1s ease-in-out;
  }
  .hero-overlay {
    position:absolute; inset:0; z-index:2; pointer-events:none;
    background:
      linear-gradient(to right, rgba(5,4,14,0.97) 0%, rgba(5,4,14,0.88) 25%, rgba(5,4,14,0.65) 50%, rgba(5,4,14,0.25) 70%, rgba(5,4,14,0.05) 100%),
      linear-gradient(to bottom, rgba(5,4,14,0.6) 0%, transparent 18%, transparent 80%, rgba(5,4,14,0.5) 100%);
  }
  .hero-grid {
    position:relative; z-index:10;
    display:grid; grid-template-columns:1fr;
    align-items:center;
    padding:32px 24px 48px;
    gap:36px;
  }

  /* ── desktop: 2 cols ── */
  @media (min-width:1024px) {
    .hero-wrap { padding-top:0; }
    .hero-grid {
      grid-template-columns:1fr 1fr;
      min-height:100vh;
      padding:0 80px 0 80px;
      gap:48px;
    }
    .hero-overlay {
      background:
        linear-gradient(to right, rgba(5,4,14,0.95) 0%, rgba(5,4,14,0.85) 30%, rgba(5,4,14,0.55) 52%, rgba(5,4,14,0.1) 75%, transparent 100%),
        linear-gradient(to bottom, rgba(5,4,14,0.55) 0%, transparent 15%, transparent 85%, rgba(5,4,14,0.4) 100%);
    }
  }
  @media (min-width:768px) and (max-width:1023px) {
    .hero-wrap { padding-top:106px; }
    .hero-grid { padding:0 36px 48px; }
  }
  @media (max-width:767px) {
    .hero-wrap { padding-top:78px; }
  }

  /* ── stats bar ── */
  .stats-grid { display:grid; grid-template-columns:repeat(5,1fr); }
  @media (max-width:639px) {
    .stats-grid { grid-template-columns:repeat(2,1fr) !important; }
    .stat-link { padding:14px 12px; gap:10px; border-bottom:1px solid rgba(255,255,255,0.07); }
    .stats-grid .stat-link:nth-child(2n) { border-right:none; }
    .stat-icon  { width:40px !important; height:40px !important; }
    .stat-arrow { display:none; }
    .stat-title { font-size:12px; }
    .stat-desc  { font-size:10px; }
  }
  @media (min-width:640px) and (max-width:1023px) {
    .stats-grid { grid-template-columns:repeat(3,1fr) !important; }
    .stat-link  { padding:18px 16px; border-bottom:1px solid rgba(255,255,255,0.07); }
    .stats-grid .stat-link:nth-child(3n) { border-right:none; }
    .stat-arrow { display:none; }
  }
  @media (min-width:1024px) {
    .stats-grid .stat-link:last-child { border-right:none; }
  }

  /* ── form inputs ── */
  .book-input {
    width:100%; background:rgba(255,255,255,0.07);
    border:1.5px solid rgba(255,255,255,0.12); border-radius:9px;
    outline:none; color:#fff; font-size:13px; font-family:'Inter',sans-serif;
    padding:10px 10px 10px 32px; box-sizing:border-box;
    transition:border-color 0.2s;
  }
  .book-input:focus { border-color:rgba(227,6,19,0.6); }
  .book-input::placeholder { color:rgba(255,255,255,0.3); }
`;

const anim = (name, dur, delay, ease="cubic-bezier(.22,.68,0,1.15)") =>
  `${name} ${dur}s ${ease} ${delay}s both`;

export default function Hero() {
  const [active,     setActive]    = useState(0);
  const [service,    setService]   = useState("");
  const [name,       setName]      = useState("");
  const [phone,      setPhone]     = useState("");
  const [email,      setEmail]     = useState("");
  const [note,       setNote]      = useState("");
  const [submitting, setSubmitting]= useState(false);
  const [submitted,  setSubmitted] = useState(false);
  const [err,        setErr]       = useState("");

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p+1) % SLIDES.length), 3800);
    return () => clearInterval(t);
  }, []);

  const reset = () => { setSubmitted(false); setService(""); setName(""); setPhone(""); setEmail(""); setNote(""); setErr(""); };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!service)                               { setErr("Please select a service."); return; }
    if (!name.trim())                           { setErr("Please enter your name."); return; }
    if (!phone.trim())                          { setErr("Please enter your phone number."); return; }
    if (!email.trim()||!/\S+@\S+\.\S+/.test(email)) { setErr("Please enter a valid email."); return; }
    setErr(""); setSubmitting(true);
    try {
      await fetch(`${API}/contacts`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ name, phone, email, subject:service, message: note||`Requesting: ${service}`, vehicle:"" }),
      });
      setSubmitted(true);
    } catch { setErr("Something went wrong. Please call (415) 634-7777."); }
    finally  { setSubmitting(false); }
  };

  /* ── reusable form card (same markup for mobile + desktop) ── */
  const BookingCard = () => (
    <div style={{
      background:"rgba(6,5,16,0.82)", border:"1px solid rgba(255,255,255,0.1)",
      borderRadius:20, overflow:"hidden",
      backdropFilter:"blur(22px)", WebkitBackdropFilter:"blur(22px)",
      boxShadow:"0 24px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
      animation: anim("formSlide", 0.7, 0.8, "ease-out"),
    }}>
      {/* card header */}
      <div style={{
        background:"linear-gradient(90deg,rgba(227,6,19,0.22),rgba(227,6,19,0.05))",
        borderBottom:"1px solid rgba(227,6,19,0.2)",
        padding:"14px 20px", display:"flex", alignItems:"center", gap:12,
      }}>
        <div style={{ width:34, height:34, borderRadius:9, background:"rgba(227,6,19,0.18)", border:"1.5px solid rgba(227,6,19,0.45)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <i className="fas fa-calendar-check" style={{ color:"#e30613", fontSize:14 }} />
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:15, color:"#fff", letterSpacing:"0.08em", textTransform:"uppercase" }}>Book a Service</div>
          <div style={{ color:"rgba(255,255,255,0.35)", fontSize:11, marginTop:1 }}>Free estimate · We come to you</div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:5, background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.28)", borderRadius:99, padding:"3px 10px", flexShrink:0 }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:"#22c55e", animation:"dotPulse 2s ease-in-out infinite" }} />
          <span style={{ color:"#22c55e", fontSize:9.5, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.07em" }}>AVAILABLE NOW</span>
        </div>
      </div>

      {submitted ? (
        /* success */
        <div style={{ padding:"28px 20px", textAlign:"center" }}>
          <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(34,197,94,0.1)", border:"2px solid rgba(34,197,94,0.3)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
            <i className="fas fa-circle-check" style={{ color:"#22c55e", fontSize:24 }} />
          </div>
          <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:18, fontWeight:700, color:"#fff", letterSpacing:"0.06em", marginBottom:8 }}>REQUEST RECEIVED!</div>
          <div style={{ color:"rgba(255,255,255,0.5)", fontSize:12, lineHeight:1.7, marginBottom:16 }}>
            We'll call you back at <span style={{ color:"#fff", fontWeight:600 }}>{phone}</span>.<br/>
            Service: <span style={{ color:"#e30613", fontWeight:600 }}>{service}</span>
          </div>
          <button onClick={reset} style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.14)", color:"rgba(255,255,255,0.65)", borderRadius:9, padding:"8px 18px", fontSize:11, fontFamily:"'Oswald',sans-serif", fontWeight:600, letterSpacing:"0.07em", cursor:"pointer" }}>
            Book Another
          </button>
        </div>
      ) : (
        <form onSubmit={handleBook}>
          {/* service grid */}
          <div style={{ padding:"14px 16px 8px" }}>
            <div style={{ color:"rgba(255,255,255,0.28)", fontSize:10, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:9 }}>
              1 · Select Service
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:6 }}>
              {SERVICES.map(s => {
                const sel = service === s.value;
                return (
                  <button key={s.value} type="button" onClick={() => { setService(sel?"":s.value); setErr(""); }}
                    style={{
                      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                      gap:4, padding:"9px 4px", borderRadius:10,
                      background: sel ? "rgba(227,6,19,0.16)" : "rgba(255,255,255,0.04)",
                      border:`1.5px solid ${sel ? "#e30613" : "rgba(255,255,255,0.08)"}`,
                      color: sel ? "#fff" : "rgba(255,255,255,0.4)",
                      cursor:"pointer", transition:"all 0.15s",
                      boxShadow: sel ? "0 0 14px rgba(227,6,19,0.3)" : "none",
                    }}>
                    <i className={`fas ${s.icon}`} style={{ fontSize:13, color: sel ? "#e30613" : "rgba(255,255,255,0.28)" }} />
                    <span style={{ fontFamily:"'Oswald',sans-serif", fontWeight:600, fontSize:9, letterSpacing:"0.04em", textTransform:"uppercase", textAlign:"center", lineHeight:1.3 }}>{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* contact fields */}
          <div style={{ padding:"6px 16px 0", display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            <div>
              <div style={{ color:"rgba(255,255,255,0.28)", fontSize:10, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:5 }}>2 · Name</div>
              <div style={{ position:"relative" }}>
                <i className="fas fa-user" style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.22)", fontSize:11, pointerEvents:"none" }} />
                <input className="book-input" type="text" value={name} onChange={e=>{setName(e.target.value);setErr("");}} placeholder="Full name" />
              </div>
            </div>
            <div>
              <div style={{ color:"rgba(255,255,255,0.28)", fontSize:10, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:5 }}>3 · Phone</div>
              <div style={{ position:"relative" }}>
                <i className="fas fa-phone" style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.22)", fontSize:11, pointerEvents:"none" }} />
                <input className="book-input" type="tel" value={phone} onChange={e=>{setPhone(e.target.value);setErr("");}} placeholder="(415) 000-0000" />
              </div>
            </div>
            <div style={{ gridColumn:"1/-1" }}>
              <div style={{ color:"rgba(255,255,255,0.28)", fontSize:10, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:5 }}>4 · Email</div>
              <div style={{ position:"relative" }}>
                <i className="fas fa-envelope" style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.22)", fontSize:11, pointerEvents:"none" }} />
                <input className="book-input" type="email" value={email} onChange={e=>{setEmail(e.target.value);setErr("");}} placeholder="your@email.com" />
              </div>
            </div>
            <div style={{ gridColumn:"1/-1" }}>
              <textarea className="book-input" value={note} onChange={e=>setNote(e.target.value)} rows={2}
                placeholder="Describe your issue (optional) — e.g. flat tire, oil change overdue…"
                style={{ padding:"10px 12px", resize:"none", lineHeight:1.5 }} />
            </div>
          </div>

          {err && (
            <div style={{ margin:"6px 16px 0", background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.22)", borderRadius:8, padding:"7px 12px", color:"#ef4444", fontSize:11, display:"flex", alignItems:"center", gap:7 }}>
              <i className="fas fa-circle-exclamation" /> {err}
            </div>
          )}

          <div style={{ padding:"10px 16px 14px" }}>
            <button type="submit" disabled={submitting} style={{
              width:"100%", background:"linear-gradient(135deg,#e30613,#bf040f)",
              border:"none", color:"#fff", borderRadius:10, padding:"13px",
              fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:14,
              letterSpacing:"0.1em", textTransform:"uppercase",
              cursor: submitting?"not-allowed":"pointer",
              boxShadow:"0 6px 24px rgba(227,6,19,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
              display:"flex", alignItems:"center", justifyContent:"center", gap:9,
              opacity: submitting ? 0.7 : 1, transition:"opacity 0.15s, box-shadow 0.2s",
              animation:"btnGlow 2.8s ease-in-out 2s infinite",
            }}>
              {submitting
                ? <><i className="fas fa-spinner fa-spin" style={{fontSize:12}}/> Sending…</>
                : <><i className="fas fa-paper-plane" style={{fontSize:12}}/> Request Free Quote</>
              }
            </button>
            <div style={{ display:"flex", justifyContent:"center", gap:16, marginTop:9 }}>
              {[{icon:"fa-bolt",text:"Same-Day"},{icon:"fa-shield-halved",text:"Licensed & Insured"},{icon:"fa-clock",text:"24/7 Service"}].map(t=>(
                <div key={t.text} style={{ display:"flex", alignItems:"center", gap:4 }}>
                  <i className={`fas ${t.icon}`} style={{ color:"#e30613", fontSize:9 }} />
                  <span style={{ color:"rgba(255,255,255,0.3)", fontSize:10, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.05em" }}>{t.text}</span>
                </div>
              ))}
            </div>
          </div>
        </form>
      )}
    </div>
  );

  return (
    <>
      <style>{CSS}</style>

      <section className="hero-wrap" style={{ animation: anim("fadeIn",0.4,0,"ease") }}>

        {/* ── BACKGROUND IMAGE ── */}
        <div className="hero-bg">
          {SLIDES.map((src,i) => (
            <img key={src} src={src} alt="" style={{ opacity: i===active ? 1 : 0 }} />
          ))}
        </div>
        <div className="hero-overlay" />

        {/* ── SLIDE DOTS ── */}
        <div style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)", display:"flex", gap:7, zIndex:20 }}>
          {SLIDES.map((_,i) => (
            <button key={i} onClick={()=>setActive(i)} style={{
              width: i===active ? 26 : 8, height:8, borderRadius:4, border:"none", cursor:"pointer", padding:0,
              background: i===active ? "#e30613" : "rgba(255,255,255,0.25)",
              transition:"all 0.35s ease",
            }}/>
          ))}
        </div>

        {/* ── MAIN CONTENT GRID ── */}
        <div className="hero-grid">

          {/* LEFT — text */}
          <div>
            {/* eyebrow */}
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14, animation: anim("fadeLeft",0.55,0.2) }}>
              <div style={{ width:28, height:2, background:"#e30613" }} />
              <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:12, fontWeight:600, color:"#e30613", letterSpacing:"0.28em", textTransform:"uppercase" }}>
                24/7 Mobile Auto Service · Fremont, CA
              </span>
            </div>

            {/* main headline */}
            <div style={{ animation: anim("fadeLeft",0.6,0.35) }}>
              <div style={{
                fontFamily:"'Bebas Neue','Barlow Condensed',sans-serif",
                fontSize:"clamp(90px,11vw,160px)",
                fontWeight:400, lineHeight:0.88, letterSpacing:"0.01em",
              }}>
                <span style={{ color:"#e30613", textShadow:"0 0 50px rgba(227,6,19,0.5),4px 4px 0 rgba(0,0,0,0.8)" }}>24</span>
                <span style={{ color:"#fff", textShadow:"4px 4px 0 rgba(0,0,0,0.8)" }}>HR</span>
              </div>
              <div style={{
                fontFamily:"'Bebas Neue','Barlow Condensed',sans-serif",
                fontSize:"clamp(96px,13vw,192px)",
                fontWeight:400, lineHeight:0.84, letterSpacing:"0.01em",
                color:"#fff",
                textShadow:"4px 5px 0 rgba(0,0,0,0.95),6px 6px 18px rgba(0,0,0,0.85)",
              }}>
                FREMONT
              </div>
            </div>

            {/* red bar — full width of FREMONT */}
            <div style={{ display:"inline-block", marginTop:8, marginBottom:24, animation: anim("barSlide",0.6,0.55), transformOrigin:"left center" }}>
              <div style={{ background:"#e30613", padding:"11px 18px 12px" }}>
                <span style={{
                  fontFamily:"'Bebas Neue','Barlow Condensed',sans-serif",
                  fontSize:"clamp(22px,2.8vw,40px)", fontWeight:400,
                  color:"#fff", letterSpacing:"0.12em", lineHeight:1,
                  display:"block",
                }}>
                  TIRE &amp; OIL CHANGE
                </span>
              </div>
            </div>

            {/* checkmarks */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:"10px 24px", marginBottom:22, animation: anim("fadeUp",0.55,0.7,"ease-out") }}>
              {checks.map(c => (
                <div key={c.label} style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:22, height:22, borderRadius:"50%", background:"rgba(227,6,19,0.12)", border:"1.5px solid rgba(227,6,19,0.5)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <i className={`fas ${c.icon}`} style={{ color:"#e30613", fontSize:10 }} />
                  </div>
                  <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:14, fontWeight:600, color:"rgba(255,255,255,0.9)", textTransform:"uppercase", letterSpacing:"0.07em" }}>{c.label}</span>
                </div>
              ))}
            </div>

            {/* description */}
            <p style={{ color:"rgba(255,255,255,0.65)", fontSize:15, lineHeight:1.7, maxWidth:440, marginBottom:28, animation: anim("fadeUp",0.55,0.82,"ease-out") }}>
              We come to you — Home, Office, Job Site, or Roadside.{" "}
              <span style={{ color:"rgba(255,255,255,0.9)", fontWeight:600 }}>Fast. Reliable. Professional.</span>
            </p>

            {/* phone CTA */}
            <a href="tel:+14156347777" style={{
              display:"inline-flex", alignItems:"center", gap:14, textDecoration:"none",
              animation: anim("fadeUp",0.55,0.92,"ease-out"),
            }}>
              <div style={{ width:48, height:48, borderRadius:"50%", background:"rgba(227,6,19,0.15)", border:"2px solid rgba(227,6,19,0.5)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <i className="fas fa-phone" style={{ color:"#e30613", fontSize:16 }} />
              </div>
              <div>
                <div style={{ color:"rgba(255,255,255,0.45)", fontFamily:"'Oswald',sans-serif", fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", lineHeight:1, marginBottom:3 }}>Call Us Now</div>
                <div style={{ color:"#fff", fontFamily:"'Oswald',sans-serif", fontSize:24, fontWeight:700, letterSpacing:"0.04em", lineHeight:1 }}>(415) 634-7777</div>
              </div>
            </a>
          </div>

          {/* RIGHT — booking form */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ width:"100%", maxWidth:420 }}>
              <BookingCard />
            </div>
          </div>

        </div>
      </section>

      {/* ══ STATS BAR ══ */}
      <div style={{ background:"#0a0910", borderTop:"2px solid rgba(227,6,19,0.45)" }}>
        <div style={{ maxWidth:1600, margin:"0 auto" }}>
          <div className="stats-grid">
            {stats.map(({ icon,title,desc,href },i) => (
              <a key={title} href={href} className="stat-link" style={{ animation: anim("statRise",0.5,1.2+i*0.07,"ease-out") }}>
                <div style={{ position:"absolute", bottom:4, right:12, fontFamily:"'Oswald',sans-serif", fontSize:40, fontWeight:700, color:"rgba(227,6,19,0.06)", lineHeight:1, pointerEvents:"none", userSelect:"none" }}>
                  {String(i+1).padStart(2,"0")}
                </div>
                <div className="stat-icon">
                  <i className={`fas ${icon}`} style={{ color:"#e30613", fontSize:18, position:"relative", zIndex:1 }} />
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div className="stat-title">{title}</div>
                  <div className="stat-desc">{desc}</div>
                </div>
                <i className="stat-arrow fas fa-chevron-right" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
