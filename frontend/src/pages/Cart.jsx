import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useCart } from '../context/CartContext';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import API from '../config';

const FALLBACK = { taxRate: 0.0875, shippingCost: 9.99, shippingThreshold: 99, referralDiscount: 0.10 };

const STRIPE_PK  = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const PAYPAL_CID = import.meta.env.VITE_PAYPAL_CLIENT_ID;
const stripeIsConfigured = STRIPE_PK  && !STRIPE_PK.includes('REPLACE');
const paypalIsConfigured = PAYPAL_CID && !PAYPAL_CID.includes('REPLACE');
const stripePromise = stripeIsConfigured ? loadStripe(STRIPE_PK) : null;

/* ─── Stripe inner payment form ─────────────────────────────── */
function StripePayForm({ total, orderData, onSuccess, onError }) {
  const stripe   = useStripe();
  const elements = useElements();
  const [paying, setPaying]     = useState(false);
  const [cardErr, setCardErr]   = useState('');

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setCardErr(''); setPaying(true);
    try {
      const res = await fetch(`${API}/payment/create-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(total * 100) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) throw new Error(result.error.message);

      // Payment succeeded — save the order
      const orderRes = await fetch(`${API}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...orderData, paymentStatus: 'paid', paymentId: result.paymentIntent.id }),
      });
      if (!orderRes.ok) throw new Error('Order save failed.');
      const order = await orderRes.json();
      onSuccess(order);
    } catch (err) {
      setCardErr(err.message || 'Payment failed. Please try again.');
      onError();
    } finally {
      setPaying(false);
    }
  };

  return (
    <form onSubmit={handlePay} className="space-y-4">
      <div className="border border-gray-200 rounded-xl px-4 py-4 bg-gray-50">
        <CardElement options={{
          style: {
            base: { fontSize: '15px', color: '#1f2937', '::placeholder': { color: '#9ca3af' }, fontFamily: 'system-ui, sans-serif' },
            invalid: { color: '#dc2626' },
          },
          hidePostalCode: false,
        }} />
      </div>

      {cardErr && (
        <div className="text-red-500 text-[13px] bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          {cardErr}
        </div>
      )}

      <button type="submit" disabled={paying || !stripe}
        className="w-full py-4 rounded-xl text-white font-black text-[14px] tracking-wider uppercase border-none cursor-pointer transition-all"
        style={{ background: paying ? '#fca5a5' : '#dc2626', boxShadow: paying ? 'none' : '0 6px 24px rgba(220,38,38,0.35)' }}>
        {paying ? 'Processing Payment…' : `Pay $${total.toFixed(2)} Now`}
      </button>

      <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
          <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
        </svg>
        Secured by Stripe · 256-bit encryption
      </div>
    </form>
  );
}

/* ─── Main Cart component ────────────────────────────────────── */
export default function Cart() {
  const { items, removeItem, updateQty, clearCart, count, subtotal } = useCart();

  const [settings,    setSettings]    = useState(FALLBACK);
  const [hasDiscount, setHasDiscount] = useState(false);

  const shipping    = subtotal >= settings.shippingThreshold ? 0 : settings.shippingCost;
  const tax         = subtotal * settings.taxRate;
  const discountAmt = hasDiscount ? parseFloat((subtotal * settings.referralDiscount).toFixed(2)) : 0;
  const total       = subtotal + shipping + tax - discountAmt;

  const [form, setForm]         = useState({ name:'', email:'', phone:'', address:'' });
  const [step, setStep]         = useState('form'); // 'form' | 'payment'
  const [placing,  setPlacing]  = useState(false);
  const [success,  setSuccess]  = useState(null);
  const [error,    setError]    = useState('');

  const checkDiscount = useCallback((email) => {
    if (!email) return;
    fetch(`${API}/referrals/discount?email=${encodeURIComponent(email)}`)
      .then(r => r.json())
      .then(d => setHasDiscount(!!d.hasDiscount))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch(`${API}/settings`).then(r => r.json()).then(d => setSettings({ ...FALLBACK, ...d })).catch(() => {});
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        setForm(f => ({ ...f, name: f.name || u.displayName || '', email: f.email || u.email || '' }));
        checkDiscount(u.email);
      }
    });
    return () => unsub();
  }, [checkDiscount]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const orderData = {
    userEmail: form.email.toLowerCase(),
    userName:  form.name,
    items:     items.map(i => ({ id:i.id, name:i.name, price:i.price, qty:i.qty, img:i.img, catLabel:i.catLabel })),
    subtotal:  parseFloat(subtotal.toFixed(2)),
    shipping:  parseFloat(shipping.toFixed(2)),
    tax:       parseFloat(tax.toFixed(2)),
    discount:  discountAmt,
    total:     parseFloat(total.toFixed(2)),
    address:   form.address,
    phone:     form.phone,
  };

  // Called when form is submitted
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) { setError('Please fill in name, email, and address.'); return; }
    if (items.length === 0) { setError('Your cart is empty.'); return; }
    setError('');
    if (stripeIsConfigured) {
      setStep('payment');
    } else {
      // No Stripe — place order directly (cash / pay at store)
      placeCODOrder();
    }
  };

  const placeCODOrder = async () => {
    setPlacing(true);
    try {
      const res = await fetch(`${API}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...orderData, paymentStatus: 'pending' }),
      });
      if (!res.ok) throw new Error();
      const order = await res.json();
      if (hasDiscount) {
        fetch(`${API}/referrals/redeem`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ referredEmail: form.email.toLowerCase() }),
        }).catch(() => {});
      }
      clearCart();
      setSuccess(order);
    } catch {
      setError('Could not place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  const handlePaymentSuccess = (order) => {
    if (hasDiscount) {
      fetch(`${API}/referrals/redeem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referredEmail: form.email.toLowerCase() }),
      }).catch(() => {});
    }
    clearCart();
    setSuccess(order);
  };

  /* ── ORDER SUCCESS ── */
  if (success) return (
    <main>
      <section className="relative overflow-hidden pt-36 md:pt-48 lg:pt-52 pb-20"
        style={{ background: "linear-gradient(135deg,#050d18 0%,#0a1628 50%,#0d1f35 100%)" }}>
        <div className="absolute top-0 inset-x-0 h-0.75" style={{ background: "linear-gradient(90deg,#dc2626,#f87171,#dc2626)" }} />
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <h1 className="text-white font-black text-4xl md:text-5xl tracking-tight">Order Confirmed!</h1>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="max-w-lg mx-auto px-5 text-center">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 border-4 border-green-200">
            <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" className="w-11 h-11">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h2 className="text-gray-900 font-black text-3xl mb-3">Thank You, {success.userName || 'Customer'}!</h2>
          <p className="text-gray-500 text-[15px] leading-relaxed mb-2">
            {success.paymentStatus === 'paid'
              ? 'Payment received. Your order is confirmed!'
              : 'Your order has been placed. Please pay on delivery.'}
          </p>
          <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-5 py-2 mb-8">
            <span className="text-gray-500 text-[12px] font-semibold">Order ID:</span>
            <span className="text-gray-800 font-black text-[12px] tracking-wider">{success._id?.slice(-10).toUpperCase()}</span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-left mb-8">
            <div className="font-black text-gray-700 text-[12px] tracking-widest uppercase mb-4">Order Summary</div>
            {success.items?.map(i => (
              <div key={i.id} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                <div>
                  <div className="text-gray-800 font-semibold text-[13px]">{i.name}</div>
                  <div className="text-gray-400 text-[11px]">Qty: {i.qty}</div>
                </div>
                <div className="text-gray-900 font-black text-[14px]">${(i.price * i.qty).toFixed(2)}</div>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-1.5">
              <div className="flex justify-between text-[13px] text-gray-500"><span>Subtotal</span><span>${success.subtotal?.toFixed(2)}</span></div>
              <div className="flex justify-between text-[13px] text-gray-500"><span>Shipping</span><span>{success.shipping === 0 ? 'FREE' : `$${success.shipping?.toFixed(2)}`}</span></div>
              <div className="flex justify-between text-[13px] text-gray-500"><span>Tax</span><span>${success.tax?.toFixed(2)}</span></div>
              <div className="flex justify-between text-[16px] font-black text-gray-900 pt-1.5 border-t border-gray-200"><span>Total</span><span className="text-red-600">${success.total?.toFixed(2)}</span></div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/dashboard"
              className="no-underline px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-[13px] rounded-xl transition-colors text-center"
              style={{ boxShadow: "0 4px 18px rgba(220,38,38,0.3)" }}>
              Track in Dashboard
            </Link>
            <Link to="/shop"
              className="no-underline px-7 py-3.5 text-gray-600 font-bold text-[13px] rounded-xl transition-colors border border-gray-200 bg-white hover:bg-gray-50 text-center">
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </main>
  );

  /* ── EMPTY CART ── */
  if (items.length === 0) return (
    <main>
      <section className="relative overflow-hidden pt-36 md:pt-48 lg:pt-52 pb-16"
        style={{ background: "linear-gradient(135deg,#050d18 0%,#0a1628 50%,#0d1f35 100%)" }}>
        <div className="absolute top-0 inset-x-0 h-0.75" style={{ background: "linear-gradient(90deg,#dc2626,#f87171,#dc2626)" }} />
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="flex items-center gap-2 text-[12px] mb-6">
            <Link to="/" className="text-slate-400 hover:text-red-400 no-underline">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">Cart</span>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-white font-black text-4xl md:text-5xl tracking-tight">Shopping Cart</h1>
            <span className="px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-[13px] font-bold">0 items</span>
          </div>
        </div>
      </section>
      <section className="py-24 bg-gray-50">
        <div className="max-w-md mx-auto px-5 text-center">
          <div className="w-28 h-28 rounded-3xl bg-white shadow-md flex items-center justify-center mx-auto mb-8 border border-gray-100">
            <svg viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.2" strokeLinecap="round" className="w-12 h-12">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.98-1.67L23 6H6"/>
            </svg>
          </div>
          <h2 className="text-gray-900 font-black text-3xl mb-3">Your cart is empty</h2>
          <p className="text-gray-400 text-[15px] leading-relaxed mb-8">
            Browse our shop to find tires, oil, and auto parts.
          </p>
          <Link to="/shop"
            className="no-underline px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-[13px] rounded-xl transition-colors"
            style={{ boxShadow: "0 4px 18px rgba(220,38,38,0.3)" }}>
            Browse Products
          </Link>
        </div>
      </section>
    </main>
  );

  /* ── CART WITH ITEMS ── */
  return (
    <main>
      <section className="relative overflow-hidden pt-36 md:pt-48 lg:pt-52 pb-16"
        style={{ background: "linear-gradient(135deg,#050d18 0%,#0a1628 50%,#0d1f35 100%)" }}>
        <div className="absolute top-0 inset-x-0 h-0.75" style={{ background: "linear-gradient(90deg,#dc2626,#f87171,#dc2626)" }} />
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="flex items-center gap-2 text-[12px] mb-6">
            <Link to="/" className="text-slate-400 hover:text-red-400 no-underline">Home</Link>
            <span className="text-slate-600">/</span>
            <Link to="/shop" className="text-slate-400 hover:text-red-400 no-underline">Shop</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">Cart</span>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-white font-black text-4xl md:text-5xl tracking-tight">Shopping Cart</h1>
            <span className="px-3 py-1 rounded-full text-white text-[13px] font-bold" style={{ background: '#dc2626' }}>{count} item{count !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ── CART ITEMS ── */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <div className="font-black text-gray-700 text-[12px] tracking-widest uppercase">Your Items</div>
                  <button onClick={clearCart}
                    className="text-[11px] text-gray-400 hover:text-red-500 font-semibold border-none bg-transparent cursor-pointer transition-colors">
                    Clear All
                  </button>
                </div>

                {items.map((item, idx) => (
                  <div key={item.id} className="flex items-center gap-4 px-6 py-5"
                    style={{ borderBottom: idx < items.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <div className="w-20 h-20 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden">
                      <img src={item.img} alt={item.name}
                        className="max-h-full max-w-full object-contain p-2"
                        onError={e => e.target.style.display='none'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-red-600 text-[9.5px] font-black tracking-[2px] uppercase mb-0.5">{item.catLabel}</div>
                      <div className="text-gray-900 font-bold text-[14px] leading-snug mb-2">{item.name}</div>
                      <div className="text-[11px] text-gray-400 font-medium">${item.price.toFixed(2)} each</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 font-black text-[16px] cursor-pointer transition-all flex items-center justify-center leading-none">
                        −
                      </button>
                      <span className="w-8 text-center font-black text-gray-900 text-[14px]">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 font-black text-[16px] cursor-pointer transition-all flex items-center justify-center leading-none">
                        +
                      </button>
                    </div>
                    <div className="text-right shrink-0 min-w-[72px]">
                      <div className="text-gray-900 font-black text-[16px]">${(item.price * item.qty).toFixed(2)}</div>
                      <button onClick={() => removeItem(item.id)}
                        className="text-[11px] text-gray-300 hover:text-red-500 border-none bg-transparent cursor-pointer mt-1 transition-colors font-semibold">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/shop"
                className="no-underline mt-4 inline-flex items-center gap-2 text-[13px] text-gray-400 hover:text-red-500 font-semibold transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5"><polyline points="15 18 9 12 15 6"/></svg>
                Continue Shopping
              </Link>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="lg:w-[400px] shrink-0">

              {/* Order Summary */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
                <div className="font-black text-gray-700 text-[12px] tracking-widest uppercase mb-5">Order Summary</div>
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-[14px] text-gray-500">
                    <span>Subtotal ({count} items)</span>
                    <span className="font-semibold text-gray-700">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[14px] text-gray-500">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600 font-bold" : "font-semibold text-gray-700"}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-[14px] text-gray-500">
                    <span>Tax ({(settings.taxRate * 100).toFixed(2)}%)</span>
                    <span className="font-semibold text-gray-700">${tax.toFixed(2)}</span>
                  </div>
                  {hasDiscount && (
                    <div className="flex justify-between text-[14px] text-green-600 bg-green-50 rounded-lg px-3 py-2">
                      <span className="font-bold">Referral Discount (10%)</span>
                      <span className="font-bold">−${discountAmt.toFixed(2)}</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-gray-900 font-black text-[16px]">Total</span>
                  <span className="text-red-600 font-black text-[22px]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout / Payment */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

                {/* Step indicator */}
                {stripeIsConfigured && (
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black transition-colors ${step === 'form' ? 'bg-red-600 text-white' : 'bg-green-500 text-white'}`}>
                        {step === 'form' ? '1' : '✓'}
                      </div>
                      <span className="text-[12px] font-bold text-gray-600">Details</span>
                    </div>
                    <div className="flex-1 h-px bg-gray-200" />
                    <div className="flex items-center gap-1.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black transition-colors ${step === 'payment' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                        2
                      </div>
                      <span className="text-[12px] font-bold text-gray-600">Payment</span>
                    </div>
                  </div>
                )}

                {step === 'form' && (
                  <>
                    <div className="font-black text-gray-700 text-[12px] tracking-widest uppercase mb-5">Checkout Details</div>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      {[
                        { key:'name',    label:'Full Name',        placeholder:'Your full name',           type:'text'  },
                        { key:'email',   label:'Email Address',    placeholder:'your@email.com',           type:'email' },
                        { key:'phone',   label:'Phone (optional)', placeholder:'(415) 000-0000',           type:'tel'   },
                        { key:'address', label:'Delivery Address', placeholder:'Street, City, State, ZIP', type:'text'  },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="block text-[11px] font-black text-gray-500 tracking-[0.08em] uppercase mb-1.5">{f.label}</label>
                          <input
                            type={f.type}
                            value={form[f.key]}
                            onChange={e => set(f.key, e.target.value)}
                            onBlur={f.key === 'email' ? e => checkDiscount(e.target.value) : undefined}
                            placeholder={f.placeholder}
                            required={f.key !== 'phone'}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-50 transition-all placeholder-gray-300"
                          />
                        </div>
                      ))}

                      {error && (
                        <div className="text-red-500 text-[13px] bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                          {error}
                        </div>
                      )}

                      <button type="submit" disabled={placing}
                        className="w-full py-4 rounded-xl text-white font-black text-[14px] tracking-wider uppercase border-none cursor-pointer transition-all"
                        style={{ background: placing ? '#fca5a5' : '#dc2626', boxShadow: placing ? 'none' : '0 6px 24px rgba(220,38,38,0.35)' }}>
                        {placing
                          ? 'Placing Order…'
                          : stripeIsConfigured
                            ? `Proceed to Payment — $${total.toFixed(2)}`
                            : hasDiscount
                              ? `Place Order — $${total.toFixed(2)} (10% off!)`
                              : `Place Order — $${total.toFixed(2)}`}
                      </button>

                      {!stripeIsConfigured && (
                        <div className="flex items-center justify-center gap-2 text-[11px] text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 shrink-0">
                            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                          </svg>
                          Pay on Delivery — card payments coming soon
                        </div>
                      )}

                      {stripeIsConfigured && (
                        <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 pt-1">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                          </svg>
                          Secure checkout · 30-day returns
                        </div>
                      )}
                    </form>
                  </>
                )}

                {step === 'payment' && (stripeIsConfigured || paypalIsConfigured) && (
                  <>
                    <div className="flex items-center justify-between mb-5">
                      <div className="font-black text-gray-700 text-[12px] tracking-widest uppercase">Payment</div>
                      <button onClick={() => setStep('form')}
                        className="text-[11px] text-gray-400 hover:text-red-500 font-semibold border-none bg-transparent cursor-pointer transition-colors">
                        ← Edit Details
                      </button>
                    </div>

                    {/* PayPal */}
                    {paypalIsConfigured && (
                      <div className="mb-5">
                        <PayPalScriptProvider options={{ clientId: PAYPAL_CID, currency: 'USD' }}>
                          <PayPalButtons
                            style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal', height: 48 }}
                            createOrder={async () => {
                              const res = await fetch(`${API}/payment/paypal/create-order`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ amount: total }),
                              });
                              const data = await res.json();
                              if (!res.ok) throw new Error(data.message);
                              return data.orderID;
                            }}
                            onApprove={async (data) => {
                              const res = await fetch(`${API}/payment/paypal/capture-order`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ orderID: data.orderID }),
                              });
                              const capture = await res.json();
                              if (!res.ok) throw new Error(capture.message);
                              const orderRes = await fetch(`${API}/orders`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ ...orderData, paymentStatus: 'paid', paymentId: capture.id, paymentMethod: 'paypal' }),
                              });
                              if (!orderRes.ok) throw new Error('Order save failed.');
                              handlePaymentSuccess(await orderRes.json());
                            }}
                            onError={(err) => console.error('PayPal error:', err)}
                          />
                        </PayPalScriptProvider>
                      </div>
                    )}

                    {/* Divider */}
                    {paypalIsConfigured && stripeIsConfigured && (
                      <div className="flex items-center gap-3 mb-5">
                        <div className="flex-1 h-px bg-gray-100" />
                        <span className="text-[11px] text-gray-400 font-semibold">or pay with card</span>
                        <div className="flex-1 h-px bg-gray-100" />
                      </div>
                    )}

                    {/* Stripe card */}
                    {stripeIsConfigured && (
                      <>
                        <div className="flex items-center gap-2 mb-4">
                          {['VISA', 'MC', 'AMEX', 'DISC'].map(c => (
                            <span key={c} className="px-2.5 py-1 rounded border border-gray-200 text-[10px] font-black text-gray-500 bg-gray-50">{c}</span>
                          ))}
                        </div>
                        <Elements stripe={stripePromise}>
                          <StripePayForm
                            total={total}
                            orderData={orderData}
                            onSuccess={handlePaymentSuccess}
                            onError={() => {}}
                          />
                        </Elements>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
