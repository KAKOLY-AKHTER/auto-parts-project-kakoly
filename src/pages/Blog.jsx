import { Link } from 'react-router-dom';

const posts = [
  { id: 1, cat: "Tire Tips",   catColor: "#dc2626", title: "How Often Should You Rotate Your Tires?",          excerpt: "Regular rotation is one of the simplest ways to extend tire life. Learn the optimal schedule and why it matters for your safety.",             date: "May 12, 2025", readTime: "4 min",  img: "/tire-1.png"     },
  { id: 2, cat: "Oil & Fluids", catColor: "#f59e0b", title: "Synthetic vs Conventional Oil: What's Right?",      excerpt: "We break down the real differences between synthetic and conventional oil — and which one your vehicle actually needs right now.",          date: "Apr 28, 2025", readTime: "6 min",  img: "/oil-1.png"      },
  { id: 3, cat: "Safety",      catColor: "#10b981", title: "5 Signs Your Brakes Need Immediate Attention",       excerpt: "Don't ignore these warning signs. From squealing sounds to a pulsating pedal — here's what your brakes are trying to tell you.",           date: "Apr 15, 2025", readTime: "5 min",  img: "/tire-2.png"     },
  { id: 4, cat: "Tire Tips",   catColor: "#dc2626", title: "Understanding Tire Size Numbers: A Complete Guide",  excerpt: "That string of numbers on your tire sidewall contains critical info. Here's exactly how to read and understand every digit.",             date: "Mar 30, 2025", readTime: "7 min",  img: "/tire-3.png"     },
  { id: 5, cat: "Maintenance", catColor: "#3b82f6", title: "The Ultimate Car Maintenance Schedule for 2025",     excerpt: "From 3,000-mile oil changes to 60,000-mile timing belts — a complete maintenance calendar to keep your car running like new.",           date: "Mar 18, 2025", readTime: "8 min",  img: "/tire-oil.png"   },
  { id: 6, cat: "Oil & Fluids", catColor: "#f59e0b", title: "Why Your Check Engine Light Came On",               excerpt: "A check engine light doesn't always mean disaster. Learn the most common causes and how to respond calmly and correctly.",              date: "Mar 5, 2025",  readTime: "5 min",  img: "/oil-2.png"      },
];

const featured = posts[0];
const rest = posts.slice(1);

export default function Blog() {
  return (
    <main>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-32 pb-20"
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
          <div className="grid lg:grid-cols-2 gap-10 items-center rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 p-8 md:p-10 hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
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
          </div>
        </div>
      </section>

      {/* ── POSTS GRID ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-gray-900 font-black text-3xl mb-10 tracking-tight">More Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {rest.map(({ id, cat, catColor, title, excerpt, date, readTime, img }) => (
              <article key={id}
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
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ── */}
      <section className="py-20" style={{ background: "linear-gradient(135deg,#b91c1c,#dc2626)" }}>
        <div className="max-w-2xl mx-auto px-5 text-center">
          <h2 className="text-white font-black text-4xl mb-4 tracking-tight">Get Auto Tips in Your Inbox</h2>
          <p className="text-red-100 text-[15px] mb-8">Join 5,000+ Bay Area drivers who get our monthly maintenance tips and exclusive deals.</p>
          <form className="flex gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="your@email.com"
              className="flex-1 px-5 py-3.5 rounded-xl text-[14px] outline-none text-gray-900"
              style={{ border: "none" }} />
            <button type="submit" className="px-6 py-3.5 bg-gray-900 hover:bg-black text-white font-bold text-[13px] rounded-xl transition-colors shrink-0 border-none cursor-pointer">
              Subscribe
            </button>
          </form>
          <p className="text-red-200 text-[11px] mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

    </main>
  );
}
