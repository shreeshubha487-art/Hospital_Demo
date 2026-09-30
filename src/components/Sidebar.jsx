import { NavLink, useNavigate } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: "⌂" },
  { to: "/patients", label: "Patients", icon: "♙" },
  { to: "/doctors", label: "Doctors", icon: "⚕" },
  { to: "/appointments", label: "Appointments", icon: "▣" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">✚</div>
        <div>
          <strong>CarePoint</strong>
          <span>Hospital</span>
        </div>
      </div>

      <div className="sidebar-section-label">MAIN MENU</div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <span className="nav-icon">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="help-card">
          <span className="help-icon">?</span>
          <div>
            <strong>Need help?</strong>
            <span>Contact support</span>
          </div>
        </div>
        <button className="logout-button" onClick={logout}>
          <span>↪</span> Logout
        </button>
      </div>
    </aside>
  );
}
