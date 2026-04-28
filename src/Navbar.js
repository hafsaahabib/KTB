import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import logo from './logo1-removebg-preview.png';
import logo from './logo3-removebg-preview.png';
import alttext from './preview-removebg-preview.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAbout = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname === '/' || location.pathname === '/home') {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#about');
    }
  };

  const handleContact = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    window.location.href = 'mailto:contact@folio.com';
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <Link to="/" className="navbar__brand" onClick={() => setMenuOpen(false)}>
        {/* <span className="navbar__brand-icon">📚</span> */}
        <span className="navbar__brand-text" style={{ display: 'flex', flexDirection: 'column' }}>
            <img src={logo} alt="logo" />
            <img 
                src={alttext} 
                style={{ width: '50px', height: '20px', marginLeft: '10px' }} 
                alt="desc" 
            />        
        </span>
        <p style={{ color: '#183f47', fontFamily: 'DM Sans, sans-serif', wordSpacing: '-3px', fontWeight:'bold'  }}>
        DIJITAL KITABISTAN
        </p>      
        </Link>

      <button
        className={`navbar__burger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
        <li>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            Ana Sayfa
          </Link>
        </li>
        <li>
          <a href="#about" className="nav-link" onClick={handleAbout}>
            Hakkımızda
          </a>
        </li>
        <li>
          <Link to="/language" className="nav-link" onClick={() => setMenuOpen(false)}>
            Diller
          </Link>
        </li>
        <li>
          <a href="mailto:contact@folio.com" className="nav-link nav-link--contact" onClick={handleContact}>
            İletişim
          </a>
        </li>
      </ul>
    </nav>
  );
}
