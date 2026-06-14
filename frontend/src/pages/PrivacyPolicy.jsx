export default function PrivacyPolicy() {
  const LAST_UPDATED = 'June 14, 2026';

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{
        fontFamily: "'Oswald',sans-serif", fontSize: 20, fontWeight: 700,
        color: '#fff', letterSpacing: '0.04em', textTransform: 'uppercase',
        marginBottom: 14, paddingBottom: 10,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>{title}</h2>
      <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, lineHeight: 1.85 }}>
        {children}
      </div>
    </div>
  );

  const P = ({ children }) => <p style={{ marginBottom: 12 }}>{children}</p>;
  const Ul = ({ items }) => (
    <ul style={{ paddingLeft: 22, marginBottom: 12 }}>
      {items.map((it, i) => <li key={i} style={{ marginBottom: 6 }}>{it}</li>)}
    </ul>
  );

  return (
    <div style={{ background: '#080810', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg,#040810,#0c1220)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '120px 20px 60px',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(227,6,19,0.1)', border: '1px solid rgba(227,6,19,0.25)',
          borderRadius: 99, padding: '6px 18px', marginBottom: 20,
        }}>
          <i className="fas fa-shield-halved" style={{ color: '#e30613', fontSize: 12 }} />
          <span style={{ color: '#e30613', fontSize: 11, fontWeight: 700, fontFamily: "'Oswald',sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' }}>Legal</span>
        </div>
        <h1 style={{
          fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(36px,6vw,56px)',
          color: '#fff', letterSpacing: '0.04em', marginBottom: 14,
        }}>Privacy Policy</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
          Last updated: {LAST_UPDATED}
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px 80px' }}>

        <div style={{
          background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)',
          borderRadius: 12, padding: '16px 20px', marginBottom: 40,
          color: 'rgba(255,255,255,0.65)', fontSize: 13, lineHeight: 1.7,
        }}>
          <i className="fas fa-circle-info" style={{ color: '#60a5fa', marginRight: 8 }} />
          This Privacy Policy describes how 24HR Fremont Tire &amp; Auto ("we", "us", or "our") collects, uses, and protects your personal information when you use our website and services.
        </div>

        <Section title="1. Information We Collect">
          <P>We collect information you provide directly to us, such as when you:</P>
          <Ul items={[
            'Create an account or log in',
            'Book a service appointment',
            'Place an order in our shop',
            'Submit a contact or quote request',
            'Sign up for our rewards program',
          ]} />
          <P>The types of information we collect include: your name, email address, phone number, vehicle information, billing and shipping address, and payment information (processed securely through our payment partners — we do not store card numbers).</P>
          <P>We also automatically collect certain technical data including IP address, browser type, pages visited, and time spent on our site through cookies and similar technologies.</P>
        </Section>

        <Section title="2. How We Use Your Information">
          <P>We use the information we collect to:</P>
          <Ul items={[
            'Process and confirm your service bookings and product orders',
            'Send confirmation and status update emails',
            'Provide customer support and respond to your inquiries',
            'Manage your account and loyalty rewards',
            'Improve our website, services, and customer experience',
            'Send promotional communications (only with your consent)',
            'Comply with legal obligations',
          ]} />
        </Section>

        <Section title="3. How We Share Your Information">
          <P>We do not sell, rent, or trade your personal information to third parties. We may share your information only in the following circumstances:</P>
          <Ul items={[
            'With service providers who assist us in operating our website and services (e.g., email delivery, payment processing)',
            'When required by law, court order, or government authority',
            'To protect the rights, property, or safety of our business, customers, or the public',
            'With your explicit consent',
          ]} />
        </Section>

        <Section title="4. Cookies">
          <P>We use cookies and similar tracking technologies to improve your browsing experience, remember your preferences, and analyze site traffic. You can control cookies through your browser settings. Disabling cookies may affect some features of our site.</P>
        </Section>

        <Section title="5. Data Security">
          <P>We take reasonable technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of internet transmission or electronic storage is 100% secure.</P>
        </Section>

        <Section title="6. Data Retention">
          <P>We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. Account data is kept for the duration of your account's existence.</P>
        </Section>

        <Section title="7. Your Rights">
          <P>You have the right to:</P>
          <Ul items={[
            'Access the personal information we hold about you',
            'Request correction of inaccurate data',
            'Request deletion of your data (subject to legal obligations)',
            'Opt out of marketing communications at any time',
            'Lodge a complaint with a data protection authority',
          ]} />
          <P>To exercise any of these rights, please contact us at <span style={{ color: '#e30613' }}>support@24hrfremontauto.com</span> or call <span style={{ color: '#e30613' }}>(415) 634-7777</span>.</P>
        </Section>

        <Section title="8. Third-Party Links">
          <P>Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.</P>
        </Section>

        <Section title="9. Children's Privacy">
          <P>Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.</P>
        </Section>

        <Section title="10. Changes to This Policy">
          <P>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date. Your continued use of our services after any changes constitutes acceptance of the updated policy.</P>
        </Section>

        <Section title="11. Contact Us">
          <P>If you have any questions about this Privacy Policy, please contact us:</P>
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12, padding: '20px 24px', marginTop: 8,
          }}>
            <div style={{ color: '#fff', fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 10 }}>
              24HR Fremont Tire &amp; Auto
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span><i className="fas fa-location-dot" style={{ color: '#e30613', marginRight: 10, width: 14 }} />Fremont, CA</span>
              <a href="tel:+14156347777" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
                <i className="fas fa-phone" style={{ color: '#e30613', marginRight: 10, width: 14 }} />(415) 634-7777
              </a>
              <a href="mailto:support@24hrfremontauto.com" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
                <i className="fas fa-envelope" style={{ color: '#e30613', marginRight: 10, width: 14 }} />support@24hrfremontauto.com
              </a>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}
