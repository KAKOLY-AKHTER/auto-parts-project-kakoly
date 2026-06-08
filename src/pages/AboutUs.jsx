import { useRef, useEffect, useState } from "react";

export default function AboutUs() {
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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#1e293f] py-10 md:py-14 pb-8 px-5 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          
          {/* Left - Big Image */}
          <div
            ref={ref}
            className={`relative rounded-2xl overflow-hidden shadow-2xl min-h-[380px] lg:min-h-[460px] transition-all duration-1000
                        ${vis ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-10 scale-95'}`}
          >
            <img
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070"
              alt="Luxury Car - AutoParts"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

            {/* Experience Badge */}
            <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-6 py-4 rounded-xl text-center shadow-2xl z-10">
              <div className="text-3xl font-bold leading-none">15+</div>
              <div className="text-[10px] tracking-widest mt-1 uppercase">YEARS OF EXCELLENCE</div>
            </div>

            {/* Branding */}
            <div className="absolute bottom-6 left-6 z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-5 py-3">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-base">A</div>
                <div>
                  <p className="text-[9px] tracking-[3px] uppercase text-white/60">EST. 2008</p>
                  <h3 className="text-lg font-bold tracking-tighter text-white">AUTOPARTS</h3>
                </div>
              </div>
              <p className="text-white/60 text-xs">Premium Auto Parts & Expert Service</p>
            </div>
          </div>

          {/* Right - Content */}
          <div className={`transition-all duration-1000 delay-300 ${vis ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-4">
                <span className="text-red-400 text-[10px]">●</span>
                <span className="uppercase text-[10px] font-bold tracking-widest text-white/80">About Us</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5 tracking-tight">
                <span className="text-white">Driving Excellence in </span>
                <span className="text-red-500">Auto Parts</span>
                <span className="text-white"> Since 2008</span>
              </h2>

              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                We are a trusted name in the automotive industry, providing premium quality auto parts 
                and professional maintenance services.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-6">
                {[
                  "Premium OEM & Aftermarket Parts",
                  "Expert Mechanical Support",
                  "Racing & Performance Upgrades",
                  "24/7 Customer Assistance",
                  "Nationwide Fast Delivery",
                  "Full Warranty on All Products"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:scale-125 transition-transform" />
                    <span className="text-sm text-gray-200">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-red-600/30">
                Learn Our Story
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}