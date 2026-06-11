import { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const friendly = (msg) =>
  msg.includes('user-not-found') || msg.includes('wrong-password') || msg.includes('invalid-credential')
    ? 'Invalid email or password.'
    : msg.includes('too-many-requests')
    ? 'Too many attempts. Please wait and try again.'
    : msg.replace('Firebase: ', '').replace(/\s*\(auth\/.*?\)\.?/, '');

const BoltIcon    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const ShieldIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const ClockIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const CheckIcon   = () => <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0 opacity-75"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>;
const ErrorIcon   = () => <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0 opacity-75"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>;

export default function Login() {
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPw, setShowPw]       = useState(false);
  const [loading, setLoading]     = useState(false);
  const [gLoading, setGLoading]   = useState(false);
  const [error, setError]         = useState('');
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try { await signInWithEmailAndPassword(auth, email, password); navigate('/'); }
    catch (err) { setError(friendly(err.message)); }
    finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    setGLoading(true); setError('');
    try { await signInWithPopup(auth, new GoogleAuthProvider()); navigate('/'); }
    catch (err) { setError(friendly(err.message)); }
    finally { setGLoading(false); }
  };

  const handleReset = async () => {
    if (!email) { setError('Enter your email address first.'); return; }
    try { await sendPasswordResetEmail(auth, email); setResetSent(true); setError(''); }
    catch (err) { setError(friendly(err.message)); }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter','Segoe UI',system-ui,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        .fi { width:100%; height:50px; padding:0 44px 0 16px; border:1.5px solid #e2e8f0; border-radius:10px; font-size:14px; color:#0f172a; background:#fff; outline:none; transition:border-color .2s,box-shadow .2s; }
        .fi::placeholder { color:#94a3b8; }
        .fi:focus { border-color:#dc2626; box-shadow:0 0 0 3px rgba(220,38,38,0.08); }
      `}</style>

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex w-[44%] xl:w-[42%] shrink-0 relative flex-col overflow-hidden"
        style={{ background: "linear-gradient(150deg,#07101c 0%,#0d1a2d 50%,#060e1a 100%)" }}>

        {/* Decorative bg */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[3px]"
            style={{ background: "linear-gradient(90deg,#dc2626,#f87171,#dc2626)" }} />
          <div className="absolute -top-48 -right-48 w-[560px] h-[560px] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(220,38,38,0.09) 0%,transparent 65%)" }} />
          <div className="absolute -bottom-32 -left-32 w-[440px] h-[440px] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(59,130,246,0.07) 0%,transparent 65%)" }} />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
          {/* Abstract tire rings */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[55%] w-[420px] h-[420px] rounded-full opacity-[0.04]"
            style={{ border: "52px solid #fff" }} />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[55%] w-[260px] h-[260px] rounded-full opacity-[0.05]"
            style={{ border: "36px solid #fff" }} />
        </div>

        {/* Logo */}
        <div className="relative z-10 px-10 xl:px-12 pt-10 xl:pt-12">
          <a href="/" className="inline-flex items-center gap-3 no-underline group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "#dc2626", boxShadow: "0 4px 18px rgba(220,38,38,0.4)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
                <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/>
                <line x1="12" y1="2.5" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="21.5"/>
                <line x1="2.5" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="21.5" y2="12"/>
              </svg>
            </div>
            <div>
              <span className="text-white font-bold text-[16px] block leading-none tracking-tight">TireOil</span>
              <span className="text-white/30 text-[10px] tracking-[3px] uppercase">Fremont, CA</span>
            </div>
          </a>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-10 xl:px-14 pb-8">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full mb-8"
            style={{ background: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.22)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-[11px] font-semibold tracking-wider uppercase">Open Now · 7 Days</span>
          </div>

          {/* Heading */}
          <h2 style={{ fontSize: "clamp(34px,3vw,50px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#fff" }}
            className="mb-5">
            Your Trusted<br />Auto Care<br />
            <span style={{ color: "#dc2626" }}>Partner.</span>
          </h2>
          <p className="text-white/40 text-[13.5px] leading-relaxed mb-10 max-w-[300px]">
            Sign in to manage appointments, view service history, and unlock member-only pricing.
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3 mb-10">
            {[
              { val: "50K+", lbl: "Customers" },
              { val: "4.9★", lbl: "Rating" },
              { val: "24/7", lbl: "Support" },
            ].map(({ val, lbl }) => (
              <div key={lbl} className="rounded-xl py-4 text-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="text-white font-bold text-[20px] leading-none mb-1">{val}</div>
                <div className="text-white/30 text-[10px] tracking-widest uppercase">{lbl}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-3">
            {[
              { Icon: BoltIcon,   text: "Same-day tire & oil service" },
              { Icon: ShieldIcon, text: "Licensed & insured technicians" },
              { Icon: ClockIcon,  text: "Open every day of the week" },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-red-400"
                  style={{ background: "rgba(220,38,38,0.1)" }}>
                  <Icon />
                </div>
                <span className="text-white/45 text-[13px]">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 px-10 xl:px-14 pb-8">
          <p className="text-white/15 text-[11px]">© 2024 TireOil Auto Care · Fremont, CA</p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex flex-col" style={{ background: "#f1f5f9" }}>

        {/* Mobile bar */}
        <div className="lg:hidden flex items-center justify-between px-5 py-4 bg-white border-b border-gray-100">
          <a href="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" className="w-4 h-4">
                <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/>
              </svg>
            </div>
            <span className="font-bold text-[15px] text-gray-900">TireOil</span>
          </a>
          <Link to="/signup" className="no-underline text-[13px] font-semibold text-red-600 hover:text-red-700">
            Sign up →
          </Link>
        </div>

        {/* Form wrapper */}
        <div className="flex-1 flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-[440px]">

            {/* Card */}
            <div className="bg-white rounded-2xl p-8 sm:p-10"
              style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.04)" }}>

              <div className="mb-7">
                <h1 className="text-[28px] font-bold text-gray-900 tracking-tight mb-1.5">
                  Welcome back
                </h1>
                <p className="text-[14px] text-gray-400">
                  No account yet?{' '}
                  <Link to="/signup" className="no-underline font-semibold text-red-600 hover:text-red-700">
                    Create one free
                  </Link>
                </p>
              </div>

              {/* Alerts */}
              {error && (
                <div className="flex gap-2.5 items-start bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 mb-5 text-[13px]">
                  <ErrorIcon />
                  <span>{error}</span>
                </div>
              )}
              {resetSent && (
                <div className="flex gap-2.5 items-start bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl px-4 py-3 mb-5 text-[13px]">
                  <CheckIcon />
                  <span>Password reset email sent. Check your inbox.</span>
                </div>
              )}

              {/* Google */}
              <button onClick={handleGoogle} disabled={gLoading || loading}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-[14px] font-medium text-gray-700 transition-all duration-200 mb-5 disabled:opacity-55"
                style={{ height: 50, boxShadow: "0 1px 3px rgba(0,0,0,0.07)" }}>
                {gLoading
                  ? <svg className="w-5 h-5 animate-spin text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" strokeLinecap="round"/></svg>
                  : <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                }
                Continue with Google
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-[12px] text-gray-300 font-medium select-none">or sign in with email</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">Email address</label>
                  <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(''); }} required
                    placeholder="you@example.com" autoComplete="email" className="fi" style={{ paddingRight: 16 }} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[13px] font-semibold text-gray-700">Password</label>
                    <button type="button" onClick={handleReset}
                      className="text-[12px] text-gray-400 hover:text-red-600 font-medium transition-colors bg-transparent border-none cursor-pointer p-0">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input type={showPw ? "text" : "password"} value={password}
                      onChange={e => { setPassword(e.target.value); setError(''); }} required
                      placeholder="Enter your password" autoComplete="current-password" className="fi" />
                    <button type="button" onClick={() => setShowPw(v => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors bg-transparent border-none cursor-pointer p-0">
                      {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading || gLoading}
                  className="w-full rounded-xl text-white text-[14px] font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ height: 50, background: "#dc2626", boxShadow: "0 2px 14px rgba(220,38,38,0.28)" }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = "#b91c1c"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(220,38,38,0.35)"; } }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#dc2626"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 14px rgba(220,38,38,0.28)"; }}>
                  {loading
                    ? <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" strokeLinecap="round"/></svg>Signing in…</>
                    : "Sign In"}
                </button>
              </form>

              <p className="text-center text-[11.5px] text-gray-300 mt-6 leading-relaxed">
                By continuing you agree to our{' '}
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-2">Terms</a>
                {' '}&{' '}
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-2">Privacy Policy</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
