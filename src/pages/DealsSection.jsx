import { useEffect, useRef, useState } from "react";

export default function DealsSection() {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.08 }
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#f2f2f2] py-14 md:py-16 px-5 md:px-[5%]">
      <div className="max-w-7xl mx-auto">

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">

          {/* Left — large promo card */}
          <div
            className="lg:col-span-2 relative overflow-hidden min-h-[380px] flex items-center border border-gray-200"
            style={{
              backgroundImage: "url(/about.png)",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateX(-32px)",
              transition: "opacity .7s ease, transform .7s cubic-bezier(.22,.68,0,1.2)",
            }}
          >
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.92) 38%, rgba(255,255,255,0.3) 65%, transparent 100%)" }} />

            <div className="relative z-10 flex flex-col justify-center p-5 md:p-10 max-w-[65%] sm:max-w-[55%] md:max-w-[50%]">
              <h2
                className="text-[22px] sm:text-3xl md:text-[44px] font-black leading-[1.05] text-gray-900 mb-3 md:mb-4"
                style={{
                  opacity: vis ? 1 : 0,
                  transform: vis ? "none" : "translateY(16px)",
                  transition: "opacity .6s ease .2s, transform .6s ease .2s",
                }}
              >
                <span className="text-red-600">FREE</span> 4TH TIRE
                <br />+ <span className="text-red-600">FREE</span> INSTALLATION
              </h2>
              <div
                style={{
                  opacity: vis ? 1 : 0,
                  transform: vis ? "none" : "translateY(12px)",
                  transition: "opacity .6s ease .35s, transform .6s ease .35s",
                }}
              >
                <p className="text-[11px] md:text-[13px] text-gray-800 font-semibold mb-0.5">ON <strong>COOPER ADVENTURER</strong></p>
                <p className="text-[11px] md:text-[13px] text-gray-800 font-bold mb-0.5">TIRES IN SETS OF 4</p>
                <p className="text-[11px] md:text-[13px] text-gray-900 font-black mb-2">—SAVE UP TO $420 INSTANTLY!*</p>
                <p className="text-[9px] md:text-[10px] text-gray-400 mb-4 md:mb-5 leading-snug">
                  *Valid 06/03/26–07/05/26.<br />Install req'd &amp; Incl.{" "}
                  <span className="underline cursor-pointer text-blue-600">See details.</span>
                </p>
                <a href="/shop" className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white text-[10px] md:text-[12px] font-extrabold tracking-wider uppercase px-4 md:px-5 py-2 md:py-2.5 w-fit transition-all duration-200">
                  Shop Cooper Tires
                </a>
                <div className="mt-3 md:mt-5 flex items-center gap-2">
                  <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none">
                    <circle cx="10" cy="10" r="8.5" stroke="#111" strokeWidth="1.5"/>
                    <circle cx="10" cy="10" r="3.5" fill="#111"/>
                  </svg>
                  <span className="text-[11px] font-black tracking-[3px] text-gray-900 uppercase">CooperTires</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — two stacked cards */}
          <div className="flex flex-col gap-3">

            {/* Card 1 — Brake */}
            <div
              className="relative overflow-hidden flex-1 min-h-[180px] flex items-center border border-gray-200"
              style={{
                backgroundImage: "url(/Red-tire.png)",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                opacity: vis ? 1 : 0,
                transform: vis ? "none" : "translateX(32px)",
                transition: "opacity .65s ease .1s, transform .65s cubic-bezier(.22,.68,0,1.2) .1s",
              }}
            >
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.90) 45%, rgba(255,255,255,0.2) 75%, transparent 100%)" }} />
              <div className="relative z-10 flex flex-col justify-center p-5 max-w-[65%]">
                <p className="text-[12px] font-bold text-gray-800 mb-[2px]">SAVE UP TO</p>
                <p className="text-[34px] font-black text-red-600 leading-none mb-1">$100</p>
                <p className="text-[12px] text-gray-600 font-medium mb-3 leading-snug">on Standard Brake<br />Service with Coupons*</p>
                <a href="/contacts" className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white text-[11px] font-extrabold tracking-wider uppercase px-4 py-[8px] w-fit transition-all duration-200">
                  Make an Appointment
                </a>
                <p className="text-[9px] text-gray-400 mt-2 leading-tight">
                  *Ends 6/30/26. $50 off per axle with coupon. Terms apply.{" "}
                  <span className="text-blue-600 underline cursor-pointer">See details.</span>
                </p>
              </div>
            </div>

            {/* Card 2 — A/C */}
            <div
              className="relative overflow-hidden flex-1 min-h-[180px] flex items-center border border-gray-200"
              style={{
                backgroundImage: "url(/AC.png)",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                opacity: vis ? 1 : 0,
                transform: vis ? "none" : "translateX(32px)",
                transition: "opacity .65s ease .22s, transform .65s cubic-bezier(.22,.68,0,1.2) .22s",
              }}
            >
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.90) 45%, rgba(255,255,255,0.2) 75%, transparent 100%)" }} />
              <div className="relative z-10 flex flex-col justify-center p-5 max-w-[65%]">
                <p className="text-[34px] font-black text-red-600 leading-none mb-1">$9.99</p>
                <p className="text-[15px] font-black text-gray-900 leading-tight mb-1">A/C SYSTEM<br />EVALUATION</p>
                <p className="text-[12px] text-gray-600 font-medium mb-3">with Coupon*</p>
                <a href="/contacts" className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white text-[11px] font-extrabold tracking-wider uppercase px-4 py-[8px] w-fit transition-all duration-200">
                  Make an Appointment
                </a>
                <p className="text-[9px] text-gray-400 mt-2 leading-tight">
                  *Ends 9/14/26. Not valid in CA, CO, CT, or MN.<br />Taxes and shop fee extra.{" "}
                  <span className="text-blue-600 underline cursor-pointer">See details.</span>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom banner */}
        <div
          className="bg-white border border-gray-200 px-8 py-7 flex flex-col items-center gap-4"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(20px)",
            transition: "opacity .6s ease .35s, transform .6s ease .35s",
          }}
        >
          <p className="text-gray-900 text-[17px] md:text-[19px] font-black text-center">
            The Best Deals for Tires, Oil, Brakes, Vehicle Service and More
          </p>
          <div className="flex items-center gap-3">
            <a href="/contacts" className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white text-[12px] font-extrabold tracking-wider uppercase px-6 py-3 transition-all duration-200">
              Make an Appointment
            </a>
            <a href="/shop" className="inline-flex items-center bg-black hover:bg-gray-800 text-white text-[12px] font-extrabold tracking-wider uppercase px-6 py-3 transition-all duration-200">
              See All Coupons &amp; Offers
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
