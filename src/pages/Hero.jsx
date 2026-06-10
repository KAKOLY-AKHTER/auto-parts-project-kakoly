import { useState, useEffect } from "react";

const SLIDES = ["/red-tire1.png","/red-oil.png", "/red-tire2.png", "/red-oil1.png"];

const checks = ["Tires", "Oil Change", "Auto Service", "Roadside Assistance"];

const stats = [
  { icon: "fa-truck",       title: "Fully Equipped",          desc: "Mobile Service Trucks" },
  { icon: "fa-users",       title: "Experienced Technicians", desc: "Trained & Certified" },
  { icon: "fa-certificate", title: "Quality Parts & Oils",    desc: "Top Brands You Trust" },
  { icon: "fa-tag",         title: "Honest Pricing",          desc: "No Hidden Fees" },
  { icon: "fa-handshake",   title: "Satisfaction Guaranteed", desc: "We Stand Behind Our Work" },
];

const TOP = 126;

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
        style={{
          position: "relative",
          minHeight: "100vh",
          paddingTop: TOP,
          background: "#080808",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          animation: anim("heroFadeIn", 0.4, 0, "ease"),
        }}
      >
        {/* ── RIGHT IMAGE SLIDER ── */}
        <div
          style={{
            position: "absolute",
            top: 0, right: 0, bottom: 0,
            width: "52%",
            overflow: "hidden",
            zIndex: 1,
            animation: anim("heroImgFade", 1.1, 0.2, "ease-out"),
          }}
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
                filter: "brightness(0.85) saturate(1.1) contrast(1.05)",
              }}
            />
          ))}

          {/* left fade */}
          <div style={{
            position: "absolute", top: 0, left: 0, bottom: 0, width: "55%",
            background: "linear-gradient(to right,#080808 0%,#080808 10%,rgba(8,8,8,0.9) 35%,rgba(8,8,8,0.45) 65%,transparent 100%)",
            zIndex: 2, pointerEvents: "none",
          }} />
          <div style={{ position:"absolute",top:0,left:0,right:0,height:100,background:"linear-gradient(to bottom,#080808,transparent)",zIndex:2,pointerEvents:"none" }} />
          <div style={{ position:"absolute",bottom:0,left:0,right:0,height:80,background:"linear-gradient(to top,#080808,transparent)",zIndex:2,pointerEvents:"none" }} />

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
        <div style={{
          position: "relative", zIndex: 10,
          padding: "48px 24px 48px 80px",
          width: "52%", minWidth: 440, maxWidth: 780,
        }}>

          {/* 24/7 label */}
          <p style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontSize: 15, fontWeight: 800, fontStyle: "italic",
            color: "#e30613", letterSpacing: "0.18em",
            textTransform: "uppercase", marginBottom: 8,
            animation: anim("heroFadeLeft", 0.6, 0.25),
          }}>
            24/7 Mobile Service
          </p>

          {/* 24HR */}
          <div style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontSize: "clamp(100px,12vw,168px)",
            fontWeight: 900, lineHeight: 0.88, letterSpacing: "-0.015em",
            animation: anim("heroFadeLeft", 0.65, 0.38),
          }}>
            <span style={{ color: "#e30613", textShadow: "0 0 40px rgba(227,6,19,0.45),3px 3px 0 rgba(0,0,0,0.7)" }}>24</span>
            <span style={{ color: "#fff", textShadow: "3px 3px 0 rgba(0,0,0,0.7)" }}>HR</span>
          </div>

          {/* FREMONT */}
          <div style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontSize: "clamp(106px,14.5vw,200px)",
            fontWeight: 900, lineHeight: 0.84, letterSpacing: "-0.025em",
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
              fontFamily: "'Barlow Condensed',sans-serif",
              fontSize: "clamp(26px,3.6vw,54px)", fontWeight: 900,
              color: "#fff", letterSpacing: "0.07em",
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
                  fontFamily:"'Barlow Condensed',sans-serif",
                  fontSize:14,fontWeight:800,color:"#fff",
                  textTransform:"uppercase",letterSpacing:"0.09em",
                }}>{c}</span>
              </div>
            ))}
          </div>

          {/* DESCRIPTION */}
          <p style={{
            color:"rgba(255,255,255,0.55)",fontSize:15.5,lineHeight:1.6,marginBottom:30,maxWidth:460,
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

            <a href="tel:+14156347777" style={{
              display:"inline-flex",alignItems:"center",gap:14,
              background:"#e30613",padding:"12px 26px",borderRadius:6,
              textDecoration:"none",
              boxShadow:"0 6px 32px rgba(227,6,19,0.55)",
              border:"2px solid rgba(255,255,255,0.12)",
              animation:"btnGlow 2.4s ease-in-out 1.8s infinite",
            }}>
              <div style={{ width:44,height:44,borderRadius:"50%",background:"rgba(255,255,255,0.15)",border:"2px solid rgba(255,255,255,0.3)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                <i className="fas fa-phone" style={{ color:"#fff",fontSize:15 }} />
              </div>
              <div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,fontWeight:800,color:"rgba(255,255,255,0.75)",letterSpacing:"0.22em",textTransform:"uppercase",lineHeight:1,marginBottom:3 }}>Call Now</div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:"#fff",letterSpacing:"0.03em",lineHeight:1 }}>(415) 634-7777</div>
              </div>
            </a>

            <a href="/contacts" style={{
              display:"inline-flex",alignItems:"center",gap:14,
              background:"rgba(255,255,255,0.06)",
              border:"2px solid rgba(255,255,255,0.28)",
              padding:"12px 26px",borderRadius:6,textDecoration:"none",
            }}>
              <div style={{ width:44,height:44,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.35)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                <i className="fas fa-calendar-check" style={{ color:"#fff",fontSize:15 }} />
              </div>
              <div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:900,color:"#fff",textTransform:"uppercase",letterSpacing:"0.07em",lineHeight:1.1 }}>Request Service</div>
                <div style={{ fontSize:11.5,color:"rgba(255,255,255,0.45)",lineHeight:1.2 }}>We'll come to you</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <div style={{ background:"#0a0a0e",borderTop:"2px solid rgba(227,6,19,0.3)" }}>
        <div style={{ maxWidth:1600,margin:"0 auto" }}>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)" }}>
            {stats.map(({ icon,title,desc }, i) => (
              <div key={title} style={{
                display:"flex",alignItems:"center",gap:14,
                padding:"18px 22px",
                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                animation: anim("statRise", 0.55, 1.3 + i * 0.08, "ease-out"),
              }}>
                <div style={{ width:48,height:48,borderRadius:"50%",background:"rgba(227,6,19,0.1)",border:"1.5px solid rgba(227,6,19,0.32)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <i className={`fas ${icon}`} style={{ color:"#e30613",fontSize:16 }} />
                </div>
                <div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,fontWeight:900,color:"#fff",textTransform:"uppercase",letterSpacing:"0.07em",lineHeight:1.2 }}>{title}</div>
                  <div style={{ fontSize:11,color:"rgba(255,255,255,0.35)",lineHeight:1.3,marginTop:2 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
