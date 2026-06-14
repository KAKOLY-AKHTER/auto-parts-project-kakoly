const { Resend } = require('resend');

function getClient() {
  return new Resend(process.env.RESEND_API_KEY);
}

function fromAddr() {
  return process.env.FROM_EMAIL || 'onboarding@resend.dev';
}

function guard() {
  if (!process.env.RESEND_API_KEY) {
    console.log('[MAIL] skipped — no RESEND_API_KEY');
    return false;
  }
  return true;
}

async function sendBookingConfirmation({ to, name, service, date, time, refId }) {
  if (!guard()) return;
  console.log(`[MAIL] booking → ${to}`);
  const fmtDate = date
    ? new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : date;
  try {
    const { error } = await getClient().emails.send({
      from:    fromAddr(),
      to,
      subject: `Booking Confirmed — ${service}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0f0f17;color:#fff;border-radius:12px;overflow:hidden">
          <div style="background:#e30613;padding:28px 32px">
            <h1 style="margin:0;font-size:28px;letter-spacing:0.05em">24HR FREMONT TIRE & AUTO</h1>
            <p style="margin:6px 0 0;opacity:0.85;font-size:14px">Booking Confirmation</p>
          </div>
          <div style="padding:32px">
            <p style="font-size:16px">Hi <strong>${name}</strong>,</p>
            <p style="color:rgba(255,255,255,0.7)">Your service appointment has been received. Here are your details:</p>
            <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:20px;margin:20px 0">
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="color:rgba(255,255,255,0.5);padding:6px 0;font-size:13px">Service</td><td style="color:#fff;font-weight:700;font-size:14px">${service}</td></tr>
                <tr><td style="color:rgba(255,255,255,0.5);padding:6px 0;font-size:13px">Date</td><td style="color:#fff;font-size:14px">${fmtDate}</td></tr>
                <tr><td style="color:rgba(255,255,255,0.5);padding:6px 0;font-size:13px">Time</td><td style="color:#fff;font-size:14px">${time}</td></tr>
                <tr><td style="color:rgba(255,255,255,0.5);padding:6px 0;font-size:13px">Reference</td><td style="color:#e30613;font-weight:700;font-size:13px">${refId}</td></tr>
              </table>
            </div>
            <p style="color:rgba(255,255,255,0.55);font-size:13px">Need to reschedule? Log in to your dashboard at any time.</p>
            <p style="color:rgba(255,255,255,0.55);font-size:13px">Questions? Call us: <strong style="color:#fff">(415) 634-7777</strong></p>
          </div>
          <div style="background:rgba(255,255,255,0.04);padding:16px 32px;font-size:12px;color:rgba(255,255,255,0.3);text-align:center">
            24HR Fremont Tire & Auto · Fremont, CA · Available 24/7
          </div>
        </div>
      `,
    });
    if (error) throw new Error(error.message);
    console.log(`[MAIL] booking sent OK → ${to}`);
  } catch (err) {
    console.error('[EMAIL ERROR]', err.message);
  }
}

async function sendOrderConfirmation({ to, name, orderId, items, total }) {
  if (!guard()) return;
  console.log(`[MAIL] order → ${to}`);
  const itemRows = items.map(i =>
    `<tr>
      <td style="padding:6px 0;color:#fff;font-size:13px">${i.name}</td>
      <td style="padding:6px 0;color:rgba(255,255,255,0.6);font-size:13px">×${i.qty}</td>
      <td style="padding:6px 0;color:#fff;font-size:13px;text-align:right">$${(i.price * i.qty).toFixed(2)}</td>
    </tr>`
  ).join('');
  try {
    const { error } = await getClient().emails.send({
      from:    fromAddr(),
      to,
      subject: `Order Confirmed — #${orderId}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0f0f17;color:#fff;border-radius:12px;overflow:hidden">
          <div style="background:#e30613;padding:28px 32px">
            <h1 style="margin:0;font-size:28px;letter-spacing:0.05em">24HR FREMONT TIRE & AUTO</h1>
            <p style="margin:6px 0 0;opacity:0.85;font-size:14px">Order Confirmation</p>
          </div>
          <div style="padding:32px">
            <p style="font-size:16px">Hi <strong>${name}</strong>, thank you for your order!</p>
            <p style="color:rgba(255,255,255,0.5);font-size:12px">Order #${orderId}</p>
            <table style="width:100%;border-collapse:collapse;margin:16px 0">${itemRows}</table>
            <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:12px;text-align:right">
              <strong style="color:#e30613;font-size:18px">Total: $${total.toFixed(2)}</strong>
            </div>
            <p style="color:rgba(255,255,255,0.55);font-size:13px;margin-top:20px">Track your order in the dashboard. We'll notify you when it ships.</p>
          </div>
        </div>
      `,
    });
    if (error) throw new Error(error.message);
    console.log(`[MAIL] order sent OK → ${to}`);
  } catch (err) {
    console.error('[EMAIL ERROR]', err.message);
  }
}

async function sendContactNotification({ name, email, phone, subject, message }) {
  if (!guard()) return;
  console.log(`[MAIL] contact → ${email}`);
  try {
    const { error: e1 } = await getClient().emails.send({
      from:    fromAddr(),
      to:      process.env.NOTIFY_EMAIL || process.env.FROM_EMAIL || 'onboarding@resend.dev',
      subject: `New Contact Message: ${subject || '(no subject)'} — from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0f0f17;color:#fff;border-radius:12px;overflow:hidden">
          <div style="background:#e30613;padding:24px 32px">
            <h1 style="margin:0;font-size:22px;letter-spacing:0.05em">NEW CONTACT MESSAGE</h1>
            <p style="margin:6px 0 0;opacity:0.85;font-size:13px">24HR Fremont Tire & Auto — Contact Form</p>
          </div>
          <div style="padding:32px">
            <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:20px;margin-bottom:20px">
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="color:rgba(255,255,255,0.5);padding:6px 0;font-size:13px;width:90px">Name</td><td style="color:#fff;font-weight:700;font-size:14px">${name}</td></tr>
                <tr><td style="color:rgba(255,255,255,0.5);padding:6px 0;font-size:13px">Email</td><td style="color:#e30613;font-size:14px">${email}</td></tr>
                ${phone ? `<tr><td style="color:rgba(255,255,255,0.5);padding:6px 0;font-size:13px">Phone</td><td style="color:#fff;font-size:14px">${phone}</td></tr>` : ''}
                <tr><td style="color:rgba(255,255,255,0.5);padding:6px 0;font-size:13px">Subject</td><td style="color:#fff;font-size:14px">${subject || '—'}</td></tr>
              </table>
            </div>
            <div style="background:rgba(255,255,255,0.04);border-left:3px solid #e30613;padding:16px 20px;border-radius:0 8px 8px 0">
              <div style="color:rgba(255,255,255,0.5);font-size:11px;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px">Message</div>
              <p style="margin:0;color:#fff;font-size:14px;line-height:1.7">${message}</p>
            </div>
          </div>
        </div>
      `,
    });
    if (e1) throw new Error(e1.message);

    const isServiceRequest = subject && subject.length < 80 && !message.toLowerCase().startsWith('hi ');
    const { error: e2 } = await getClient().emails.send({
      from:    fromAddr(),
      to:      email,
      subject: isServiceRequest
        ? `Service Request Received — ${subject} | 24HR Fremont`
        : `We received your message — 24HR Fremont Tire & Auto`,
      html: isServiceRequest ? `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0f0f17;color:#fff;border-radius:12px;overflow:hidden">
          <div style="background:#e30613;padding:28px 32px">
            <h1 style="margin:0;font-size:26px;letter-spacing:0.05em">24HR FREMONT TIRE & AUTO</h1>
            <p style="margin:6px 0 0;opacity:0.85;font-size:14px">Service Request Received</p>
          </div>
          <div style="padding:32px">
            <p style="font-size:17px;margin-bottom:6px">Hi <strong>${name}</strong>,</p>
            <p style="color:rgba(255,255,255,0.7);line-height:1.7;margin-top:0">
              Your service request has been received. Our team will call you back <strong style="color:#fff">within 2 hours</strong>.
            </p>
            <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:10px;padding:20px;margin:20px 0">
              <table style="width:100%;border-collapse:collapse">
                <tr>
                  <td style="color:rgba(255,255,255,0.5);padding:8px 0;font-size:13px;width:110px">Service</td>
                  <td style="color:#e30613;font-weight:700;font-size:15px">${subject}</td>
                </tr>
                <tr>
                  <td style="color:rgba(255,255,255,0.5);padding:8px 0;font-size:13px">Call back to</td>
                  <td style="color:#fff;font-weight:700;font-size:15px">${phone}</td>
                </tr>
                <tr>
                  <td style="color:rgba(255,255,255,0.5);padding:8px 0;font-size:13px">Name</td>
                  <td style="color:#fff;font-size:14px">${name}</td>
                </tr>
              </table>
            </div>
            <div style="background:rgba(227,6,19,0.08);border:1px solid rgba(227,6,19,0.25);border-radius:8px;padding:14px 18px;margin-bottom:20px">
              <p style="margin:0;color:rgba(255,255,255,0.8);font-size:13px;line-height:1.6">
                📞 Our technician will call <strong style="color:#fff">${phone}</strong> to confirm your appointment and provide a free estimate.
              </p>
            </div>
            <p style="color:rgba(255,255,255,0.55);font-size:13px">Need immediate help? Call us: <strong style="color:#fff">(415) 634-7777</strong></p>
          </div>
          <div style="background:rgba(255,255,255,0.04);padding:16px 32px;font-size:12px;color:rgba(255,255,255,0.3);text-align:center">
            24HR Fremont Tire & Auto · Fremont, CA · Available 24/7
          </div>
        </div>
      ` : `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0f0f17;color:#fff;border-radius:12px;overflow:hidden">
          <div style="background:#e30613;padding:28px 32px">
            <h1 style="margin:0;font-size:28px;letter-spacing:0.05em">24HR FREMONT TIRE & AUTO</h1>
            <p style="margin:6px 0 0;opacity:0.85;font-size:14px">Message Received</p>
          </div>
          <div style="padding:32px">
            <p style="font-size:16px">Hi <strong>${name}</strong>,</p>
            <p style="color:rgba(255,255,255,0.7);line-height:1.7">
              Thank you for reaching out! We've received your message and our team will get back to you <strong style="color:#fff">within 2 hours</strong>.
            </p>
            <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:16px 20px;margin:20px 0">
              <div style="color:rgba(255,255,255,0.5);font-size:11px;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px">Your message</div>
              <p style="margin:0;color:rgba(255,255,255,0.8);font-size:13px;line-height:1.65">${message}</p>
            </div>
            <p style="color:rgba(255,255,255,0.55);font-size:13px">Need immediate help? Call us: <strong style="color:#fff">(415) 634-7777</strong></p>
          </div>
          <div style="background:rgba(255,255,255,0.04);padding:16px 32px;font-size:12px;color:rgba(255,255,255,0.3);text-align:center">
            24HR Fremont Tire & Auto · Fremont, CA · Available 24/7
          </div>
        </div>
      `,
    });
    if (e2) throw new Error(e2.message);
    console.log(`[MAIL] contact sent OK → ${email}`);
  } catch (err) {
    console.error('[EMAIL ERROR]', err.message);
  }
}

async function sendOrderStatusUpdate({ to, name, orderId, status }) {
  if (!guard()) return;
  const statusMap = {
    pending:    { label:"Pending",    color:"#eab308", icon:"⏳", msg:"Your order is pending and will be processed soon." },
    processing: { label:"Processing", color:"#3b82f6", icon:"⚙️", msg:"Your order is being processed and will ship shortly." },
    shipped:    { label:"Shipped",    color:"#a78bfa", icon:"🚚", msg:"Your order is on the way! You'll receive it soon." },
    delivered:  { label:"Delivered",  color:"#22c55e", icon:"✅", msg:"Your order has been delivered. Thank you for shopping with us!" },
    cancelled:  { label:"Cancelled",  color:"#ef4444", icon:"❌", msg:"Your order has been cancelled. Contact us if you have questions." },
  };
  const s = statusMap[status] || statusMap.pending;
  console.log(`[MAIL] order status update → ${to}`);
  try {
    const { error } = await getClient().emails.send({
      from:    fromAddr(),
      to,
      subject: `Order ${s.label} — #${orderId} | 24HR Fremont`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0f0f17;color:#fff;border-radius:12px;overflow:hidden">
          <div style="background:#e30613;padding:28px 32px">
            <h1 style="margin:0;font-size:26px;letter-spacing:0.05em">24HR FREMONT TIRE & AUTO</h1>
            <p style="margin:6px 0 0;opacity:0.85;font-size:14px">Order Status Update</p>
          </div>
          <div style="padding:32px">
            <p style="font-size:16px">Hi <strong>${name}</strong>,</p>
            <p style="color:rgba(255,255,255,0.7)">Your order status has been updated:</p>
            <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:24px;margin:20px 0;text-align:center">
              <div style="font-size:36px;margin-bottom:10px">${s.icon}</div>
              <div style="color:${s.color};font-size:22px;font-weight:700;letter-spacing:0.05em">${s.label.toUpperCase()}</div>
              <div style="color:rgba(255,255,255,0.4);font-size:12px;margin-top:4px">Order #${orderId}</div>
            </div>
            <p style="color:rgba(255,255,255,0.7);line-height:1.7">${s.msg}</p>
            <p style="color:rgba(255,255,255,0.45);font-size:13px;margin-top:20px">Questions? Call us: <strong style="color:#fff">(415) 634-7777</strong></p>
          </div>
          <div style="background:rgba(255,255,255,0.04);padding:16px 32px;font-size:12px;color:rgba(255,255,255,0.3);text-align:center">
            24HR Fremont Tire & Auto · Fremont, CA · Available 24/7
          </div>
        </div>
      `,
    });
    if (error) throw new Error(error.message);
    console.log(`[MAIL] order status sent OK → ${to}`);
  } catch (err) {
    console.error('[EMAIL ERROR]', err.message);
  }
}

async function sendBookingStatusUpdate({ to, name, service, date, time, status, refId }) {
  if (!guard()) return;
  const fmtDate = date
    ? new Date(date).toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })
    : date;
  const statusMap = {
    confirmed:  { label:'Confirmed',  color:'#3b82f6', icon:'✅', msg:'Your booking has been confirmed by our team. We look forward to seeing you!' },
    completed:  { label:'Completed',  color:'#22c55e', icon:'🎉', msg:'Your service has been completed. Thank you for choosing 24HR Fremont Tire & Auto!' },
    cancelled:  { label:'Cancelled',  color:'#ef4444', icon:'❌', msg:'Your booking has been cancelled. Please contact us if you have any questions.' },
    pending:    { label:'Pending',    color:'#eab308', icon:'⏳', msg:'Your booking is awaiting confirmation. Our team will reach out shortly.' },
  };
  const s = statusMap[status] || statusMap.pending;
  console.log(`[MAIL] booking status update → ${to}`);
  try {
    const { error } = await getClient().emails.send({
      from:    fromAddr(),
      to,
      subject: `Booking ${s.label} — ${service} | 24HR Fremont`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0f0f17;color:#fff;border-radius:12px;overflow:hidden">
          <div style="background:#e30613;padding:28px 32px">
            <h1 style="margin:0;font-size:28px;letter-spacing:0.05em">24HR FREMONT TIRE & AUTO</h1>
            <p style="margin:6px 0 0;opacity:0.85;font-size:14px">Booking Status Update</p>
          </div>
          <div style="padding:32px">
            <p style="font-size:16px">Hi <strong>${name}</strong>,</p>
            <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:24px;margin:20px 0;text-align:center">
              <div style="font-size:36px;margin-bottom:10px">${s.icon}</div>
              <div style="color:${s.color};font-size:22px;font-weight:700;letter-spacing:0.05em">${s.label.toUpperCase()}</div>
              <div style="color:rgba(255,255,255,0.4);font-size:12px;margin-top:4px">Ref: ${refId}</div>
            </div>
            <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:20px;margin:20px 0">
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="color:rgba(255,255,255,0.5);padding:6px 0;font-size:13px">Service</td><td style="color:#fff;font-weight:700;font-size:14px">${service}</td></tr>
                ${fmtDate ? `<tr><td style="color:rgba(255,255,255,0.5);padding:6px 0;font-size:13px">Date</td><td style="color:#fff;font-size:14px">${fmtDate}</td></tr>` : ''}
                ${time ? `<tr><td style="color:rgba(255,255,255,0.5);padding:6px 0;font-size:13px">Time</td><td style="color:#fff;font-size:14px">${time}</td></tr>` : ''}
              </table>
            </div>
            <p style="color:rgba(255,255,255,0.7);line-height:1.7">${s.msg}</p>
            <p style="color:rgba(255,255,255,0.55);font-size:13px">Questions? Call us: <strong style="color:#fff">(415) 634-7777</strong></p>
          </div>
          <div style="background:rgba(255,255,255,0.04);padding:16px 32px;font-size:12px;color:rgba(255,255,255,0.3);text-align:center">
            24HR Fremont Tire & Auto · Fremont, CA · Available 24/7
          </div>
        </div>
      `,
    });
    if (error) throw new Error(error.message);
    console.log(`[MAIL] booking status sent OK → ${to}`);
  } catch (err) {
    console.error('[EMAIL ERROR]', err.message);
  }
}

async function sendNewsletterConfirmation({ email }) {
  if (!guard()) return;
  console.log(`[MAIL] newsletter → ${email}`);
  try {
    const { error } = await getClient().emails.send({
      from:    fromAddr(),
      to:      email,
      subject: 'You\'re subscribed — 24HR Fremont Tire & Auto',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0f0f17;color:#fff;border-radius:12px;overflow:hidden">
          <div style="background:#e30613;padding:28px 32px">
            <h1 style="margin:0;font-size:28px;letter-spacing:0.05em">24HR FREMONT TIRE & AUTO</h1>
            <p style="margin:6px 0 0;opacity:0.85;font-size:14px">Newsletter Subscription Confirmed</p>
          </div>
          <div style="padding:32px">
            <p style="font-size:17px;margin-bottom:6px">Welcome aboard! 🎉</p>
            <p style="color:rgba(255,255,255,0.7);line-height:1.75;margin-top:0">
              You've been added to our monthly newsletter. Expect expert tire & oil tips, maintenance reminders, and exclusive Bay Area deals — straight to your inbox.
            </p>
            <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:20px 24px;margin:24px 0">
              <p style="margin:0 0 10px;color:rgba(255,255,255,0.5);font-size:11px;letter-spacing:0.08em;text-transform:uppercase">What you'll receive</p>
              <ul style="margin:0;padding-left:18px;color:rgba(255,255,255,0.75);font-size:14px;line-height:2">
                <li>Monthly maintenance tips</li>
                <li>Exclusive subscriber discounts</li>
                <li>Seasonal vehicle care reminders</li>
                <li>New service & product announcements</li>
              </ul>
            </div>
            <p style="color:rgba(255,255,255,0.45);font-size:12px">You can unsubscribe at any time by replying to this email with "unsubscribe".</p>
            <p style="color:rgba(255,255,255,0.55);font-size:13px">Questions? Call us: <strong style="color:#fff">(415) 634-7777</strong></p>
          </div>
          <div style="background:rgba(255,255,255,0.04);padding:16px 32px;font-size:12px;color:rgba(255,255,255,0.3);text-align:center">
            24HR Fremont Tire & Auto · Fremont, CA · Available 24/7
          </div>
        </div>
      `,
    });
    if (error) throw new Error(error.message);
    console.log(`[MAIL] newsletter sent OK → ${email}`);
  } catch (err) {
    console.error('[EMAIL ERROR]', err.message);
  }
}

module.exports = { sendBookingConfirmation, sendOrderConfirmation, sendContactNotification, sendOrderStatusUpdate, sendBookingStatusUpdate, sendNewsletterConfirmation };
