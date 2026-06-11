import { useState, useEffect } from "react";

const SLIDES = ["/red-tire1.png","/red-oil.png", "/red-tire2.png", "/red-oil1.png"];

const checks = ["Tires", "Oil Change", "Auto Service", "Roadside Assistance"];

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
    align-items: flex-start;
    /* mobile default */
    min-height: 100svh;
    padding-top: 70px;
  }
  .hero-img-panel {
    position: absolute;
    top: 0; right: 0; bottom: 0;
    overflow: hidden;
    z-index: 1;
    /* mobile: full-width faint background */
    width: 100%;
    opacity: 0.2;
  }
  .hero-left {
    position: relative;
    z-index: 10;
    /* mobile default */
    padding: 28px 20px 44px;
    width: 100%;
    min-width: 0;
    max-width: none;
  }
  /* ── tablet sm ── */
  @media (min-width: 640px) {
    .hero-section { padding-top: 78px; align-items: center; }
    .hero-img-panel { width: 52%; opacity: 1; }
    .hero-left { padding: 36px 24px 44px 36px; width: 60%; }
  }
  /* ── tablet md (top bar visible) ── */
  @media (min-width: 768px) {
    .hero-section { padding-top: 106px; }
  }
  /* ── desktop ── */
  @media (min-width: 1024px) {
    .hero-section { min-height: 100vh; padding-top: 126px; align-items: center; }
    .hero-img-panel { width: 52%; opacity: 1; }
    .hero-left { padding: 48px 24px 48px 80px; width: 52%; min-width: 440px; max-width: 780px; }
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
  const [active, setActive] = useState(0);

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
                objectPosition: "center center",
                opacity: i === active ? 1 : 0,
                transition: "opacity 1.1s ease-in-out",
                filter: "brightness(1.05) saturate(1.18) contrast(1.02)",
              }}
            />
          ))}

          {/* left fade — lighter so image shows through */}
          <div style={{
            position: "absolute", top: 0, left: 0, bottom: 0, width: "58%",
            background: "linear-gradient(to right,rgba(14,12,24,0.98) 0%,rgba(14,12,24,0.88) 12%,rgba(14,12,24,0.65) 35%,rgba(14,12,24,0.25) 62%,transparent 100%)",
            zIndex: 2, pointerEvents: "none",
          }} />
          <div style={{ position:"absolute",top:0,left:0,right:0,height:90,background:"linear-gradient(to bottom,rgba(12,10,20,0.85),transparent)",zIndex:2,pointerEvents:"none" }} />
          <div style={{ position:"absolute",bottom:0,left:0,right:0,height:70,background:"linear-gradient(to top,rgba(12,10,20,0.6),transparent)",zIndex:2,pointerEvents:"none" }} />

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

          {/* FREMONT */}
          <div style={{
            fontFamily: "'Bebas Neue','Barlow Condensed',sans-serif",
            fontSize: "clamp(106px,14.5vw,200px)",
            fontWeight: 400, lineHeight: 0.84, letterSpacing: "0.01em",
            color: "#fff",
            textShadow: "3px 4px 0 rgba(0,0,0,0.9),-1px -1px 0 rgba(0,0,0,0.5),5px 5px 14px rgba(0,0,0,0.8),2px 0 0 rgba(255,255,255,0.06)",
            marginBottom: 10,
            animation: anim("heroFadeLeft", 0.68, 0.5),
          }}>
            FREMONT
          </div>

          {/* RED BAR */}
          <div style={{
            background: "linear-gradient(90deg,#e30613 0%,#c0000f 100%)",
            padding: "10px 28px 11px",
            width: "calc(100% + 28px)", marginLeft: -28, marginBottom: 22,
            boxShadow: "0 8px 36px rgba(227,6,19,0.55),inset 0 1px 0 rgba(255,255,255,0.12)",
            animation: anim("heroBarSlide", 0.65, 0.64),
            transformOrigin: "left center",
          }}>
            <span style={{
              fontFamily: "'Bebas Neue','Barlow Condensed',sans-serif",
              fontSize: "clamp(28px,3.8vw,58px)", fontWeight: 400,
              color: "#fff", letterSpacing: "0.1em",
              textTransform: "uppercase", lineHeight: 1,
              textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
            }}>
              TIRE &amp; OIL CHANGE
            </span>
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
            color:"rgba(255,255,255,0.82)",fontSize:16,lineHeight:1.65,marginBottom:30,maxWidth:460,
            animation: anim("heroFadeUp", 0.6, 1.06, "ease-out"),
          }}>
            We come to you — Home, Business, Job Site, or Roadside.{" "}
            <span style={{ color:"rgba(255,255,255,0.9)",fontWeight:700 }}>Fast. Reliable. Professional.</span>
          </p>

          {/* BUTTONS */}
          <div style={{
            display:"flex",flexWrap:"wrap",gap:12,
            animation: anim("heroFadeUp", 0.6, 1.18, "ease-out"),
          }}>

            <a href="tel:+14156347777" className="hero-btn-call" style={{ boxShadow:"0 6px 32px rgba(227,6,19,0.55)", animation:"btnGlow 2.4s ease-in-out 1.8s infinite" }}>
              <div className="cbtn-icon">
                <i className="fas fa-phone cbtn-phone" style={{ color:"#fff",fontSize:15 }} />
              </div>
              <div>
                <div className="cbtn-label" style={{ fontFamily:"'Oswald',sans-serif",fontSize:11,fontWeight:500,color:"rgba(255,255,255,0.75)",letterSpacing:"0.22em",textTransform:"uppercase",lineHeight:1,marginBottom:3 }}>Call Now</div>
                <div className="cbtn-num" style={{ fontFamily:"'Oswald',sans-serif",fontSize:21,fontWeight:700,color:"#fff",letterSpacing:"0.04em",lineHeight:1 }}>(415) 634-7777</div>
              </div>
            </a>

            <a href="/contacts" className="hero-btn-service">
              <div className="sbtn-icon">
                <i className="fas fa-calendar-check sbtn-cal" style={{ color:"#fff",fontSize:15 }} />
              </div>
              <div>
                <div className="sbtn-title" style={{ fontFamily:"'Oswald',sans-serif",fontSize:17,fontWeight:600,color:"#fff",textTransform:"uppercase",letterSpacing:"0.08em",lineHeight:1.1 }}>Request Service</div>
                <div style={{ fontSize:11.5,color:"rgba(255,255,255,0.45)",lineHeight:1.2 }}>We'll come to you</div>
              </div>
            </a>
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
