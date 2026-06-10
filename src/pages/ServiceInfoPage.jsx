const CSS = `
  @keyframes siUp   { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
  @keyframes siLeft { from{opacity:0;transform:translateX(-44px)} to{opacity:1;transform:translateX(0)} }
  @keyframes siRight{ from{opacity:0;transform:translateX(44px)}  to{opacity:1;transform:translateX(0)} }
  @keyframes siFade { from{opacity:0} to{opacity:1} }
  @keyframes siCount{ from{opacity:0;transform:scale(0.7)} to{opacity:1;transform:scale(1)} }

  .si-card {
    background: #131318;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px;
    padding: 28px 24px 24px;
    position: relative; overflow: hidden;
    transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
  }
  .si-card::before {
    content:''; position:absolute; top:0; left:0; right:0; height:3px;
    background:#e30613; transform:scaleX(0); transform-origin:left;
    transition:transform 0.3s ease;
  }
  .si-card:hover { transform:translateY(-6px); border-color:rgba(227,6,19,0.3); box-shadow:0 18px 48px rgba(0,0,0,0.6),0 0 0 1px rgba(227,6,19,0.1); }
  .si-card:hover::before { transform:scaleX(1); }
  .si-card-icon {
    width:52px; height:52px; border-radius:50%;
    background:rgba(227,6,19,0.1); border:2px solid rgba(227,6,19,0.3);
    display:flex; align-items:center; justify-content:center; margin-bottom:16px;
    transition:background 0.28s, border-color 0.28s, box-shadow 0.28s;
  }
  .si-card:hover .si-card-icon { background:rgba(227,6,19,0.22); border-color:#e30613; box-shadow:0 0 20px rgba(227,6,19,0.45); }

  .si-step { position:relative; padding-left:56px; }
  .si-step::before {
    content:''; position:absolute; left:22px; top:44px; bottom:-32px; width:2px;
    background:linear-gradient(to bottom, rgba(227,6,19,0.4), transparent);
  }
  .si-step:last-child::before { display:none; }

  .si-feature-row {
    display:flex; align-items:flex-start; gap:14px; padding:14px 0;
    border-bottom:1px solid rgba(255,255,255,0.05);
    transition:background 0.2s;
  }
  .si-feature-row:last-child { border-bottom:none; }
  .si-feature-row:hover { background:rgba(227,6,19,0.04); padding-left:8px; border-radius:6px; }

  /* ── RESPONSIVE ── */
  .si-wrap { max-width:1400px; margin:0 auto; padding:0 20px; }
  @media(min-width:640px)  { .si-wrap { padding:0 36px; } }
  @media(min-width:1024px) { .si-wrap { padding:0 80px; } }

  .si-hero-pad { padding:72px 20px 48px; width:100%; }
  @media(min-width:640px)  { .si-hero-pad { padding:82px 36px 60px; } }
  @media(min-width:1024px) { .si-hero-pad { padding:90px 80px 80px; } }

  .si-split-grid {
    display:grid;
    grid-template-columns:1fr;
    gap:36px;
    align-items:start;
  }
  @media(min-width:1024px) { .si-split-grid { grid-template-columns:1.15fr 1fr; gap:60px; } }

  .si-cards-grid {
    display:grid;
    grid-template-columns:1fr;
    gap:14px;
  }
  @media(min-width:480px)  { .si-cards-grid { grid-template-columns:repeat(2,1fr); } }
  @media(min-width:1024px) { .si-cards-grid { grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:18px; } }

  .si-img-panel { position:static !important; }
  @media(min-width:1024px) { .si-img-panel { position:sticky !important; top:120px; } }

  .si-steps-grid {
    display:grid;
    grid-template-columns:1fr;
    gap:40px;
    align-items:start;
  }
  @media(min-width:768px) { .si-steps-grid { grid-template-columns:1fr 1fr; gap:56px; } }

  .si-cta-pad { padding:48px 20px; }
  @media(min-width:640px)  { .si-cta-pad { padding:60px 36px; } }
  @media(min-width:1024px) { .si-cta-pad { padding:80px; } }

  .si-cta-inner {
    position:relative; z-index:2; max-width:1400px; margin:0 auto;
    display:flex; align-items:center; justify-content:space-between;
    flex-wrap:wrap; gap:28px;
  }
  .si-cta-btns { display:flex; gap:12px; flex-wrap:wrap; }
  @media(max-width:639px) {
    .si-cta-inner { flex-direction:column; align-items:flex-start; }
    .si-cta-btns  { width:100%; }
    .si-cta-btns a { flex:1; min-width:0; justify-content:center; }
  }
`;

const a = (name, delay) => ({ animation: `${name} 0.6s cubic-bezier(.22,.68,0,1.15) ${delay}s both` });

export default function ServiceInfoPage({
  icon, title, subtitle, heroDesc, heroImg, sectionImg,
  cards = [], steps = [], features = [], highlights = [],
  ctaTitle = "Ready to Get Started?",
  ctaDesc  = "Our team is available 24/7. One call and we're on our way.",
  ctaImg   = "/roadside-assistance.png",
}) {
  const word1 = title.split(" ")[0];
  const rest  = title.split(" ").slice(1).join(" ");

  return (
    <div style={{ background:"#080808", color:"#fff", minHeight:"100vh" }}>
      <style>{CSS}</style>

      {/* ══════════ HERO ══════════ */}
      <section style={{ position:"relative", minHeight:580, display:"flex", alignItems:"center", overflow:"hidden" }}>
        {/* bg image */}
        <div style={{ position:"absolute", inset:0, zIndex:0 }}>
          {heroImg && (
            <img src={heroImg} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center right", filter:"brightness(0.68) saturate(1.15) contrast(1.05)" }} />
          )}
          {/* left-to-right gradient — text is readable left, image shows right */}
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(100deg,rgba(4,4,8,0.97) 0%,rgba(4,4,8,0.85) 28%,rgba(4,4,8,0.55) 50%,rgba(4,4,8,0.2) 70%,rgba(4,4,8,0.05) 100%)" }} />
          {/* top + bottom fades */}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:90, background:"linear-gradient(to bottom,rgba(8,8,8,0.6),transparent)" }} />
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:90, background:"linear-gradient(to top,#080808,transparent)" }} />
          {/* red glow blob */}
          <div style={{ position:"absolute", top:-100, left:-60, width:480, height:480, borderRadius:"50%", background:"radial-gradient(circle,rgba(227,6,19,0.16) 0%,transparent 70%)", pointerEvents:"none" }} />
        </div>

        <div className="si-hero-pad" style={{ position:"relative", zIndex:2 }}>
          <div style={{ maxWidth:660 }}>
            {/* badge */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:20, ...a("siLeft",0.1) }}>
              <div style={{ width:40,height:40,borderRadius:"50%",background:"rgba(227,6,19,0.15)",border:"2px solid #e30613",display:"flex",alignItems:"center",justifyContent:"center" }}>
                <i className={`fas ${icon}`} style={{ color:"#e30613",fontSize:16 }} />
              </div>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,fontWeight:800,color:"#e30613",letterSpacing:"0.22em",textTransform:"uppercase" }}>{subtitle}</span>
              <span style={{ width:32,height:2,background:"#e30613",borderRadius:2,display:"block" }} />
            </div>

            {/* title */}
            <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(52px,6.5vw,88px)", fontWeight:900, lineHeight:0.92, letterSpacing:"-0.02em", marginBottom:18, ...a("siLeft",0.18) }}>
              <span style={{ color:"#e30613" }}>{word1}</span><br />
              <span style={{ color:"#fff" }}>{rest}</span>
            </h1>

            {/* desc */}
            <p style={{ fontSize:16, lineHeight:1.75, color:"rgba(255,255,255,0.58)", maxWidth:560, marginBottom:32, ...a("siUp",0.28) }}>
              {heroDesc}
            </p>

            {/* highlights chips */}
            {highlights.length > 0 && (
              <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:32, ...a("siUp",0.35) }}>
                {highlights.map(h => (
                  <span key={h} style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(227,6,19,0.12)", border:"1px solid rgba(227,6,19,0.35)", borderRadius:20, padding:"5px 14px", fontSize:12, fontWeight:700, color:"#fff", letterSpacing:"0.05em", textTransform:"uppercase" }}>
                    <span style={{ width:5,height:5,borderRadius:"50%",background:"#e30613",display:"inline-block" }} />{h}
                  </span>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", ...a("siUp",0.42) }}>
              <a href="tel:+14156347777" style={{ display:"inline-flex",alignItems:"center",gap:12,background:"#e30613",padding:"13px 28px",borderRadius:8,textDecoration:"none",boxShadow:"0 6px 30px rgba(227,6,19,0.5)" }}>
                <i className="fas fa-phone" style={{ color:"#fff",fontSize:13 }} />
                <div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.7)",letterSpacing:"0.2em",textTransform:"uppercase",lineHeight:1,marginBottom:2 }}>Call Now</div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:19,fontWeight:900,color:"#fff",lineHeight:1 }}>(415) 634-7777</div>
                </div>
              </a>
              <a href="/contacts" style={{ display:"inline-flex",alignItems:"center",gap:12,background:"rgba(255,255,255,0.06)",border:"1.5px solid rgba(255,255,255,0.22)",padding:"13px 28px",borderRadius:8,textDecoration:"none" }}>
                <i className="fas fa-calendar-check" style={{ color:"#fff",fontSize:13 }} />
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:17,fontWeight:900,color:"#fff",textTransform:"uppercase",letterSpacing:"0.06em" }}>Book Service</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ SPLIT: IMAGE + CARDS ══════════ */}
      {cards.length > 0 && (
        <section style={{ background:"#0c0c12", padding:"60px 0" }}>
          <div className="si-wrap">
            <div className="si-split-grid">

              {/* LEFT: cards */}
              <div>
                <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(28px,3.5vw,46px)",fontWeight:900,color:"#fff",textTransform:"uppercase",letterSpacing:"-0.01em",marginBottom:8,...a("siUp",0.1) }}>
                  What We <span style={{ color:"#e30613" }}>Offer</span>
                </h2>
                <div style={{ width:48,height:4,background:"#e30613",borderRadius:2,marginBottom:32 }} />
                <div className="si-cards-grid">
                  {cards.map((c,i) => (
                    <div key={c.title} className="si-card" style={{ ...a("siUp", 0.12+i*0.06) }}>
                      <div className="si-card-icon">
                        <i className={`fas ${c.icon}`} style={{ color:"#e30613",fontSize:20 }} />
                      </div>
                      <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:900,color:"#fff",textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:8 }}>{c.title}</h3>
                      <p style={{ fontSize:13.5,color:"rgba(255,255,255,0.48)",lineHeight:1.65 }}>{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: image panel */}
              {sectionImg && (
                <div className="si-img-panel" style={{ ...a("siRight",0.1) }}>
                  <div style={{ position:"relative", borderRadius:18, overflow:"hidden" }}>
                    <img src={sectionImg} alt="" style={{ width:"100%", height:460, objectFit:"cover", display:"block", filter:"brightness(0.92) saturate(1.12)" }} />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(225deg,rgba(227,6,19,0.22) 0%,transparent 55%)" }} />
                    {/* red left edge accent */}
                    <div style={{ position:"absolute", top:0, left:0, bottom:0, width:4, background:"#e30613" }} />
                    <div style={{ position:"absolute", bottom:24, left:20, right:20, background:"rgba(0,0,0,0.78)", backdropFilter:"blur(12px)", borderRadius:10, padding:"14px 18px", border:"1px solid rgba(227,6,19,0.3)" }}>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:10,fontWeight:800,color:"#e30613",letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:3 }}>24HR Fremont Tire</div>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:17,fontWeight:900,color:"#fff" }}>{title}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ HOW IT WORKS (timeline) ══════════ */}
      {steps.length > 0 && (
        <section style={{ background:"#080808", padding:"60px 0" }}>
          <div className="si-wrap">
            <div className="si-steps-grid">
              {/* left */}
              <div>
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,fontWeight:800,color:"#e30613",letterSpacing:"0.22em",textTransform:"uppercase",display:"block",marginBottom:12,...a("siLeft",0.05) }}>Process</span>
                <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(32px,4vw,54px)",fontWeight:900,color:"#fff",textTransform:"uppercase",letterSpacing:"-0.01em",lineHeight:0.95,marginBottom:8,...a("siLeft",0.12) }}>
                  How It <span style={{ color:"#e30613" }}>Works</span>
                </h2>
                <div style={{ width:48,height:4,background:"#e30613",borderRadius:2,marginBottom:32 }} />
                <div style={{ display:"flex",flexDirection:"column",gap:32 }}>
                  {steps.map((s,i) => (
                    <div key={s.label} className="si-step" style={{ ...a("siLeft", 0.15+i*0.1) }}>
                      {/* number bubble */}
                      <div style={{ position:"absolute",left:0,top:0,width:44,height:44,borderRadius:"50%",background:"#e30613",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 22px rgba(227,6,19,0.5)",zIndex:1 }}>
                        <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:900,color:"#fff" }}>{i+1}</span>
                      </div>
                      <div style={{ paddingTop:4 }}>
                        <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:900,color:"#fff",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:6 }}>{s.label}</div>
                        <p style={{ fontSize:14,color:"rgba(255,255,255,0.45)",lineHeight:1.65 }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* right: features list */}
              {features.length > 0 && (
                <div style={{ background:"#111118",borderRadius:18,border:"1px solid rgba(255,255,255,0.07)",padding:"32px 28px",...a("siRight",0.1) }}>
                  <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:"#fff",textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:4 }}>
                    Why Choose <span style={{ color:"#e30613" }}>Us</span>
                  </h3>
                  <div style={{ width:36,height:3,background:"#e30613",borderRadius:2,marginBottom:20 }} />
                  {features.map((f,i) => (
                    <div key={f.label} className="si-feature-row" style={{ ...a("siRight", 0.18+i*0.06) }}>
                      <div style={{ width:36,height:36,borderRadius:8,background:"rgba(227,6,19,0.12)",border:"1px solid rgba(227,6,19,0.3)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                        <i className={`fas ${f.icon}`} style={{ color:"#e30613",fontSize:14 }} />
                      </div>
                      <div>
                        <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:15,fontWeight:900,color:"#fff",textTransform:"uppercase",letterSpacing:"0.05em",lineHeight:1.2 }}>{f.label}</div>
                        <div style={{ fontSize:12.5,color:"rgba(255,255,255,0.4)",lineHeight:1.5,marginTop:2 }}>{f.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ CTA ══════════ */}
      <section className="si-cta-pad" style={{ position:"relative", overflow:"hidden" }}>
        {ctaImg && (
          <div style={{ position:"absolute",inset:0 }}>
            <img src={ctaImg} alt="" style={{ width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.55) saturate(1.15)" }} />
            <div style={{ position:"absolute",inset:0,background:"linear-gradient(100deg,rgba(180,0,10,0.82) 0%,rgba(8,8,8,0.75) 50%,rgba(8,8,8,0.88) 100%)" }} />
          </div>
        )}
        <div className="si-cta-inner">
          <div style={{ maxWidth:560 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,fontWeight:800,color:"rgba(255,255,255,0.6)",letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:10 }}>Available 24 / 7</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(32px,4vw,58px)",fontWeight:900,color:"#fff",letterSpacing:"-0.01em",lineHeight:0.95,marginBottom:14 }}>{ctaTitle}</h2>
            <p style={{ fontSize:15,color:"rgba(255,255,255,0.65)",lineHeight:1.7 }}>{ctaDesc}</p>
          </div>
          <div className="si-cta-btns">
            <a href="tel:+14156347777" style={{ display:"inline-flex",alignItems:"center",gap:12,background:"#fff",padding:"15px 32px",borderRadius:8,textDecoration:"none",boxShadow:"0 6px 30px rgba(0,0,0,0.4)" }}>
              <i className="fas fa-phone" style={{ color:"#e30613",fontSize:16 }} />
              <div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:10,fontWeight:700,color:"rgba(0,0,0,0.5)",letterSpacing:"0.2em",textTransform:"uppercase",lineHeight:1,marginBottom:2 }}>Call Now</div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:21,fontWeight:900,color:"#e30613",lineHeight:1 }}>(415) 634-7777</div>
              </div>
            </a>
            <a href="/contacts" style={{ display:"inline-flex",alignItems:"center",gap:12,background:"rgba(255,255,255,0.08)",border:"2px solid rgba(255,255,255,0.35)",padding:"15px 32px",borderRadius:8,textDecoration:"none" }}>
              <i className="fas fa-map-marker-alt" style={{ color:"#fff",fontSize:14 }} />
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:17,fontWeight:900,color:"#fff",textTransform:"uppercase",letterSpacing:"0.07em" }}>Get Direction</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
