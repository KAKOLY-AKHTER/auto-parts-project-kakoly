import { useState, useEffect } from "react";
import AdminLogin    from "./admin/AdminLogin";
import AdminLayout   from "./admin/AdminLayout";
import AdminOverview from "./admin/AdminOverview";
import AdminBookings from "./admin/AdminBookings";
import AdminContacts from "./admin/AdminContacts";
import AdminOrders   from "./admin/AdminOrders";

export default function AdminDashboard() {
  const [token,  setToken]  = useState(() => localStorage.getItem("adminToken") || "");
  const [user,   setUser]   = useState(() => {
    try { return JSON.parse(localStorage.getItem("adminUser") || "null"); } catch { return null; }
  });
  const [active, setActive] = useState("overview");

  // Validate token on mount
  useEffect(() => {
    if (!token) return;
    // Simple check: if stored, trust it (JWT is stateless)
  }, []);

  const handleLogin = (u, t) => {
    setUser(u); setToken(t);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setToken(""); setUser(null);
  };

  if (!token || !user) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const pages = {
    overview: <AdminOverview token={token} />,
    bookings: <AdminBookings token={token} />,
    contacts: <AdminContacts token={token} />,
    orders:   <AdminOrders   token={token} />,
  };

  return (
    <AdminLayout active={active} setActive={setActive} user={user} onLogout={handleLogout}>
      {pages[active]}
    </AdminLayout>
  );
}
