import { useEffect, useRef, useState } from "react";

const cards = [
  {
    img: "/tik-mark-card.png",
    title: "FREE Vehicle Inspection",
    desc: "We inspect your car and provide a full report so you can make smarter decisions with every visit.",
    href: "/contacts",
    cta: "Book Free Inspection",
  },
  {
    img: "/doller.png",
    title: "Price Match Guarantee",
    desc: "Found a lower price? We'll match any advertised competitor rate — at purchase or up to 30 days after.",
    href: "/pricing",
    cta: "See Our Pricing",
  },
  {
    img: "/watch.png",
    title: "Same-Day Appointments",
    desc: "Drive in today, drive out the same day. Most services completed in 30 minutes or less.",
    href: "/contacts",
    cta: "Book Today",
  },
  {
    img: "/care.png",
    title: "Trusted Car Care Since 1998",
    desc: "Over 50,000 customers trust us. ASE-certified technicians delivering honest service every time.",
    href: "/about",
    cta: "Our Story",
  },
];

export default function Features() {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.08 }
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-white py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-[5%]">

        {/* ── Card wrapper ── */}
        <div
          className="rounded-2xl overflow-hidden bg-white"
          style={{
            border: "1.5px solid #e5e7eb",
            boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(24px)",
            transition: "opacity .6s ease, transform .6s ease",
          }}>

          {/* red top strip */}
          <div className="h-1 bg-red-600 w-full" />

          <div className="px-8 md:px-12 pt-10 pb-8">

            {/* Header */}
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-10 bg-gradient-to-r from-transparent to-red-500" />
                <span className="text-[11px] font-black tracking-[3px] uppercase text-red-600">Why Choose Us</span>
                <div className="h-px w-10 bg-gradient-to-l from-transparent to-red-500" />
              </div>
              <h2 className="text-[26px] md:text-[32px] font-black text-gray-900 tracking-tight mb-2">
                The <span className="text-red-600">TireOil</span> Advantage
              </h2>
              <p className="text-[13.5px] text-gray-400">
                Here's what you can count on with every service.{" "}
                <a href="/about" className="text-red-600 font-bold hover:underline underline-offset-2">
                  Learn More
                </a>
              </p>
            </div>

            {/* 4 columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
              {cards.map(({ img, title, desc, href, cta }, i) => (
                <div
                  key={title}
                  className="flex flex-col items-center text-center group"
                  style={{
                    opacity: vis ? 1 : 0,
                    transform: vis ? "none" : "translateY(18px)",
                    transition: `opacity .5s ease ${0.1 + i * 0.09}s, transform .5s ease ${0.1 + i * 0.09}s`,
                  }}>

                  {/* Icon circle */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: "#fff",
                      border: "2.5px solid #dc2626",
                      boxShadow: "0 6px 20px rgba(220,38,38,0.18)",
                    }}>
                    <img
                      src={img}
                      alt={title}
                      className="w-9 h-9 object-contain"
                    />
                  </div>

                  <h3 className="text-[13.5px] font-black text-gray-900 leading-snug mb-2">{title}</h3>
                  <p className="text-[12px] text-gray-500 leading-relaxed mb-3">{desc}</p>

                  <a href={href}
                    className="text-[11px] font-black tracking-[2px] uppercase text-red-600 hover:text-red-700 transition-colors">
                    {cta}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Mascot strip */}
          <div
            className="flex items-center justify-center py-4"
            style={{
              background: "#f9f9f9",
              borderTop: "1px solid #f0f0f0",
              opacity: vis ? 1 : 0,
              transition: "opacity .7s ease .45s",
            }}>
            <img
              src="/man.png"
              alt="Service Team"
              className="h-36 object-contain"
              style={{ filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.09))" }}
            />
          </div>
        </div>

        {/* ── Bottom tagline ── */}
        <div
          className="text-center pt-10"
          style={{
            opacity: vis ? 1 : 0,
            transition: "opacity .6s ease .5s",
          }}>
          <h3 className="text-[20px] md:text-[24px] font-black text-gray-900 mb-4">
            TireOil has Served the Community Since <span className="text-red-600">1998</span>
          </h3>
          <p className="text-[13.5px] text-gray-500 max-w-[620px] mx-auto leading-relaxed mb-3">
            Over 25 years ago, a team of passionate automotive technicians set out to build something different — a tire &amp; oil service shop driven by honesty, speed, and care. In the process, they built one of Fremont's most trusted names in auto service.
          </p>
          <p className="text-[13.5px] text-gray-500 max-w-[620px] mx-auto leading-relaxed mb-4">
            Our technicians are a big part of that story, but so are the thousands of customers who've trusted us with their vehicles over the years. Let's keep driving forward — together.
          </p>
          <a href="/about"
            className="text-[13.5px] font-bold text-red-600 hover:text-red-700 hover:underline underline-offset-4 transition-colors">
            Learn More
          </a>
        </div>

      </div>
    </section>
  );
}
