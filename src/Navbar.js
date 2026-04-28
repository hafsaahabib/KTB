import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import logo from './logo1-removebg-preview.png';
import logo from './logo1.png'
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
        <span className="navbar__brand-text">
          <img src={logo}></img>
        </span>
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
            Home
          </Link>
        </li>
        <li>
          <a href="#about" className="nav-link" onClick={handleAbout}>
            About Us
          </a>
        </li>
        <li>
          <Link to="/language" className="nav-link" onClick={() => setMenuOpen(false)}>
            Languages
          </Link>
        </li>
        <li>
          <a href="mailto:contact@folio.com" className="nav-link nav-link--contact" onClick={handleContact}>
            Contact Us
          </a>
        </li>
      </ul>
    </nav>
  );
}