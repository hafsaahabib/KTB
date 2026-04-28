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
          <p className="hero__eyebrow"></p>
         
          <h1 className="hero__title">
            Geçmişin Kadim Bilgeliği,<br />
            <em> Geleceğin Dijital Hafızasına Emanet!</em>
          </h1>
          <p className="hero__sub">
          Farklı dillerde ve türlerde kitapları keşfedin — hepsi tek bir yerde.          </p>
          <Link to="/language" className="btn btn--primary">
            Başlayın
            <span className="btn__arrow">→</span>
          </Link>
        </div>

        {/* Decorative floating cards */}
        <div className="hero__deco">
          <div className="hero__card hero__card--1">
            <span>🇹🇷</span><p>Türkçe</p>
          </div>
          <div className="hero__card hero__card--2">
            <span>🇰🇬</span><p>Кыргызча</p>
          </div>
          <div className="hero__card hero__card--3">
            <span>🇺🇿</span><p>Oʻzbekcha</p>
          </div>
        </div>

        <div className="hero__scroll-hint">
          <span>Kaydırın</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div className="stats-strip">
        <div className="stats-strip__item">
          <strong>5+</strong><span>Diller</span>
        </div>
        <div className="stats-strip__divider" />
        <div className="stats-strip__item">
          <strong>12+</strong><span>Türler</span>
        </div>
        <div className="stats-strip__divider" />
        <div className="stats-strip__item">
          <strong>∞</strong><span>Keşfedilecek Kitaplar</span>
        </div>
        <div className="stats-strip__divider" />
        <div className="stats-strip__item">
          <strong>Ücretsiz</strong><span>Her Zaman</span>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="about">
        <div className="about__bg-text">KTB</div>

        <div className="about__header reveal">
          <div className="about__tag">Hikâyemiz</div>
          <h2 className="about__title">
            Okurlar için,<br />okurlar tarafından inşa edildi.
          </h2>
        </div>

        <div className="about__grid">
          <div className="about__card reveal">
            <div className="about__card-icon">📖</div>
            <h3>Açık Erişim</h3>
            <p>
             Bilginin ücretsiz ve sınırsız olması gerektiğine inanıyoruz. 
             KTB, herkesin kitapları herhangi bir ücret veya kısıtlama olmadan 
             erişebildiği, topluluk odaklı bir platformdur.
            </p>
          </div>

          <div className="about__card about__card--accent reveal">
            <div className="about__card-icon">🌍</div>
            <h3 style={{color: 'whitesmoke'}}>Çok Dilli Öncelik</h3>
            <p style={{color: 'whitesmoke'}}>
            KTB dil çeşitliliğini kutlar. 
            Her dil bir rafı hak eder ve her okur kendi ana dilinde bir kitabı hak 
            eder.
            </p>
          </div>

          <div className="about__card reveal">
            <div className="about__card-icon">🤝</div>
            <h3>Topluluk Odaklı</h3>
            <p>
            KTB okurlarıyla birlikte büyür. Bugün bir kitap yüklenir, 
            yarın dünyanın başka bir yerindeki biri ona erişebilir.
            Her katkı önemlidir.
            </p>
          </div>
        </div>

        <div className="about__mission reveal">
          <div className="about__mission-line" />
          <blockquote>
           “...De ki: 'Hiç bilenlerle bilmeyenler bir olur mu?' Ancak akıl sahipleri öğüt alırlar.”
          </blockquote>
          <cite>— Zümer Suresi, 9. Ayet</cite>
          <div className="about__mission-line" />
        </div>

        <div className="about__cta reveal">
          <p>Yolculuğunuza başlamaya hazır mısınız?</p>
          <Link to="/language" className="btn btn--outline">
            Dilleri Keşfet →
          </Link>
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
