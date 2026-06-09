import { useState, useEffect, useRef } from "react";

const years = Array.from({ length: 30 }, (_, i) => 2025 - i);
const makes = ["Toyota", "Honda", "Ford", "Chevrolet", "BMW", "Mercedes", "Nissan", "Hyundai", "Kia", "Jeep"];
const tireSizes = ["185/65R15", "195/65R15", "205/55R16", "215/60R16", "225/45R17", "235/50R18", "245/40R19", "255/35R20"];

const slides = [
  {
    bg: "bg-img5.png",
    tag: "⏰ Available 24/7 · Mobile Service",
    line1: "We Come to You —",
    line2: "24 HRS A DAY, 7 DAYS A WEEK",
    sub: "24-hour mobile truck and trailer tire service, oil changes, and roadside assistance. Our technicians come directly to your location — home, business, job site, or on the road.",
    btn: "Book Mobile Service",
    badges: ["Truck Tire Change", "Trailer Tire Change", "Roadside Assistance"],
  },
  {
    bg: "/mobile-mechanic.png",
    tag: "🔧 Certified Technicians",
    line1: "Keeping Your Fleet Moving,",
    line2: "ANYTIME, ANYWHERE",
    sub: "Synthetic, conventional, or high-mileage — we keep your engine running clean. In and out in under 30 minutes. We come to you.",
    btn: "Schedule Oil Change",
    badges: ["30-Min Service", "All Oil Types", "Mobile Service"],
  },
  {
    bg: "/bg-img6.png",
    tag: "🛞 Trusted Since 1998",
    line1: "Your Local",
    line2: "TIRE EXPERTS",
    sub: "From tire rotation to full replacement, our certified team delivers top-notch service you can count on — 24/7, at your location.",
    btn: "Find a Service",
    badges: ["24/7 Support", "Warranty Included", "Top-Rated Shop"],
  },
];

export default function Hero() {
  const [cur, setCur] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const timerRef = useRef(null);
  const [activeTab, setActiveTab] = useState("shop");
  const [activeSubTab, setActiveSubTab] = useState("vehicle");
  const [formData, setFormData] = useState({ year: "", make: "", model: "", engine: "", drivetrain: "", trim: "", tireSize: "" });
  const [selectedService, setSelectedService] = useState("");

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
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Images */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-1000 ${i === cur ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
          style={{
            backgroundImage: `url(${slide.bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
          }}
        />
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(220,38,38,0.08) 0%, transparent 60%)" }} />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row lg:items-center justify-between px-5 lg:px-10 xl:px-16 w-full gap-6 pb-16 lg:pb-0">

        {/* Right — Tire Search Form (FIRST in DOM = top on mobile, right on desktop via lg:order-2) */}
        <div className="w-full lg:shrink-0 lg:w-82.5 xl:w-91.25 lg:order-2 pt-24 lg:pt-0">
          <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.45)] border-4 border-red-600">

            {/* Top tabs */}
            <div className="grid grid-cols-2">
              <button onClick={() => setActiveTab("shop")}
                className={`py-[13px] text-[12px] font-extrabold tracking-[1.5px] uppercase transition-all duration-200 ${activeTab === "shop" ? "bg-red-600 text-white" : "bg-[#f0f0f0] text-gray-500 hover:bg-gray-200"}`}>
                Shop Tires
              </button>
              <button onClick={() => setActiveTab("service")}
                className={`py-[13px] text-[12px] font-extrabold tracking-[1.5px] uppercase transition-all duration-200 ${activeTab === "service" ? "bg-red-600 text-white" : "bg-[#f0f0f0] text-gray-500 hover:bg-gray-200"}`}>
                Find Service
              </button>
            </div>

            <div className="p-4">

              {/* ── SHOP TIRES ── */}
              {activeTab === "shop" && (
                <>
                  {/* Sub tabs */}
                  <div className="flex gap-[3px] mb-4">
                    {[["vehicle","By Vehicle"],["size","By Size"],["plate","By License Plate"]].map(([val,label]) => (
                      <button key={val} onClick={() => setActiveSubTab(val)}
                        className={`flex-1 py-[8px] text-[10px] font-bold rounded-md border transition-all duration-150 ${activeSubTab === val ? "bg-black text-white border-black" : "bg-white text-gray-500 border-gray-300 hover:border-gray-500"}`}>
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* By Vehicle */}
                  {activeSubTab === "vehicle" && (
                    <div>
                      <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mb-3">Vehicle Details:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { key: "year", label: "Year", options: years },
                          { key: "make", label: "Make", options: makes },
                          { key: "model", label: "Model", options: [] },
                          { key: "engine", label: "Engine", options: [] },
                          { key: "drivetrain", label: "Drivetrain", options: [] },
                          { key: "trim", label: "Trim", options: [] },
                        ].map(({ key, label, options }) => (
                          <select key={key} value={formData[key]}
                            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                            className="border border-gray-200 rounded-lg px-3 py-[9px] text-[13px] text-gray-600 bg-gray-50 focus:outline-none focus:border-red-400 focus:bg-white transition-colors">
                            <option value="">{label}</option>
                            {options.map((o) => <option key={o} value={o}>{o}</option>)}
                          </select>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <select value={formData.tireSize}
                          onChange={(e) => setFormData({ ...formData, tireSize: e.target.value })}
                          className="flex-1 border border-gray-200 rounded-lg px-3 py-[9px] text-[13px] text-gray-600 bg-gray-50 focus:outline-none focus:border-red-400 focus:bg-white transition-colors">
                          <option value="">Tire Size</option>
                          {tireSizes.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <p className="text-[10px] text-red-500 cursor-pointer hover:underline leading-tight w-[90px]">How do I find my Tire Size?</p>
                      </div>
                    </div>
                  )}

                  {/* By Size */}
                  {activeSubTab === "size" && (
                    <div>
                      <div className="bg-gray-900 rounded-xl p-3 mb-3 flex items-center justify-center h-[90px]">
                        <div className="relative">
                          <svg viewBox="0 0 220 72" className="w-[200px]">
                            <ellipse cx="110" cy="50" rx="78" ry="20" fill="#1a1a1a" stroke="#444" strokeWidth="2"/>
                            <ellipse cx="110" cy="50" rx="54" ry="13" fill="#111" stroke="#333" strokeWidth="1.5"/>
                            <text x="52" y="56" fill="#dc2626" fontSize="15" fontWeight="bold" fontFamily="monospace">P205</text>
                            <text x="108" y="56" fill="#888" fontSize="15" fontWeight="bold" fontFamily="monospace">/65R</text>
                            <text x="160" y="56" fill="#888" fontSize="15" fontWeight="bold" fontFamily="monospace">15</text>
                          </svg>
                          <div className="absolute -top-3 left-0 right-0 flex justify-between px-1 text-[9px] font-bold">
                            <span className="text-red-400">Width</span>
                            <span className="text-gray-400">Ratio</span>
                            <span className="text-gray-400">Diameter</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {["Width","Ratio"].map((l) => (
                          <select key={l} className="border border-gray-200 rounded-lg px-3 py-[9px] text-[13px] text-gray-600 bg-gray-50 focus:outline-none focus:border-red-400 transition-colors">
                            <option value="">{l}</option>
                          </select>
                        ))}
                      </div>
                      <select className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-[9px] text-[13px] text-gray-600 bg-gray-50 focus:outline-none focus:border-red-400 transition-colors">
                        <option value="">Diameter</option>
                      </select>
                    </div>
                  )}

                  {/* By License Plate */}
                  {activeSubTab === "plate" && (
                    <div>
                      <div className="flex gap-2 mb-3">
                        <input type="text" placeholder="License Plate #"
                          className="flex-1 border border-gray-200 rounded-lg px-3 py-[9px] text-[13px] text-gray-700 bg-gray-50 focus:outline-none focus:border-red-400 focus:bg-white transition-colors"/>
                        <select className="w-[80px] border border-gray-200 rounded-lg px-2 py-[9px] text-[13px] text-gray-600 bg-gray-50 focus:outline-none focus:border-red-400 transition-colors">
                          <option value="">State</option>
                          {["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"].map(st => <option key={st}>{st}</option>)}
                        </select>
                        <button className="bg-gray-100 text-gray-500 px-3 rounded-lg text-[11px] font-bold border border-gray-200 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200">
                          Search
                        </button>
                      </div>
                      <p className="text-[11px] text-gray-500 font-semibold mb-2">Please Enter the Vehicle Details:</p>
                      <div className="h-[72px] flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <p className="text-gray-300 text-[12px] font-semibold text-center">Enter License Plate# to<br/>see Vehicle Details.</p>
                      </div>
                    </div>
                  )}

                  <button className={`w-full mt-4 py-[11px] rounded-xl text-[12px] font-extrabold tracking-[2px] uppercase transition-all duration-200 ${formData.year ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 cursor-pointer" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
                    Find Tires
                  </button>
                </>
              )}

              {/* ── FIND SERVICE ── */}
              {activeTab === "service" && (
                <>
                  {/* Service grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { id: "oil", label: "Oil Changes", icon: (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 12h8M12 8v8"/>
                        </svg>
                      )},
                      { id: "brakes", label: "Brakes", icon: (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                          <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/>
                        </svg>
                      )},
                      { id: "battery", label: "Batteries", icon: (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                          <rect x="2" y="7" width="18" height="11" rx="2"/><path d="M22 11v3M7 11v2M11 11v2"/>
                        </svg>
                      )},
                      { id: "alignment", label: "Alignment", icon: (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                          <circle cx="12" cy="12" r="2"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                        </svg>
                      )},
                    ].map(({ id, label, icon }) => (
                      <button key={id} onClick={() => setSelectedService(id)}
                        className={`flex items-center gap-2 px-3 py-3 rounded-xl border-2 text-[12px] font-bold transition-all duration-150 ${selectedService === id ? "border-red-500 bg-red-50 text-red-600" : "border-gray-200 bg-white text-gray-600 hover:border-red-300 hover:bg-red-50/50"}`}>
                        <span className={selectedService === id ? "text-red-500" : "text-red-400"}>{icon}</span>
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Vehicle dropdowns */}
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {[
                      { key: "year", label: "Year", options: years },
                      { key: "make", label: "Make", options: makes },
                      { key: "model", label: "Model", options: [] },
                      { key: "engine", label: "Engine", options: [] },
                    ].map(({ key, label, options }) => (
                      <select key={key} value={formData[key]}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                        className="border border-gray-200 rounded-lg px-3 py-[9px] text-[13px] text-gray-600 bg-gray-50 focus:outline-none focus:border-red-400 focus:bg-white transition-colors">
                        <option value="">{label}</option>
                        {options.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ))}
                  </div>

                  <button className={`w-full mt-3 py-[11px] rounded-xl text-[12px] font-extrabold tracking-[2px] uppercase transition-all duration-200 ${selectedService && formData.year ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 cursor-pointer" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
                    Make an Appointment
                  </button>
                </>
              )}

            </div>
          </div>
        </div>

        {/* Left — text (SECOND in DOM = bottom on mobile, left on desktop via lg:order-1) */}
        <div className={`w-full max-w-[520px] lg:order-1 transition-all duration-700 ${leaving ? 'opacity-0 -translate-x-8' : 'opacity-100 translate-x-0'}`}>

          {/* Tag pill */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-[7px] rounded-full mb-5">
            <span className="text-xs font-bold tracking-[1.5px] text-white/90">{s.tag}</span>
          </div>

          {/* Headline */}
          <div className="space-y-1 mb-5">
            <p className={`text-base md:text-lg font-semibold text-white/60 tracking-[4px] uppercase transition-all duration-700 delay-100 ${leaving ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>{s.line1}</p>
            <h1 className={`text-5xl md:text-[60px] font-extrabold leading-none tracking-[-1px] transition-all duration-700 delay-200 ${leaving ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <span className="text-red-500">{s.line2.split(' ')[0]}</span>
              {s.line2.split(' ').length > 1 && <><br /><span className="text-white">{s.line2.split(' ').slice(1).join(' ')}</span></>}
            </h1>
          </div>

          {/* Subtitle */}
          <p className={`text-base text-white/65 max-w-[400px] leading-relaxed mb-7 transition-all duration-700 delay-300 ${leaving ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>{s.sub}</p>

          {/* Badges */}
          <div className={`flex flex-wrap gap-2 mb-8 transition-all duration-700 delay-500 ${leaving ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            {s.badges.map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-3 py-1.5 rounded-full text-[11px] font-semibold text-white/80 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                {b}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className={`flex items-center gap-3 transition-all duration-700 delay-700 ${leaving ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <a href="/shop"
              className="group inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 px-8 py-[14px] rounded-xl text-white font-bold text-base transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/50 active:scale-[0.97]">
              {s.btn}
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
            <a href="/contacts"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 px-6 py-[13px] rounded-xl text-white/80 hover:text-white font-semibold text-sm transition-all duration-200 backdrop-blur-sm hover:bg-white/5">
              Learn More
            </a>
          </div>
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