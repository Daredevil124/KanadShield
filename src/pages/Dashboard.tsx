import { useEffect, useState } from 'react';
import { Shield, AlertCircle, BarChart2, Users, FileText, Search, ChevronRight } from 'lucide-react';
import styles from './Dashboard.module.css';

interface ReportData {
  id: number;
  caseId: string;
  category: string;
  riskScore: number;
  status: string;
  financialLoss: number;
}

const Dashboard = () => {
  const [reports, setReports] = useState<ReportData[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/reports')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setReports(data.reports);
        }
      })
      .catch(err => console.error("Error fetching reports:", err));
  }, []);

  return (
    <div className={styles.dashboardLayout}>
      {/* Sidebar */}
      <aside className={`glass-panel ${styles.sidebar}`}>
        <div className={styles.officerProfile}>
          <div className={styles.avatar}>IO</div>
          <div>
            <h4>Inspector Patel</h4>
            <span className={styles.role}>Cyber Crime Branch</span>
          </div>
        </div>

        <nav className={styles.navMenu}>
          <a href="#" className={`${styles.navItem} ${styles.active}`}>
            <BarChart2 size={20} /> Overview
          </a>
          <a href="#" className={styles.navItem}>
            <FileText size={20} /> Active Cases
            <span className={styles.badge}>{reports.length}</span>
          </a>
          <a href="#" className={styles.navItem}>
            <AlertCircle size={20} /> High Priority
            <span className={`${styles.badge} ${styles.badgeDanger}`}>
              {reports.filter(r => r.riskScore > 50).length}
            </span>
          </a>
          <a href="#" className={styles.navItem}>
            <Users size={20} /> Citizen Portals
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h2>Intelligence Dashboard</h2>
          <div className={styles.searchBar}>
            <Search size={18} className={styles.searchIcon} />
            <input type="text" placeholder="Search by Case ID, Name, or Phone..." />
          </div>
        </header>

        {/* Stats Row */}
        <div className={styles.statsRow}>
          <div className={`glass-panel ${styles.statCard}`}>
            <div className={styles.statHeader}>
              <span>New Reports (24h)</span>
              <AlertCircle className={styles.iconWarning} />
            </div>
            <h3>{reports.length}</h3>
            <span className={styles.trendUp}>+12% vs yesterday</span>
          </div>
          
          <div className={`glass-panel ${styles.statCard}`}>
            <div className={styles.statHeader}>
              <span>Cases Resolved</span>
              <Shield className={styles.iconSuccess} />
            </div>
            <h3>156</h3>
            <span className={styles.trendUp}>+5% this month</span>
          </div>
          
          <div className={`glass-panel ${styles.statCard}`}>
            <div className={styles.statHeader}>
              <span>Active Threats</span>
              <BarChart2 className={styles.iconDanger} />
            </div>
            <h3>3</h3>
            <span className={styles.textDanger}>Phishing campaign detected</span>
          </div>
        </div>

        {/* AI Triage Queue */}
        <div className={`glass-panel ${styles.caseQueue}`}>
          <div className={styles.queueHeader}>
            <h3>AI Triage Queue</h3>
            <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>View All</button>
          </div>
          
          <div className={styles.tableResponsive}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Category</th>
                  <th>Risk Score</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.length === 0 ? (
                  <tr><td colSpan={5} style={{ textAlign: 'center' }}>No active cases. Check back later or make sure the API is running.</td></tr>
                ) : (
                  reports.map(report => (
                    <tr key={report.id}>
                      <td>#{report.caseId}</td>
                      <td>{report.category} {report.financialLoss > 0 ? `(₹${report.financialLoss})` : ''}</td>
                      <td>
                        <div className={styles.riskBar}>
                          <div 
                            className={styles.riskFill} 
                            style={{ 
                              width: `${Math.min(report.riskScore, 100)}%`, 
                              background: report.riskScore > 50 ? 'var(--danger)' : report.riskScore > 20 ? 'var(--warning)' : 'var(--success)'
                            }}
                          ></div>
                        </div>
                      </td>
                      <td><span className={styles.statusBadge}>{report.status}</span></td>
                      <td><button className={styles.iconBtn}><ChevronRight /></button></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
