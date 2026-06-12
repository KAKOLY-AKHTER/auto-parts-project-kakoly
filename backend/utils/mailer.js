const nodemailer = require('nodemailer');
const dns        = require('dns');
const net        = require('net');

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);
if (typeof net.setDefaultAutoSelectFamily === 'function') {
  net.setDefaultAutoSelectFamily(false);
}

function ipv4Lookup(hostname, _opts, cb) {
  dns.resolve4(hostname, (err, addresses) => {
    if (err) return cb(err);
    cb(null, addresses[0], 4);
  });
}

function makeTransport() {
  return nodemailer.createTransport({
    host:       'smtp.gmail.com',
    port:       587,
    secure:     false,
    requireTLS: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
    tls:               { rejectUnauthorized: false },
    lookup:            ipv4Lookup,
    connectionTimeout: 30000,
    greetingTimeout:   15000,
    socketTimeout:     30000,
  });
}

function guard() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.log('[MAIL] skipped — no credentials');
    return false;
  }
  return true;
}

async function sendBookingConfirmation({ to, name, service, date, time, refId }) {
  if (!guard()) return;
  console.log(`[MAIL] booking → ${to}`);
  const fmtDate = date
    ? new Date(date).toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })
    : date;
  const t = makeTransport();
  try {
    await t.sendMail({
      from:    `"24HR Fremont Tire & Auto" <${process.env.GMAIL_USER}>`,
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
    console.log(`[MAIL] booking sent OK → ${to}`);
  } finally {
    t.close();
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
  const t = makeTransport();
  try {
    await t.sendMail({
      from:    `"24HR Fremont Tire & Auto" <${process.env.GMAIL_USER}>`,
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
    console.log(`[MAIL] order sent OK → ${to}`);
  } finally {
    t.close();
  }
}

async function sendContactNotification({ name, email, phone, subject, message }) {
  if (!guard()) return;
  console.log(`[MAIL] contact → ${email}`);
  const t = makeTransport();
  try {
    await t.sendMail({
      from:    `"24HR Fremont Tire & Auto" <${process.env.GMAIL_USER}>`,
      to:      process.env.GMAIL_USER,
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
    await t.sendMail({
      from:    `"24HR Fremont Tire & Auto" <${process.env.GMAIL_USER}>`,
      to:      email,
      subject: `We received your message — 24HR Fremont Tire & Auto`,
      html: `
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
    console.log(`[MAIL] contact sent OK → ${email}`);
  } finally {
    t.close();
  }
}

module.exports = { sendBookingConfirmation, sendOrderConfirmation, sendContactNotification };
