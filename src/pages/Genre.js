import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../Navbar';

const GENRES = [
  { code: 'tefsir', label: 'Tefsir', icon: '🕌', desc: 'Explanations and interpretations of the Qur’an'},
  { code: 'hadis', label: 'Hadis', icon: '📜', desc: 'Sayings and teachings of Prophet Muhammad'},
  { code: 'siyer', label: 'Siyer', icon: '🕋', desc: 'The life and biography of Prophet Muhammad'},
  { code: 'kelam', label: 'Kelam', icon: '📖', desc: 'The study of Islamic theology and beliefs'},
  { code: 'felsefe', label: 'Felsefe', icon: '🧠', desc: 'Philosophical thinking about existence and knowledge'},
  { code: 'Fıkıh', label: 'Fıkıh', icon: '⚖️', desc: 'Islamic jurisprudence and practical rulings'},
  { code: 'tasavvuf', label: 'Tasavvuf', icon: '🕊️🌿', desc:'Spiritual purification and inner journey in Islam'},
];

const FLAG_MAP = {
  english: '🇬🇧', turkish: '🇹🇷', german: '🇩🇪', french: '🇫🇷',
  arabic: '🇸🇦', spanish: '🇪🇸', italian: '🇮🇹', japanese: '🇯🇵',
  russian: '🇷🇺', portuguese: '🇵🇹', chinese: '🇨🇳', korean: '🇰🇷',
};

export default function Genre() {
  const { lang } = useParams();
  const displayLang = lang.charAt(0).toUpperCase() + lang.slice(1);
  const flag = FLAG_MAP[lang] || '📚';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page">
      <Navbar />

      <section className="page-hero page-hero--genre">
        <div className="page-hero__content">
          <Link to="/language" className="page-hero__back">← All Languages</Link>
          <p className="hero__eyebrow">{flag} {displayLang} Books</p>
          <h1 className="page-hero__title">Select a<br /><em>Genre</em></h1>
          <p className="page-hero__sub">Browse and upload books by genre.</p>
        </div>
      </section>

      <section className="genre-section">
        <div className="genre-grid">
          {GENRES.map((genre, i) => (
            <Link
              to={`/language/${lang}/${genre.code}`}
              key={genre.code}
              className="genre-card reveal"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="genre-card__icon">{genre.icon}</div>
              <h3 className="genre-card__label">{genre.label}</h3>
              <p className="genre-card__desc">{genre.desc}</p>
              <div className="genre-card__cta">Browse →</div>
            </Link>
          ))}
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
