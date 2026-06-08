import React, { useEffect, useRef, useState } from "react";

export default function Newsletter() {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  const [email, setEmail] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert("Subscribed! Thank you.");
      setEmail("");
    }
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 md:py-20 min-h-[450px] md:min-h-[500px] flex items-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2070&auto=format)",
        backgroundSize: "cover",
        backgroundPosition: "center 55%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/65 to-black/80" />

      {/* Decorative glowing elements */}
      <div className="absolute top-[15%] right-[8%] w-64 h-64 bg-rose-600/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[10%] left-[5%] w-48 h-48 bg-amber-500/8 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 left-[12%] w-3 h-20 bg-gradient-to-t from-amber-400/40 via-amber-400/20 to-transparent blur-md rotate-[10deg] origin-bottom" />
      <div className="absolute bottom-0 left-[20%] w-3 h-20 bg-gradient-to-t from-amber-400/40 via-amber-400/20 to-transparent blur-md rotate-[-6deg] origin-bottom" />
      <div className="absolute bottom-0 left-[12%] w-20 h-2 bg-gradient-to-r from-amber-400/30 to-transparent blur-sm translate-y-1" />
      <div className="absolute bottom-0 left-[20%] w-20 h-2 bg-gradient-to-r from-amber-400/30 to-transparent blur-sm translate-y-1" />

      {/* Main content with animation */}
      <div
        className="max-w-xl mx-auto px-6 text-center relative z-10 w-full"
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
        }}
      >
        {/* Envelope icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose-600/20 border border-rose-400/30 mb-5 backdrop-blur-sm shadow-lg shadow-rose-600/20">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f43f5e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>

        {/* Badge */}
        <span className="inline-block px-5 py-1.5 bg-gradient-to-r from-rose-600/25 to-amber-500/20 text-amber-200 text-[11px] font-extrabold tracking-[0.2em] uppercase rounded-full border border-amber-400/30 mb-5 backdrop-blur-sm shadow-lg shadow-rose-600/10">
          SPECIAL OFFER FOR SUBSCRIPTION
        </span>

        {/* Main heading */}
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight tracking-tight"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.01em" }}
        >
          GET INSTANT DISCOUNT <br className="hidden sm:block" />
          <span className="inline-block mt-1 bg-gradient-to-r from-rose-300 via-amber-200 to-rose-300 bg-clip-text text-transparent">FOR MEMBERSHIP</span>
        </h2>

        {/* Description text */}
        <p className="text-sm md:text-base text-gray-300/90 mb-9 max-w-md mx-auto leading-relaxed font-medium">
          Subscribe our newsletter and all latest news of our <br className="hidden sm:block" />
          latest product, promotion and offers
        </p>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="relative flex items-center group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email here"
              required
              className="w-full px-5 py-3.5 pr-36 bg-white/10 border border-white/15 rounded-xl text-white text-sm outline-none transition-all duration-300 focus:border-rose-400/60 focus:bg-white/20 placeholder:text-gray-400 backdrop-blur-sm"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white text-xs font-bold uppercase tracking-[2px] rounded-lg transition-all duration-300 shadow-lg shadow-rose-600/40 hover:shadow-rose-600/60"
            >
              SUBMIT
            </button>
          </div>
        </form>

        {/* Disclaimer */}
        <p className="text-[10px] text-gray-500 mt-5 tracking-wide">*No spam, unsubscribe anytime</p>
      </div>
    </section>
  );
}