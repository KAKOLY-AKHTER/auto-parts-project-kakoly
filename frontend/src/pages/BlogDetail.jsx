import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

export default function BlogDetail() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
          <h2 style={{ color: '#111', fontFamily: "'Oswald',sans-serif", fontSize: 24, marginBottom: 12 }}>Article Not Found</h2>
          <Link to="/blog" style={{ color: '#dc2626', fontWeight: 700, textDecoration: 'none' }}>← Back to Blog</Link>
        </div>
      </div>
    );
  }

  const related = blogPosts.filter(p => p.id !== post.id && p.cat === post.cat).slice(0, 2);
  const others  = blogPosts.filter(p => p.id !== post.id && p.cat !== post.cat).slice(0, 2 - related.length);
  const relatedPosts = [...related, ...others].slice(0, 2);

  const renderBlock = (block, i) => {
    switch (block.type) {
      case 'intro':
        return (
          <p key={i} style={{ fontSize: 18, lineHeight: 1.8, color: '#374151', fontWeight: 500, marginBottom: 28, borderLeft: '3px solid #dc2626', paddingLeft: 20 }}>
            {block.text}
          </p>
        );
      case 'heading':
        return (
          <h2 key={i} style={{ fontSize: 22, fontWeight: 800, color: '#111827', fontFamily: "'Oswald',sans-serif", letterSpacing: '0.03em', marginTop: 36, marginBottom: 12 }}>
            {block.text}
          </h2>
        );
      case 'paragraph':
        return (
          <p key={i} style={{ fontSize: 15, lineHeight: 1.85, color: '#4b5563', marginBottom: 20 }}>
            {block.text}
          </p>
        );
      case 'tips':
        return (
          <div key={i} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 14, padding: '20px 24px', marginBottom: 24, marginTop: 8 }}>
            {block.heading && (
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#dc2626', marginBottom: 14, fontFamily: "'Oswald',sans-serif" }}>
                {block.heading}
              </div>
            )}
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
              {block.items.map((item, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10, fontSize: 14, color: '#374151', lineHeight: 1.6 }}>
                  <span style={{ color: '#dc2626', fontWeight: 900, flexShrink: 0, marginTop: 2 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      case 'cta':
        return (
          <div key={i} style={{ background: 'linear-gradient(135deg,#dc2626,#b91c1c)', borderRadius: 16, padding: '28px 32px', marginTop: 40, marginBottom: 8 }}>
            <p style={{ color: '#fff', fontSize: 15, lineHeight: 1.75, marginBottom: 20 }}>{block.text}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/contacts"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#dc2626', textDecoration: 'none', padding: '11px 22px', borderRadius: 9, fontWeight: 800, fontSize: 13, fontFamily: "'Oswald',sans-serif", letterSpacing: '0.06em' }}>
                <i className="fas fa-calendar-check" style={{ fontSize: 12 }} /> Book a Service
              </Link>
              <a href="tel:+14156347777"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', textDecoration: 'none', padding: '11px 22px', borderRadius: 9, fontWeight: 700, fontSize: 13, fontFamily: "'Oswald',sans-serif", letterSpacing: '0.06em' }}>
                <i className="fas fa-phone" style={{ fontSize: 12 }} /> (415) 634-7777
              </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg,#050d18,#0a1628)', paddingTop: 'clamp(100px,16vw,160px)', paddingBottom: 60, paddingLeft: 20, paddingRight: 20 }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: 12 }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
            <Link to="/blog" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Blog</Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.65)' }}>{post.cat}</span>
          </div>

          {/* Category badge */}
          <span style={{ display: 'inline-block', background: `${post.catColor}22`, color: post.catColor, border: `1px solid ${post.catColor}44`, borderRadius: 99, padding: '5px 16px', fontSize: 11, fontWeight: 700, fontFamily: "'Oswald',sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>
            {post.cat}
          </span>

          <h1 style={{ color: '#fff', fontFamily: "'Oswald',sans-serif", fontWeight: 800, fontSize: 'clamp(28px,5vw,46px)', lineHeight: 1.2, letterSpacing: '0.02em', marginBottom: 20 }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(220,38,38,0.2)', border: '2px solid rgba(220,38,38,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fas fa-user" style={{ color: '#dc2626', fontSize: 13 }} />
              </div>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{post.author}</span>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
            <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>{post.date}</span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
              <i className="fas fa-clock" style={{ fontSize: 11 }} /> {post.readTime} read
            </span>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      <div style={{ background: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'center' }}>
          <img src={post.img} alt={post.title}
            style={{ maxHeight: 280, maxWidth: '100%', objectFit: 'contain', padding: '40px 0' }}
            onError={e => { e.target.style.display = 'none'; }} />
        </div>
      </div>

      {/* Article Content */}
      <article style={{ maxWidth: 760, margin: '0 auto', padding: '52px 24px 20px' }}>
        {post.content.map((block, i) => renderBlock(block, i))}
      </article>

      {/* Share + Back */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '20px 24px 60px' }}>
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/blog"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#6b7280', textDecoration: 'none', fontWeight: 600, fontSize: 13 }}>
            <i className="fas fa-arrow-left" style={{ fontSize: 11 }} /> Back to Blog
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#9ca3af', fontSize: 12, fontWeight: 600 }}>Share:</span>
            <a href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`} target="_blank" rel="noreferrer"
              style={{ width: 34, height: 34, borderRadius: 8, background: '#25d36614', border: '1px solid #25d36630', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25d366', textDecoration: 'none', fontSize: 14 }}>
              <i className="fab fa-whatsapp" />
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer"
              style={{ width: 34, height: 34, borderRadius: 8, background: '#1877f214', border: '1px solid #1877f230', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1877f2', textDecoration: 'none', fontSize: 14 }}>
              <i className="fab fa-facebook" />
            </a>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer"
              style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111', textDecoration: 'none', fontSize: 14 }}>
              <i className="fab fa-x-twitter" />
            </a>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section style={{ background: '#f9fafb', borderTop: '1px solid #e5e7eb', padding: '60px 20px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 22, fontWeight: 800, color: '#111827', marginBottom: 28, letterSpacing: '0.03em' }}>
              Related Articles
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))', gap: 20 }}>
              {relatedPosts.map(p => (
                <Link key={p.id} to={`/blog/${p.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb', transition: 'box-shadow 0.2s, transform 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}>
                    <div style={{ height: 140, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={p.img} alt={p.title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', padding: 20 }} onError={e => { e.target.style.display = 'none'; }} />
                    </div>
                    <div style={{ padding: '16px 20px' }}>
                      <span style={{ background: `${p.catColor}18`, color: p.catColor, borderRadius: 99, padding: '3px 10px', fontSize: 10, fontWeight: 700, fontFamily: "'Oswald',sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase' }}>{p.cat}</span>
                      <h3 style={{ color: '#111827', fontSize: 14, fontWeight: 700, lineHeight: 1.4, marginTop: 10, marginBottom: 6 }}>{p.title}</h3>
                      <span style={{ color: '#dc2626', fontSize: 12, fontWeight: 700 }}>Read more →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
