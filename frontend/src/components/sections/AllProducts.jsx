import { useEffect, useRef, useState } from "react";

const services = [
  {
    label: "Wheel Alignment",
    href: "/wheel-alignment",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="40" cy="40" r="28" />
        <circle cx="40" cy="40" r="10" />
        <line x1="40" y1="12" x2="40" y2="28" />
        <line x1="40" y1="52" x2="40" y2="68" />
        <line x1="12" y1="40" x2="28" y2="40" />
        <line x1="52" y1="40" x2="68" y2="40" />
        <path d="M40 12 L44 4 M40 12 L36 4" strokeLinecap="round" />
        <path d="M40 68 L44 76 M40 68 L36 76" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Shop Batteries",
    href: "/battery-replacement",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="14" y="24" width="52" height="36" rx="3" />
        <rect x="28" y="16" width="10" height="10" rx="1" />
        <rect x="42" y="16" width="10" height="10" rx="1" />
        <line x1="40" y1="34" x2="40" y2="54" strokeWidth="3" strokeLinecap="round" />
        <line x1="30" y1="44" x2="50" y2="44" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Brake Services",
    href: "/brake-repair",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="40" cy="40" r="28" />
        <circle cx="40" cy="40" r="14" />
        <circle cx="40" cy="40" r="4" fill="currentColor" />
        <line x1="40" y1="12" x2="40" y2="26" />
        <line x1="40" y1="54" x2="40" y2="68" />
        <line x1="12" y1="40" x2="26" y2="40" />
        <line x1="54" y1="40" x2="68" y2="40" />
        <circle cx="40" cy="40" r="20" strokeDasharray="4 6" />
      </svg>
    ),
  },
];

const viewed = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=340&fit=crop&q=80",
    tag: "Tires",
    title: "Tire Service, Repair & Maintenance",
    desc: "We offer tire repair, alignments, tire balancing and rotation to help keep your tires healthy and your drive safe.",
    href: "/tire-service",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1566378246598-5b11a0d486cc?w=500&h=340&fit=crop&q=80",
    tag: "Roadside",
    title: "Towing & Roadside Assistance",
    desc: "We just need a few details about your vehicle so our expert Pros can be ready when your vehicle arrives at our location.",
    href: "/roadside-assistance",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&h=340&fit=crop&q=80",
    tag: "Brakes",
    title: "Brake Repair & Services",
    desc: "Standard and premium brake services performed by certified technicians using parts from brands you trust.",
    href: "/brake-repair",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=500&h=340&fit=crop&q=80",
    tag: "Oil Change",
    title: "Oil Change Services Made Convenient",
    desc: "Full-service oil change options with a free tire rotation, pressure check, and courtesy vehicle inspection included.",
    href: "/oil-change",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&h=340&fit=crop&q=80",
    tag: "Alignment",
    title: "Wheel Alignment Services",
    desc: "Improve driver safety, increase fuel efficiency, and prolong tire life with a professional wheel alignment today.",
    href: "/wheel-alignment",
  },
];

function ServiceCard({ item, index, vis }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      key={item.id}
      className="flex flex-col bg-white rounded-xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(18px)",
        transition: `opacity .5s ease ${0.2 + index * 0.08}s, transform .5s ease ${0.2 + index * 0.08}s`,
        border: hov ? "1.5px solid #dc2626" : "1.5px solid #e5e7eb",
        boxShadow: hov ? "0 12px 36px rgba(220,38,38,0.10), 0 2px 8px rgba(0,0,0,0.06)" : "0 2px 8px rgba(0,0,0,0.04)",
        transitionProperty: "opacity, transform, border-color, box-shadow",
        transitionDuration: ".5s, .5s, .22s, .22s",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover"
          style={{
            transform: hov ? "scale(1.06)" : "scale(1)",
            transition: "transform .55s ease",
          }}
        />
        {/* tag pill */}
        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-black tracking-widest uppercase bg-red-600 text-white">
          {item.tag}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <a
          href={item.href}
          className="text-[13.5px] font-black text-gray-900 leading-snug mb-2 hover:text-red-600 transition-colors duration-150"
        >
          {item.title}
        </a>
        <p className="text-[11.5px] text-gray-500 leading-relaxed flex-1 mb-4">
          {item.desc}
        </p>
        <a
          href={item.href}
          className="inline-flex items-center gap-1.5 text-[11px] font-black tracking-[1.5px] uppercase text-red-600 hover:text-red-700 transition-colors duration-150"
        >
          Learn More
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function AllProducts() {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.06 }
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-white">

      {/* ── TOP: Ask us about ── */}
      <div
        className="max-w-7xl mx-auto px-5 md:px-[5%] pt-14 pb-12 text-center"
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "none" : "translateY(20px)",
          transition: "opacity .6s ease, transform .6s ease",
        }}
      >
        <h2 className="text-[32px] md:text-[40px] font-black text-red-600 mb-3 leading-tight">
          Ask us about
        </h2>
        <p className="text-[16px] md:text-[19px] font-bold text-gray-900 mb-12">
          What Auto Services Are Essential to Maintain Your Vehicle?
        </p>

        {/* Service Icons */}
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {services.map(({ label, href, icon }, i) => (
            <a
              key={label}
              href={href}
              className="flex flex-col items-center gap-3 group"
              style={{
                opacity: vis ? 1 : 0,
                transform: vis ? "none" : "translateY(14px)",
                transition: `opacity .5s ease ${0.15 + i * 0.1}s, transform .5s ease ${0.15 + i * 0.1}s`,
              }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center border-2 border-gray-300 group-hover:border-red-500 group-hover:shadow-md transition-all duration-200 text-gray-700 group-hover:text-red-600">
                <span className="scale-75 sm:scale-90 md:scale-100">{icon}</span>
              </div>
              <span className="text-[12px] sm:text-[13.5px] font-bold text-[#1a56db] group-hover:text-red-600 transition-colors duration-200 leading-snug text-center">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* ── BOTTOM: People Also Viewed ── */}
      <div
        className="border-t border-gray-100"
        style={{
          background: "linear-gradient(180deg, #f8f8f8 0%, #f2f2f2 100%)",
          opacity: vis ? 1 : 0,
          transition: "opacity .7s ease .15s",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-[5%] py-12">

          {/* Section header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-red-600 rounded-full" />
              <p className="text-[11px] font-black tracking-[3px] uppercase text-red-600">
                People Also Viewed
              </p>
            </div>
            <a
              href="/services"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-500 hover:text-red-600 transition-colors duration-150"
            >
              View All Services
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
            {viewed.map((item, i) => (
              <ServiceCard key={item.id} item={item} index={i} vis={vis} />
            ))}
          </div>

          {/* Bottom CTA strip */}
          <div
            className="mt-10 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{
              opacity: vis ? 1 : 0,
              transition: "opacity .6s ease .5s",
            }}
          >
            <p className="text-[15px] font-bold text-gray-900 text-center md:text-left">
              The Best Deals for Tires, Oil, Brakes, Vehicle Service and More
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="/contacts"
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-[11px] font-black tracking-[2px] uppercase rounded transition-colors duration-200"
                style={{ boxShadow: "0 4px 16px rgba(220,38,38,0.25)" }}
              >
                Make an Appointment
              </a>
              <a
                href="/shop"
                className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-[11px] font-black tracking-[2px] uppercase rounded transition-colors duration-200"
              >
                See All Offers
              </a>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
