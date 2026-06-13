import { useState } from "react";
import API from "../../config";

export default function AdminLogin({ onLogin }) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [err,      setErr]      = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      const res  = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      if (data.user?.role !== "admin") throw new Error("Admin access only");
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser",  JSON.stringify(data.user));
      onLogin(data.user, data.token);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight:"100vh", background:"#07050f",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontFamily:"'Inter',sans-serif", padding:20,
    }}>
      <div style={{ width:"100%", maxWidth:400 }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:8 }}>
            <div style={{ width:40, height:40, borderRadius:10, background:"#e30613", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <i className="fas fa-wrench" style={{ color:"#fff", fontSize:18 }} />
            </div>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:20, fontWeight:700, color:"#fff", letterSpacing:"0.06em", textTransform:"uppercase" }}>
              Fremont Admin
            </div>
          </div>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:13 }}>Sign in to manage your business</p>
        </div>

        {/* Card */}
        <div style={{
          background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)",
          borderRadius:16, padding:"32px 28px", borderTop:"3px solid #e30613",
          backdropFilter:"blur(20px)",
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom:16 }}>
              <label style={{ display:"block", color:"rgba(255,255,255,0.7)", fontSize:11, fontWeight:600, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:6 }}>Email Address</label>
              <div style={{ position:"relative" }}>
                <i className="fas fa-envelope" style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.35)", fontSize:13, pointerEvents:"none" }} />
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@example.com" required
                  style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1.5px solid rgba(255,255,255,0.1)", borderRadius:9, outline:"none", color:"#fff", fontSize:14, fontFamily:"'Inter',sans-serif", padding:"11px 12px 11px 36px", boxSizing:"border-box" }} />
              </div>
            </div>

            <div style={{ marginBottom:22 }}>
              <label style={{ display:"block", color:"rgba(255,255,255,0.7)", fontSize:11, fontWeight:600, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:6 }}>Password</label>
              <div style={{ position:"relative" }}>
                <i className="fas fa-lock" style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.35)", fontSize:13, pointerEvents:"none" }} />
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required
                  style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1.5px solid rgba(255,255,255,0.1)", borderRadius:9, outline:"none", color:"#fff", fontSize:14, fontFamily:"'Inter',sans-serif", padding:"11px 12px 11px 36px", boxSizing:"border-box" }} />
              </div>
            </div>

            {err && (
              <div style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:8, padding:"10px 14px", color:"#f87171", fontSize:13, marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
                <i className="fas fa-circle-exclamation" /> {err}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              width:"100%", background:"linear-gradient(135deg,#e30613,#bf040f)",
              border:"none", color:"#fff", borderRadius:9, padding:"13px",
              fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:15,
              letterSpacing:"0.1em", textTransform:"uppercase", cursor: loading?"not-allowed":"pointer",
              boxShadow:"0 6px 24px rgba(227,6,19,0.45)", opacity: loading?0.7:1,
              display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            }}>
              {loading ? <><i className="fas fa-spinner fa-spin" /> Signing in…</> : <><i className="fas fa-right-to-bracket" /> Sign In</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
