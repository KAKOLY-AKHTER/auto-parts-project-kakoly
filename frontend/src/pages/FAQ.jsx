import useSEO from '../hooks/useSEO';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    category: "Appointments & Services",
    color: "#dc2626",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    items: [
      {
        q: "How do I book a service appointment?",
        a: "You can book online through our Contact page, call us at (415) 634-7777, or walk in — we accept same-day appointments when slots are available. Logged-in customers can also book directly from their dashboard.",
      },
      {
        q: "Do I need an appointment for an oil change?",
        a: "No appointment is required for standard oil changes. However, booking ahead guarantees your time slot and reduces wait time, especially on weekends.",
      },
      {
        q: "How long does a tire rotation take?",
        a: "A standard tire rotation typically takes 30–45 minutes. If we're doing it alongside an oil change or alignment check, plan for about 1–1.5 hours.",
      },
      {
        q: "Can I wait while my car is being serviced?",
        a: "Yes! Our waiting area has Wi-Fi, coffee, and comfortable seating. For longer jobs (alignment, full tire set), we also offer a free local shuttle within 5 miles.",
      },
      {
        q: "Do you service all vehicle types?",
        a: "We service most passenger cars, SUVs, light trucks, and vans. We also have dedicated bays for fleet vehicles. For heavy-duty trucks or specialty vehicles, call us first to confirm availability.",
      },
    ],
  },
  {
    category: "Pricing & Payments",
    color: "#f59e0b",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    items: [
      {
        q: "Do you offer price matching?",
        a: "Yes — bring us any written quote from a local competitor for the same service and we'll match it. This applies to tires, oil changes, and most repair services.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards (Visa, Mastercard, Amex, Discover), cash, Apple Pay, and Google Pay. We also offer financing options for larger repairs.",
      },
      {
        q: "Are there any hidden fees?",
        a: "Never. We provide a full written estimate before any work begins. You approve it first — no surprises on your final bill.",
      },
      {
        q: "Do you offer discounts for seniors or military?",
        a: "Yes! We offer a 10% discount for active military, veterans, and seniors (65+) on labor costs. Show your ID or military card at the time of service.",
      },
    ],
  },
  {
    category: "Tires & Oil",
    color: "#10b981",
    icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
    items: [
      {
        q: "How often should I rotate my tires?",
        a: "Every 5,000–7,500 miles, or every other oil change. Regular rotation extends tire life by up to 20,000 miles and ensures even tread wear across all four tires.",
      },
      {
        q: "What's the difference between synthetic and conventional oil?",
        a: "Synthetic oil lasts longer (7,500–10,000 miles vs 3,000–5,000 for conventional), handles extreme temperatures better, and keeps your engine cleaner. Most modern vehicles recommend or require full synthetic.",
      },
      {
        q: "How do I know when to replace my tires?",
        a: "Check the penny test — insert a penny into the tread groove. If you can see Lincoln's full head, your tread is below 2/32\" and tires need replacing. Also watch for cracks, bulges, or uneven wear patterns.",
      },
      {
        q: "Can you mount tires I purchased elsewhere?",
        a: "Yes, we'll mount and balance tires you bring in. Our mounting fee is $20–$25 per tire depending on size. Note: tires purchased from us include free mounting and balancing.",
      },
      {
        q: "Do you dispose of old oil and tires?",
        a: "Yes. We're EPA-compliant and properly recycle all used oil and tires at no extra charge. We never dump used oil or send tires to landfills.",
      },
    ],
  },
  {
    category: "Shop & Orders",
    color: "#3b82f6",
    icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
    items: [
      {
        q: "How long does shipping take for online orders?",
        a: "Standard shipping takes 3–5 business days. Expedited (2-day) and overnight options are available at checkout. Most Bay Area orders qualify for same-day local pickup.",
      },
      {
        q: "What is your return policy for parts?",
        a: "Unused parts in original packaging can be returned within 30 days for a full refund. Installed parts are non-returnable unless there's a manufacturer defect. See our Return Policy page for full details.",
      },
      {
        q: "Are your online prices the same as in-store?",
        a: "Yes, our online and in-store prices are the same. Occasionally we run web-only promotions — sign up for our newsletter to catch those deals.",
      },
      {
        q: "How do I track my order?",
        a: "Once your order ships, you'll receive a confirmation email with a tracking number. You can also check order status from your account dashboard under Order History.",
      },
    ],
  },
  {
    category: "Location & Hours",
    color: "#8b5cf6",
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
    items: [
      {
        q: "Where are you located?",
        a: "We're located in Fremont, CA. Use the address on our Contact page for directions. We're conveniently located near major highways with ample parking.",
      },
      {
        q: "What are your hours of operation?",
        a: "Monday–Friday: 7:00 am – 7:00 pm · Saturday: 7:00 am – 6:00 pm · Sunday: 9:00 am – 5:00 pm. We're open year-round except Thanksgiving and Christmas Day.",
      },
      {
        q: "Do you offer roadside assistance?",
        a: "Yes! We offer 24/7 emergency roadside assistance for Bay Area customers — flat tires, dead batteries, lockouts, and towing. Call (415) 634-7777 anytime.",
      },
      {
        q: "Is there parking available?",
        a: "Yes, we have a large free parking lot. There's also a dedicated drop-off lane so you don't need to wait in line if you're leaving your vehicle with us.",
      },
    ],
  },
];

function AccordionItem({ q, a, isOpen, onToggle }) {
  return (
    <div
      style={{
        border: `1px solid ${isOpen ? 'rgba(220,38,38,0.3)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 14,
        background: isOpen ? 'rgba(220,38,38,0.04)' : 'rgba(255,255,255,0.02)',
        transition: 'all 0.2s',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '18px 22px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ color: isOpen ? '#fff' : 'rgba(255,255,255,0.8)', fontWeight: 700, fontSize: 15, lineHeight: 1.4 }}>
          {q}
        </span>
        <span style={{
          width: 28, height: 28, borderRadius: '50%',
          background: isOpen ? '#dc2626' : 'rgba(255,255,255,0.06)',
          border: `1px solid ${isOpen ? '#dc2626' : 'rgba(255,255,255,0.1)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'all 0.2s',
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" style={{ width: 12, height: 12, transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div style={{ padding: '0 22px 20px', color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.8 }}>
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  useSEO({
    title: "FAQ — Frequently Asked Questions",
    description: "Got questions about tire service, oil change, brake repair or mobile service in Fremont CA? Find answers to the most common questions here.",
  });
  const [openItems, setOpenItems] = useState({ '0-0': true });
  const [activeCategory, setActiveCategory] = useState(null);

  const toggle = (key) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const visibleFaqs = activeCategory !== null
    ? faqs.filter((_, i) => i === activeCategory)
    : faqs;

  return (
    <main style={{ background: '#050d18', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ background: 'linear-gradient(135deg,#050d18 0%,#0a1628 50%,#0d1f35 100%)', paddingTop: 'clamp(100px,14vw,160px)', paddingBottom: 64, paddingLeft: 20, paddingRight: 20, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#dc2626,#f87171,#dc2626)' }} />
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,#dc2626,transparent 70%)', opacity: 0.06 }} />
        </div>
        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: 12 }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.65)' }}>FAQ</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.25)', borderRadius: 99, padding: '6px 16px', marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#dc2626', display: 'inline-block' }} />
            <span style={{ color: '#f87171', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Frequently Asked Questions</span>
          </div>
          <h1 style={{ color: '#fff', fontFamily: "'Oswald',sans-serif", fontWeight: 800, fontSize: 'clamp(38px,6vw,72px)', lineHeight: 1.1, letterSpacing: '0.02em', marginBottom: 18 }}>
            Got a <span style={{ color: '#dc2626' }}>Question?</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, lineHeight: 1.7, maxWidth: 560, marginBottom: 32 }}>
            Everything you need to know about our services, pricing, and policies — answered in plain English.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/contacts" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#dc2626', color: '#fff', textDecoration: 'none', padding: '12px 24px', borderRadius: 10, fontWeight: 700, fontSize: 13 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 15, height: 15 }}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              Still have questions? Call us
            </Link>
            <a href="tel:+14156347777" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 14, fontWeight: 600, padding: '12px 4px' }}>
              (415) 634-7777
            </a>
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTER ── */}
      <section style={{ background: '#07111f', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '20px 20px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => setActiveCategory(null)}
            style={{
              padding: '8px 18px', borderRadius: 99, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: 'none', transition: 'all 0.2s',
              background: activeCategory === null ? '#dc2626' : 'rgba(255,255,255,0.05)',
              color: activeCategory === null ? '#fff' : 'rgba(255,255,255,0.45)',
            }}
          >
            All Topics
          </button>
          {faqs.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(activeCategory === i ? null : i)}
              style={{
                padding: '8px 18px', borderRadius: 99, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                background: activeCategory === i ? cat.color : 'rgba(255,255,255,0.05)',
                color: activeCategory === i ? '#fff' : 'rgba(255,255,255,0.45)',
              }}
            >
              {cat.category}
            </button>
          ))}
        </div>
      </section>

      {/* ── FAQ SECTIONS ── */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '60px 20px 80px' }}>
        {visibleFaqs.map((cat, ci) => {
          const realIndex = faqs.indexOf(cat);
          return (
            <div key={ci} style={{ marginBottom: 56 }}>
              {/* Category header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: `${cat.color}18`, border: `1px solid ${cat.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={cat.color} strokeWidth="1.8" style={{ width: 20, height: 20 }}>
                    <path d={cat.icon} />
                  </svg>
                </div>
                <div>
                  <h2 style={{ color: '#fff', fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: '0.04em', margin: 0 }}>
                    {cat.category}
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, margin: '2px 0 0' }}>{cat.items.length} questions</p>
                </div>
              </div>

              {/* Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {cat.items.map((item, ii) => {
                  const key = `${realIndex}-${ii}`;
                  return (
                    <AccordionItem
                      key={key}
                      q={item.q}
                      a={item.a}
                      isOpen={!!openItems[key]}
                      onToggle={() => toggle(key)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ background: 'linear-gradient(135deg,#0a1628,#111827)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '60px 20px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.8" style={{ width: 28, height: 28 }}>
              <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h2 style={{ color: '#fff', fontFamily: "'Oswald',sans-serif", fontWeight: 800, fontSize: 'clamp(24px,4vw,36px)', marginBottom: 12 }}>
            Didn't find your answer?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
            Our team is available 7 days a week. Call, visit, or send us a message — we'll get back to you fast.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contacts"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#dc2626', color: '#fff', textDecoration: 'none', padding: '13px 28px', borderRadius: 11, fontWeight: 800, fontSize: 13, fontFamily: "'Oswald',sans-serif", letterSpacing: '0.06em' }}>
              Contact Us
            </Link>
            <a href="tel:+14156347777"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', textDecoration: 'none', padding: '13px 28px', borderRadius: 11, fontWeight: 700, fontSize: 13 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 15, height: 15 }}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              (415) 634-7777
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
