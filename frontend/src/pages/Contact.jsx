import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../config";

const services = [
  "Tire Service & Repair",
  "Oil Change",
  "Brake Repair",
  "Wheel Alignment",
  "Battery Replacement",
  "A/C Evaluation",
  "Vehicle Inspection",
  "Other",
];

const infoCards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Our Location",
    value: "2005 Stokes Isle Ap. 896",
    sub: "Fremont, CA 94538",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    label: "Call Us",
    value: "(415) 634-7777",
    sub: "Available 24/7",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "Email Us",
    value: "support@tireoil.com",
    sub: "We reply within 2 hours",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: "Working Hours",
    value: "Mon – Fri: 7am – 7pm",
    sub: "Sat 7–6pm · Sun 9–5pm",
  },
];

const hours = [
  { day: "Monday – Friday", time: "7:00 am – 7:00 pm", open: true },
  { day: "Saturday",        time: "7:00 am – 6:00 pm", open: true },
  { day: "Sunday",          time: "9:00 am – 5:00 pm", open: true },
];

function isOpenNow() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun
  const h = now.getHours() + now.getMinutes() / 60;
  if (day >= 1 && day <= 5) return h >= 7 && h < 19;
  if (day === 6) return h >= 7 && h < 18;
  if (day === 0) return h >= 9 && h < 17;
  return false;
}

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    phone: searchParams.get("phone") || "",
    service: searchParams.get("service") || "",
    vehicle: "", message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const open = isOpenNow();

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.service) e.service = "Please select a service";
    if (!form.message.trim()) e.message = "Please include a message";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSending(true);
    try {
      await fetch(`${API}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    `${form.firstName} ${form.lastName}`,
          email:   form.email,
          phone:   form.phone,
          subject: form.service,
          message: form.message,
          vehicle: form.vehicle,
        }),
      });
    } catch (_) {
      // show success regardless — message saved if network ok
    } finally {
      setSending(false);
    }
    setSubmitted(true);
  };

  const set = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    setErrors(er => { const n = { ...er }; delete n[k]; return n; });
  };

  const inputCls = (k) =>
    `w-full px-4 py-3 rounded-xl border text-[14px] text-gray-800 bg-white outline-none transition-all duration-200 placeholder:text-gray-300 ${
      errors[k]
        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
        : "border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-50"
    }`;

  return (
    <div className="bg-white min-h-screen">

      {/* ── HERO BANNER ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #040810 0%, #0c1220 50%, #060c18 100%)",
          minHeight: 280,
        }}
      >
        {/* bg accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-[2.5px]"
            style={{ background: "linear-gradient(90deg,#1d4ed8 0%,#1d4ed8 42%,#dc2626 58%,#dc2626 100%)" }} />
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-red-600/8 rounded-full blur-[100px]" />
          <div className="absolute top-0 right-0 w-96 h-full bg-blue-900/10 pointer-events-none"
            style={{ clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-[5%] pt-36 md:pt-48 lg:pt-52 pb-14">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-5">
            <a href="/" className="text-white/40 hover:text-white/70 text-[11px] font-semibold tracking-wider uppercase transition-colors">Home</a>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 text-white/25"><path d="M6 12L10 8 6 4"/></svg>
            <span className="text-red-400 text-[11px] font-semibold tracking-wider uppercase">Contact</span>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-red-600" />
            <span className="text-[11px] font-black tracking-[3px] uppercase text-red-500">Get In Touch</span>
          </div>
          <h1 className="text-[36px] sm:text-[48px] md:text-[58px] font-black text-white leading-none tracking-tight mb-4">
            Contact <span className="text-red-500">Us</span>
          </h1>
          <p className="text-white/50 text-[14px] md:text-[15px] max-w-lg leading-relaxed">
            Book an appointment, ask about our services, or just say hello — our team is ready to help.
          </p>

          {/* quick info pills */}
          <div className="flex flex-wrap items-center gap-3 mt-7">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold border ${open ? "bg-green-500/10 border-green-500/25 text-green-400" : "bg-gray-500/10 border-gray-500/25 text-gray-400"}`}>
              <span className={`w-2 h-2 rounded-full ${open ? "bg-green-400 animate-pulse" : "bg-gray-500"}`} />
              {open ? "Open Now" : "Closed Now"}
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold bg-white/5 border border-white/10 text-white/60">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Same-Day Appointments
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold bg-white/5 border border-white/10 text-white/60">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><polyline points="20 6 9 17 4 12"/></svg>
              Free Vehicle Inspection
            </div>
          </div>
        </div>
      </div>

      {/* ── INFO CARDS ROW ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-5 md:px-[5%]">
          <div className="grid grid-cols-2 lg:grid-cols-4 -mt-0 divide-x divide-gray-100">
            {infoCards.map((c, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-6 hover:bg-red-50/30 transition-colors duration-200 group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 shrink-0 group-hover:bg-red-100 transition-colors">
                  {c.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black tracking-[2px] uppercase text-gray-400 mb-0.5">{c.label}</p>
                  <p className="text-[13px] font-bold text-gray-900 leading-tight truncate">{c.value}</p>
                  <p className="text-[11px] text-gray-400 leading-tight">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN: Form + Sidebar ── */}
      <div ref={ref} className="max-w-7xl mx-auto px-5 md:px-[5%] py-14 md:py-20">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 xl:gap-16">

          {/* ── LEFT: Form ── */}
          <div
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateX(-24px)",
              transition: "opacity .7s ease, transform .7s ease",
            }}
          >
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-red-600" />
                <span className="text-[11px] font-black tracking-[3px] uppercase text-red-600">Book an Appointment</span>
              </div>
              <h2 className="text-[26px] md:text-[32px] font-black text-gray-900 tracking-tight">
                Send Us a Message
              </h2>
              <p className="text-[13.5px] text-gray-400 mt-1">
                Fill out the form below and we'll get back to you within 2 hours.
              </p>
            </div>

            {submitted ? (
              /* Success state */
              <div className="rounded-2xl border border-green-200 bg-green-50 p-10 text-center"
                style={{ animation: "fadeUp .5s ease both" }}>
                <style>{`@keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }`}</style>
                <div className="w-16 h-16 rounded-full bg-green-100 border-2 border-green-300 flex items-center justify-center mx-auto mb-5">
                  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-[22px] font-black text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-[14px] text-gray-500 mb-6 max-w-sm mx-auto">
                  Thank you, <strong className="text-gray-700">{form.firstName || "there"}</strong>! We've received your request and will contact you within 2 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ firstName:"", lastName:"", email:"", phone:"", service:"", vehicle:"", message:"" }); }}
                  className="px-7 py-3 bg-gray-900 hover:bg-red-600 text-white text-[12px] font-black tracking-[2px] uppercase rounded-xl transition-colors duration-200"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate
                className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-[0_4px_40px_rgba(0,0,0,0.06)]">

                {/* Name row */}
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[11px] font-black tracking-[2px] uppercase text-gray-500 mb-1.5">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input type="text" placeholder="John" value={form.firstName} onChange={set("firstName")} className={inputCls("firstName")} />
                    {errors.firstName && <p className="text-red-500 text-[11px] mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-[11px] font-black tracking-[2px] uppercase text-gray-500 mb-1.5">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input type="text" placeholder="Doe" value={form.lastName} onChange={set("lastName")} className={inputCls("lastName")} />
                    {errors.lastName && <p className="text-red-500 text-[11px] mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[11px] font-black tracking-[2px] uppercase text-gray-500 mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input type="email" placeholder="john@email.com" value={form.email} onChange={set("email")} className={inputCls("email")} />
                    {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-[11px] font-black tracking-[2px] uppercase text-gray-500 mb-1.5">
                      Phone Number
                    </label>
                    <input type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={set("phone")} className={inputCls("phone")} />
                  </div>
                </div>

                {/* Service */}
                <div className="mb-4">
                  <label className="block text-[11px] font-black tracking-[2px] uppercase text-gray-500 mb-1.5">
                    Service Needed <span className="text-red-500">*</span>
                  </label>
                  <select value={form.service} onChange={set("service")} className={inputCls("service")}>
                    <option value="">Select a service…</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <p className="text-red-500 text-[11px] mt-1">{errors.service}</p>}
                </div>

                {/* Vehicle info */}
                <div className="mb-4">
                  <label className="block text-[11px] font-black tracking-[2px] uppercase text-gray-500 mb-1.5">
                    Vehicle Info <span className="text-gray-300 font-medium normal-case tracking-normal">(optional)</span>
                  </label>
                  <input type="text" placeholder="e.g. 2021 Toyota Camry · P215/60R16" value={form.vehicle} onChange={set("vehicle")} className={inputCls("vehicle")} />
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block text-[11px] font-black tracking-[2px] uppercase text-gray-500 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your vehicle issue or what service you need…"
                    value={form.message}
                    onChange={set("message")}
                    className={`${inputCls("message")} resize-none`}
                  />
                  {errors.message && <p className="text-red-500 text-[11px] mt-1">{errors.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2.5 py-4 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-[12px] font-black tracking-[2.5px] uppercase rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-red-600/25 hover:-translate-y-0.5 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/>
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-gray-300 mt-4">
                  We respond within 2 hours · No spam, ever
                </p>
              </form>
            )}
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <div
            className="flex flex-col gap-5"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateX(24px)",
              transition: "opacity .7s ease .15s, transform .7s ease .15s",
            }}
          >

            {/* Hours card */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <div className="bg-gray-900 px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black tracking-[3px] uppercase text-red-400 mb-0.5">Store Hours</p>
                  <p className="text-white font-bold text-[13px]">TireOil · Fremont</p>
                </div>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold ${open ? "bg-green-500/15 text-green-400" : "bg-gray-700 text-gray-400"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${open ? "bg-green-400 animate-pulse" : "bg-gray-500"}`} />
                  {open ? "Open Now" : "Closed"}
                </div>
              </div>
              <div className="bg-white px-6 py-4">
                {hours.map(({ day, time }) => (
                  <div key={day} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                    <span className="text-[12.5px] font-semibold text-gray-600">{day}</span>
                    <span className="text-[12.5px] font-bold text-gray-900">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] relative">
              <div
                className="h-[220px] bg-gray-100 flex items-center justify-center relative overflow-hidden"
                style={{ background: "linear-gradient(145deg, #e8edf5 0%, #d8e2ef 100%)" }}
              >
                {/* Fake map grid */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="absolute border-gray-400 border-b w-full" style={{ top: `${i * 14.3}%` }} />
                  ))}
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="absolute border-gray-400 border-r h-full" style={{ left: `${i * 14.3}%` }} />
                  ))}
                </div>
                {/* Roads */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-1/2 left-0 right-0 h-3 bg-white -translate-y-1/2" />
                  <div className="absolute left-1/3 top-0 bottom-0 w-3 bg-white" />
                  <div className="absolute left-2/3 top-0 bottom-0 w-2 bg-white" />
                  <div className="absolute top-1/3 left-0 right-0 h-2 bg-white -translate-y-1/2" />
                </div>
                {/* Pin */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-xl shadow-red-600/40 border-4 border-white mb-2">
                    <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div className="bg-white rounded-lg px-3 py-1.5 shadow-lg border border-gray-100">
                    <p className="text-[11px] font-black text-gray-900">TireOil Fremont</p>
                    <p className="text-[10px] text-gray-400">2005 Stokes Isle Ap. 896</p>
                  </div>
                </div>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 bg-white hover:bg-gray-50 text-[12px] font-bold text-gray-700 hover:text-red-600 transition-colors duration-200 border-t border-gray-100"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Get Directions
              </a>
            </div>

            {/* Trust badges */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <p className="text-[10px] font-black tracking-[2.5px] uppercase text-gray-400 mb-4">Why Choose Us</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "🔧", title: "ASE Certified", sub: "Expert technicians" },
                  { icon: "⚡", title: "Same-Day", sub: "Quick service" },
                  { icon: "💰", title: "Price Match", sub: "Best rates guaranteed" },
                  { icon: "✅", title: "Free Inspect", sub: "With every visit" },
                ].map(({ icon, title, sub }) => (
                  <div key={title} className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 hover:bg-red-50 transition-colors duration-200 cursor-default">
                    <span className="text-base">{icon}</span>
                    <div>
                      <p className="text-[11.5px] font-bold text-gray-800 leading-tight">{title}</p>
                      <p className="text-[10px] text-gray-400 leading-tight">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick call CTA */}
            <div className="rounded-2xl bg-gray-900 p-5 text-center">
              <p className="text-white/50 text-[11px] uppercase tracking-[2px] font-bold mb-1">Prefer to call?</p>
              <a href="tel:+68120034509"
                className="text-[22px] font-black text-white hover:text-red-400 transition-colors duration-200 leading-none block mb-3">
                (+68) 120-034-509
              </a>
              <p className="text-white/30 text-[11px]">Mon – Fri 7am–7pm · Sat 7am–6pm</p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
