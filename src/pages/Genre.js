import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import { translations } from '../translations'; // 👈 ADD THIS

const FLAG_MAP = {
  english: '🇬🇧', turkish: '🇹🇷', german: '🇩🇪', french: '🇫🇷',
  arabic: '🇸🇦', spanish: '🇪🇸', italian: '🇮🇹', japanese: '🇯🇵',
  russian: '🇷🇺', portuguese: '🇵🇹', chinese: '🇨🇳', korean: '🇰🇷',
  kyrgyz: '🇰🇬', tajik: '🇹🇯', kazakh: '🇰🇿', uzbek: '🇺🇿', turkmen: '🇹🇲'
};

export default function Genre() {
  const { lang } = useParams();

  const t = translations[lang] || translations.turkish; // fallback
  const flag = FLAG_MAP[lang] || '📚';

  const GENRES = Object.keys(t.genres).map((code) => ({
    code,
    ...t.genres[code]
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add('visible')
        ),
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page">
      <Navbar />

      <section className="page-hero page-hero--genre">
        <div className="page-hero__content">

          <Link to="/language" className="page-hero__back">
            {t.back}
          </Link>

          <p className="hero__eyebrow">
            {flag} Türkçe Kitaplar
          </p>

          <h1 className="page-hero__title">
            {t.title}
          </h1>

          <p className="page-hero__sub">
            {t.subtitle}
          </p>

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
              <div className="genre-card__icon">📚</div>
              <h3 className="genre-card__label">{genre.label}</h3>
              <p className="genre-card__desc">{genre.desc}</p>
              <div className="genre-card__cta">
                {t.browse} →
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer__brand">KTB</div>
        <p className="footer__copy">
          © 2026 DIJITAL KITABISTAN. Dünyanın her yerindeki okurlar için ❤️ ile hazırlandı.
        </p>
        <a href="mailto:contact@KTB.com" className="footer__email">
          contact@KTB.com
        </a>
      </footer>
    </div>
  );
}
