import { useState, useEffect } from "react";
import API from "../../config";

const SLIDES = ["/red-tire1.png","/red-oil.png", "/red-tire2.png", "/red-oil1.png"];

const checks = ["Tires", "Oil Change", "Auto Service", "Roadside Assistance"];

const SERVICES = [
  { value:"Tire Service & Repair",  icon:"fa-circle-dot",          label:"Tire Service & Repair" },
  { value:"Oil Change",             icon:"fa-oil-can",             label:"Oil Change" },
  { value:"Brake Repair",           icon:"fa-circle-stop",         label:"Brake Repair" },
  { value:"Wheel Alignment",        icon:"fa-car",                 label:"Wheel Alignment" },
  { value:"Battery Replacement",    icon:"fa-car-battery",         label:"Battery Replacement" },
  { value:"A/C Evaluation",         icon:"fa-snowflake",           label:"A/C Evaluation" },
  { value:"Roadside Assistance",    icon:"fa-truck-medical",       label:"Roadside Assistance" },
  { value:"Mobile Service",         icon:"fa-mobile-screen-button",label:"Mobile Service" },
];

const stats = [
  { icon: "fa-truck",       title: "Fully Equipped",          desc: "Mobile Service Trucks",    href: "/fully-equipped" },
  { icon: "fa-users",       title: "Experienced Technicians", desc: "Trained & Certified",      href: "/our-technicians" },
  { icon: "fa-certificate", title: "Quality Parts & Oils",    desc: "Top Brands You Trust",     href: "/quality-parts" },
  { icon: "fa-tag",         title: "Honest Pricing",          desc: "No Hidden Fees",           href: "/pricing" },
  { icon: "fa-handshake",   title: "Satisfaction Guaranteed", desc: "We Stand Behind Our Work", href: "/satisfaction" },
];

const ANIM_CSS = `
  @keyframes heroFadeLeft {
    from { opacity: 0; transform: translateX(-52px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes heroFadeUp {
    from { opacity: 0; transform: translateY(36px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes heroFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes heroBarSlide {
    from { opacity: 0; transform: translateX(-80px) scaleX(0.7); }
    to   { opacity: 1; transform: translateX(0) scaleX(1); }
  }
  @keyframes heroImgFade {
    from { opacity: 0; transform: translateX(60px) scale(1.04); }
    to   { opacity: 1; transform: translateX(0) scale(1); }
  }
  @keyframes statRise {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes checkPop {
    from { opacity: 0; transform: scale(0.6) translateY(12px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes btnGlow {
    0%,100% { box-shadow: 0 6px 32px rgba(227,6,19,0.55); }
    50%      { box-shadow: 0 6px 44px rgba(227,6,19,0.82), 0 0 0 4px rgba(227,6,19,0.15); }
  }
  @keyframes dotPulse {
    0%,100% { transform: scale(1); }
    50%      { transform: scale(1.25); }
  }
  @keyframes statIconSpin {
    to { transform: rotate(360deg) scale(1.12); }
  }
  @keyframes statArrow {
    from { opacity:0; transform:translateX(-6px); }
    to   { opacity:1; transform:translateX(0); }
  }

  /* ── STATS BAR ── */
  .stat-link {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 24px;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    border-top: 3px solid transparent;
    transition: background 0.28s ease, border-top-color 0.28s ease, box-shadow 0.28s ease;
  }
  /* subtle top-line indicator always visible */
  .stat-link::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, rgba(227,6,19,0.25), transparent);
  }
  /* red fill on hover */
  .stat-link::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(227,6,19,0.1) 0%, transparent 65%);
    opacity: 0;
    transition: opacity 0.28s ease;
    pointer-events: none;
  }
  .stat-link:hover {
    background: rgba(227,6,19,0.07);
    border-top-color: #fff;
    box-shadow: 0 -3px 0 #fff, 0 8px 32px rgba(227,6,19,0.15);
    z-index: 2;
  }
  .stat-link:hover::after { opacity: 1; }

  /* icon circle */
  .stat-icon {
    position: relative;
    width: 56px; height: 56px; border-radius: 50%;
    background: radial-gradient(circle, rgba(227,6,19,0.18) 0%, rgba(0,0,0,0.5) 100%);
    border: 2px solid rgba(227,6,19,0.4);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    transition: background 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
  }
  /* outer dashed ring */
  .stat-icon::after {
    content: '';
    position: absolute; inset: -5px;
    border-radius: 50%;
    border: 1.5px dashed rgba(227,6,19,0.3);
    transition: border-color 0.28s ease;
  }
  .stat-link:hover .stat-icon {
    background: radial-gradient(circle, rgba(227,6,19,0.32) 0%, rgba(0,0,0,0.5) 100%);
    border-color: #e30613;
    box-shadow: 0 0 24px rgba(227,6,19,0.6), inset 0 0 12px rgba(227,6,19,0.2);
    animation: statIconSpin 0.6s cubic-bezier(.22,.68,0,1.2) both;
  }
  .stat-link:hover .stat-icon::after { border-color: rgba(227,6,19,0.65); }

  /* text */
  .stat-title {
    font-family: 'Oswald', 'Barlow Condensed', sans-serif;
    font-size: 16px; font-weight: 600; color: #fff;
    text-transform: uppercase; letter-spacing: 0.08em; line-height: 1.2;
    transition: color 0.22s ease;
    -webkit-font-smoothing: antialiased;
    text-rendering: geometricPrecision;
  }
  .stat-link:hover .stat-title { color: #e30613; }
  .stat-desc {
    font-family: 'Inter', sans-serif;
    font-size: 12.5px; font-weight: 400; color: rgba(200,200,210,0.82);
    line-height: 1.4; margin-top: 4px;
    transition: color 0.22s ease;
    -webkit-font-smoothing: antialiased;
  }
  .stat-link:hover .stat-desc { color: rgba(255,255,255,0.95); }

  /* arrow chevron */
  .stat-arrow {
    margin-left: auto;
    font-size: 16px;
    color: rgba(227,6,19,0);
    transition: color 0.22s ease, transform 0.22s ease;
    flex-shrink: 0;
  }
  .stat-link:hover .stat-arrow {
    color: rgba(227,6,19,0.85);
    transform: translateX(3px);
  }

  /* ── HERO CTA BUTTONS ── */
  @keyframes phoneRing {
    0%   { transform: rotate(0deg); }
    15%  { transform: rotate(-20deg) scale(1.12); }
    35%  { transform: rotate(16deg) scale(1.1); }
    55%  { transform: rotate(-10deg) scale(1.05); }
    75%  { transform: rotate(7deg) scale(1.03); }
    90%  { transform: rotate(-3deg); }
    100% { transform: rotate(0deg); }
  }
  @keyframes calBounce {
    0%,100% { transform: scale(1) rotate(0deg); }
    30%     { transform: scale(1.2) rotate(-10deg); }
    65%     { transform: scale(1.15) rotate(7deg); }
  }
  .hero-btn-call {
    display: inline-flex; align-items: center; gap: 14px;
    background: #e30613; padding: 12px 26px; border-radius: 6px;
    text-decoration: none;
    border: 2px solid rgba(255,255,255,0.12);
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease, background 0.22s ease;
    cursor: pointer;
  }
  .hero-btn-call:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 14px 52px rgba(227,6,19,0.82), 0 0 0 3px rgba(227,6,19,0.28) !important;
    border-color: rgba(255,255,255,0.5) !important;
    background: #f4071a;
    animation: none !important;
  }
  .hero-btn-call:active { transform: translateY(0) scale(0.98); }
  .hero-btn-call .cbtn-icon {
    width: 44px; height: 44px; border-radius: 50%;
    background: rgba(255,255,255,0.15); border: 2px solid rgba(255,255,255,0.3);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    transition: background 0.22s ease, border-color 0.22s ease;
  }
  .hero-btn-call:hover .cbtn-icon {
    background: rgba(255,255,255,0.28) !important;
    border-color: rgba(255,255,255,0.7) !important;
  }
  .hero-btn-call:hover .cbtn-phone { animation: phoneRing 0.52s ease both; }

  .hero-btn-service {
    display: inline-flex; align-items: center; gap: 14px;
    background: rgba(255,255,255,0.06);
    border: 2px solid rgba(255,255,255,0.28);
    padding: 12px 26px; border-radius: 6px; text-decoration: none;
    transition: transform 0.22s ease, background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
    cursor: pointer;
  }
  .hero-btn-service:hover {
    transform: translateY(-3px) scale(1.03);
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.78);
    box-shadow: 0 10px 38px rgba(255,255,255,0.1), 0 0 0 2px rgba(255,255,255,0.14);
  }
  .hero-btn-service:active { transform: translateY(0) scale(0.98); }
  .hero-btn-service .sbtn-icon {
    width: 44px; height: 44px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.35);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    transition: background 0.22s ease, border-color 0.22s ease;
  }
  .hero-btn-service:hover .sbtn-icon {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.85);
  }
  .hero-btn-service:hover .sbtn-cal { animation: calBounce 0.5s ease both; }

  /* ─────── HERO LAYOUT — RESPONSIVE ─────── */
  .hero-section {
    position: relative;
    background: linear-gradient(145deg, #111020 0%, #1a1228 45%, #0e0c18 100%);
    overflow: hidden;
    display: flex;
    align-items: center;
    min-height: 100svh;
    padding-top: 70px;
  }
  .hero-img-panel {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: 1;
    width: 100%;
    opacity: 1;
  }
  .hero-left {
    position: relative;
    z-index: 10;
    padding: 28px 20px 44px;
    width: 100%;
    min-width: 0;
    max-width: none;
  }
  .hero-form-overlay {
    display: none;
  }
  .hero-form-mobile {
    display: block;
  }
  /* ── tablet sm ── */
  @media (min-width: 640px) {
    .hero-section { padding-top: 78px; align-items: center; }
    .hero-img-panel { width: 100%; opacity: 1; }
    .hero-left { padding: 36px 24px 44px 36px; width: 60%; }
  }
  /* ── tablet md (top bar visible) ── */
  @media (min-width: 768px) {
    .hero-section { padding-top: 106px; }
  }
  /* ── desktop ── */
  @media (min-width: 1024px) {
    .hero-section { min-height: 100vh; padding-top: 126px; align-items: center; }
    .hero-img-panel { width: 100%; opacity: 1; }
    .hero-left { padding: 48px 24px 48px 80px; width: 52%; min-width: 440px; max-width: 780px; }
    .hero-form-overlay {
      display: block;
      position: absolute;
      bottom: 36px;
      right: 32px;
      width: 340px;
      z-index: 20;
    }
    .hero-form-mobile {
      display: none;
    }
  }

  /* hero buttons on small mobile */
  @media (max-width: 479px) {
    .hero-btn-call, .hero-btn-service {
      padding: 10px 14px; gap: 8px;
      flex: 1; min-width: 0; justify-content: center;
    }
    .cbtn-icon, .sbtn-icon { width: 34px !important; height: 34px !important; }
    .cbtn-label { display: none; }
    .cbtn-num   { font-size: 15px !important; white-space: nowrap; letter-spacing: 0.02em !important; }
    .sbtn-title { font-size: 14px !important; white-space: nowrap; }
  }

  /* ─────── STATS BAR — RESPONSIVE ─────── */
  .stats-grid { display: grid; grid-template-columns: repeat(5, 1fr); }
  .stat-link { border-right: 1px solid rgba(255,255,255,0.08); }

  /* 2-column layout on mobile */
  @media (max-width: 639px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .stat-link { padding: 14px 12px; gap: 10px; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .stats-grid .stat-link:nth-child(2n) { border-right: none; }
    .stats-grid .stat-link:nth-last-child(1) { border-bottom: none; }
    .stats-grid .stat-link:nth-last-child(2):nth-child(odd) { border-bottom: none; }
    .stat-icon { width: 42px !important; height: 42px !important; }
    .stat-icon::after { inset: -4px; }
    .stat-arrow { display: none; }
    .stat-title { font-size: 12px; }
    .stat-desc { font-size: 10px; }
  }
  /* 3-column layout on tablet */
  @media (min-width: 640px) and (max-width: 1023px) {
    .stats-grid { grid-template-columns: repeat(3, 1fr) !important; }
    .stat-link { padding: 18px 16px; gap: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .stats-grid .stat-link:nth-child(3n) { border-right: none; }
    .stats-grid .stat-link:last-child { border-right: none; }
    .stats-grid .stat-link:nth-last-child(-n+2) { border-bottom: none; }
    .stats-grid .stat-link:last-child { border-bottom: none; }
    .stat-arrow { display: none; }
  }
  /* 5-column on desktop */
  @media (min-width: 1024px) {
    .stats-grid { grid-template-columns: repeat(5, 1fr) !important; }
    .stats-grid .stat-link:last-child { border-right: none; }
  }
`;

const anim = (name, dur, delay, easing = "cubic-bezier(.22,.68,0,1.15)") =>
  `${name} ${dur}s ${easing} ${delay}s both`;

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

  const handleBook = async (e) => {
    e.preventDefault();
    if (!service) { setErr("Please select a service."); return; }
    if (!name.trim()) { setErr("Please enter your name."); return; }
    if (!phone.trim()) { setErr("Please enter your phone number."); return; }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) { setErr("Please enter a valid email address."); return; }
    setErr(""); setSubmitting(true);
    try {
      await fetch(`${API}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          subject: service,
          message: note || `Requesting: ${service}`,
          vehicle: "",
        }),
      });
      setSubmitted(true);
    } catch {
      setErr("Something went wrong. Please call us at (415) 634-7777.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % SLIDES.length), 3800);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{ANIM_CSS}</style>

      {/* ═══════════════ HERO ═══════════════ */}
      <section
        className="hero-section"
        style={{ animation: anim("heroFadeIn", 0.4, 0, "ease") }}
      >
        {/* ── GLASS AMBIENT GLOW ── */}
        <div style={{
          position:"absolute", inset:0, zIndex:0, pointerEvents:"none",
          background: [
            "radial-gradient(ellipse 55% 60% at 8% 55%, rgba(120,40,220,0.07) 0%, transparent 65%)",
            "radial-gradient(ellipse 40% 50% at 5% 85%, rgba(227,6,19,0.09) 0%, transparent 60%)",
            "radial-gradient(ellipse 30% 30% at 50% 50%, rgba(255,255,255,0.025) 0%, transparent 70%)",
          ].join(","),
        }} />

        {/* ── RIGHT IMAGE SLIDER ── */}
        <div
          className="hero-img-panel"
          style={{ animation: anim("heroImgFade", 1.1, 0.2, "ease-out") }}
        >
          {SLIDES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "right center",
                opacity: i === active ? 1 : 0,
                transition: "opacity 1.1s ease-in-out",
                filter: "brightness(1.1) saturate(1.25) contrast(1.05)",
              }}
            />
          ))}

          {/* very light base overlay — image stays visible */}
          <div style={{ position:"absolute", inset:0, background:"rgba(6,4,14,0.28)", zIndex:2, pointerEvents:"none" }} />
          {/* left gradient — only darkens text area, right side stays open */}
          <div style={{
            position:"absolute", inset:0,
            background:"linear-gradient(to right,rgba(6,4,14,0.88) 0%,rgba(6,4,14,0.72) 28%,rgba(6,4,14,0.35) 50%,rgba(6,4,14,0.05) 68%,transparent 100%)",
            zIndex:3, pointerEvents:"none",
          }} />
          <div style={{ position:"absolute",top:0,left:0,right:0,height:90,background:"linear-gradient(to bottom,rgba(6,4,14,0.6),transparent)",zIndex:3,pointerEvents:"none" }} />
          <div style={{ position:"absolute",bottom:0,left:0,right:0,height:70,background:"linear-gradient(to top,rgba(6,4,14,0.4),transparent)",zIndex:3,pointerEvents:"none" }} />

          {/* dots */}
          <div style={{ position:"absolute",bottom:22,right:22,display:"flex",gap:7,zIndex:5 }}>
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                width: i === active ? 24 : 8, height: 8, borderRadius: 4,
                background: i === active ? "#e30613" : "rgba(255,255,255,0.3)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "all 0.35s ease",
                animation: i === active ? "dotPulse 1.8s ease-in-out infinite" : "none",
              }} />
            ))}
          </div>
        </div>

        {/* ── LEFT TEXT ── */}
        <div className="hero-left" style={{ zIndex: 10 }}>

          {/* 24/7 label */}
          <p style={{
            fontFamily: "'Oswald',sans-serif",
            fontSize: 14, fontWeight: 500,
            color: "#e30613", letterSpacing: "0.22em",
            textTransform: "uppercase", marginBottom: 8, marginTop: 24,
            animation: anim("heroFadeLeft", 0.6, 0.25),
          }}>
            24/7 Mobile Service
          </p>

          {/* 24HR */}
          <div style={{
            fontFamily: "'Bebas Neue','Barlow Condensed',sans-serif",
            fontSize: "clamp(100px,12vw,168px)",
            fontWeight: 400, lineHeight: 0.88, letterSpacing: "0.01em",
            animation: anim("heroFadeLeft", 0.65, 0.38),
          }}>
            <span style={{ color: "#e30613", textShadow: "0 0 40px rgba(227,6,19,0.45),3px 3px 0 rgba(0,0,0,0.7)" }}>24</span>
            <span style={{ color: "#fff", textShadow: "3px 3px 0 rgba(0,0,0,0.7)" }}>HR</span>
          </div>

          {/* FREMONT + RED BAR — same width wrapper */}
          <div style={{
            display: "inline-block", marginBottom: 22,
            animation: anim("heroFadeLeft", 0.68, 0.5),
          }}>
            <div style={{
              fontFamily: "'Bebas Neue','Barlow Condensed',sans-serif",
              fontSize: "clamp(106px,14.5vw,200px)",
              fontWeight: 400, lineHeight: 0.84, letterSpacing: "0.01em",
              color: "#fff",
              textShadow: "3px 4px 0 rgba(0,0,0,0.9),-1px -1px 0 rgba(0,0,0,0.5),5px 5px 14px rgba(0,0,0,0.8)",
            }}>
              FREMONT
            </div>
            <div style={{
              background: "#e30613",
              padding: "13px 18px 14px",
              marginTop: 6,
              animation: anim("heroBarSlide", 0.65, 0.64),
              transformOrigin: "left center",
            }}>
              <span style={{
                fontFamily: "'Bebas Neue','Barlow Condensed',sans-serif",
                fontSize: "clamp(22px,2.8vw,42px)", fontWeight: 400,
                color: "#fff", letterSpacing: "0.1em",
                textTransform: "uppercase", lineHeight: 1,
                display: "block", textAlign: "left",
              }}>
                TIRE &amp; OIL CHANGE
              </span>
            </div>
          </div>

          {/* CHECKMARKS */}
          <div style={{ display:"flex",flexWrap:"wrap",gap:"8px 22px",marginBottom:16 }}>
            {checks.map((c, i) => (
              <div key={c} style={{
                display:"flex",alignItems:"center",gap:8,
                animation: anim("checkPop", 0.5, 0.78 + i * 0.07),
              }}>
                <svg viewBox="0 0 22 22" fill="none" style={{ width:19,height:19,flexShrink:0 }}>
                  <circle cx="11" cy="11" r="10" stroke="#e30613" strokeWidth="2" fill="rgba(227,6,19,0.1)" />
                  <polyline points="6,11 9.5,14.5 16,7.5" stroke="#e30613" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{
                  fontFamily:"'Oswald',sans-serif",
                  fontSize:15,fontWeight:600,color:"#fff",
                  textTransform:"uppercase",letterSpacing:"0.08em",
                }}>{c}</span>
              </div>
            ))}
          </div>

          {/* DESCRIPTION */}
          <p style={{
            color:"rgba(255,255,255,0.82)",fontSize:16,lineHeight:1.65,marginBottom:16,maxWidth:460,
            animation: anim("heroFadeUp", 0.6, 1.06, "ease-out"),
          }}>
            We come to you — Home, Business, Job Site, or Roadside.{" "}
            <span style={{ color:"rgba(255,255,255,0.9)",fontWeight:700 }}>Fast. Reliable. Professional.</span>
          </p>

          {/* ── BOOKING FORM (mobile — shown inside left panel) ── */}
          <div className="hero-form-mobile" style={{
            background:"rgba(10,8,20,0.76)", border:"1.5px solid rgba(255,255,255,0.11)",
            borderRadius:16, overflow:"hidden", backdropFilter:"blur(18px)",
            WebkitBackdropFilter:"blur(18px)",
            boxShadow:"0 8px 40px rgba(0,0,0,0.5)",
            marginTop:16,
          }}>

            {/* Header */}
            <div style={{
              background:"linear-gradient(90deg,rgba(227,6,19,0.18) 0%,rgba(227,6,19,0.05) 100%)",
              borderBottom:"1px solid rgba(227,6,19,0.22)",
              padding:"10px 16px", display:"flex", alignItems:"center", gap:10,
            }}>
              <div style={{ width:30, height:30, borderRadius:8, background:"rgba(227,6,19,0.2)", border:"1px solid rgba(227,6,19,0.4)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <i className="fas fa-calendar-check" style={{ color:"#e30613", fontSize:13 }} />
              </div>
              <div>
                <div style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:14, color:"#fff", letterSpacing:"0.08em", textTransform:"uppercase", lineHeight:1 }}>Book a Service</div>
                <div style={{ color:"rgba(255,255,255,0.38)", fontSize:11, marginTop:2 }}>We come to you — Free estimate, no commitment</div>
              </div>
              <div style={{ marginLeft:"auto", background:"rgba(34,197,94,0.12)", border:"1px solid rgba(34,197,94,0.3)", borderRadius:99, padding:"3px 10px", display:"flex", alignItems:"center", gap:5, flexShrink:0 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:"#22c55e" }} />
                <span style={{ color:"#22c55e", fontSize:10, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.06em" }}>AVAILABLE NOW</span>
              </div>
            </div>

            {submitted ? (
              /* ── SUCCESS STATE ── */
              <div style={{ padding:"32px 20px", textAlign:"center" }}>
                <div style={{ width:58, height:58, borderRadius:"50%", background:"rgba(34,197,94,0.12)", border:"2px solid rgba(34,197,94,0.35)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                  <i className="fas fa-circle-check" style={{ color:"#22c55e", fontSize:26 }} />
                </div>
                <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:20, fontWeight:700, color:"#fff", letterSpacing:"0.06em", marginBottom:8 }}>REQUEST RECEIVED!</div>
                <div style={{ color:"rgba(255,255,255,0.55)", fontSize:13, lineHeight:1.6, marginBottom:18 }}>
                  We'll call you back shortly at <span style={{ color:"#fff", fontWeight:600 }}>{phone}</span>.<br />
                  Service: <span style={{ color:"#e30613", fontWeight:600 }}>{service}</span>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setService(""); setName(""); setPhone(""); setEmail(""); setNote(""); }}
                  style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.7)", borderRadius:9, padding:"9px 20px", fontSize:12, fontFamily:"'Oswald',sans-serif", fontWeight:600, letterSpacing:"0.07em", cursor:"pointer" }}>
                  Book Another Service
                </button>
              </div>
            ) : (
              <form onSubmit={handleBook}>

                {/* Service grid */}
                <div style={{ padding:"10px 14px 6px" }}>
                  <div style={{ color:"rgba(255,255,255,0.3)", fontSize:10, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:7 }}>
                    1. Select Your Service
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:5 }}>
                    {SERVICES.map(s => {
                      const sel = service === s.value;
                      return (
                        <button key={s.value} type="button" onClick={() => { setService(sel ? "" : s.value); setErr(""); }}
                          style={{
                            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                            gap:4, padding:"7px 4px", borderRadius:9,
                            background: sel ? "rgba(227,6,19,0.18)" : "rgba(255,255,255,0.04)",
                            border:`1.5px solid ${sel ? "#e30613" : "rgba(255,255,255,0.09)"}`,
                            color: sel ? "#fff" : "rgba(255,255,255,0.45)",
                            cursor:"pointer", transition:"all 0.15s",
                            boxShadow: sel ? "0 0 14px rgba(227,6,19,0.28)" : "none",
                          }}>
                          <i className={`fas ${s.icon}`} style={{ fontSize:14, color: sel ? "#e30613" : "rgba(255,255,255,0.3)" }} />
                          <span style={{ fontFamily:"'Oswald',sans-serif", fontWeight:600, fontSize:9, letterSpacing:"0.04em", textTransform:"uppercase", textAlign:"center", lineHeight:1.3 }}>
                            {s.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name + Phone + Email */}
                <div style={{ padding:"6px 14px 0", display:"grid", gridTemplateColumns:"1fr 1fr", gap:7 }}>
                  <div>
                    <div style={{ color:"rgba(255,255,255,0.3)", fontSize:10, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:6 }}>
                      2. Your Name
                    </div>
                    <div style={{ position:"relative" }}>
                      <div style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
                        <i className="fas fa-user" style={{ color:"rgba(255,255,255,0.25)", fontSize:11 }} />
                      </div>
                      <input type="text" value={name} onChange={e => { setName(e.target.value); setErr(""); }}
                        placeholder="Full name"
                        style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1.5px solid rgba(255,255,255,0.1)", borderRadius:8, outline:"none", color:"#fff", fontSize:12, fontFamily:"'Inter',sans-serif", padding:"8px 8px 8px 28px", boxSizing:"border-box" }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ color:"rgba(255,255,255,0.3)", fontSize:10, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:6 }}>
                      3. Phone Number
                    </div>
                    <div style={{ position:"relative" }}>
                      <div style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
                        <i className="fas fa-phone" style={{ color:"rgba(255,255,255,0.25)", fontSize:11 }} />
                      </div>
                      <input type="tel" value={phone} onChange={e => { setPhone(e.target.value); setErr(""); }}
                        placeholder="(415) 000-0000"
                        style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1.5px solid rgba(255,255,255,0.1)", borderRadius:8, outline:"none", color:"#fff", fontSize:12, fontFamily:"'Inter',sans-serif", padding:"8px 8px 8px 28px", boxSizing:"border-box" }} />
                    </div>
                  </div>
                  <div style={{ gridColumn:"1/-1" }}>
                    <div style={{ color:"rgba(255,255,255,0.3)", fontSize:10, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:6 }}>
                      4. Email Address
                    </div>
                    <div style={{ position:"relative" }}>
                      <div style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
                        <i className="fas fa-envelope" style={{ color:"rgba(255,255,255,0.25)", fontSize:11 }} />
                      </div>
                      <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErr(""); }}
                        placeholder="your@email.com"
                        style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1.5px solid rgba(255,255,255,0.1)", borderRadius:8, outline:"none", color:"#fff", fontSize:12, fontFamily:"'Inter',sans-serif", padding:"8px 8px 8px 28px", boxSizing:"border-box" }} />
                    </div>
                  </div>
                </div>

                {/* Note (optional) */}
                <div style={{ padding:"6px 14px 0" }}>
                  <div style={{ color:"rgba(255,255,255,0.3)", fontSize:10, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:6 }}>
                    5. Describe Your Issue <span style={{ color:"rgba(255,255,255,0.18)", fontWeight:400, textTransform:"none", letterSpacing:0 }}>(optional)</span>
                  </div>
                  <textarea value={note} onChange={e => setNote(e.target.value)} rows={2}
                    placeholder="e.g. Flat tire on my 2019 Honda Civic, need same-day service…"
                    style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1.5px solid rgba(255,255,255,0.1)", borderRadius:8, outline:"none", color:"#fff", fontSize:12, fontFamily:"'Inter',sans-serif", padding:"8px 10px", boxSizing:"border-box", resize:"none", lineHeight:1.5 }} />
                </div>

                {/* Error */}
                {err && (
                  <div style={{ margin:"5px 14px 0", background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:7, padding:"7px 11px", color:"#ef4444", fontSize:11, display:"flex", alignItems:"center", gap:7 }}>
                    <i className="fas fa-circle-exclamation" style={{ fontSize:11 }} /> {err}
                  </div>
                )}

                {/* Submit + trust */}
                <div style={{ padding:"8px 14px 11px" }}>
                  <button type="submit" disabled={submitting} style={{
                    width:"100%", background:"linear-gradient(135deg,#e30613 0%,#c0050f 100%)",
                    border:"none", color:"#fff", borderRadius:9,
                    padding:"11px 20px", fontFamily:"'Oswald',sans-serif", fontWeight:700,
                    fontSize:14, letterSpacing:"0.1em", textTransform:"uppercase",
                    cursor: submitting ? "not-allowed" : "pointer",
                    boxShadow:"0 4px 22px rgba(227,6,19,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
                    display:"flex", alignItems:"center", justifyContent:"center", gap:9,
                    opacity: submitting ? 0.7 : 1, transition:"opacity 0.15s",
                  }}>
                    {submitting
                      ? <><i className="fas fa-spinner fa-spin" style={{ fontSize:13 }} /> Sending…</>
                      : <><i className="fas fa-paper-plane" style={{ fontSize:13 }} /> Request Free Quote</>
                    }
                  </button>

                  <div style={{ display:"flex", justifyContent:"center", gap:14, marginTop:7, flexWrap:"wrap" }}>
                    {[
                      { icon:"fa-bolt",         text:"Same-Day Available" },
                      { icon:"fa-shield-halved",text:"Licensed & Insured" },
                      { icon:"fa-clock",        text:"24/7 Service" },
                    ].map(t => (
                      <div key={t.text} style={{ display:"flex", alignItems:"center", gap:4 }}>
                        <i className={`fas ${t.icon}`} style={{ color:"#e30613", fontSize:9 }} />
                        <span style={{ color:"rgba(255,255,255,0.32)", fontSize:10, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.05em" }}>{t.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </form>
            )}
          </div>
        </div>

        {/* ── BOOKING FORM OVERLAY (desktop — bottom right) ── */}
        <div className="hero-form-overlay">
          <div style={{
            background:"rgba(8,6,18,0.88)", border:"1.5px solid rgba(255,255,255,0.11)",
            borderRadius:16, overflow:"hidden", backdropFilter:"blur(20px)",
            WebkitBackdropFilter:"blur(20px)",
            boxShadow:"0 16px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}>
            {/* Header */}
            <div style={{ background:"linear-gradient(90deg,rgba(227,6,19,0.18),rgba(227,6,19,0.04))", borderBottom:"1px solid rgba(227,6,19,0.2)", padding:"10px 14px", display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:26, height:26, borderRadius:7, background:"rgba(227,6,19,0.2)", border:"1px solid rgba(227,6,19,0.4)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <i className="fas fa-calendar-check" style={{ color:"#e30613", fontSize:11 }} />
              </div>
              <div style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:13, color:"#fff", letterSpacing:"0.08em", textTransform:"uppercase" }}>Book a Service</div>
              <div style={{ marginLeft:"auto", background:"rgba(34,197,94,0.12)", border:"1px solid rgba(34,197,94,0.3)", borderRadius:99, padding:"2px 9px", display:"flex", alignItems:"center", gap:4, flexShrink:0 }}>
                <div style={{ width:5, height:5, borderRadius:"50%", background:"#22c55e" }} />
                <span style={{ color:"#22c55e", fontSize:9, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.06em" }}>AVAILABLE NOW</span>
              </div>
            </div>

            {submitted ? (
              <div style={{ padding:"22px 16px", textAlign:"center" }}>
                <div style={{ width:46, height:46, borderRadius:"50%", background:"rgba(34,197,94,0.12)", border:"2px solid rgba(34,197,94,0.35)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px" }}>
                  <i className="fas fa-circle-check" style={{ color:"#22c55e", fontSize:22 }} />
                </div>
                <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:17, fontWeight:700, color:"#fff", letterSpacing:"0.06em", marginBottom:6 }}>REQUEST RECEIVED!</div>
                <div style={{ color:"rgba(255,255,255,0.5)", fontSize:12, lineHeight:1.6, marginBottom:14 }}>
                  We'll call you back at <span style={{ color:"#fff", fontWeight:600 }}>{phone}</span>.<br/>
                  <span style={{ color:"#e30613" }}>{service}</span>
                </div>
                <button onClick={() => { setSubmitted(false); setService(""); setName(""); setPhone(""); setEmail(""); setNote(""); }}
                  style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.14)", color:"rgba(255,255,255,0.65)", borderRadius:8, padding:"7px 16px", fontSize:11, fontFamily:"'Oswald',sans-serif", fontWeight:600, letterSpacing:"0.07em", cursor:"pointer" }}>
                  Book Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleBook}>
                {/* Service grid */}
                <div style={{ padding:"10px 12px 6px" }}>
                  <div style={{ color:"rgba(255,255,255,0.3)", fontSize:9, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:7 }}>Select Service</div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:5 }}>
                    {SERVICES.map(s => {
                      const sel = service === s.value;
                      return (
                        <button key={s.value} type="button" onClick={() => { setService(sel ? "" : s.value); setErr(""); }}
                          style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:3, padding:"7px 3px", borderRadius:8, background: sel ? "rgba(227,6,19,0.18)" : "rgba(255,255,255,0.04)", border:`1.5px solid ${sel ? "#e30613" : "rgba(255,255,255,0.08)"}`, color: sel ? "#fff" : "rgba(255,255,255,0.4)", cursor:"pointer", transition:"all 0.15s", boxShadow: sel ? "0 0 12px rgba(227,6,19,0.25)" : "none" }}>
                          <i className={`fas ${s.icon}`} style={{ fontSize:12, color: sel ? "#e30613" : "rgba(255,255,255,0.28)" }} />
                          <span style={{ fontFamily:"'Oswald',sans-serif", fontWeight:600, fontSize:8.5, letterSpacing:"0.03em", textTransform:"uppercase", textAlign:"center", lineHeight:1.3 }}>{s.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Fields */}
                <div style={{ padding:"6px 12px 0", display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                  {[
                    { key:"name",  type:"text",  icon:"fa-user",     val:name,  set:setName,  ph:"Full name" },
                    { key:"phone", type:"tel",   icon:"fa-phone",    val:phone, set:setPhone, ph:"Phone number" },
                  ].map(f => (
                    <div key={f.key} style={{ position:"relative" }}>
                      <div style={{ position:"absolute", left:9, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
                        <i className={`fas ${f.icon}`} style={{ color:"rgba(255,255,255,0.22)", fontSize:10 }} />
                      </div>
                      <input type={f.type} value={f.val} onChange={e => { f.set(e.target.value); setErr(""); }} placeholder={f.ph}
                        style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1.5px solid rgba(255,255,255,0.09)", borderRadius:7, outline:"none", color:"#fff", fontSize:11, fontFamily:"'Inter',sans-serif", padding:"7px 7px 7px 26px", boxSizing:"border-box" }} />
                    </div>
                  ))}
                  <div style={{ gridColumn:"1/-1", position:"relative" }}>
                    <div style={{ position:"absolute", left:9, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
                      <i className="fas fa-envelope" style={{ color:"rgba(255,255,255,0.22)", fontSize:10 }} />
                    </div>
                    <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErr(""); }} placeholder="Email address"
                      style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1.5px solid rgba(255,255,255,0.09)", borderRadius:7, outline:"none", color:"#fff", fontSize:11, fontFamily:"'Inter',sans-serif", padding:"7px 7px 7px 26px", boxSizing:"border-box" }} />
                  </div>
                  <div style={{ gridColumn:"1/-1", position:"relative" }}>
                    <textarea value={note} onChange={e => setNote(e.target.value)} rows={2} placeholder="Describe your issue (optional)"
                      style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1.5px solid rgba(255,255,255,0.09)", borderRadius:7, outline:"none", color:"#fff", fontSize:11, fontFamily:"'Inter',sans-serif", padding:"7px 10px", boxSizing:"border-box", resize:"none", lineHeight:1.5 }} />
                  </div>
                </div>

                {err && (
                  <div style={{ margin:"5px 12px 0", background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.22)", borderRadius:6, padding:"6px 10px", color:"#ef4444", fontSize:10, display:"flex", gap:6, alignItems:"center" }}>
                    <i className="fas fa-circle-exclamation" /> {err}
                  </div>
                )}

                <div style={{ padding:"8px 12px 11px" }}>
                  <button type="submit" disabled={submitting} style={{ width:"100%", background:"linear-gradient(135deg,#e30613,#c0050f)", border:"none", color:"#fff", borderRadius:8, padding:"10px", fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:13, letterSpacing:"0.1em", textTransform:"uppercase", cursor: submitting ? "not-allowed" : "pointer", boxShadow:"0 4px 18px rgba(227,6,19,0.45)", display:"flex", alignItems:"center", justifyContent:"center", gap:7, opacity: submitting ? 0.7 : 1 }}>
                    {submitting ? <><i className="fas fa-spinner fa-spin" style={{ fontSize:11 }} /> Sending…</> : <><i className="fas fa-paper-plane" style={{ fontSize:11 }} /> Request Free Quote</>}
                  </button>
                  <div style={{ display:"flex", justifyContent:"center", gap:12, marginTop:7 }}>
                    {[{icon:"fa-bolt",text:"Same-Day"},{icon:"fa-shield-halved",text:"Licensed"},{icon:"fa-clock",text:"24/7"}].map(t => (
                      <div key={t.text} style={{ display:"flex", alignItems:"center", gap:3 }}>
                        <i className={`fas ${t.icon}`} style={{ color:"#e30613", fontSize:8 }} />
                        <span style={{ color:"rgba(255,255,255,0.28)", fontSize:9.5, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.05em" }}>{t.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <div style={{ background:"#0d0d14", borderTop:"2px solid rgba(227,6,19,0.5)" }}>
        <div style={{ maxWidth:1600, margin:"0 auto" }}>
          <div className="stats-grid">
            {stats.map(({ icon, title, desc, href }, i) => (
              <a
                key={title}
                href={href}
                className="stat-link"
                style={{ animation: anim("statRise", 0.55, 1.3 + i * 0.08, "ease-out") }}
              >
                {/* number watermark */}
                <div style={{
                  position:"absolute", bottom:4, right:14,
                  fontFamily:"'Oswald',sans-serif",
                  fontSize:44, fontWeight:700,
                  color:"rgba(227,6,19,0.07)",
                  lineHeight:1, pointerEvents:"none", userSelect:"none",
                  letterSpacing:"-0.03em",
                }}>
                  {String(i + 1).padStart(2,"0")}
                </div>

                {/* icon */}
                <div className="stat-icon">
                  <i className={`fas ${icon}`} style={{ color:"#e30613", fontSize:19, position:"relative", zIndex:1 }} />
                </div>

                {/* text */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div className="stat-title">{title}</div>
                  <div className="stat-desc">{desc}</div>
                </div>

                {/* arrow */}
                <i className="stat-arrow fas fa-chevron-right" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
