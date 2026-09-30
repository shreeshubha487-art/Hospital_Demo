import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <main className="login-page">
      <section className="login-visual">
        <div className="visual-content">
          <div className="login-brand"><span>✚</span> CarePoint Hospital</div>
          <div className="visual-copy">
            <span className="pill">SMART HOSPITAL MANAGEMENT</span>
            <h1>Care that is<br /><em>connected.</em></h1>
            <p>Manage patients, doctors, appointments and medical reports from one simple workspace.</p>
          </div>
          <div className="visual-stats">
            <div><strong>24/7</strong><span>Care support</span></div>
            <div><strong>4+</strong><span>Core modules</span></div>
            <div><strong>100%</strong><span>Digital workflow</span></div>
          </div>
        </div>
        <div className="visual-orb orb-one" />
        <div className="visual-orb orb-two" />
      </section>

      <section className="login-panel">
        <div className="login-card">
          <div className="mobile-brand"><span>✚</span> CarePoint Hospital</div>
          <div className="login-heading">
            <span className="welcome-label">WELCOME BACK</span>
            <h2>Sign in to your workspace</h2>
            <p>Enter your administrator credentials to continue.</p>
          </div>

          <form onSubmit={login} className="login-form">
            <label>Username</label>
            <div className="field-wrap"><span>◉</span><input autoComplete="username" value={username} onChange={(e) => { setUsername(e.target.value); setError(""); }} placeholder="Enter username" /></div>
            <label>Password</label>
            <div className="field-wrap"><span>●</span><input autoComplete="current-password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} placeholder="Enter password" /><button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button></div>
            {error && <div className="form-error">{error}</div>}
            <button className="primary-button login-button" type="submit">Sign in <span>→</span></button>
          </form>

          <div className="demo-note"><strong>Demo access</strong><span>Username: <b>admin</b> &nbsp;•&nbsp; Password: <b>admin123</b></span></div>
          <p className="security-note">🔒 Demo environment · Keep real patient data out of this prototype.</p>
        </div>
      </section>
    </main>
  );
}
