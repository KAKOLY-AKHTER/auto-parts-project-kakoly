import { useState, useEffect } from "react";
import API from "../../config";

const CATS = [
  { value:"", label:"All Categories" },
  { value:"tire", label:"Tires" },
  { value:"oil", label:"Engine Oil" },
  { value:"brake", label:"Brakes" },
  { value:"battery", label:"Batteries" },
  { value:"filter", label:"Filters" },
  { value:"wheel", label:"Wheels" },
  { value:"lighting", label:"Lighting" },
  { value:"accessory", label:"Accessories" },
];

const EMPTY = { name:"", cat:"tire", catLabel:"Tires", desc:"", price:"", oldPrice:"", img:"", brand:"", stock:"100", tag:"", badge:"", isFeatured:false };

export default function AdminProducts({ token }) {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  const [catF,     setCatF]     = useState("");
  const [modal,    setModal]    = useState(null); // null | "add" | "edit"
  const [form,     setForm]     = useState(EMPTY);
  const [saving,   setSaving]   = useState(false);
  const [delId,    setDelId]    = useState(null);
  const [err,      setErr]      = useState("");

  const headers = { Authorization:`Bearer ${token}`, "Content-Type":"application/json" };

  const load = () => {
    setLoading(true);
    fetch(`${API}/products`, { headers })
      .then(r=>r.json()).then(d=>setProducts(Array.isArray(d)?d:[]))
      .catch(()=>{}).finally(()=>setLoading(false));
  };

  useEffect(load, []);

  const openAdd  = () => { setForm(EMPTY); setErr(""); setModal("add"); };
  const openEdit = (p) => {
    setForm({ name:p.name||"", cat:p.cat||"", catLabel:p.catLabel||"", desc:p.desc||"", price:p.price||"", oldPrice:p.oldPrice||"", img:p.img||"", brand:p.brand||"", stock:p.stock??100, tag:p.tag||"", badge:p.badge||"", isFeatured:!!p.isFeatured, _id:p._id });
    setErr(""); setModal("edit");
  };

  const handleSave = async () => {
    if (!form.name || !form.price) return setErr("Name and price are required");
    setSaving(true); setErr("");
    try {
      const body = { ...form, price:+form.price, oldPrice:+form.oldPrice||0, stock:+form.stock||100, tag:form.tag||null, badge:form.badge||null };
      const url  = modal==="edit" ? `${API}/products/${form._id}` : `${API}/products`;
      const method = modal==="edit" ? "PUT" : "POST";
      const res  = await fetch(url, { method, headers, body:JSON.stringify(body) });
      if (!res.ok) { const d=await res.json(); throw new Error(d.message); }
      setModal(null); load();
    } catch(e) { setErr(e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!delId) return;
    try {
      await fetch(`${API}/products/${delId}`, { method:"DELETE", headers });
      setDelId(null); load();
    } catch(e) { console.error(e); }
  };

  const filtered = products
    .filter(p => !catF || p.cat===catF)
    .filter(p => !search || p.name?.toLowerCase().includes(search.toLowerCase()) || p.brand?.toLowerCase().includes(search.toLowerCase()));

  const totalValue = products.reduce((s,p)=>s+(p.price||0)*(p.stock||0),0);

  return (
    <div>
      {/* Summary */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:10, marginBottom:22 }}>
        {[
          { label:"Total Products", value:products.length, color:"#fff" },
          { label:"In Stock",       value:products.filter(p=>(p.stock||0)>0).length, color:"#22c55e" },
          { label:"Out of Stock",   value:products.filter(p=>(p.stock||0)===0).length, color:"#f87171" },
          { label:"Featured",       value:products.filter(p=>p.isFeatured).length, color:"#a78bfa" },
          { label:"Inventory Value",value:`$${totalValue.toLocaleString()}`, color:"#e30613" },
        ].map(s=>(
          <div key={s.label} style={{ background:"#1c1933", border:"1px solid rgba(255,255,255,0.13)", borderRadius:10, padding:"12px 16px", textAlign:"center" }}>
            <div style={{ color:s.color, fontSize:s.label==="Inventory Value"?16:24, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>{s.value}</div>
            <div style={{ color:"rgba(255,255,255,0.65)", fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", fontFamily:"'Oswald',sans-serif", marginTop:2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display:"flex", gap:10, marginBottom:18, flexWrap:"wrap", alignItems:"center" }}>
        <div style={{ position:"relative", flex:"1 1 200px" }}>
          <i className="fas fa-search" style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.3)", fontSize:13, pointerEvents:"none" }} />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products…"
            style={{ width:"100%", background:"rgba(255,255,255,0.09)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:9, outline:"none", color:"#fff", fontSize:13, fontFamily:"'Inter',sans-serif", padding:"9px 12px 9px 34px", boxSizing:"border-box" }} />
        </div>
        <select value={catF} onChange={e=>setCatF(e.target.value)}
          style={{ background:"rgba(255,255,255,0.09)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:9, outline:"none", color:"rgba(255,255,255,0.7)", fontSize:13, fontFamily:"'Inter',sans-serif", padding:"9px 12px", cursor:"pointer" }}>
          {CATS.map(c=><option key={c.value} value={c.value} style={{ background:"#0d0b1a" }}>{c.label}</option>)}
        </select>
        <button onClick={openAdd}
          style={{ background:"linear-gradient(135deg,#e30613,#bf040f)", border:"none", borderRadius:9, padding:"9px 18px", color:"#fff", fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:13, letterSpacing:"0.07em", textTransform:"uppercase", cursor:"pointer", display:"flex", alignItems:"center", gap:7, whiteSpace:"nowrap" }}>
          <i className="fas fa-plus" /> Add Product
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ padding:40, textAlign:"center", color:"rgba(255,255,255,0.3)" }}><i className="fas fa-spinner fa-spin" style={{ fontSize:22 }} /></div>
      ) : filtered.length===0 ? (
        <div style={{ padding:40, textAlign:"center", color:"rgba(255,255,255,0.5)", fontFamily:"'Oswald',sans-serif", fontSize:16 }}>No products found</div>
      ) : (
        <div style={{ background:"#1c1933", border:"1px solid rgba(255,255,255,0.13)", borderRadius:14, overflow:"hidden" }}>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", minWidth:700 }}>
              <thead>
                <tr style={{ background:"#1c1933" }}>
                  {["Product","Category","Price","Stock","Featured","Actions"].map(h=>(
                    <th key={h} style={{ color:"rgba(255,255,255,0.55)", fontSize:11, fontWeight:700, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", padding:"12px 16px", textAlign:"left", whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(p=>(
                  <tr key={p._id} style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding:"12px 16px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                        {p.img ? (
                          <img src={p.img} alt={p.name} style={{ width:44, height:44, borderRadius:8, objectFit:"cover", background:"rgba(255,255,255,0.09)", border:"1px solid rgba(255,255,255,0.13)", flexShrink:0 }} onError={e=>{e.target.style.display="none";}} />
                        ) : (
                          <div style={{ width:44, height:44, borderRadius:8, background:"rgba(255,255,255,0.09)", border:"1px solid rgba(255,255,255,0.13)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                            <i className="fas fa-box" style={{ color:"rgba(255,255,255,0.2)", fontSize:16 }} />
                          </div>
                        )}
                        <div>
                          <div style={{ color:"#fff", fontSize:13, fontWeight:600 }}>{p.name}</div>
                          <div style={{ color:"rgba(255,255,255,0.55)", fontSize:11 }}>{p.brand || "—"}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding:"12px 16px" }}>
                      <span style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:6, padding:"3px 9px", color:"rgba(255,255,255,0.6)", fontSize:11, fontFamily:"'Oswald',sans-serif", textTransform:"capitalize" }}>{p.catLabel||p.cat||"—"}</span>
                    </td>
                    <td style={{ padding:"12px 16px" }}>
                      <div style={{ color:"#e30613", fontSize:14, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>${p.price?.toFixed(2)}</div>
                      {p.oldPrice>0 && <div style={{ color:"rgba(255,255,255,0.3)", fontSize:11, textDecoration:"line-through" }}>${p.oldPrice?.toFixed(2)}</div>}
                    </td>
                    <td style={{ padding:"12px 16px" }}>
                      <span style={{ color:(p.stock||0)===0?"#f87171":(p.stock||0)<10?"#eab308":"#22c55e", fontSize:13, fontWeight:600 }}>
                        {p.stock||0}
                      </span>
                    </td>
                    <td style={{ padding:"12px 16px" }}>
                      {p.isFeatured
                        ? <span style={{ color:"#a78bfa", fontSize:12 }}><i className="fas fa-star" /> Yes</span>
                        : <span style={{ color:"rgba(255,255,255,0.2)", fontSize:12 }}>—</span>}
                    </td>
                    <td style={{ padding:"12px 16px" }}>
                      <div style={{ display:"flex", gap:6 }}>
                        <button onClick={()=>openEdit(p)}
                          style={{ background:"rgba(59,130,246,0.12)", border:"1px solid rgba(59,130,246,0.3)", borderRadius:7, padding:"6px 12px", color:"#60a5fa", fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"'Oswald',sans-serif" }}>
                          <i className="fas fa-pen" /> Edit
                        </button>
                        <button onClick={()=>setDelId(p._id)}
                          style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:7, padding:"6px 12px", color:"#f87171", fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"'Oswald',sans-serif" }}>
                          <i className="fas fa-trash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }} onClick={e=>{if(e.target===e.currentTarget)setModal(null);}}>
          <div style={{ background:"#0d0b1a", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:"28px 26px", width:"100%", maxWidth:"min(560px,95vw)", maxHeight:"90vh", overflowY:"auto", borderTop:"3px solid #e30613" }}>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:18, color:"#fff", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:22 }}>
              <i className="fas fa-box" style={{ color:"#e30613", marginRight:8 }} />
              {modal==="add" ? "Add New Product" : "Edit Product"}
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:14 }}>
              {/* Name */}
              <div style={{ gridColumn:"1/-1" }}>
                <label style={LBL}>Product Name *</label>
                <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Michelin All-Season Tire" style={INP} />
              </div>
              {/* Brand */}
              <div>
                <label style={LBL}>Brand</label>
                <input value={form.brand} onChange={e=>setForm(f=>({...f,brand:e.target.value}))} placeholder="e.g. Michelin" style={INP} />
              </div>
              {/* Category */}
              <div>
                <label style={LBL}>Category</label>
                <select value={form.cat} onChange={e=>{
                  const found = CATS.find(c=>c.value===e.target.value);
                  setForm(f=>({...f, cat:e.target.value, catLabel:found?.label||e.target.value}));
                }} style={{...INP, cursor:"pointer"}}>
                  {CATS.filter(c=>c.value).map(c=><option key={c.value} value={c.value} style={{ background:"#0d0b1a" }}>{c.label}</option>)}
                </select>
              </div>
              {/* Price */}
              <div>
                <label style={LBL}>Price ($) *</label>
                <input type="number" value={form.price} onChange={e=>setForm(f=>({...f,price:e.target.value}))} placeholder="0.00" min="0" step="0.01" style={INP} />
              </div>
              {/* Old Price */}
              <div>
                <label style={LBL}>Old Price ($)</label>
                <input type="number" value={form.oldPrice} onChange={e=>setForm(f=>({...f,oldPrice:e.target.value}))} placeholder="0.00" min="0" step="0.01" style={INP} />
              </div>
              {/* Stock */}
              <div>
                <label style={LBL}>Stock</label>
                <input type="number" value={form.stock} onChange={e=>setForm(f=>({...f,stock:e.target.value}))} placeholder="100" min="0" style={INP} />
              </div>
              {/* Tag */}
              <div>
                <label style={LBL}>Tag (e.g. Sale, New)</label>
                <input value={form.tag} onChange={e=>setForm(f=>({...f,tag:e.target.value}))} placeholder="Sale" style={INP} />
              </div>
              {/* Image URL */}
              <div style={{ gridColumn:"1/-1" }}>
                <label style={LBL}>Image URL</label>
                <input value={form.img} onChange={e=>setForm(f=>({...f,img:e.target.value}))} placeholder="https://..." style={INP} />
              </div>
              {/* Description */}
              <div style={{ gridColumn:"1/-1" }}>
                <label style={LBL}>Description</label>
                <textarea value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} placeholder="Product description…" rows={3}
                  style={{...INP, resize:"vertical", lineHeight:1.5}} />
              </div>
              {/* Featured */}
              <div style={{ gridColumn:"1/-1", display:"flex", alignItems:"center", gap:10 }}>
                <input type="checkbox" id="featured" checked={form.isFeatured} onChange={e=>setForm(f=>({...f,isFeatured:e.target.checked}))}
                  style={{ width:16, height:16, accentColor:"#e30613", cursor:"pointer" }} />
                <label htmlFor="featured" style={{ color:"rgba(255,255,255,0.7)", fontSize:13, cursor:"pointer" }}>Mark as Featured Product</label>
              </div>
            </div>

            {err && <div style={{ marginTop:14, background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:8, padding:"9px 13px", color:"#f87171", fontSize:13 }}>{err}</div>}

            <div style={{ display:"flex", gap:10, marginTop:22 }}>
              <button onClick={()=>setModal(null)} style={{ flex:1, background:"rgba(255,255,255,0.09)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:9, padding:"11px", color:"rgba(255,255,255,0.6)", fontFamily:"'Oswald',sans-serif", fontWeight:600, fontSize:13, cursor:"pointer" }}>Cancel</button>
              <button onClick={handleSave} disabled={saving}
                style={{ flex:2, background:"linear-gradient(135deg,#e30613,#bf040f)", border:"none", borderRadius:9, padding:"11px", color:"#fff", fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:13, letterSpacing:"0.07em", textTransform:"uppercase", cursor:saving?"not-allowed":"pointer", opacity:saving?0.7:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                {saving ? <><i className="fas fa-spinner fa-spin" /> Saving…</> : <><i className="fas fa-check" /> {modal==="add"?"Add Product":"Save Changes"}</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {delId && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
          <div style={{ background:"#0d0b1a", border:"1px solid rgba(239,68,68,0.3)", borderRadius:14, padding:"28px 26px", width:"100%", maxWidth:"min(380px,95vw)", textAlign:"center" }}>
            <div style={{ width:52, height:52, borderRadius:14, background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.3)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
              <i className="fas fa-trash" style={{ color:"#f87171", fontSize:20 }} />
            </div>
            <div style={{ color:"#fff", fontSize:17, fontWeight:700, fontFamily:"'Oswald',sans-serif", marginBottom:8 }}>Delete Product?</div>
            <div style={{ color:"rgba(255,255,255,0.45)", fontSize:13, marginBottom:22 }}>This action cannot be undone.</div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={()=>setDelId(null)} style={{ flex:1, background:"rgba(255,255,255,0.09)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:9, padding:"10px", color:"rgba(255,255,255,0.6)", fontFamily:"'Oswald',sans-serif", fontWeight:600, fontSize:13, cursor:"pointer" }}>Cancel</button>
              <button onClick={handleDelete} style={{ flex:1, background:"rgba(239,68,68,0.15)", border:"1px solid rgba(239,68,68,0.4)", borderRadius:9, padding:"10px", color:"#f87171", fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:13, cursor:"pointer" }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const LBL = { display:"block", color:"rgba(255,255,255,0.6)", fontSize:11, fontWeight:600, fontFamily:"'Oswald',sans-serif", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:5 };
const INP = { width:"100%", background:"rgba(255,255,255,0.09)", border:"1.5px solid rgba(255,255,255,0.09)", borderRadius:8, outline:"none", color:"#fff", fontSize:13, fontFamily:"'Inter',sans-serif", padding:"10px 12px", boxSizing:"border-box" };
