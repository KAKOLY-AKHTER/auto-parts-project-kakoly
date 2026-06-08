import { useState, useEffect, useRef } from "react";

const slides = [
  {
    bg: "https://autoparts.themerex.net/wp-content/uploads/2017/06/slide-1-bg.jpg",
    tag: "World's #1 Auto Parts",
    line1: "The World's",
    line2: "BEST AUTO PARTS",
    sub: "We are the leading auto parts company with the world-wide reputation of premium quality products and maintenance services.",
  },
  {
    bg: "https://autoparts.themerex.net/wp-content/uploads/2017/07/slide-2-bg.jpg",
    tag: "Racing Performance",
    line1: "Premium",
    line2: "GOODS FOR RACERS",
    sub: "Revolutionary ideas for auto products and accessories design. We make your vehicle stand out among other cars.",
  },
  {
    bg: "https://autoparts.themerex.net/wp-content/uploads/2017/07/slide-3-bg.jpg",
    tag: "24/7 Expert Support",
    line1: "Wide",
    line2: "SELECTION OF ITEMS",
    sub: "We provide excellent customer support 24/7 online and by phone as well as offer professional maintenance service.",
  },
];

export default function Hero() {
  const [cur, setCur] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const timerRef = useRef(null);

  const advance = (n) => {
    setLeaving(true);
    setTimeout(() => {
      setCur(n);
      setLeaving(false);
    }, 600);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      const next = (cur + 1) % slides.length;
      advance(next);
    }, 5800);
    return () => clearInterval(timerRef.current);
  }, [cur]);

  const s = slides[cur];

  return (
    <div className="relative h-screen min-h-[680px] overflow-hidden bg-black">
      {/* Background Images */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${i === cur ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
          style={{ backgroundImage: `url(${slide.bg})` }}
        />
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(255,255,255,0.12)_0%,transparent_60%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-6 lg:px-10 xl:px-16 max-w-[560px] ml-6 lg:ml-8">
        <div 
          className={`w-full transition-all duration-700 ${leaving ? 'opacity-0 -translate-x-8' : 'opacity-100 translate-x-0'}`}
        >
          
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold tracking-[2px] uppercase text-white/90">{s.tag}</span>
          </div>

          {/* Headline - এক লাইনে */}
          <div className="space-y-2 mb-8">
            <p 
              className={`text-lg md:text-xl font-medium text-white/70 tracking-widest transition-all duration-700 delay-100 ${leaving ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
            >
              {s.line1}
            </p>
            
            <h1 
              className={`text-6xl md:text-[68px] font-bold leading-none tracking-[-2px] transition-all duration-700 delay-300 ${leaving ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
            >
              <span className="text-red-500">{s.line2.split(' ')[0]}</span>
              {' '}
              <span className="text-white">{s.line2.split(' ').slice(1).join(' ')}</span>
            </h1>
          </div>

          {/* Subtitle */}
          <p 
            className={`text-lg text-white/70 max-w-sm leading-relaxed mb-10 transition-all duration-700 delay-700 ${leaving ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
          >
            {s.sub}
          </p>

          {/* CTA Button */}
          <a
            href="/contacts"
            className="group inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 px-9 py-4 rounded-2xl text-white font-semibold text-lg transition-all active:scale-[0.97] hover:scale-105 hover:shadow-2xl hover:shadow-red-600/50"
          >
            Schedule Service
            <span className="transition-transform group-hover:translate-x-2">→</span>
          </a>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => advance(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === cur ? 'w-12 bg-red-500' : 'w-6 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-10 right-10 hidden md:flex items-center gap-3 text-white/40 text-xs tracking-[3px]">
        SCROLL DOWN
        <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>
    </div>
  );
}