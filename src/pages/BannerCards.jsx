import { useEffect, useRef, useState } from "react";

const banners = [
  { img: "/img1.png", href: "#" },
  { img: "/img2.png", href: "#" },
  { img: "/img3.png", href: "#" },
];

export default function BannerCards() {
  const [visible, setVisible] = useState([false, false, false]);
  const [hovered, setHovered] = useState(null);
  const refs = useRef([]);

  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisible((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 110);
            observer.unobserve(el);
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(el);
    });
  }, []);

  return (
    <>
      <style>{`
        .banners {
          background: transparent;
          padding: 40px 5% 110px;
          margin-top: -120px;
          position: relative;
          z-index: 10;
        }

        .banners-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1480px;
          margin: 0 auto;
        }

        /* ── CARD ── */
        .bn {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          /* taller: 4/3 ratio instead of 16/9 */
          aspect-ratio: 4 / 3.2;
          opacity: 0;
          transform: translateY(56px) scale(0.97);
          transition:
            opacity 0.9s cubic-bezier(.22,.68,0,1.2),
            transform 0.9s cubic-bezier(.22,.68,0,1.2),
            box-shadow 0.4s ease;
          cursor: pointer;
          box-shadow:
            0 12px 40px rgba(0,0,0,0.45),
            0 0 0 1px rgba(255,255,255,0.06);
        }

        .bn.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .bn:hover {
          transform: translateY(-12px) scale(1.025);
          box-shadow:
            0 32px 72px rgba(0,0,0,0.55),
            0 0 0 1px rgba(255,255,255,0.1),
            0 0 60px rgba(37,99,235,0.12);
        }

        /* ── IMAGE ── */
        .bn img {
          width: 100%; height: 100%;
          object-fit: cover;
          /* brighter image — key fix */
          filter: brightness(0.92) saturate(1.12) contrast(1.04);
          transition:
            transform 1.1s cubic-bezier(.22,.68,0,1.2),
            filter 0.5s ease;
          display: block;
        }

        .bn:hover img {
          transform: scale(1.07);
          filter: brightness(1.0) saturate(1.18) contrast(1.05);
        }

        /* ── OVERLAY — light, not heavy dark ── */
        .bn-overlay {
          position: absolute; inset: 0; z-index: 2;
          pointer-events: none;
          background: linear-gradient(
            170deg,
            rgba(10,20,50,0.05) 0%,
            rgba(10,20,50,0.08) 35%,
            rgba(10,20,50,0.38) 70%,
            rgba(10,20,50,0.72) 100%
          );
          transition: background 0.45s ease;
        }

        .bn:hover .bn-overlay {
          background: linear-gradient(
            170deg,
            rgba(10,20,50,0.02) 0%,
            rgba(10,20,50,0.04) 30%,
            rgba(10,20,50,0.28) 65%,
            rgba(10,20,50,0.6) 100%
          );
        }

        /* ── GLASS GLOSS ── */
        .bn-gloss {
          position: absolute; inset: 0; z-index: 3;
          pointer-events: none;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.14) 0%,
            rgba(255,255,255,0.04) 38%,
            transparent 55%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .bn:hover .bn-gloss { opacity: 1; }

        /* ── BLUE EDGE GLOW on hover ── */
        .bn-edge {
          position: absolute; inset: 0;
          border-radius: 16px;
          z-index: 4; pointer-events: none;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08);
          transition: box-shadow 0.4s ease;
        }
        .bn:hover .bn-edge {
          box-shadow:
            inset 0 0 0 1.5px rgba(37,99,235,0.3),
            inset 0 0 30px rgba(37,99,235,0.06);
        }

        /* ── BOTTOM LABEL ── */
        .bn-label {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 5;
          padding: 20px 24px 22px;
          display: flex; align-items: center; justify-content: space-between;
          transform: translateY(8px);
          opacity: 0;
          transition: opacity 0.4s ease 0.05s, transform 0.4s cubic-bezier(.22,.68,0,1.2) 0.05s;
        }
        .bn:hover .bn-label { opacity: 1; transform: translateY(0); }

        .bn-label-text {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(200,220,255,0.8);
        }

        .bn-label-arrow {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(37,99,235,0.25);
          border: 1px solid rgba(37,99,235,0.45);
          display: flex; align-items: center; justify-content: center;
          color: #60a5fa;
          transition: background 0.3s, transform 0.3s cubic-bezier(.22,.68,0,1.2);
          flex-shrink: 0;
        }
        .bn:hover .bn-label-arrow {
          background: rgba(37,99,235,0.45);
          transform: rotate(-45deg);
        }
        .bn-label-arrow svg { width: 14px; height: 14px; }

        /* ── TOP BADGE ── */
        .bn-badge {
          position: absolute;
          top: 16px; left: 16px; z-index: 5;
          padding: 4px 11px;
          background: rgba(6,10,26,0.65);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(200,220,255,0.7);
          opacity: 0;
          transform: translateY(-6px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(.22,.68,0,1.2);
        }
        .bn:hover .bn-badge { opacity: 1; transform: translateY(0); }

        @media (max-width: 900px) {
          .banners-grid { grid-template-columns: 1fr; gap: 18px; }
          .banners { margin-top: -60px; padding: 30px 5% 70px; }
          .bn { aspect-ratio: 16 / 9; }
        }

        @media (max-width: 640px) {
          .banners-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="banners">
        <div className="banners-grid">
          {banners.map((b, i) => {
            const labels = ["New Arrivals", "Top Rated", "Best Deals"];
            const badges = ["Featured", "Popular", "Sale"];
            return (
              <a
                key={i}
                href={b.href}
                ref={(el) => (refs.current[i] = el)}
                className={`bn ${visible[i] ? "visible" : ""}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ textDecoration: "none" }}
              >
                <img src={b.img} alt={labels[i]} />
                <div className="bn-overlay" />
                <div className="bn-gloss" />
                <div className="bn-edge" />

                {/* Top badge */}
                <div className="bn-badge">{badges[i]}</div>

                {/* Bottom label */}
                <div className="bn-label">
                  <span className="bn-label-text">{labels[i]}</span>
                  <div className="bn-label-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}