import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#080810', padding: '40px 20px', textAlign: 'center',
    }}>
      <div style={{ maxWidth: 540 }}>

        {/* 404 number */}
        <div style={{
          fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(100px,20vw,160px)',
          color: 'transparent', lineHeight: 1, marginBottom: 8,
          WebkitTextStroke: '2px rgba(227,6,19,0.5)',
          textShadow: '0 0 80px rgba(227,6,19,0.15)',
        }}>
          404
        </div>

        {/* Icon */}
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'rgba(227,6,19,0.1)', border: '2px solid rgba(227,6,19,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px',
        }}>
          <i className="fas fa-map-signs" style={{ color: '#e30613', fontSize: 28 }} />
        </div>

        <h1 style={{
          fontFamily: "'Oswald',sans-serif", fontSize: 'clamp(22px,5vw,32px)',
          color: '#fff', fontWeight: 700, letterSpacing: '0.04em',
          textTransform: 'uppercase', marginBottom: 14,
        }}>
          Page Not Found
        </h1>

        <p style={{
          color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.7,
          marginBottom: 36, maxWidth: 400, margin: '0 auto 36px',
        }}>
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on the road.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg,#e30613,#bf040f)',
              color: '#fff', textDecoration: 'none', padding: '13px 28px',
              borderRadius: 10, fontFamily: "'Oswald',sans-serif", fontWeight: 700,
              fontSize: 14, letterSpacing: '0.07em', textTransform: 'uppercase',
            }}>
            <i className="fas fa-house" style={{ fontSize: 12 }} /> Go Home
          </Link>
          <Link to="/services"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.8)', textDecoration: 'none', padding: '13px 28px',
              borderRadius: 10, fontFamily: "'Oswald',sans-serif", fontWeight: 700,
              fontSize: 14, letterSpacing: '0.07em', textTransform: 'uppercase',
            }}>
            <i className="fas fa-wrench" style={{ fontSize: 12 }} /> Our Services
          </Link>
          <Link to="/contacts"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.8)', textDecoration: 'none', padding: '13px 28px',
              borderRadius: 10, fontFamily: "'Oswald',sans-serif", fontWeight: 700,
              fontSize: 14, letterSpacing: '0.07em', textTransform: 'uppercase',
            }}>
            <i className="fas fa-phone" style={{ fontSize: 12 }} /> Contact Us
          </Link>
        </div>

        {/* Phone number */}
        <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, marginBottom: 6 }}>
            Need immediate help?
          </p>
          <a href="tel:+14156347777"
            style={{ color: '#e30613', fontSize: 22, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.05em', textDecoration: 'none' }}>
            (415) 634-7777
          </a>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, marginTop: 4 }}>Available 24/7</p>
        </div>

      </div>
    </div>
  );
}
