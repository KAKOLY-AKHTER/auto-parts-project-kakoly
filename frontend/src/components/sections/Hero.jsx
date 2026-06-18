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
  @keyframes formSlideIn {
    from { opacity: 0; transform: translateY(32px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes inputFocusPulse {
    0%   { box-shadow: 0 0 0 0 rgba(227,6,19,0.45); }
    70%  { box-shadow: 0 0 0 6px rgba(227,6,19,0); }
    100% { box-shadow: 0 0 0 0 rgba(227,6,19,0); }
  }
  @keyframes submitPulse {
    0%,100% { box-shadow: 0 6px 28px rgba(227,6,19,0.55), inset 0 1px 0 rgba(255,255,255,0.15); }
    50%     { box-shadow: 0 8px 38px rgba(227,6,19,0.85), 0 0 0 5px rgba(227,6,19,0.18), inset 0 1px 0 rgba(255,255,255,0.2); }
  }
  /* form card entrance */
  .hero-form-overlay > div {
    animation: formSlideIn 0.55s cubic-bezier(0.22,1,0.36,1) 1.1s both;
    border-top: 3px solid #e30613;
  }
  /* service tile hover */
  .svc-tile {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 5px; padding: 10px 4px; border-radius: 9px; cursor: pointer;
    transition: background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, transform 0.18s ease, border-radius 0.25s ease;
    background: rgba(255,255,255,0.07) !important;
    border: 1.5px solid rgba(255,255,255,0.15) !important;
  }
  .svc-tile:hover {
    background: rgba(227,6,19,0.18) !important;
    border-color: #e30613 !important;
    border-radius: 18px !important;
    box-shadow: 0 0 16px rgba(227,6,19,0.30);
    transform: translateY(-3px);
  }
  .svc-tile:hover i, .svc-tile:hover span { color: #fff !important; }
  .svc-tile.sel {
    background: rgba(227,6,19,0.25) !important;
    border-color: #e30613 !important;
    border-radius: 18px !important;
    box-shadow: 0 0 18px rgba(227,6,19,0.45);
    transform: translateY(-2px);
  }
  /* input */
  .hf-input {
    width: 100%; background: rgba(255,255,255,0.07);
    border: 1.5px solid rgba(255,255,255,0.14); border-radius: 8px; outline: none;
    color: #fff; font-size: 13px; font-family: 'Inter',sans-serif;
    padding: 11px 11px 11px 32px; box-sizing: border-box;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    position: relative; z-index: 1;
  }
  .hf-input:focus {
    border-color: #e30613;
    background: rgba(227,6,19,0.08);
    box-shadow: 0 0 0 3px rgba(227,6,19,0.18);
    animation: inputFocusPulse 0.5s ease-out;
  }
  .hf-input::placeholder { color: rgba(255,255,255,0.28); }
  /* submit button */
  .hf-submit {
    width: 100%; border: none; color: #fff; border-radius: 10px; padding: 13px 20px;
    font-family: 'Oswald',sans-serif; font-weight: 700; font-size: 14px;
    letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer;
    background: linear-gradient(135deg,#e30613 0%,#bf040f 100%);
    box-shadow: 0 6px 28px rgba(227,6,19,0.55), inset 0 1px 0 rgba(255,255,255,0.15);
    display: flex; align-items: center; justify-content: center; gap: 10px;
    transition: transform 0.15s, box-shadow 0.15s;
    animation: submitPulse 2.4s ease-in-out 2s infinite;
  }
  .hf-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 40px rgba(227,6,19,0.75), inset 0 1px 0 rgba(255,255,255,0.2);
    animation: none;
  }
  .hf-submit:active { transform: translateY(0); }
  .hf-submit:disabled { opacity: 0.6; cursor: not-allowed; animation: none; }
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
      width: 360px;
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
            fontFamily: "'Bebas Neue','Barlow Condensed',sans-serif",
            fontSize: "clamp(106px,14.5vw,200px)",
            fontWeight: 400, lineHeight: 0.84, letterSpacing: "0.01em",
            color: "#fff", marginBottom: 22,
            textShadow: "3px 4px 0 rgba(0,0,0,0.9),-1px -1px 0 rgba(0,0,0,0.5),5px 5px 14px rgba(0,0,0,0.8)",
            animation: anim("heroFadeLeft", 0.68, 0.5),
          }}>
            FREMONT
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

          {/* ── CTA BUTTONS ── */}
          <div style={{
            display:"flex", flexWrap:"wrap", gap:12, marginBottom:18,
            animation: anim("heroFadeUp", 0.6, 1.18, "ease-out"),
          }}>
            <a href="tel:+14156347777" className="hero-btn-call" style={{ boxShadow:"0 6px 32px rgba(227,6,19,0.55)", animation:"btnGlow 2.4s ease-in-out 1.8s infinite" }}>
              <div className="cbtn-icon">
                <i className="fas fa-phone cbtn-phone" style={{ color:"#fff", fontSize:15 }} />
              </div>
              <div>
                <div className="cbtn-label" style={{ fontFamily:"'Oswald',sans-serif", fontSize:11, fontWeight:500, color:"rgba(255,255,255,0.75)", letterSpacing:"0.22em", textTransform:"uppercase", lineHeight:1, marginBottom:3 }}>Call Now</div>
                <div className="cbtn-num" style={{ fontFamily:"'Oswald',sans-serif", fontSize:21, fontWeight:700, color:"#fff", letterSpacing:"0.04em", lineHeight:1 }}>(415) 634-7777</div>
              </div>
            </a>
            <a href="/contacts" className="hero-btn-service">
              <div className="sbtn-icon">
                <i className="fas fa-calendar-check sbtn-cal" style={{ color:"#fff", fontSize:15 }} />
              </div>
              <div>
                <div className="sbtn-title" style={{ fontFamily:"'Oswald',sans-serif", fontSize:17, fontWeight:600, color:"#fff", textTransform:"uppercase", letterSpacing:"0.08em", lineHeight:1.1 }}>Request Service</div>
                <div style={{ fontSize:11.5, color:"rgba(255,255,255,0.45)", lineHeight:1.2 }}>We'll come to you</div>
              </div>
            </a>
          </div>

          {/* ── BOOKING FORM (mobile — shown inside left panel) ── */}
          <div className="hero-form-mobile" style={{ marginTop:16 }}>
          <div style={{
            background:"#0f1117",
            borderRadius:14, overflow:"hidden",
            border:"1.5px solid rgba(255,255,255,0.08)",
            boxShadow:"0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
            borderTop:"3px solid #e30613",
          }}>

            {/* ── HEADER ── */}
            <div style={{ padding:"14px 18px 12px", display:"flex", alignItems:"center", gap:12, borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,rgba(227,6,19,0.25),rgba(227,6,19,0.1))", border:"1px solid rgba(227,6,19,0.5)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <i className="fas fa-wrench" style={{ color:"#e30613", fontSize:14 }} />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:15, color:"#fff", letterSpacing:"0.07em", textTransform:"uppercase", lineHeight:1 }}>Book a Service</div>
                <div style={{ color:"rgba(255,255,255,0.45)", fontSize:10.5, marginTop:2, fontFamily:"'Inter',sans-serif" }}>Free estimate · No commitment · We come to you</div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:5, background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.25)", borderRadius:99, padding:"4px 10px", flexShrink:0 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:"#22c55e", boxShadow:"0 0 6px #22c55e" }} />
                <span style={{ color:"#22c55e", fontSize:9, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.08em" }}>OPEN NOW</span>
              </div>
            </div>

            {submitted ? (
              <div style={{ padding:"28px 18px", textAlign:"center" }}>
                <div style={{ width:56, height:56, borderRadius:"50%", background:"rgba(34,197,94,0.1)", border:"2px solid rgba(34,197,94,0.35)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px", boxShadow:"0 0 24px rgba(34,197,94,0.2)" }}>
                  <i className="fas fa-circle-check" style={{ color:"#22c55e", fontSize:26 }} />
                </div>
                <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:19, fontWeight:700, color:"#fff", letterSpacing:"0.06em", marginBottom:6 }}>REQUEST RECEIVED!</div>
                <div style={{ color:"rgba(255,255,255,0.45)", fontSize:12, lineHeight:1.7, marginBottom:18 }}>
                  We'll call you back shortly at<br/>
                  <span style={{ color:"#fff", fontWeight:600, fontSize:13 }}>{phone}</span>
                  <br/><span style={{ color:"#e30613", fontSize:11 }}>{service}</span>
                </div>
                <button onClick={() => { setSubmitted(false); setService(""); setName(""); setPhone(""); setEmail(""); setNote(""); }}
                  style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.6)", borderRadius:8, padding:"8px 18px", fontSize:11, fontFamily:"'Oswald',sans-serif", fontWeight:600, letterSpacing:"0.07em", cursor:"pointer" }}>
                  ← Book Another Service
                </button>
              </div>
            ) : (
              <form onSubmit={handleBook}>

                {/* ── STEP 1 ── */}
                <div style={{ padding:"12px 16px 8px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                    <div style={{ width:20, height:20, borderRadius:"50%", background:"#e30613", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <span style={{ color:"#fff", fontSize:11, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>1</span>
                    </div>
                    <span style={{ color:"#fff", fontSize:12, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.14em", textTransform:"uppercase" }}>Select Your Service</span>
                    {service && <span style={{ marginLeft:"auto", color:"#e30613", fontSize:10, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>✓ SELECTED</span>}
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:5 }}>
                    {SERVICES.map(s => {
                      const sel = service === s.value;
                      return (
                        <button key={s.value} type="button"
                          className={`svc-tile${sel?" sel":""}`}
                          onClick={() => { setService(sel?"":s.value); setErr(""); }}
                          style={{
                            background: sel ? "rgba(227,6,19,0.10)" : "rgba(0,0,0,0.06)",
                            border:`1.5px solid ${sel ? "#e30613" : "rgba(0,0,0,0.14)"}`,
                          }}>
                          <i className={`fas ${s.icon}`} style={{ fontSize:15, color: sel ? "#fff" : "rgba(255,255,255,0.85)", transition:"color 0.18s" }} />
                          <span style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:10.5, letterSpacing:"0.04em", textTransform:"uppercase", textAlign:"center", lineHeight:1.3, color: sel ? "#fff" : "rgba(255,255,255,0.90)" }}>{s.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ height:1, background:"rgba(255,255,255,0.07)", margin:"0 16px" }} />

                {/* ── STEP 2 ── */}
                <div style={{ padding:"10px 16px 8px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                    <div style={{ width:20, height:20, borderRadius:"50%", background: name&&phone&&email ? "#22c55e" : "rgba(255,255,255,0.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"background 0.3s" }}>
                      <span style={{ color:"#fff", fontSize:11, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>{name&&phone&&email ? "✓" : "2"}</span>
                    </div>
                    <span style={{ color:"#fff", fontSize:12, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.14em", textTransform:"uppercase" }}>Your Details</span>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7 }}>
                    <div>
                      <label style={{ display:"block", color:"rgba(255,255,255,0.65)", fontSize:11.5, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>Full Name</label>
                      <div style={{ position:"relative" }}>
                        <i className="fas fa-user" style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.35)", fontSize:13, pointerEvents:"none", zIndex:2 }} />
                        <input type="text" value={name} onChange={e=>{setName(e.target.value);setErr("");}} placeholder="John Smith" className="hf-input" />
                      </div>
                    </div>
                    <div>
                      <label style={{ display:"block", color:"rgba(255,255,255,0.65)", fontSize:11.5, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>Phone</label>
                      <div style={{ position:"relative" }}>
                        <i className="fas fa-phone" style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.35)", fontSize:13, pointerEvents:"none", zIndex:2 }} />
                        <input type="tel" value={phone} onChange={e=>{setPhone(e.target.value);setErr("");}} placeholder="(415) 000-0000" className="hf-input" />
                      </div>
                    </div>
                    <div style={{ gridColumn:"1/-1" }}>
                      <label style={{ display:"block", color:"rgba(255,255,255,0.65)", fontSize:11.5, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>Email Address</label>
                      <div style={{ position:"relative" }}>
                        <i className="fas fa-envelope" style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.35)", fontSize:13, pointerEvents:"none", zIndex:2 }} />
                        <input type="email" value={email} onChange={e=>{setEmail(e.target.value);setErr("");}} placeholder="your@email.com" className="hf-input" />
                      </div>
                    </div>
                  </div>
                </div>

                {err && (
                  <div style={{ margin:"0 16px 6px", background:"rgba(239,68,68,0.10)", border:"1px solid rgba(239,68,68,0.35)", borderRadius:7, padding:"7px 11px", color:"#f87171", fontSize:11, display:"flex", alignItems:"center", gap:7 }}>
                    <i className="fas fa-circle-exclamation" style={{ fontSize:11 }} /> {err}
                  </div>
                )}

                {/* ── SUBMIT ── */}
                <div style={{ padding:"6px 16px 14px" }}>
                  <button type="submit" disabled={submitting} className="hf-submit">
                    {submitting
                      ? <><i className="fas fa-spinner fa-spin" style={{fontSize:13}}/> Sending Request…</>
                      : <><i className="fas fa-arrow-right" style={{fontSize:13}}/> Get Free Quote</>
                    }
                  </button>
                  <div style={{ display:"flex", justifyContent:"space-between", marginTop:10, padding:"8px 4px 0", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
                    {[
                      { icon:"fa-bolt",          text:"Same-Day Available" },
                      { icon:"fa-shield-halved",  text:"Licensed & Insured" },
                      { icon:"fa-clock",          text:"24/7 Service" },
                    ].map(t => (
                      <div key={t.text} style={{ display:"flex", alignItems:"center", gap:5 }}>
                        <i className={`fas ${t.icon}`} style={{ color:"#e30613", fontSize:10 }} />
                        <span style={{ color:"rgba(255,255,255,0.50)", fontSize:10.5, fontFamily:"'Inter',sans-serif" }}>{t.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </form>
            )}
          </div>
          </div>
        </div>

        {/* ── BOOKING FORM OVERLAY (desktop — bottom right) ── */}
        <div className="hero-form-overlay">
          <div style={{
            background:"#0f1117",
            borderRadius:14, overflow:"hidden",
            border:"1.5px solid rgba(255,255,255,0.08)",
            boxShadow:"0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
            borderTop:"3px solid #e30613",
          }}>

            {/* ── HEADER ── */}
            <div style={{ padding:"14px 18px 12px", display:"flex", alignItems:"center", gap:12, borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,rgba(227,6,19,0.25),rgba(227,6,19,0.1))", border:"1px solid rgba(227,6,19,0.5)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <i className="fas fa-wrench" style={{ color:"#e30613", fontSize:14 }} />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:15, color:"#fff", letterSpacing:"0.07em", textTransform:"uppercase", lineHeight:1 }}>Book a Service</div>
                <div style={{ color:"rgba(255,255,255,0.45)", fontSize:10.5, marginTop:2, fontFamily:"'Inter',sans-serif" }}>Free estimate · No commitment · We come to you</div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:5, background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.25)", borderRadius:99, padding:"4px 10px", flexShrink:0 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:"#22c55e", boxShadow:"0 0 6px #22c55e" }} />
                <span style={{ color:"#22c55e", fontSize:9, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.08em" }}>OPEN NOW</span>
              </div>
            </div>

            {submitted ? (
              /* ── SUCCESS ── */
              <div style={{ padding:"28px 18px", textAlign:"center" }}>
                <div style={{ width:56, height:56, borderRadius:"50%", background:"rgba(34,197,94,0.1)", border:"2px solid rgba(34,197,94,0.35)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px", boxShadow:"0 0 24px rgba(34,197,94,0.2)" }}>
                  <i className="fas fa-circle-check" style={{ color:"#22c55e", fontSize:26 }} />
                </div>
                <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:19, fontWeight:700, color:"#fff", letterSpacing:"0.06em", marginBottom:6 }}>REQUEST RECEIVED!</div>
                <div style={{ color:"rgba(255,255,255,0.45)", fontSize:12, lineHeight:1.7, marginBottom:18 }}>
                  We'll call you back shortly at<br/>
                  <span style={{ color:"#fff", fontWeight:600, fontSize:13 }}>{phone}</span>
                  <br/><span style={{ color:"#e30613", fontSize:11 }}>{service}</span>
                </div>
                <button onClick={() => { setSubmitted(false); setService(""); setName(""); setPhone(""); setEmail(""); setNote(""); }}
                  style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.6)", borderRadius:8, padding:"8px 18px", fontSize:11, fontFamily:"'Oswald',sans-serif", fontWeight:600, letterSpacing:"0.07em", cursor:"pointer" }}>
                  ← Book Another Service
                </button>
              </div>
            ) : (
              <form onSubmit={handleBook}>

                {/* ── STEP 1: SERVICE ── */}
                <div style={{ padding:"12px 16px 8px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                    <div style={{ width:20, height:20, borderRadius:"50%", background:"#e30613", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <span style={{ color:"#fff", fontSize:11, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>1</span>
                    </div>
                    <span style={{ color:"#fff", fontSize:12, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.14em", textTransform:"uppercase" }}>Select Your Service</span>
                    {service && <span style={{ marginLeft:"auto", color:"#e30613", fontSize:10, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.06em" }}>✓ SELECTED</span>}
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:5 }}>
                    {SERVICES.map(s => {
                      const sel = service === s.value;
                      return (
                        <button key={s.value} type="button"
                          className={`svc-tile${sel?" sel":""}`}
                          onClick={() => { setService(sel?"":s.value); setErr(""); }}
                          style={{
                            background: sel ? "rgba(227,6,19,0.40)" : "rgba(255,255,255,0.18)",
                            border: `1.5px solid ${sel ? "#e30613" : "rgba(255,255,255,0.62)"}`,
                          }}>
                          <i className={`fas ${s.icon}`} style={{ fontSize:15, color: sel ? "#fff" : "rgba(255,255,255,0.85)", transition:"color 0.18s" }} />
                          <span style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:10.5, letterSpacing:"0.04em", textTransform:"uppercase", textAlign:"center", lineHeight:1.3, color: sel ? "#fff" : "rgba(255,255,255,0.90)" }}>{s.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* divider */}
                <div style={{ height:1, background:"rgba(255,255,255,0.07)", margin:"0 16px" }} />

                {/* ── STEP 2: DETAILS ── */}
                <div style={{ padding:"10px 16px 8px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                    <div style={{ width:20, height:20, borderRadius:"50%", background: name&&phone&&email ? "#22c55e" : "rgba(255,255,255,0.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"background 0.3s" }}>
                      <span style={{ color:"#fff", fontSize:11, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>{name&&phone&&email ? "✓" : "2"}</span>
                    </div>
                    <span style={{ color:"#fff", fontSize:12, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.14em", textTransform:"uppercase" }}>Your Details</span>
                  </div>

                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7 }}>
                    <div>
                      <label style={{ display:"block", color:"rgba(255,255,255,0.65)", fontSize:11.5, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>Full Name</label>
                      <div style={{ position:"relative" }}>
                        <i className="fas fa-user" style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.35)", fontSize:13, pointerEvents:"none", zIndex:2 }} />
                        <input type="text" value={name} onChange={e=>{setName(e.target.value);setErr("");}} placeholder="John Smith" className="hf-input" />
                      </div>
                    </div>
                    <div>
                      <label style={{ display:"block", color:"rgba(255,255,255,0.65)", fontSize:11.5, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>Phone</label>
                      <div style={{ position:"relative" }}>
                        <i className="fas fa-phone" style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.35)", fontSize:13, pointerEvents:"none", zIndex:2 }} />
                        <input type="tel" value={phone} onChange={e=>{setPhone(e.target.value);setErr("");}} placeholder="(415) 000-0000" className="hf-input" />
                      </div>
                    </div>
                    <div style={{ gridColumn:"1/-1" }}>
                      <label style={{ display:"block", color:"rgba(255,255,255,0.65)", fontSize:11.5, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>Email Address</label>
                      <div style={{ position:"relative" }}>
                        <i className="fas fa-envelope" style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.35)", fontSize:13, pointerEvents:"none", zIndex:2 }} />
                        <input type="email" value={email} onChange={e=>{setEmail(e.target.value);setErr("");}} placeholder="your@email.com" className="hf-input" />
                      </div>
                    </div>
                  </div>
                </div>

                {err && (
                  <div style={{ margin:"0 16px 6px", background:"rgba(239,68,68,0.10)", border:"1px solid rgba(239,68,68,0.35)", borderRadius:7, padding:"7px 11px", color:"#f87171", fontSize:11, display:"flex", alignItems:"center", gap:7 }}>
                    <i className="fas fa-circle-exclamation" style={{ fontSize:11 }} /> {err}
                  </div>
                )}

                {/* ── SUBMIT ── */}
                <div style={{ padding:"6px 16px 14px" }}>
                  <button type="submit" disabled={submitting} className="hf-submit">
                    {submitting
                      ? <><i className="fas fa-spinner fa-spin" style={{fontSize:13}}/> Sending Request…</>
                      : <><i className="fas fa-arrow-right" style={{fontSize:13}}/> Get Free Quote</>
                    }
                  </button>

                  <div style={{ display:"flex", justifyContent:"space-between", marginTop:10, padding:"8px 4px 0", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
                    {[
                      { icon:"fa-bolt",          text:"Same-Day Available" },
                      { icon:"fa-shield-halved",  text:"Licensed & Insured" },
                      { icon:"fa-clock",          text:"24/7 Service" },
                    ].map(t => (
                      <div key={t.text} style={{ display:"flex", alignItems:"center", gap:5 }}>
                        <i className={`fas ${t.icon}`} style={{ color:"#e30613", fontSize:10 }} />
                        <span style={{ color:"rgba(255,255,255,0.50)", fontSize:10.5, fontFamily:"'Inter',sans-serif" }}>{t.text}</span>
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
