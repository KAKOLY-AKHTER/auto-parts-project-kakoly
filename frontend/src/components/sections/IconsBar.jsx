import { useEffect, useRef, useState } from "react";

const items = ["/icon1.png", "/icon2.png", "/icon3.png", "/icon4.png", "/icon5.png"];

export default function IconsBar() {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-white pt-10 pb-10 md:pt-12 md:pb-12 overflow-hidden">

      {/* Heading */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="h-px w-10 bg-linear-to-r from-transparent to-red-500" />
        <span className="text-[11px] font-black tracking-[3px] uppercase text-red-600">Brands We Carry</span>
        <div className="h-px w-10 bg-linear-to-l from-transparent to-red-500" />
      </div>

      <div
        className="flex items-center"
        style={{
          gap: "100px",
          width: "max-content",
          animation: vis ? "scrollIcons 25s linear infinite" : "none",
        }}
      >
        {[...items, ...items, ...items, ...items, ...items].map((icon, i) => (
          <img key={i} src={icon} alt=""
            className="w-20 h-20 md:w-28 md:h-28 object-contain shrink-0"
          />
        ))}
      </div>

      <style>{`
        @keyframes scrollIcons {
          0% { transform: translateX(0); }
          100% { transform: translateX(-20%); }
        }
      `}</style>
    </section>
  );
}
