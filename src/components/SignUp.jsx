import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const friendly = (msg) =>
  msg.includes('email-already-in-use') ? 'An account with this email already exists.'
  : msg.includes('invalid-email') ? 'Please enter a valid email address.'
  : msg.replace('Firebase: ', '').replace(/\s*\(auth\/.*?\)\.?/, '');

const WrenchIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>;
const TagIcon     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>;
const HistoryIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>;
const StarIcon    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const ErrorIcon   = () => <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0 opacity-75"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>;

function StrengthBar({ password }) {
  if (!password) return null;
  const has = (re) => re.test(password);
  const score =
    password.length >= 10 && has(/[A-Z]/) && has(/[0-9]/) && has(/[^A-Za-z0-9]/) ? 4
    : password.length >= 8 && has(/[A-Z]/) && has(/[0-9]/) ? 3
    : password.length >= 6 ? 2 : 1;
  const [color, label] = score >= 4 ? ['#16a34a','Strong'] : score === 3 ? ['#16a34a','Good'] : score === 2 ? ['#f97316','Fair'] : ['#ef4444','Weak'];
  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[1,2,3,4].map(i => (
          <div key={i} className="flex-1 rounded-full transition-all duration-300"
            style={{ height: 3, background: i <= score ? color : '#e2e8f0' }} />
        ))}
      </div>
      <span className="text-[11px] font-medium" style={{ color }}>{label} password</span>
    </div>
  );
}

export default function SignUp() {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [showCpw, setShowCpw]   = useState(false);
  const [agreed, setAgreed]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [gLoading, setGLoading] = useState(false);
  const [error, setError]       = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm)  { setError("Passwords don't match."); return; }
    if (password.length < 6)   { setError("Password must be at least 6 characters."); return; }
    if (!agreed)               { setError("Please accept the Terms of Service to continue."); return; }
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name.trim()) await updateProfile(cred.user, { displayName: name.trim() });
      navigate('/');
    } catch (err) { setError(friendly(err.message)); }
    finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    setGLoading(true); setError('');
    try { await signInWithPopup(auth, new GoogleAuthProvider()); navigate('/'); }
    catch (err) { setError(friendly(err.message)); }
    finally { setGLoading(false); }
  };

  const confirmOk = confirm && confirm === password;
  const confirmBad = confirm && confirm !== password;

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter','Segoe UI',system-ui,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        .si { width:100%; height:50px; padding:0 44px 0 16px; border:1.5px solid #e2e8f0; border-radius:10px; font-size:14px; color:#0f172a; background:#fff; outline:none; transition:border-color .2s,box-shadow .2s; }
        .si::placeholder { color:#94a3b8; }
        .si:focus { border-color:#dc2626; box-shadow:0 0 0 3px rgba(220,38,38,0.08); }
        .si.ok  { border-color:#16a34a; box-shadow:0 0 0 3px rgba(22,163,74,0.07); }
        .si.bad { border-color:#ef4444; box-shadow:0 0 0 3px rgba(239,68,68,0.07); }
      `}</style>

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex w-[44%] xl:w-[42%] shrink-0 relative flex-col overflow-hidden"
        style={{ background: "linear-gradient(150deg,#07101c 0%,#0d1a2d 50%,#060e1a 100%)" }}>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[3px]"
            style={{ background: "linear-gradient(90deg,#dc2626,#f87171,#dc2626)" }} />
          <div className="absolute -top-48 -left-48 w-[560px] h-[560px] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(220,38,38,0.09) 0%,transparent 65%)" }} />
          <div className="absolute -bottom-32 -right-32 w-[440px] h-[440px] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(59,130,246,0.07) 0%,transparent 65%)" }} />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[55%] w-[420px] h-[420px] rounded-full opacity-[0.04]"
            style={{ border: "52px solid #fff" }} />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[55%] w-[260px] h-[260px] rounded-full opacity-[0.05]"
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

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-10 xl:px-14 pb-8">

          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full mb-8"
            style={{ background: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.22)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-[11px] font-semibold tracking-wider uppercase">Join Free · No Credit Card</span>
          </div>

          <h2 style={{ fontSize: "clamp(34px,3vw,50px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#fff" }}
            className="mb-5">
            Start Your<br />Auto Care<br />
            <span style={{ color: "#dc2626" }}>Journey.</span>
          </h2>
          <p className="text-white/40 text-[13.5px] leading-relaxed mb-10 max-w-[300px]">
            Create a free account and unlock exclusive deals, faster booking, and your full service history.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-10">
            {[
              { val: "Free", lbl: "Sign Up" },
              { val: "4.9★", lbl: "Rating" },
              { val: "50K+", lbl: "Members" },
            ].map(({ val, lbl }) => (
              <div key={lbl} className="rounded-xl py-4 text-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="text-white font-bold text-[18px] leading-none mb-1">{val}</div>
                <div className="text-white/30 text-[10px] tracking-widest uppercase">{lbl}</div>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            {[
              { Icon: WrenchIcon,  text: "Free vehicle inspection every visit" },
              { Icon: TagIcon,     text: "Member-only pricing & discounts" },
              { Icon: HistoryIcon, text: "Digital service history, always saved" },
              { Icon: StarIcon,    text: "Priority booking — skip the queue" },
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
          <Link to="/login" className="no-underline text-[13px] font-semibold text-gray-500 hover:text-gray-700">
            Sign in →
          </Link>
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-[440px]">

            <div className="bg-white rounded-2xl p-8 sm:p-10"
              style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.04)" }}>

              <div className="mb-7">
                <h1 className="text-[28px] font-bold text-gray-900 tracking-tight mb-1.5">
                  Create your account
                </h1>
                <p className="text-[14px] text-gray-400">
                  Already a member?{' '}
                  <Link to="/login" className="no-underline font-semibold text-red-600 hover:text-red-700">
                    Sign in
                  </Link>
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="flex gap-2.5 items-start bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 mb-5 text-[13px]">
                  <ErrorIcon />
                  <span>{error}</span>
                </div>
              )}

              {/* Google */}
              <button onClick={handleGoogle} disabled={loading || gLoading}
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
                Sign up with Google
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-[12px] text-gray-300 font-medium select-none">or sign up with email</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name */}
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">Full Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)}
                    placeholder="John Doe" autoComplete="name"
                    className="si" style={{ paddingRight: 16 }} />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                    Email address <span className="text-red-500 font-normal">*</span>
                  </label>
                  <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(''); }} required
                    placeholder="you@example.com" autoComplete="email"
                    className="si" style={{ paddingRight: 16 }} />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                    Password <span className="text-red-500 font-normal">*</span>
                  </label>
                  <div className="relative">
                    <input type={showPw ? "text" : "password"} value={password}
                      onChange={e => { setPassword(e.target.value); setError(''); }} required
                      placeholder="Min. 6 characters" autoComplete="new-password" className="si" />
                    <button type="button" onClick={() => setShowPw(v => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors bg-transparent border-none cursor-pointer p-0">
                      {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <StrengthBar password={password} />
                </div>

                {/* Confirm */}
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                    Confirm Password <span className="text-red-500 font-normal">*</span>
                  </label>
                  <div className="relative">
                    <input type={showCpw ? "text" : "password"} value={confirm}
                      onChange={e => { setConfirm(e.target.value); setError(''); }} required
                      placeholder="Re-enter password" autoComplete="new-password"
                      className={`si ${confirmOk ? 'ok' : confirmBad ? 'bad' : ''}`} />
                    <button type="button" onClick={() => setShowCpw(v => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors bg-transparent border-none cursor-pointer p-0">
                      {showCpw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {confirmOk && (
                      <div className="absolute right-10 top-1/2 -translate-y-1/2 text-emerald-500">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-3.5 h-3.5"><polyline points="14 4 6 12 2 8"/></svg>
                      </div>
                    )}
                  </div>
                  {confirmBad && (
                    <p className="text-[11.5px] text-red-500 mt-1.5">Passwords don't match</p>
                  )}
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 cursor-pointer pt-1 select-none">
                  <button type="button" onClick={() => setAgreed(v => !v)}
                    className="shrink-0 mt-0.5 rounded-md border-2 flex items-center justify-center transition-all duration-150 p-0 bg-transparent cursor-pointer"
                    style={{
                      width: 20, height: 20,
                      background: agreed ? "#dc2626" : "white",
                      borderColor: agreed ? "#dc2626" : "#d1d5db",
                    }}>
                    {agreed && <svg viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2.5" className="w-3 h-3"><polyline points="12 3 5.5 10 2 7"/></svg>}
                  </button>
                  <span className="text-[13px] text-gray-500 leading-snug">
                    I agree to the{' '}
                    <a href="#" className="text-red-600 font-semibold hover:underline underline-offset-2">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-red-600 font-semibold hover:underline underline-offset-2">Privacy Policy</a>
                  </span>
                </label>

                {/* Submit */}
                <button type="submit" disabled={loading || gLoading}
                  className="w-full rounded-xl text-white text-[14px] font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
                  style={{ height: 50, background: "#dc2626", boxShadow: "0 2px 14px rgba(220,38,38,0.28)" }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = "#b91c1c"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(220,38,38,0.35)"; } }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#dc2626"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 14px rgba(220,38,38,0.28)"; }}>
                  {loading
                    ? <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" strokeLinecap="round"/></svg>Creating account…</>
                    : "Create Free Account"}
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
