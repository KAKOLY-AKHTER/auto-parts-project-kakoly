import { useRef, useEffect, useState } from "react";

const items = [
  {
    img: "/plane.png",
    tag: "01",
    title: "Free Home Delivery",
    desc: "Free delivery for all products over $100. Fast, reliable shipping straight to your door — tracked every step of the way.",
    stat: "100%",
    statLabel: "On-time rate",
  },
  {
    img: "/badge.png",
    tag: "02",
    title: "Quality Products",
    desc: "Every part is certified OEM or original. We guarantee authenticity, fitment accuracy, and durability on every single order.",
    stat: "5000+",
    statLabel: "SKUs stocked",
  },
  {
    img: "/headphn.png",
    tag: "03",
    title: "Online Support 24/7",
    desc: "Our expert team is available around the clock — online, by phone, or via live chat — to help you find exactly what you need.",
    stat: "24/7",
    statLabel: "Expert support",
  },
];

function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, vis];
}

function FeatureCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, vis] = useReveal();

  return (
    <div
      ref={ref}
      className={`group relative transition-all duration-[800ms] ease-out
                  ${vis ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-32 scale-75'}`}
      style={{ transitionDelay: `${index * 160}ms` }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative bg-white rounded-3xl p-8 h-full overflow-hidden border border-gray-100
                   hover:border-red-400 hover:shadow-[0_20px_60px_-12px_rgba(220,38,38,0.25)] transition-all duration-500"
      >
        {/* Bright Top Accent */}
        <div className={`absolute top-0 left-0 right-0 h-[5px] bg-gradient-to-r from-rose-600 via-red-500 to-amber-400 
                        transition-transform duration-700 origin-left ${hovered ? 'scale-x-100' : 'scale-x-0'}`} />

        {/* Icon + Tag */}
        <div className="flex justify-between items-start mb-10">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-amber-50 
                          border transition-all duration-500 shadow-sm
                          ${hovered ? 'border-red-300 -rotate-6 scale-110 shadow-red-200' : 'border-gray-100'}`}>
            <img 
              src={item.img} 
              alt={item.title} 
              className={`w-11 h-11 transition-all duration-700 ${hovered ? 'scale-110' : ''}`} 
            />
          </div>

          <div className={`text-xs font-bold tracking-widest px-5 py-2 rounded-full border transition-all duration-500
                          ${hovered ? 'bg-gradient-to-r from-rose-600 to-red-500 text-white border-transparent shadow-lg shadow-red-200' : 'bg-rose-50 text-rose-600 border-rose-200'}`}>
            {item.tag}
          </div>
        </div>

        {/* Content */}
        <h3 className={`text-2xl font-semibold mb-4 transition-all duration-300 ${hovered ? 'text-rose-700' : 'text-gray-900'}`}>
          {item.title}
        </h3>

        <p className="text-gray-500 leading-relaxed mb-8 text-[15px]">
          {item.desc}
        </p>

        {/* Stat - Brighter */}
        <div className={`inline-flex items-center gap-4 px-6 py-4 rounded-2xl backdrop-blur-md border transition-all duration-500
                        ${hovered ? 'bg-gradient-to-br from-rose-50 to-amber-50 border-rose-200 shadow-md' : 'bg-gray-50 border-gray-100'}`}>
          <span className={`text-3xl font-bold transition-colors duration-300 ${hovered ? 'text-rose-700' : 'text-rose-600'}`}>
            {item.stat}
          </span>
          <div className="text-xs leading-tight">
            <span className="block font-medium text-gray-500">{item.statLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  const [secRef, secVis] = useReveal();

  return (
    <section className="bg-white pt-8 pb-20 md:pb-28 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={secRef}
          className={`text-center mb-16 transition-all duration-700 ${secVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-block px-6 py-2.5 bg-rose-100 text-rose-700 text-xs font-bold tracking-[2.5px] rounded-full mb-4">
            OUR PROMISE
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
            Why Choose AutoParts
          </h2>
          <p className="max-w-lg mx-auto text-gray-600 text-lg">
            Built on trust, speed, and uncompromising quality.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <FeatureCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}