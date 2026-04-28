import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    // Handle hash-based scroll on page load
    if (window.location.hash === '#about') {
      setTimeout(() => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    // Parallax effect on hero
    const handleParallax = () => {
      if (heroRef.current) {
        const y = window.scrollY;
        heroRef.current.style.backgroundPositionY = `${y * 0.4}px`;
      }
    };
    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  // Intersection observer for about section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page">
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero" ref={heroRef}>
        <div className="hero__noise" />
        <div className="hero__content">
          <p className="hero__eyebrow">Your Digital Library</p>
          <h1 className="hero__title">
            Every Story<br />
            <em>Deserves a Home</em>
          </h1>
          <p className="hero__sub">
            Upload, share, and discover books across languages and genres — all in one place.
          </p>
          <Link to="/language" className="btn btn--primary">
            Get Started
            <span className="btn__arrow">→</span>
          </Link>
        </div>

        {/* Decorative floating cards */}
        <div className="hero__deco">
          <div className="hero__card hero__card--1">
            <span>🇹🇷</span><p>Türkçe</p>
          </div>
          <div className="hero__card hero__card--2">
            <span>🇬🇧</span><p>English</p>
          </div>
          <div className="hero__card hero__card--3">
            <span>🇩🇪</span><p>Deutsch</p>
          </div>
        </div>

        <div className="hero__scroll-hint">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div className="stats-strip">
        <div className="stats-strip__item">
          <strong>12+</strong><span>Languages</span>
        </div>
        <div className="stats-strip__divider" />
        <div className="stats-strip__item">
          <strong>5+</strong><span>Genres</span>
        </div>
        <div className="stats-strip__divider" />
        <div className="stats-strip__item">
          <strong>∞</strong><span>Books to Discover</span>
        </div>
        <div className="stats-strip__divider" />
        <div className="stats-strip__item">
          <strong>Free</strong><span>Always</span>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="about">
        <div className="about__bg-text">KTB</div>

        <div className="about__header reveal">
          <div className="about__tag">Our Story</div>
          <h2 className="about__title">
            Built for readers,<br />by readers.
          </h2>
        </div>

        <div className="about__grid">
          <div className="about__card reveal">
            <div className="about__card-icon">📖</div>
            <h3>Open Access</h3>
            <p>
              We believe knowledge should be free and borderless. KTB is a
              community-driven platform where anyone can share and access books
              without paywalls or restrictions.
            </p>
          </div>

          <div className="about__card about__card--accent reveal">
            <div className="about__card-icon">🌍</div>
            <h3 style={{color: 'whitesmoke'}}>Multilingual First</h3>
            <p style={{color: 'whitesmoke'}}>
              From Turkish to Japanese, Arabic to German — KTB celebrates
              linguistic diversity. Every language deserves a shelf, and every
              reader deserves a book in their mother tongue.
            </p>
          </div>

          <div className="about__card reveal">
            <div className="about__card-icon">🤝</div>
            <h3>Community Driven</h3>
            <p>
              KTB grows with its readers. Upload a book today and it becomes
              available for someone across the world tomorrow. Every contribution
              matters.
            </p>
          </div>
        </div>

        <div className="about__mission reveal">
          <div className="about__mission-line" />
          <blockquote>
            "A reader lives a thousand lives before he dies. The man who never
            reads lives only one."
          </blockquote>
          <cite>— George R.R. Martin</cite>
          <div className="about__mission-line" />
        </div>

        <div className="about__cta reveal">
          <p>Ready to start your journey?</p>
          <Link to="/language" className="btn btn--outline">
            Browse Languages →
          </Link>
        </div>
      </section>

        <footer className="footer">
            <div className="footer__brand">KTB</div>
            <p className="footer__copy">© 2026 DIJITAL KITABISTAN. Built with ❤️ for readers everywhere.</p>
            <a href="mailto:contact@KTB.com" className="footer__email">contact@KTB.com</a>
      </footer>
    </div>
  );
}