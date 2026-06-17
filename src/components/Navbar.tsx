import { Link } from 'react-router-dom';
import { Shield, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link to="/" className={styles.logo}>
          <Shield className={styles.logoIcon} />
          <span className="gradient-text">KanadShield</span>
        </Link>

        {/* Desktop Menu */}
        <div className={styles.desktopMenu}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/report" className={styles.navLink}>Report Cybercrime</Link>
          <Link to="/track" className={styles.navLink}>Track Status</Link>
          <Link to="/dashboard" className={styles.navLink}>
             <span className={styles.badge}>Police Login</span>
          </Link>
          <button className="btn-primary">Get Help</button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={styles.mobileToggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link to="/" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/report" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Report Cybercrime</Link>
          <Link to="/track" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Track Status</Link>
          <Link to="/dashboard" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Police Dashboard</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
