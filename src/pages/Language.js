import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

const LANGUAGES = [
  { code: 'english',    label: 'English',    flag: '🇬🇧', books: '2.4k+', desc: 'The world\'s most widely published language.' },
  { code: 'turkish',   label: 'Türkçe',     flag: '🇹🇷', books: '890+',  desc: 'Rich literary heritage from Anatolia and beyond.' },
  { code: 'german',    label: 'Deutsch',    flag: '🇩🇪', books: '1.1k+', desc: 'Home to Goethe, Kafka, and modern classics.' },
  { code: 'french',    label: 'Français',   flag: '🇫🇷', books: '980+',  desc: 'Literature, philosophy, and timeless romance.' },
  { code: 'arabic',    label: 'العربية',    flag: '🇸🇦', books: '760+',  desc: 'Ancient poetry to contemporary narratives.' },
  { code: 'spanish',   label: 'Español',    flag: '🇪🇸', books: '1.3k+', desc: 'Magical realism and vibrant storytelling.' },
  { code: 'italian',   label: 'Italiano',   flag: '🇮🇹', books: '670+',  desc: 'Dante to Eco — a literary tradition like no other.' },
  { code: 'japanese',  label: '日本語',     flag: '🇯🇵', books: '540+',  desc: 'Manga, haiku, and literary masterpieces.' },
  { code: 'russian',   label: 'Русский',    flag: '🇷🇺', books: '820+',  desc: 'Tolstoy, Dostoevsky, and great novels.' },
  { code: 'portuguese',label: 'Português',  flag: '🇵🇹', books: '590+',  desc: 'Fado in words — melancholic and beautiful.' },
  { code: 'chinese',   label: '中文',       flag: '🇨🇳', books: '710+',  desc: 'Ancient wisdom meets contemporary fiction.' },
  { code: 'korean',    label: '한국어',     flag: '🇰🇷', books: '430+',  desc: 'From folklore to K-lit wave.' },
];

export default function Language() {
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

      <section className="page-hero page-hero--lang">
        <div className="page-hero__content">
          <p className="hero__eyebrow">Browse by Language</p>
          <h1 className="page-hero__title">Choose Your<br /><em>Language</em></h1>
          <p className="page-hero__sub">Discover books in your native tongue or explore a new one.</p>
        </div>
      </section>

      <section className="lang-grid-section">
        <div className="lang-grid">
          {LANGUAGES.map((lang, i) => (
            <Link
              to={`/language/${lang.code}`}
              key={lang.code}
              className="lang-card reveal"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="lang-card__flag">{lang.flag}</div>
              <div className="lang-card__info">
                <h3 className="lang-card__name">{lang.label}</h3>
                <p className="lang-card__desc">{lang.desc}</p>
              </div>
              <div className="lang-card__meta">
                <span className="lang-card__count">{lang.books}</span>
                <span className="lang-card__arrow">→</span>
              </div>
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