const topServices = [
  { icon: "fa-clock",        title: "24/7 Emergency Service", desc: "Day or Night We're Here" },
  { icon: "fa-location-dot", title: "We Come To You",         desc: "Home • Business • Roadside" },
  { icon: "fa-car",          title: "Auto Service",           desc: "Diagnostics • Brakes • Tune-Ups" },
  { icon: "fa-oil-can",      title: "Oil Change",             desc: "Full Synthetic • Filter Change" },
  { icon: "fa-shield-alt",   title: "Fast Response",          desc: "Reliable Service" },
  { icon: "fa-truck",        title: "Tire Service",           desc: "Truck • Trailer • Auto" },
];

const menuLinks = [
  { label: "Home",           href: "/" },
  { label: "Auto Service",   href: "/auto-service" },
  { label: "Fleet & Mobile", href: "/fleet-services" },
  { label: "Shop",           href: "/shop" },
  { label: "About Us",       href: "/about" },
  { label: "Gallery",        href: "/gallery" },
  { label: "Contact",        href: "/contacts" },
];

export default function ClientLayout() {
  return (
    <div className="bg-[#0b0b0b] text-white min-h-screen">

      {/* ── TOP SERVICES BAR ── */}
      <div className="bg-black border-b-2 border-[#e30613] flex flex-wrap justify-between px-8 py-4">
        {topServices.map(({ icon, title, desc }) => (
          <div key={title} className="flex items-center gap-4 m-2.5">
            <div className="w-16 h-16 rounded-full border-2 border-[#e30613] flex items-center justify-center shrink-0">
              <i className={`fas ${icon} text-white text-2xl`} />
            </div>
            <div>
              <h4 className="text-white font-semibold text-[17px]">{title}</h4>
              <p className="text-[#ccc] text-[13.5px]">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── NAVBAR ── */}
      <nav className="flex justify-between items-center bg-[#111] px-10 py-[18px] flex-wrap gap-5">

        {/* Logo */}
        <div className="flex items-center gap-4">
          <img src="/tire-oil-removebg-preview.png" alt="Logo" className="w-[70px] object-contain"
            style={{ filter: "brightness(2.0) drop-shadow(0 0 10px rgba(255,255,255,0.5))" }} />
          <div>
            <h2 className="text-[26px] font-bold text-white">24HR Fremont Tire</h2>
            <span className="text-[#e30613] text-[15px] font-semibold">Tire &amp; Oil Change</span>
          </div>
        </div>

        {/* Menu */}
        <ul className="flex flex-wrap gap-7 list-none">
          {menuLinks.map(({ label, href }) => (
            <li key={label}>
              <a href={href}
                className="no-underline text-white font-semibold text-[15px] hover:text-[#e30613] transition-colors duration-300">
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Call button */}
        <a href="tel:5101234567"
          className="no-underline bg-[#e30613] text-white px-6 py-3 rounded-md font-bold text-[15px] hover:bg-red-700 transition-colors duration-200">
          Call or Text (415) 634-7777
        </a>
      </nav>

      {/* ── HERO ── */}
      <section
        className="relative flex items-center min-h-[550px] px-20 overflow-hidden"
        style={{
          backgroundImage: "url('/truck-tire-change.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(90deg,rgba(0,0,0,0.82) 0%,rgba(0,0,0,0.4) 60%,transparent 100%)" }} />

        <div className="relative z-10 max-w-[700px]">
          <h1 className="text-[72px] font-black leading-none mb-5">
            <span className="text-[#e30613]">24HR</span><br />
            Fremont Tire &amp; Oil Change
          </h1>
          <p className="text-[22px] text-[#ddd] mb-6">
            Mobile Tire Service • Oil Change • Auto Repair •<br />
            24/7 Roadside Assistance
          </p>
          <div className="flex gap-4 flex-wrap">
            <a href="/contacts"
              className="no-underline bg-[#e30613] text-white px-8 py-4 font-bold text-[15px] rounded hover:bg-red-700 transition-colors duration-200">
              Request Service
            </a>
            <a href="tel:4156347777"
              className="no-underline border-2 border-white text-white px-8 py-4 font-bold text-[15px] rounded hover:bg-white hover:text-black transition-all duration-200">
              Call Now
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
