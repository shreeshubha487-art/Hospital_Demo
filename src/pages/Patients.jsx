import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Patients() {
  const [patientName, setPatientName] = useState("");
  const [block, setBlock] = useState("");
  const [reportText, setReportText] = useState("");
  const [file, setFile] = useState(null);
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => setReports(JSON.parse(localStorage.getItem("hospitalReports")) || []), []);

  const uploadReport = () => {
    if (!patientName || !block || (!reportText && !file)) { alert("Please fill all fields or upload a file"); return; }
    if (file) { const reader = new FileReader(); reader.onload = (e) => saveReport(e.target.result); reader.readAsDataURL(file); }
    else saveReport(null);
  };

  const saveReport = (fileData) => {
    const newReport = { id: Date.now(), patientName, block, reportText, file: fileData, fileName: file ? file.name : null };
    const updated = [...reports, newReport]; setReports(updated); localStorage.setItem("hospitalReports", JSON.stringify(updated));
    setPatientName(""); setBlock(""); setReportText(""); setFile(null);
    const input = document.getElementById("report-file"); if (input) input.value = "";
  };

  const filtered = reports.filter((r) => `${r.patientName} ${r.block} ${r.reportText}`.toLowerCase().includes(search.toLowerCase()));

  return <div className="app-shell"><Sidebar /><main className="main"><Navbar title="Patients / Upload Report" />
    <section className="panel form-panel"><div className="panel-heading"><div><h3>Upload patient report</h3><p>Add report details or attach a PDF/image.</p></div><span className="panel-badge">Secure demo storage</span></div>
      <div className="form-grid"><div><label>Patient name</label><input value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="e.g. Rahul Kumar" /></div><div><label>Department / block</label><input value={block} onChange={(e) => setBlock(e.target.value)} placeholder="e.g. Cardiology" /></div><div className="full"><label>Report details</label><textarea value={reportText} onChange={(e) => setReportText(e.target.value)} placeholder="Enter observations, diagnosis, or report notes..." /></div><div className="full"><label>Report file</label><label className="file-drop" htmlFor="report-file"><span>↑</span><div><strong>{file ? file.name : "Choose a PDF or image"}</strong><small>{file ? "File selected" : "PDF, JPG, PNG supported"}</small></div><b>Browse</b></label><input id="report-file" className="visually-hidden" type="file" accept=".pdf,image/*" onChange={(e) => setFile(e.target.files[0])} /></div></div>
      <div className="form-actions"><button className="secondary-button" onClick={() => { setPatientName(""); setBlock(""); setReportText(""); setFile(null); }}>Clear</button><button className="primary-button" onClick={uploadReport}>Upload report <span>↑</span></button></div>
    </section>

    <section className="panel"><div className="panel-heading list-heading"><div><h3>Patient reports</h3><p>{reports.length} report{reports.length === 1 ? "" : "s"} stored in this browser</p></div><div className="search-box"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search reports..." /></div></div>
      {filtered.length === 0 ? <div className="empty-state"><span>▤</span><h3>No reports found</h3><p>Upload a report or change your search.</p></div> : <div className="table-wrap"><table><thead><tr><th>Patient</th><th>Department</th><th>Details</th><th>File</th></tr></thead><tbody>{filtered.map((r) => <tr key={r.id}><td><div className="patient-cell"><div className="mini-avatar">{r.patientName?.charAt(0)?.toUpperCase()}</div><strong>{r.patientName}</strong></div></td><td><span className="tag">{r.block}</span></td><td className="details-cell">{r.reportText || "No text details"}</td><td>{r.file ? <a className="file-link" href={r.file} target="_blank" rel="noopener noreferrer" download={r.fileName}>View file ↗</a> : <span className="muted">Text only</span>}</td></tr>)}</tbody></table></div>}
    </section>
  </main></div>;
}
