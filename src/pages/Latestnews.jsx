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
    excerpt: "This is the competition that we all aren't tired of watching throughout the years! These 2 modern vehicles have much more chances to win the...",
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

function ImageCell({ post, index, vis }: { post: any; index: number; vis: boolean }) {
  const [hov, setHov] = useState(false);
  const delay = `${index * 0.08}s`;

  return (
    <div
      className="group relative overflow-hidden bg-black"
      style={{
        aspectRatio: "16/10",           // Chepta (wider than tall)
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${delay}`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <img
        src={post.img}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
        style={{ transform: hov ? "scale(1.08)" : "scale(1)" }}
      />

      {/* Mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70 transition-opacity duration-500"
           style={{ opacity: hov ? 0.85 : 0.6 }} />

      {/* Hover Icons */}
      <div className="icons absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
        <a href="#" className="w-11 h-11 flex items-center justify-center bg-white/90 hover:bg-white rounded-full text-xl shadow-md transition-all hover:scale-110">
          ❤️
        </a>
        <a href={post.href} className="w-11 h-11 flex items-center justify-center bg-white/90 hover:bg-white rounded-full text-xl shadow-md transition-all hover:scale-110">
          👁
        </a>
      </div>

      {/* Title overlay for small screens */}
      <div className="absolute bottom-5 left-5 right-5 md:hidden">
        <h3 className="text-white text-lg font-bold drop-shadow-md">{post.title}</h3>
      </div>
    </div>
  );
}

function TextCell({ post, index, vis }: { post: any; index: number; vis: boolean }) {
  const [hov, setHov] = useState(false);
  const delay = `${index * 0.08}s`;

  return (
    <div
      className="group relative flex flex-col bg-white p-8 md:p-10 border border-gray-100 hover:border-gray-200 transition-all duration-300"
      style={{
        aspectRatio: "16/10",           // Same chepta ratio
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${delay}`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Accent Line */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-red-600 via-red-500 to-blue-600 transition-all origin-top"
           style={{ transform: hov ? "scaleY(1)" : "scaleY(0.3)" }} />

      <div className="flex-1 flex flex-col">
        <span className="inline-block mb-4 px-4 py-1 text-xs font-bold tracking-[2px] uppercase text-red-600 bg-red-50">
          AUTO NEWS
        </span>

        <h3 className="text-[26px] md:text-[29px] leading-tight font-bold tracking-[-0.02em] mb-3 transition-colors"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: hov ? "#dc2626" : "#111827" }}>
          {post.title}
        </h3>

        <div className="text-sm text-gray-500 mb-5 font-medium">
          {post.date}
        </div>

        <p className="text-[14.8px] leading-relaxed text-gray-600 mb-8 line-clamp-4 flex-1">
          {post.excerpt}
        </p>

        <a
          href={post.href}
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-700 group-hover:text-red-600 transition-colors mt-auto"
        >
          LEARN MORE
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );
}

export default function LatestNews() {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVis(true),
      { threshold: 0.2 }
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
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&display=swap');
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <section ref={ref} className="bg-gray-50 py-12">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <span className="text-red-600 text-xs font-bold tracking-[3px] uppercase">FROM OUR BLOG</span>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mt-3 text-gray-900">
            LATEST <span className="text-red-600">NEWS</span>
          </h2>
        </div>

        {/* Main Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-px bg-gray-200">
          {row1.map((cell, i) => (
            <div key={i} className="bg-white">
              {cell.type === "img" ? (
                <ImageCell post={cell.post} index={i} vis={vis} />
              ) : (
                <TextCell post={cell.post} index={i} vis={vis} />
              )}
            </div>
          ))}
          {row2.map((cell, i) => (
            <div key={i + 4} className="bg-white">
              {cell.type === "img" ? (
                <ImageCell post={cell.post} index={i + 4} vis={vis} />
              ) : (
                <TextCell post={cell.post} index={i + 4} vis={vis} />
              )}
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="/blog"
            className="inline-flex items-center gap-3 px-12 py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest rounded-full text-sm transition-all duration-200"
          >
            VIEW ALL POSTS →
          </a>
        </div>
      </section>
    </>
  );
}