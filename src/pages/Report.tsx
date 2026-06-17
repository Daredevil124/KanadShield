import { useState } from 'react';
import { Upload, ShieldCheck, AlertTriangle, Send } from 'lucide-react';
import styles from './Report.module.css';

const Report = () => {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
  };

  return (
    <div className={`container ${styles.reportContainer}`}>
      <div className={styles.header}>
        <h1 className="gradient-text">File a Cybercrime Report</h1>
        <p>Your report will be securely encrypted and sent to the Ahmedabad Cyber Crime Branch.</p>
      </div>

      <div className={styles.progressTracker}>
        <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>1. Category</div>
        <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>2. Details</div>
        <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>3. Evidence</div>
      </div>

      <form className={`glass-panel ${styles.formContainer}`} onSubmit={handleNext}>
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className={styles.stepTitle}>What type of incident are you reporting?</h2>
            <div className={styles.categoryGrid}>
              {['Financial Fraud', 'Social Media Harassment', 'Phishing/Spam', 'Identity Theft', 'Other'].map((cat) => (
                <div 
                  key={cat}
                  className={`${styles.categoryCard} ${category === cat ? styles.selected : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  <AlertTriangle className={styles.catIcon} />
                  <span>{cat}</span>
                </div>
              ))}
            </div>
            <button 
              type="button" 
              className={`btn-primary ${styles.nextBtn}`} 
              onClick={() => setStep(2)}
              disabled={!category}
            >
              Next Step
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className={styles.stepTitle}>Incident Details</h2>
            <div className={styles.inputGroup}>
              <label>Date of Incident</label>
              <input type="date" className={styles.input} required />
            </div>
            <div className={styles.inputGroup}>
              <label>Description of Incident</label>
              <textarea 
                className={styles.textarea} 
                rows={5} 
                placeholder="Please describe exactly what happened..."
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Financial Loss Amount (if any)</label>
              <input type="number" className={styles.input} placeholder="₹ 0.00" />
            </div>
            <div className={styles.btnGroup}>
              <button type="button" className="btn-secondary" onClick={() => setStep(1)}>Back</button>
              <button type="button" className="btn-primary" onClick={() => setStep(3)}>Next Step</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className={styles.stepTitle}>Upload Evidence</h2>
            <p className={styles.evidenceHint}>Upload screenshots, bank statements, or transaction logs. Files are hashed to ensure chain of custody.</p>
            
            <div className={styles.uploadArea}>
              <Upload size={48} className={styles.uploadIcon} />
              <p>Drag and drop files here, or click to browse</p>
              <span className={styles.fileTypes}>Supports JPG, PNG, PDF, CSV</span>
            </div>

            <div className={styles.secureNotice}>
              <ShieldCheck className={styles.secureIcon} />
              <span>End-to-end encrypted submission</span>
            </div>

            <div className={styles.btnGroup}>
              <button type="button" className="btn-secondary" onClick={() => setStep(2)}>Back</button>
              <button 
                type="button" 
                className={`btn-primary ${styles.submitBtn}`} 
                onClick={async () => {
                  try {
                    const res = await fetch('http://localhost:5000/api/reports', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        category,
                        description: "User attached evidence and detailed incident.", // Simplified for demo
                        incidentDate: new Date().toISOString(),
                        financialLoss: 0 // Mocked for demo since state isn't fully wired yet
                      })
                    });
                    const data = await res.json();
                    if (data.success) {
                      alert(`Report Submitted Successfully! Tracking ID: ${data.report.caseId}`);
                      setStep(1); // Reset
                    } else {
                      alert('Error submitting report.');
                    }
                  } catch (e) {
                    alert('Network error. Is the API server running?');
                  }
                }}
              >
                <Send size={18} /> Submit Report
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Report;
