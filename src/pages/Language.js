import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

const LANGUAGES = [
{ code: 'russian', label: 'Русский', flag: '🇷🇺', books: '820+', desc: 'Tolstoy, Dostoyevski ve büyük romanların dili.' },
{ code: 'turkish',  label: 'Türkçe',  flag: '🇹🇷', books: '890+', desc: 'Anadolu ve ötesinden zengin edebi miras.' },
{ code: 'kyrgyz',   label: 'Кыргызча', flag: '🇰🇬', books: '210+', desc: 'Destanlar ve Orta Asya sözlü anlatı geleneği.' },
{ code: 'tajik',    label: 'Тоҷикӣ',  flag: '🇹🇯', books: '190+', desc: 'Fars edebiyatı ve kültürel mirasın dili.' },
{ code: 'kazakh',   label: 'Қазақша', flag: '🇰🇿', books: '240+', desc: 'Bozkır kültürü ve epik hikâyeler.' },
{ code: 'uzbek',    label: 'Oʻzbekcha', flag: '🇺🇿', books: '260+', desc: 'Timur mirası ve modern Orta Asya edebiyatı.' },
{ code: 'turkmen',  label: 'Türkmençe', flag: '🇹🇲', books: '180+', desc: 'Göçebe kültür ve halk hikâyeleri.' },
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
          {/* <p className="hero__eyebrow">Dile Göre Göz At</p> */}
          <h1 className="page-hero__title">Dilini <br /><em>Seç</em></h1>
          <p className="page-hero__sub">Kitapları ana dilinde keşfet veya yeni bir dil keşfet.</p>
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
            <p className="footer__copy">© 2026 DIJITAL KITABISTAN. Dünyanın her yerindeki okurlar için ❤️ ile hazırlandı.</p>
            <a href="mailto:contact@KTB.com" className="footer__email">contact@KTB.com</a>
      </footer>
    </div>
  );
}
