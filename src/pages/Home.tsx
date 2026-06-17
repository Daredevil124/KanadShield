import { ShieldAlert, Activity, Lock, ArrowRight, FileText, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.glowBlob1}></div>
        <div className={styles.glowBlob2}></div>
        
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.badgeWrapper}>
            <span className={styles.liveBadge}>
              <span className="pulse-indicator"></span>
              Ahmedabad Cyber Crime Branch
            </span>
          </div>
          
          <h1 className={styles.heroTitle}>
            Next-Generation <br />
            <span className="gradient-text">Cyber Defense</span> Platform
          </h1>
          
          <p className={styles.heroSubtitle}>
            Empowering citizens and law enforcement with AI-driven intelligence, 
            rapid response workflows, and secure digital evidence management.
          </p>
          
          <div className={styles.ctaGroup}>
            <Link to="/report" className={`btn-primary ${styles.mainCta}`}>
              <ShieldAlert size={20} />
              Report an Incident
            </Link>
            <Link to="/track" className={`btn-secondary ${styles.secondaryCta}`}>
              <Activity size={20} />
              Track Status
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={`container ${styles.featuresSection}`}>
        <h2 className={styles.sectionTitle}>Smarter Policing for a Safer City</h2>
        
        <div className={styles.featuresGrid}>
          <div className={`glass-panel ${styles.featureCard}`}>
            <div className={styles.iconWrapper}>
              <FileText className={styles.featureIcon} />
            </div>
            <h3>Smart Complaint Filing</h3>
            <p>Guided, multilingual reporting system that categorizes cybercrimes automatically using advanced NLP.</p>
          </div>
          
          <div className={`glass-panel ${styles.featureCard}`}>
            <div className={styles.iconWrapper}>
              <Lock className={styles.featureIcon} />
            </div>
            <h3>Tamper-Proof Evidence</h3>
            <p>Upload screenshots and logs securely. Every file is hashed to maintain a strict chain of custody.</p>
          </div>
          
          <div className={`glass-panel ${styles.featureCard}`}>
            <div className={styles.iconWrapper}>
              <BarChart3 className={styles.featureIcon} />
            </div>
            <h3>AI Triage & Triage</h3>
            <p>Law enforcement dashboard that prioritizes cases based on severity, financial loss, and threat intelligence.</p>
          </div>
        </div>
      </section>
      
      {/* Interactive Banner */}
      <section className={`container ${styles.bannerSection}`}>
        <div className={`glass-panel ${styles.actionBanner}`}>
          <div className={styles.bannerText}>
            <h2>Are you an Investigation Officer?</h2>
            <p>Access the unified dashboard for real-time analytics and link analysis.</p>
          </div>
          <Link to="/dashboard" className="btn-primary">
            Access Dashboard <ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
