const BASE_ANIM = `
  @keyframes spFadeUp   { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
  @keyframes spFadeLeft { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes spFadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes spCardPop  { from{opacity:0;transform:scale(0.93) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
`;

const a = (name, dur, delay) =>
  `${name} ${dur}s cubic-bezier(.22,.68,0,1.15) ${delay}s both`;

export default function ServicePageBase({
  icon,
  badge,
  title,
  subtitle,
  description,
  heroImg,
  services = [],
  process  = [],
  extra    = null,
}) {
  return (
    <div style={{ background: "#080808", color: "#fff", minHeight: "100vh" }}>
      <style>{BASE_ANIM}</style>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: 420, display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 126 }}>
        {heroImg && (
          <>
            <img src={heroImg} alt="" style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.35) saturate(1.1)",zIndex:0 }} />
            <div style={{ position:"absolute",inset:0,background:"linear-gradient(110deg,rgba(8,8,8,0.92) 0%,rgba(8,8,8,0.6) 55%,rgba(8,8,8,0.25) 100%)",zIndex:1 }} />
          </>
        )}
        {!heroImg && <div style={{ position:"absolute",inset:0,background:"linear-gradient(135deg,#0e0e14 0%,#120508 100%)",zIndex:0 }} />}

        <div style={{ position:"relative",zIndex:2,maxWidth:860,padding:"56px 80px" }}>
          <div style={{ display:"flex",alignItems:"center",gap:16,marginBottom:20,animation:a("spFadeLeft",0.55,0.1) }}>
            <div style={{ width:58,height:58,borderRadius:"50%",background:"rgba(227,6,19,0.12)",border:"2px solid #e30613",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 20px rgba(227,6,19,0.35)" }}>
              <i className={`fas ${icon}`} style={{ color:"#e30613",fontSize:22 }} />
            </div>
            {badge && (
              <span style={{ background:"rgba(227,6,19,0.15)",border:"1px solid rgba(227,6,19,0.4)",color:"#e30613",padding:"4px 14px",borderRadius:99,fontSize:11,fontWeight:800,letterSpacing:"0.14em",textTransform:"uppercase" }}>
                {badge}
              </span>
            )}
          </div>

          <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(38px,5.5vw,72px)",fontWeight:900,lineHeight:1,letterSpacing:"-0.02em",color:"#fff",marginBottom:10,animation:a("spFadeUp",0.6,0.2) }}>
            {title}
          </h1>
          {subtitle && (
            <div style={{ background:"#e30613",display:"inline-block",padding:"5px 18px",marginBottom:18,animation:a("spFadeLeft",0.55,0.3) }}>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(15px,2vw,22px)",fontWeight:800,color:"#fff",letterSpacing:"0.06em",textTransform:"uppercase" }}>{subtitle}</span>
            </div>
          )}
          <p style={{ fontSize:16,color:"rgba(255,255,255,0.58)",lineHeight:1.7,maxWidth:620,animation:a("spFadeUp",0.6,0.38) }}>
            {description}
          </p>

          <div style={{ display:"flex",gap:12,marginTop:28,animation:a("spFadeUp",0.6,0.48) }}>
            <a href="tel:+14156347777" style={{ display:"inline-flex",alignItems:"center",gap:10,background:"#e30613",padding:"12px 24px",borderRadius:6,textDecoration:"none",boxShadow:"0 6px 28px rgba(227,6,19,0.5)" }}>
              <i className="fas fa-phone" style={{ color:"#fff",fontSize:13 }} />
              <div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:9,fontWeight:800,color:"rgba(255,255,255,0.7)",letterSpacing:"0.2em",textTransform:"uppercase",lineHeight:1,marginBottom:2 }}>Call Now</div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:900,color:"#fff",lineHeight:1 }}>(415) 634-7777</div>
              </div>
            </a>
            <a href="/contacts" style={{ display:"inline-flex",alignItems:"center",gap:10,border:"2px solid rgba(255,255,255,0.25)",padding:"12px 24px",borderRadius:6,textDecoration:"none",background:"rgba(255,255,255,0.05)" }}>
              <i className="fas fa-calendar-check" style={{ color:"#fff",fontSize:13 }} />
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:15,fontWeight:900,color:"#fff",textTransform:"uppercase",letterSpacing:"0.06em" }}>Book Service</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      {services.length > 0 && (
        <section style={{ padding:"72px 80px",maxWidth:1400,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:52,animation:a("spFadeUp",0.55,0.1) }}>
            <div style={{ display:"inline-block",background:"rgba(227,6,19,0.12)",border:"1px solid rgba(227,6,19,0.3)",color:"#e30613",padding:"4px 16px",borderRadius:99,fontSize:11,fontWeight:800,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:12 }}>
              What We Offer
            </div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(28px,4vw,52px)",fontWeight:900,color:"#fff",lineHeight:1.1 }}>
              Our Services
            </h2>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:20 }}>
            {services.map(({ icon: ic, title: t, desc: d }, i) => (
              <div key={t} style={{
                background:"linear-gradient(135deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.02) 100%)",
                border:"1px solid rgba(255,255,255,0.08)",
                borderTop:"2px solid #e30613",
                borderRadius:12,
                padding:"28px 24px",
                animation:a("spCardPop",0.55,0.1+i*0.07),
              }}>
                <div style={{ width:48,height:48,borderRadius:"50%",background:"rgba(227,6,19,0.1)",border:"1.5px solid rgba(227,6,19,0.3)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16 }}>
                  <i className={`fas ${ic}`} style={{ color:"#e30613",fontSize:18 }} />
                </div>
                <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:"#fff",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.04em" }}>{t}</h3>
                <p style={{ fontSize:14,color:"rgba(255,255,255,0.5)",lineHeight:1.65 }}>{d}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── HOW IT WORKS ── */}
      {process.length > 0 && (
        <section style={{ background:"#0d0d12",padding:"72px 80px" }}>
          <div style={{ maxWidth:1200,margin:"0 auto" }}>
            <div style={{ textAlign:"center",marginBottom:52 }}>
              <div style={{ display:"inline-block",background:"rgba(227,6,19,0.12)",border:"1px solid rgba(227,6,19,0.3)",color:"#e30613",padding:"4px 16px",borderRadius:99,fontSize:11,fontWeight:800,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:12 }}>
                Simple Process
              </div>
              <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(28px,4vw,52px)",fontWeight:900,color:"#fff",lineHeight:1.1 }}>
                How It Works
              </h2>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:`repeat(${Math.min(process.length,4)},1fr)`,gap:24 }}>
              {process.map(({ step, title: t, desc: d }, i) => (
                <div key={t} style={{ textAlign:"center",padding:"32px 20px",position:"relative",animation:a("spFadeUp",0.55,0.1+i*0.1) }}>
                  <div style={{ fontSize:72,fontWeight:900,color:"rgba(227,6,19,0.08)",fontFamily:"'Barlow Condensed',sans-serif",lineHeight:1,marginBottom:8 }}>{step}</div>
                  <div style={{ width:52,height:52,borderRadius:"50%",background:"#e30613",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",boxShadow:"0 6px 20px rgba(227,6,19,0.45)" }}>
                    <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:"#fff" }}>{step}</span>
                  </div>
                  <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:900,color:"#fff",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em" }}>{t}</h3>
                  <p style={{ fontSize:13.5,color:"rgba(255,255,255,0.45)",lineHeight:1.65 }}>{d}</p>
                  {i < process.length - 1 && (
                    <div style={{ position:"absolute",top:80,right:-12,fontSize:28,color:"rgba(227,6,19,0.35)",fontWeight:900 }}>›</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── EXTRA SLOT ── */}
      {extra}

      {/* ── BOTTOM CTA ── */}
      <section style={{ background:"linear-gradient(135deg,#e30613 0%,#900010 100%)",padding:"56px 80px",textAlign:"center" }}>
        <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(28px,4vw,52px)",fontWeight:900,color:"#fff",marginBottom:12,lineHeight:1.1 }}>
          Ready? We Come To You.
        </h2>
        <p style={{ color:"rgba(255,255,255,0.75)",fontSize:16,marginBottom:28,maxWidth:500,marginLeft:"auto",marginRight:"auto" }}>
          Available 24/7 — Call or text to schedule. Fast response, guaranteed.
        </p>
        <div style={{ display:"flex",justifyContent:"center",gap:14,flexWrap:"wrap" }}>
          <a href="tel:+14156347777" style={{ background:"#fff",color:"#e30613",padding:"14px 32px",borderRadius:6,textDecoration:"none",fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:900,letterSpacing:"0.05em",textTransform:"uppercase" }}>
            <i className="fas fa-phone" style={{ marginRight:8 }} />Call (415) 634-7777
          </a>
          <a href="/contacts" style={{ border:"2px solid rgba(255,255,255,0.6)",color:"#fff",padding:"14px 32px",borderRadius:6,textDecoration:"none",fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:900,letterSpacing:"0.05em",textTransform:"uppercase" }}>
            <i className="fas fa-calendar-check" style={{ marginRight:8 }} />Book Online
          </a>
        </div>
      </section>
    </div>
  );
}
