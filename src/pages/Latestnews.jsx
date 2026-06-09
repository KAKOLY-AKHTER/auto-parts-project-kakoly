import { useEffect, useRef, useState } from "react";

const posts = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=700&h=520&fit=crop&q=80",
    title: "The Highest Speed",
    date: "February 19, 2024",
    excerpt: "How do auto mechanics add more power to your vehicle, and which motors are the best for racing? These are main points in this article to dis...",
    href: "/blog/the-highest-speed",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=700&h=520&fit=crop&q=80",
    title: "Digging Audi Style",
    date: "February 18, 2024",
    excerpt: "2024 Audi R8, RS7, etc. reveal GT2 models and new body styles. Are you a big fan of Audi yet? If now, fasten your seatbelt and join the club...",
    href: "/blog/digging-audi-style",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=700&h=520&fit=crop&q=80",
    title: "Impala vs Camaro",
    date: "February 17, 2024",
    excerpt: "This is the competition that we all aren't tired of watching throughout the years! These 2 modern vehicles have much more chance to win the...",
    href: "/blog/impala-vs-camaro",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=700&h=520&fit=crop&q=80",
    title: "Corvette Experience",
    date: "February 16, 2024",
    excerpt: "Chevrolet is about to surprise its fans with gorgeous models and improved electric systems for a better, faster, and stronger experience on...",
    href: "/blog/corvette-experience",
  },
];

function ImageCell({ post, index, vis }) {
  const [hov, setHov] = useState(false);
  const delay = `${index * 0.1}s`;

  return (
    <div
      className="group relative overflow-hidden cursor-pointer"
      style={{
        aspectRatio: "4/3",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}`,
        background: "#f8f9fb",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <img
        src={post.img}
        alt={post.title}
        className="w-full h-full transition-all duration-700"
        style={{
          objectFit: "cover",
          transform: hov ? "scale(1.08)" : "scale(1)",
        }}
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-6 translate-y-4 group-hover:translate-y-0 transition-all duration-400 opacity-0 group-hover:opacity-100">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider uppercase text-white">Read Story</span>
          <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-transform duration-300 group-hover:translate-x-1">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M6 12L10 8 6 4"/></svg>
          </span>
        </div>
      </div>

      <div className="absolute top-3 right-3 z-10 flex gap-2 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-400">
        <a href="#" className="w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-md hover:bg-red-600 text-gray-600 hover:text-white rounded-lg border border-gray-200 hover:border-red-600 transition-all duration-300 shadow-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        </a>
        <a href={post.href} className="w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-md hover:bg-red-600 text-gray-600 hover:text-white rounded-lg border border-gray-200 hover:border-red-600 transition-all duration-300 shadow-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </a>
      </div>
    </div>
  );
}

function TextCell({ post, index, vis }) {
  const [hov, setHov] = useState(false);
  const delay = `${index * 0.1}s`;

  return (
    <div
      className="group relative flex flex-col cursor-pointer"
      style={{
        aspectRatio: "4/3",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}`,
        background: "#ffffff",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-red-500 via-red-400 to-red-500 transform origin-left transition-transform duration-500"
        style={{ transform: hov ? "scaleX(1)" : "scaleX(0)" }}
      />

      <div className="flex-1 flex flex-col justify-center p-5 md:p-8 relative z-10">
        <div className="flex items-center gap-2 mb-3 md:mb-5">
          <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase text-red-600 bg-red-50 rounded-md border border-red-100">
            Auto News
          </span>
          <span className="text-xs text-gray-400">{post.date}</span>
        </div>

        <h3 className="text-xl md:text-3xl font-bold leading-tight mb-2 md:mb-3"
            style={{ color: hov ? "#dc2626" : "#111827", transition: "color 0.3s ease" }}>
          {post.title}
        </h3>

        <div className="w-10 h-0.5 bg-red-500 rounded-full mb-4" />

        <p className="text-sm leading-relaxed text-gray-500 mb-5 line-clamp-3">
          {post.excerpt}
        </p>

        <a
          href={post.href}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-red-600 transition-all duration-300 mt-auto group/link"
        >
          Read More
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-1">
            <path d="M6 12L10 8 6 4" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function LatestNews() {
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

  const row1 = [
    { type: "img",  post: posts[0] },
    { type: "text", post: posts[0] },
    { type: "img",  post: posts[1] },
    { type: "text", post: posts[1] },
  ];

  const row2 = [
    { type: "text", post: posts[2] },
    { type: "img",  post: posts[2] },
    { type: "text", post: posts[3] },
    { type: "img",  post: posts[3] },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Barlow:wght@400;500;600&display=swap');
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <section ref={ref} className="py-14 md:py-20" style={{ background: "#ffffff" }}>

        {/* Heading */}
        <div
          className="text-center mb-10 px-6 transition-all duration-700"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10 bg-linear-to-r from-transparent to-red-500" />
            <span className="text-[11px] font-black tracking-[3px] uppercase text-red-600">From Our Blog</span>
            <div className="h-px w-10 bg-linear-to-l from-transparent to-red-500" />
          </div>
          <h2 className="text-[28px] md:text-[36px] font-black text-gray-900 tracking-tight mb-3">
            Latest <span className="text-red-600">News</span>
          </h2>
          <p className="max-w-md mx-auto text-[13.5px] text-gray-400">
            Stay updated with the latest automotive insights
          </p>
        </div>

        {/* Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100 border-t border-b border-gray-100">
          {row1.map((cell, i) => (
            <div key={i}>
              {cell.type === "img"
                ? <ImageCell post={cell.post} index={i} vis={vis} />
                : <TextCell  post={cell.post} index={i} vis={vis} />}
            </div>
          ))}
          {row2.map((cell, i) => (
            <div key={i + 4}>
              {cell.type === "img"
                ? <ImageCell post={cell.post} index={i + 4} vis={vis} />
                : <TextCell  post={cell.post} index={i + 4} vis={vis} />}
            </div>
          ))}
        </div>

      </section>
    </>
  );
}