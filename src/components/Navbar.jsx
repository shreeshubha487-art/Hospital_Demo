import { useLocation } from "react-router-dom";

const titles = {
  "/dashboard": ["Dashboard", "Overview of hospital activity"],
  "/patients": ["Patients & Reports", "Manage patient reports and documents"],
  "/doctors": ["Doctors & Reports", "Manage doctors and review uploaded reports"],
  "/appointments": ["Appointments", "Schedule and manage patient appointments"],
};

export default function Navbar({ title }) {
  const location = useLocation();
  const [pageTitle, subtitle] = titles[location.pathname] || [title, "Hospital management system"];

  return (
    <header className="topbar">
      <div>
        <div className="eyebrow">Hospital Management</div>
        <h1>{pageTitle || title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="topbar-actions">
        <button className="icon-button" aria-label="Notifications" title="Notifications">🔔</button>
        <div className="profile-chip">
          <div className="avatar">A</div>
          <div>
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}
