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
    <section ref={ref} className="bg-white py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-center items-center gap-14 md:gap-24">
          {items.map((icon, i) => (
            <img key={i} src={icon} alt=""
              className="w-20 h-20 md:w-28 md:h-28 object-contain"
              style={{
                opacity: vis ? 1 : 0,
                transform: vis ? "translateY(0)" : "translateY(10px)",
                transition: `all 0.5s ease ${i * 0.08}s`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
