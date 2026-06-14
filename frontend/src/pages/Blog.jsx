import useSEO from '../hooks/useSEO';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts as posts } from '../data/blogPosts';
import API from '../config';

const featured = posts[0];
const rest = posts.slice(1);

export default function Blog() {
  useSEO({
    title: "Auto Care Blog — Tips & Advice",
    description: "Read expert auto care tips, tire maintenance advice, oil change guides and more from the team at 24HR Fremont Tire & Auto.",
  });
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error | duplicate
  const [msg, setMsg]       = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch(`${API}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.status === 409) { setStatus('duplicate'); setMsg('You\'re already subscribed!'); return; }
      if (!res.ok) { setStatus('error'); setMsg(data.message || 'Something went wrong.'); return; }
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setMsg('Could not connect. Please try again.');
    }
  };

  return (
    <main>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-36 md:pt-48 lg:pt-52 pb-20"
        style={{ background: "linear-gradient(135deg,#050d18 0%,#0a1628 50%,#0d1f35 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 inset-x-0 h-0.75" style={{ background: "linear-gradient(90deg,#dc2626,#f87171,#dc2626)" }} />
          <div className="absolute -bottom-20 right-0 w-150 h-150 rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(circle,#f59e0b,transparent 70%)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="flex items-center gap-2 text-[12px] mb-8">
            <Link to="/" className="text-slate-400 hover:text-red-400 no-underline transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">Blog</span>
          </div>
          <h1 className="text-white font-black leading-none tracking-tight mb-5"
            style={{ fontSize: "clamp(44px,6vw,80px)" }}>
            Tips &amp; <span style={{ color: "#dc2626" }}>News</span>
          </h1>
          <p className="text-slate-300 text-[17px] leading-relaxed max-w-xl">
            Expert advice on tires, oil, maintenance, and everything in between. Keep your vehicle in peak condition.
          </p>
        </div>
      </section>

      {/* ── FEATURED POST ── */}
      <section className="py-14 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-5">
          <p className="text-[11px] font-black tracking-[4px] text-red-600 uppercase mb-6 flex items-center gap-2">
            <span className="w-8 h-px bg-red-600" />Featured Article
          </p>
          <Link to={`/blog/${featured.id}`} className="grid lg:grid-cols-2 gap-10 items-center rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 p-8 md:p-10 hover:shadow-xl transition-shadow duration-300 cursor-pointer group" style={{ textDecoration: 'none' }}>
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold mb-4"
                style={{ background: `${featured.catColor}18`, color: featured.catColor }}>
                {featured.cat}
              </span>
              <h2 className="text-gray-900 font-black text-2xl md:text-3xl leading-tight mb-4 group-hover:text-red-600 transition-colors">
                {featured.title}
              </h2>
              <p className="text-gray-500 text-[14px] leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-[12px] text-gray-400 mb-6">
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readTime} read</span>
              </div>
              <div className="inline-flex items-center gap-2 text-red-600 font-bold text-[13px] group-hover:gap-3 transition-all">
                Read article
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>
            </div>
            <div className="h-64 lg:h-80 rounded-2xl overflow-hidden flex items-center justify-center bg-white border border-gray-100">
              <img src={featured.img} alt={featured.title}
                className="max-h-full max-w-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                onError={e => e.target.style.display = 'none'} />
            </div>
          </Link>
        </div>
      </section>

      {/* ── POSTS GRID ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-gray-900 font-black text-3xl mb-10 tracking-tight">More Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {rest.map(({ id, cat, catColor, title, excerpt, date, readTime, img }) => (
              <Link key={id} to={`/blog/${id}`} style={{ textDecoration: 'none' }}>
              <article
                className="bg-white rounded-2xl overflow-hidden group cursor-pointer shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Thumbnail */}
                <div className="h-48 relative flex items-center justify-center bg-gray-50 overflow-hidden">
                  <img src={img} alt={title}
                    className="max-h-full max-w-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                    onError={e => e.target.style.display = 'none'} />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold"
                    style={{ background: `${catColor}18`, color: catColor }}>
                    {cat}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-[11px] text-gray-300">
                    <span>{date}</span><span>·</span><span>{readTime} read</span>
                  </div>
                  <h3 className="text-gray-900 font-bold text-[15px] leading-snug mb-3 group-hover:text-red-600 transition-colors">
                    {title}
                  </h3>
                  <p className="text-gray-400 text-[13px] leading-relaxed mb-5 line-clamp-2">{excerpt}</p>
                  <div className="flex items-center gap-1.5 text-red-500 text-[12px] font-semibold group-hover:gap-3 transition-all">
                    Read more
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </div>
                </div>
              </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ── */}
      <section className="py-20" style={{ background: "linear-gradient(135deg,#b91c1c,#dc2626)" }}>
        <div className="max-w-2xl mx-auto px-5 text-center">
          <h2 className="text-white font-black text-4xl mb-4 tracking-tight">Get Auto Tips in Your Inbox</h2>
          <p className="text-red-100 text-[15px] mb-8">Join 5,000+ Bay Area drivers who get our monthly maintenance tips and exclusive deals.</p>

          {status === 'success' ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" className="w-7 h-7"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <p className="text-white font-bold text-lg">You're subscribed!</p>
              <p className="text-red-100 text-[14px]">Check your inbox for a confirmation email.</p>
            </div>
          ) : (
            <>
              <form className="flex gap-3 max-w-md mx-auto" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setStatus('idle'); }}
                  required
                  className="flex-1 px-5 py-3.5 rounded-xl text-[14px] outline-none text-gray-900"
                  style={{ border: "none" }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3.5 bg-gray-900 hover:bg-black text-white font-bold text-[13px] rounded-xl transition-colors shrink-0 border-none cursor-pointer disabled:opacity-60"
                >
                  {status === 'loading' ? '...' : 'Subscribe'}
                </button>
              </form>
              {(status === 'error' || status === 'duplicate') && (
                <p className="text-yellow-200 text-[12px] mt-3">{msg}</p>
              )}
              <p className="text-red-200 text-[11px] mt-4">No spam. Unsubscribe anytime.</p>
            </>
          )}
        </div>
      </section>

    </main>
  );
}
