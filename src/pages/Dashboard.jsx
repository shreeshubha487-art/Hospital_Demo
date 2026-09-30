import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [stats, setStats] = useState({ patients: 0, doctors: 0, appointments: 0, reports: 0 });
  const [recentReports, setRecentReports] = useState([]);

  useEffect(() => {
    const reports = JSON.parse(localStorage.getItem("hospitalReports")) || [];
    const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    const appointments = JSON.parse(localStorage.getItem("hospitalAppointments")) || [];
    const uniquePatients = new Set(reports.map((r) => r.patientName).filter(Boolean));
    setStats({ patients: uniquePatients.size, doctors: doctors.length, appointments: appointments.length, reports: reports.length });
    setRecentReports([...reports].reverse().slice(0, 5));
  }, []);

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main">
        <Navbar title="Dashboard" />
        <section className="welcome-banner">
          <div><span className="banner-kicker">GOOD DAY, ADMIN</span><h2>Here’s your hospital overview.</h2><p>Keep track of patient care and daily operations in one place.</p></div>
          <div className="banner-symbol">✚</div>
        </section>

        <section className="stat-grid">
          <div className="stat-card"><div className="stat-icon blue">♙</div><div><span>Total Patients</span><strong>{stats.patients}</strong><small>From uploaded reports</small></div></div>
          <div className="stat-card"><div className="stat-icon purple">⚕</div><div><span>Doctors</span><strong>{stats.doctors}</strong><small>Registered in system</small></div></div>
          <div className="stat-card"><div className="stat-icon green">▣</div><div><span>Appointments</span><strong>{stats.appointments}</strong><small>Booked appointments</small></div></div>
          <div className="stat-card"><div className="stat-icon orange">▤</div><div><span>Reports</span><strong>{stats.reports}</strong><small>Patient documents</small></div></div>
        </section>

        <section className="content-grid dashboard-grid">
          <div className="panel quick-panel">
            <div className="panel-heading"><div><h3>Quick actions</h3><p>Common tasks at your fingertips</p></div></div>
            <div className="quick-actions">
              <Link to="/patients" className="quick-action"><span>＋</span><div><strong>Upload report</strong><small>Add a patient report or document</small></div><b>→</b></Link>
              <Link to="/doctors" className="quick-action"><span>⚕</span><div><strong>Add doctor</strong><small>Register a doctor in the system</small></div><b>→</b></Link>
              <Link to="/appointments" className="quick-action"><span>▣</span><div><strong>Book appointment</strong><small>Create a patient appointment</small></div><b>→</b></Link>
            </div>
          </div>

          <div className="panel recent-panel">
            <div className="panel-heading"><div><h3>Recent reports</h3><p>Latest uploaded patient records</p></div><Link to="/patients">View all</Link></div>
            {recentReports.length === 0 ? <div className="empty-state compact"><span>▤</span><p>No reports yet.</p><small>Uploaded reports will appear here.</small></div> : <div className="report-list">{recentReports.map((r) => <div className="report-row" key={r.id}><div className="file-icon">PDF</div><div><strong>{r.patientName}</strong><span>{r.block} · {r.fileName || "Text report"}</span></div><span className="status-dot">●</span></div>)}</div>}
          </div>
        </section>
      </main>
    </div>
  );
}
