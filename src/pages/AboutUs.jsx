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
    <section className="bg-[#0a0f1c] py-16 md:py-24 px-5 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left - Big Image */}
          <div
            ref={ref}
            className={`relative rounded-3xl overflow-hidden shadow-2xl aspect-[16/11] lg:aspect-auto transition-all duration-1000
                        ${vis ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-10 scale-95'}`}
          >
            <img
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070"
              alt="Luxury Car - AutoParts"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

            {/* Experience Badge */}
            <div className="absolute bottom-8 right-8 bg-red-600 text-white px-8 py-5 rounded-2xl text-center shadow-2xl z-10">
              <div className="text-5xl font-bold leading-none">15+</div>
              <div className="text-sm tracking-widest mt-1 uppercase">YEARS OF EXCELLENCE</div>
            </div>

            {/* Branding */}
            <div className="absolute bottom-8 left-8 z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">A</div>
                <div>
                  <p className="text-xs tracking-[3px] uppercase opacity-75">EST. 2008</p>
                  <h3 className="text-3xl font-bold tracking-tighter">AUTOPARTS</h3>
                </div>
              </div>
              <p className="text-white/80">Premium Auto Parts & Expert Service</p>
            </div>
          </div>

          {/* Right - Content */}
          <div className={`transition-all duration-1000 delay-300 ${vis ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-6">
              <span className="text-red-400">●</span>
              <span className="uppercase text-xs font-bold tracking-widest">About Us</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
              Driving Excellence in Auto Parts Since 2008
            </h2>

            <p className="text-lg text-gray-300 leading-relaxed mb-10">
              We are a trusted name in the automotive industry, providing premium quality auto parts 
              and professional maintenance services. From performance upgrades to everyday replacements, 
              we ensure your vehicle runs at its best.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12">
              {[
                "Premium OEM & Aftermarket Parts",
                "Expert Mechanical Support",
                "Racing & Performance Upgrades",
                "24/7 Customer Assistance",
                "Nationwide Fast Delivery",
                "Full Warranty on All Products"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-2 h-2 bg-red-500 rounded-full group-hover:scale-125 transition-transform" />
                  <span className="text-gray-200">{feature}</span>
                </div>
              ))}
            </div>

            <button className="bg-red-600 hover:bg-red-700 px-10 py-4 rounded-2xl font-semibold text-lg flex items-center gap-3 transition-all active:scale-95">
              Learn Our Story
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}