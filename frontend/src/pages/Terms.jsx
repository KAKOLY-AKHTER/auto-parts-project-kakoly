export default function Terms() {
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
          <i className="fas fa-file-contract" style={{ color: '#e30613', fontSize: 12 }} />
          <span style={{ color: '#e30613', fontSize: 11, fontWeight: 700, fontFamily: "'Oswald',sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' }}>Legal</span>
        </div>
        <h1 style={{
          fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(36px,6vw,56px)',
          color: '#fff', letterSpacing: '0.04em', marginBottom: 14,
        }}>Terms of Service</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
          Last updated: {LAST_UPDATED}
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px 80px' }}>

        <div style={{
          background: 'rgba(227,6,19,0.06)', border: '1px solid rgba(227,6,19,0.2)',
          borderRadius: 12, padding: '16px 20px', marginBottom: 40,
          color: 'rgba(255,255,255,0.65)', fontSize: 13, lineHeight: 1.7,
        }}>
          <i className="fas fa-circle-exclamation" style={{ color: '#e30613', marginRight: 8 }} />
          By accessing or using the website and services of 24HR Fremont Tire &amp; Auto, you agree to be bound by these Terms of Service. Please read them carefully.
        </div>

        <Section title="1. Acceptance of Terms">
          <P>By using our website, booking a service, or placing an order, you agree to these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services.</P>
          <P>We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes your acceptance of the updated terms.</P>
        </Section>

        <Section title="2. Services">
          <P>24HR Fremont Tire &amp; Auto provides automotive services including tire service and repair, oil changes, brake repair, wheel alignment, battery replacement, A/C evaluation, roadside assistance, and mobile service, as well as an online shop for auto parts and accessories.</P>
          <P>Service availability, pricing, and estimated times may vary. We reserve the right to refuse service or cancel appointments at our discretion.</P>
        </Section>

        <Section title="3. Appointments and Bookings">
          <Ul items={[
            'Booking requests are subject to availability and confirmation by our team.',
            'We will contact you to confirm your appointment after submission.',
            'You may reschedule or cancel an appointment through your dashboard at any time before the service date.',
            'We reserve the right to reschedule appointments due to operational needs with reasonable notice.',
            'No-shows or late cancellations (less than 2 hours before appointment) may be subject to a cancellation fee.',
          ]} />
        </Section>

        <Section title="4. Online Shop — Orders and Payment">
          <P>By placing an order through our online shop, you agree that:</P>
          <Ul items={[
            'All prices are listed in USD and are subject to change without notice.',
            'You provide accurate billing and shipping information.',
            'Payment is due at the time of order placement.',
            'We reserve the right to cancel orders due to stock unavailability, pricing errors, or suspected fraud.',
            'Orders confirmed via email are binding.',
          ]} />
        </Section>

        <Section title="5. Shipping and Delivery">
          <P>Shipping times are estimates and are not guaranteed. We are not responsible for delays caused by carriers, weather, customs, or other factors outside our control. Risk of loss passes to you upon delivery to the carrier.</P>
        </Section>

        <Section title="6. Returns and Refunds">
          <P>Products may be returned within 30 days of purchase in original, unused condition. Please refer to our <a href="/return-policy" style={{ color: '#e30613', textDecoration: 'none' }}>Return Policy</a> page for full details. Installed parts and special-order items are non-refundable unless defective.</P>
          <P>Service fees are non-refundable once the service has been performed. If you are unsatisfied with our service, please contact us within 5 days and we will work to resolve the issue.</P>
        </Section>

        <Section title="7. User Accounts">
          <P>You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to notify us immediately of any unauthorized use of your account.</P>
          <P>We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.</P>
        </Section>

        <Section title="8. Loyalty Rewards Program">
          <Ul items={[
            'Points are earned on eligible services and purchases.',
            'Points have no cash value and cannot be transferred.',
            'We reserve the right to modify, suspend, or discontinue the rewards program at any time.',
            'Points may expire after 12 months of account inactivity.',
            'Fraudulent accumulation of points will result in account termination.',
          ]} />
        </Section>

        <Section title="9. Limitation of Liability">
          <P>To the maximum extent permitted by law, 24HR Fremont Tire &amp; Auto shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services or website.</P>
          <P>Our liability for any direct damages shall not exceed the amount you paid for the specific service or product giving rise to the claim.</P>
        </Section>

        <Section title="10. Warranty Disclaimer">
          <P>Services are provided "as is." While we stand behind our work and use quality parts, we make no additional warranties, express or implied, beyond what is required by applicable law. Parts and labor warranties will be communicated at the time of service.</P>
        </Section>

        <Section title="11. Intellectual Property">
          <P>All content on our website, including text, images, logos, and graphics, is owned by or licensed to 24HR Fremont Tire &amp; Auto and is protected by copyright law. You may not reproduce, distribute, or use our content without written permission.</P>
        </Section>

        <Section title="12. Governing Law">
          <P>These Terms of Service are governed by the laws of the State of California, without regard to conflict of law provisions. Any disputes shall be resolved in the courts of Alameda County, California.</P>
        </Section>

        <Section title="13. Contact Us">
          <P>For questions about these Terms of Service:</P>
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12, padding: '20px 24px', marginTop: 8,
          }}>
            <div style={{ color: '#fff', fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 10 }}>
              24HR Fremont Tire &amp; Auto
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>
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
