import { useEffect, useRef, useState } from "react";

const products = [
  { id: 1, img: "/pro1.png", title: "Auto Clutch & Brake", price: 165, rating: 4.5, sale: 25 },
  { id: 2, img: "/pro2.png", title: "Leather Steering Wheel", price: 615, rating: 4, sale: null },
  { id: 3, img: "/pro3.png", title: "Hanging 4K Camera", price: 65, rating: 5, sale: 35 },
  { id: 4, img: "/pro4.png", title: "17 inch Rims 8 Lug", price: 165, rating: 4.5, sale: null },
  { id: 5, img: "/pro5.png", title: "Locking Hub Diagram", price: 165, rating: 4.5, sale: 21 },
  { id: 6, img: "/pro6.png", title: "Hanging 4K Camera", price: 65, rating: 5, sale: 35 },
  { id: 7, img: "/pro7.png", title: "17 inch Rims 8 Lug", price: 165, rating: 4.5, sale: null },
  { id: 8, img: "/pro8.png", title: "Locking Hub Diagram", price: 165, rating: 4.5, sale: 21 },
  { id: 9, img: "/pro9.png", title: "Auto Clutch & Brake", price: 165, rating: 4.5, sale: 25 },
  { id: 10, img: "/pro10.png", title: "Leather Steering Wheel", price: 615, rating: 4, sale: null },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-[1px]">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="w-3 h-3" fill={i < Math.floor(rating) ? "#f59e0b" : i === Math.floor(rating) && rating % 1 !== 0 ? "url(#half)" : "#e5e7eb"}>
          {i === Math.floor(rating) && rating % 1 !== 0 && (
            <defs><linearGradient id="half"><stop offset="50%" stopColor="#f59e0b"/><stop offset="50%" stopColor="#e5e7eb"/></linearGradient></defs>
          )}
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

function ProductCard({ product, index, vis }) {
  const [hov, setHov] = useState(false);
  const delay = `${index * 0.06}s`;

  return (
    <div
      className="group relative bg-gradient-to-br from-blue-50 to-white overflow-hidden cursor-pointer"
      style={{
        borderRadius: "12px",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}`,
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className="absolute inset-0 rounded-[12px] pointer-events-none transition-all duration-300"
        style={{
          boxShadow: hov ? "0 12px 40px rgba(0,0,0,0.08), 0 0 0 1px #2563eb20" : "none",
          opacity: hov ? 1 : 0,
        }}
      />

      <div className="relative overflow-hidden bg-blue-50/50">
        <div style={{ aspectRatio: "1/1" }}>
          <img
            src={product.img}
            alt={product.title}
            className="w-full h-full transition-all duration-500"
            style={{
              objectFit: "contain",
              transform: hov ? "scale(1.1)" : "scale(1)",
              padding: "20px",
            }}
          />
        </div>

        {product.sale && (
          <span className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded-md shadow-sm">
            -{product.sale}%
          </span>
        )}

        <button
          className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300 bg-white shadow-sm"
          style={{
            color: hov ? "#dc2626" : "#9ca3af",
            opacity: hov ? 1 : 0.6,
            transform: hov ? "scale(1)" : "scale(0.9)",
          }}
        >
          <svg viewBox="0 0 24 24" fill={hov ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        </button>

        <div className="absolute inset-x-2 bottom-2 z-10 flex flex-col gap-1.5"
          style={{
            opacity: hov ? 1 : 0,
            transform: hov ? "translateY(0)" : "translateY(8px)",
            transition: "all 0.25s ease",
            transitionDelay: hov ? "0.03s" : "0s",
          }}
        >
          <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-semibold uppercase tracking-[1px] rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></svg>
            Add to Cart
          </button>
          <button className="w-full py-1.5 bg-white/90 text-gray-600 hover:text-gray-900 text-[9px] font-medium tracking-[0.5px] rounded-lg transition-all duration-200 border border-gray-200 flex items-center justify-center gap-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-2.5 h-2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Quick View
          </button>
        </div>
      </div>

      <div className="p-3.5">
        <StarRating rating={product.rating} />
        <h4 className="text-sm font-semibold leading-snug mt-1.5 mb-1 text-gray-900 transition-colors duration-200"
            style={{ color: hov ? "#2563eb" : "#111827" }}>
          {product.title}
        </h4>
        <div className="flex items-baseline gap-2 mb-2.5">
          {product.sale ? (
            <>
              <span className="text-base font-bold text-gray-900">${(product.price * (1 - product.sale / 100)).toFixed(2)}</span>
              <span className="text-[11px] text-gray-400 line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-base font-bold text-gray-900">${product.price.toFixed(2)}</span>
          )}
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[1px] text-gray-400 hover:text-blue-600 transition-all duration-200 group/link"
        >
          View Details
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-2.5 h-2.5 transition-transform duration-200 group-hover/link:translate-x-1">
            <path d="M6 12L10 8 6 4" />
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 md:py-20 px-5">
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0) rotate(-8deg); opacity: 0; }
          60% { transform: scale(1.1) rotate(2deg); }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "translateY(0)" : "translateY(8px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
          }}
        >
          <span className="inline-block px-6 py-2.5 bg-red-100 text-red-600 text-xs font-bold tracking-[2.5px] rounded-full mb-4 border border-red-200/50">
            OUR PRODUCTS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">
            <span className="text-gray-900">All Of Our </span>
            <span className="text-red-600">Products</span>
          </h2>
          <p className="max-w-lg mx-auto text-gray-500 text-base">
            Premium auto parts at the best prices — shop our complete collection
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} vis={vis} />
          ))}
        </div>
      </div>
    </section>
  );
}
