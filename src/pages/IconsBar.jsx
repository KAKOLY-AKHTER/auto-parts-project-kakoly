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
    <section ref={ref} className="bg-white py-10 md:py-14 overflow-hidden">
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
            className="w-20 h-20 md:w-28 md:h-28 object-contain flex-shrink-0"
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
