import { useEffect, useRef, useState } from "react";

export default function Newsletter() {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section
      ref={ref}
      className="relative bg-white py-10 md:py-14 px-5"
    >
      <div className="max-w-5xl mx-auto">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-50 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-50 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative rounded-3xl border border-white/10 shadow-xl px-8 md:px-16 py-8 md:py-12 overflow-hidden bg-[#0a0f1c]"
          style={{
            backgroundImage: "url(/car-img.png)",
            backgroundSize: "cover",
            backgroundPosition: "center 55%",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Main content with animation */}
          <div
            className="max-w-xl mx-auto text-center relative z-10 w-full"
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
        }}
      >
        {/* Envelope icon */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-600/20 border border-red-400/30 mb-4 shadow-lg shadow-red-600/20">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f43f5e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>

        {/* Badge */}
        <span className="inline-block px-5 py-1.5 bg-red-600/20 text-red-300 text-[11px] font-extrabold tracking-[0.2em] uppercase rounded-full border border-red-400/30 mb-5">
          SPECIAL OFFER FOR SUBSCRIPTION
        </span>

        {/* Main heading */}
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight tracking-tight"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
        >
          GET INSTANT DISCOUNT <br className="hidden sm:block" />
          <span className="inline-block mt-1 text-red-400">FOR MEMBERSHIP</span>
        </h2>

        {/* Description text */}
        <p className="text-sm md:text-base text-gray-300/80 mb-6 max-w-md mx-auto leading-relaxed font-medium">
          Subscribe our newsletter and all latest news of our <br className="hidden sm:block" />
          latest product, promotion and offers
        </p>

        {/* Email form / success */}
        {submitted ? (
          <div className="max-w-md mx-auto flex flex-col items-center gap-3 py-3">
            <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-400/40 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-white font-bold text-[15px]">You're subscribed!</p>
            <p className="text-gray-400 text-[12px]">Thank you — we'll keep you updated on deals &amp; offers.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-[11px] text-gray-500 hover:text-white transition-colors duration-200 underline underline-offset-2 mt-1"
            >
              Subscribe another email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="relative flex items-center group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email here"
                required
                className="w-full px-5 py-3.5 pr-36 bg-white/10 border border-white/15 rounded-xl text-white text-sm outline-none transition-all duration-300 focus:border-red-400/60 focus:bg-white/20 placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-[2px] rounded-lg transition-all duration-300 shadow-lg shadow-red-600/30"
              >
                SUBMIT
              </button>
            </div>
            <p className="text-[10px] text-gray-500 mt-4 tracking-wide">*No spam, unsubscribe anytime</p>
          </form>
        )}
      </div>
        </div>
      </div>
    </section>
  );
}