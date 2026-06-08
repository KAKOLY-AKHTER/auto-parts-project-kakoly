import { useEffect, useRef, useState } from "react";

const posts = [
  {
    id: 1,
    img: "/group1.png",
    title: "The Highest Speed",
    date: "February 19, 2024",
    excerpt: "How do auto mechanics add more power to your vehicle, and which motors are the best for racing? These are main points in this article to dis...",
    href: "/blog/the-highest-speed",
  },
  {
    id: 2,
    img: "/group2.png",
    title: "Digging Audi Style",
    date: "February 18, 2024",
    excerpt: "2024 Audi R8, RS7, etc. reveal GT2 models and new body styles. Are you a big fan of Audi yet? If now, fasten your seatbelt and join the club...",
    href: "/blog/digging-audi-style",
  },
  {
    id: 3,
    img: "/group3.png",
    title: "Impala vs Camaro",
    date: "February 17, 2024",
    excerpt: "This is the competition that we all aren't tired of watching throughout the years! These 2 modern vehicles have much more chance to win the...",
    href: "/blog/impala-vs-camaro",
  },
  {
    id: 4,
    img: "/group4.png",
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
        borderRight: "1px solid rgba(0,0,0,0.06)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/2 to-gray-900/4 pointer-events-none" />

      <img
        src={post.img}
        alt={post.title}
        className="w-full h-full transition-all duration-600"
        style={{
          objectFit: "contain",
          transform: hov ? "scale(1.05)" : "scale(1)",
          padding: "24px",
          filter: hov ? "brightness(1.05)" : "brightness(0.95)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

      <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-5 translate-y-6 group-hover:translate-y-0 transition-all duration-400 opacity-0 group-hover:opacity-100"
        style={{ transitionDelay: hov ? "0.05s" : "0s" }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-[2px] uppercase text-gray-700">
            <span className="inline-block w-6 h-px bg-gray-700/40 align-middle mr-2" />
            Read Story
          </span>
          <span className="text-gray-600 text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>

      <div className="absolute top-3 right-3 z-10 flex gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-400">
        <a href="#" className="w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-md hover:bg-gray-900 text-gray-600 hover:text-white rounded-lg border border-gray-200 hover:border-gray-900 transition-all duration-300 shadow-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        </a>
        <a href={post.href} className="w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-md hover:bg-gray-900 text-gray-600 hover:text-white rounded-lg border border-gray-200 hover:border-gray-900 transition-all duration-300 shadow-sm">
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
        borderRight: "1px solid rgba(0,0,0,0.06)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/2 to-gray-900/3 pointer-events-none" />

      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 transform origin-left transition-transform duration-500 z-10"
        style={{ transform: hov ? "scaleX(1)" : "scaleX(0)" }}
      />

      <div className="flex-1 flex flex-col justify-center p-7 md:p-9 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-[2px] uppercase text-gray-600 bg-gray-100 rounded-md border border-gray-200">
            Auto News
          </span>
          <span className="text-xs text-gray-400 font-medium">{post.date}</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-3 transition-all duration-400"
            style={{
              color: hov ? "#111827" : "#1f2937",
              fontFamily: "'Barlow Condensed', sans-serif",
              letterSpacing: "0.01em",
              transition: "color 0.4s ease",
            }}>
          {post.title}
        </h3>

        <div className="w-8 h-[2px] bg-gray-300 rounded-full mb-3 transition-all duration-400"
          style={{ width: hov ? "40px" : "24px", background: hov ? "#111827" : "#d1d5db" }}
        />

        <p className="text-sm leading-relaxed text-gray-500 mb-4 line-clamp-3"
           style={{ fontFamily: "'Barlow', sans-serif" }}>
          {post.excerpt}
        </p>

        <a
          href={post.href}
          className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[2px] transition-all duration-400 mt-auto group/link"
          style={{ color: hov ? "#111827" : "#9ca3af" }}
        >
          <span className="relative">
            Read More
            <span className="absolute -bottom-px left-0 right-0 h-px bg-gray-900 scale-x-0 group-hover/link:scale-x-100 transition-transform duration-400 origin-left" />
          </span>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 transition-transform duration-400 group-hover/link:translate-x-1">
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
    { type: "img", post: posts[0] },
    { type: "text", post: posts[0] },
    { type: "img", post: posts[1] },
    { type: "text", post: posts[1] },
  ];

  const row2 = [
    { type: "text", post: posts[2] },
    { type: "img", post: posts[2] },
    { type: "text", post: posts[3] },
    { type: "img", post: posts[3] },
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

      <section ref={ref} className="pt-20 pb-8 md:pt-24 md:pb-10" style={{ background: "#ffffff" }}>
        <div
          className="text-center mb-16 px-6 transition-all duration-700"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <span className="inline-block px-6 py-2.5 bg-red-100 text-red-600 text-xs font-bold tracking-[2.5px] rounded-full mb-4">
            FROM OUR BLOG
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
            Latest News
          </h2>
          <p className="max-w-lg mx-auto text-gray-600 text-lg">
            Stay updated with the latest automotive insights
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-4"
          style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
        >
          {row1.map((cell, i) => (
            <div key={i}>
              {cell.type === "img" ? (
                <ImageCell post={cell.post} index={i} vis={vis} />
              ) : (
                <TextCell post={cell.post} index={i} vis={vis} />
              )}
            </div>
          ))}
          {row2.map((cell, i) => (
            <div key={i + 4}>
              {cell.type === "img" ? (
                <ImageCell post={cell.post} index={i + 4} vis={vis} />
              ) : (
                <TextCell post={cell.post} index={i + 4} vis={vis} />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-14 pb-12 md:pb-16 px-6"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
          }}
        >
          <a
            href="/blog"
            className="group/btn inline-flex items-center gap-3 px-10 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-[2px] text-xs rounded-full transition-all duration-300 shadow-lg shadow-red-600/20 hover:shadow-red-600/30 hover:-translate-y-0.5"
          >
            View All Posts
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-1">
              <path d="M6 12L10 8 6 4" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
