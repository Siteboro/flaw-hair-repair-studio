import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  ExternalLink,
  MapPin,
  Menu,
  Phone,
  Scissors,
  Sparkles,
  Star,
  X,
} from 'lucide-react';

const MAPS_URL = 'https://www.google.com/maps/place/FLAW+HA%C4%B0R+REPA%C4%B0R+STUD%C4%B0O/@40.9981782,28.6678093,17z/data=!3m1!4b1!4m6!3m5!1s0x14b55fd8d5557939:0xe354395da4a2e17f!8m2!3d40.9981782!4d28.6703842!16s%2Fg%2F11yzm42cpn';
const PHONE_LINK = 'tel:+905403371037';
const CHECKOUT_URL = 'https://app.siteboro.com/lets-go?site=flaw-hair';

const services = [
  {
    number: '01',
    title: 'Kesim & Şekillendirme',
    text: 'Kesim ve bitiş deneyimi, işletmenin Google yorumlarında özellikle öne çıkıyor.',
  },
  {
    number: '02',
    title: 'Saç Açma & Renk Dönüşümü',
    text: 'Saç açma ve renk değişimi hakkında bilgi ve uygunluk için stüdyoyla görüşebilirsiniz.',
  },
  {
    number: '03',
    title: 'Saç Bakım Yaklaşımı',
    text: 'Kaliteli ürün kullanımı ve özenli uygulama, müşteri yorumlarında sıkça vurgulanıyor.',
  },
  {
    number: '04',
    title: 'Manikür',
    text: 'Manikür hizmeti ve ekip yaklaşımı, işletmenin gerçek müşteri yorumlarında yer alıyor.',
  },
];

const gallery = [
  {
    src: '/generated/flaw-hair/images/salon-entry.jpg',
    alt: 'FLAW Hair Repair Studio salon girişi ve iç mekan görünümü',
    title: 'Stüdyo Girişi',
    note: 'Gerçek işletme fotoğrafı',
  },
  {
    src: '/generated/flaw-hair/images/glass-interior.jpg',
    alt: 'FLAW Hair Repair Studio cam cephe ve salon iç mekanı',
    title: 'Aydınlık İç Mekan',
    note: 'Gerçek işletme fotoğrafı',
  },
  {
    src: '/generated/flaw-hair/images/color-products.jpg',
    alt: 'FLAW Hair Repair Studio içinde kullanılan profesyonel saç ürünleri',
    title: 'Profesyonel Ürünler',
    note: 'Gerçek işletme fotoğrafı',
  },
  {
    src: '/generated/flaw-hair/images/storefront.jpg',
    alt: 'FLAW Hair Repair Studio Beylikdüzü dış cephe görünümü',
    title: 'FLAW Dış Cephe',
    note: 'Gerçek işletme fotoğrafı',
  },
];

const hours = [
  ['Pazartesi', '09.00 - 20.00'],
  ['Salı', 'Kapalı'],
  ['Çarşamba', '09.00 - 20.00'],
  ['Perşembe', '09.00 - 20.00'],
  ['Cuma', '09.00 - 20.00'],
  ['Cumartesi', '09.00 - 20.00'],
  ['Pazar', '09.00 - 20.00'],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const galleryPaused = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      }),
      { threshold: 0.12 },
    );
    const items = document.querySelectorAll('.reveal');
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
      document.documentElement.style.setProperty('--hero-progress', String(progress));
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => {
      if (!galleryPaused.current && !lightboxOpen) {
        setActiveSlide((current) => (current + 1) % gallery.length);
      }
    }, 3000);
    return () => window.clearInterval(timer);
  }, [lightboxOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || lightboxOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, lightboxOpen]);

  const moveGallery = (direction) => {
    setActiveSlide((current) => (current + direction + gallery.length) % gallery.length);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="FLAW ana sayfa">
          <span className="brand-symbol">F</span>
          <span className="brand-copy">
            <strong>FLAW</strong>
            <small>HAİR REPAİR STUDİO</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Ana menü">
          <a href="#services">Hizmetler</a>
          <a href="#studio">Stüdyo</a>
          <a href="#proof">Yorumlar</a>
          <a href="#contact">İletişim</a>
        </nav>

        <a className="header-call" href={PHONE_LINK}>
          <span>Randevu için ara</span>
          <Phone size={16} />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Menüyü aç"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={22} />
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-head">
          <span>FLAW / MENÜ</span>
          <button type="button" aria-label="Menüyü kapat" onClick={() => setMenuOpen(false)}><X /></button>
        </div>
        <nav>
          {[
            ['Hizmetler', '#services'],
            ['Stüdyo', '#studio'],
            ['Yorumlar', '#proof'],
            ['İletişim', '#contact'],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ChevronRight /></a>
          ))}
        </nav>
        <a className="mobile-call" href={PHONE_LINK}>0540 337 10 37 <Phone size={18} /></a>
      </div>

      <main>
        <section className="hero" id="top">
          <div className="hero-media">
            <img src="/generated/flaw-hair/images/glass-interior.jpg" alt="FLAW Hair Repair Studio salonunun cam cepheli iç mekanı" />
          </div>
          <div className="hero-overlay" />

          <div className="hero-topline hero-enter">
            <span>Beylikdüzü / İstanbul</span>
            <span>Saç Stüdyosu</span>
          </div>

          <div className="hero-content">
            <p className="hero-eyebrow hero-enter"><Sparkles size={15} /> Bakım. Renk. Form.</p>
            <h1 className="hero-title hero-enter">
              <span>Saçınızın</span>
              <strong>yeni ritmi.</strong>
            </h1>
            <p className="hero-copy hero-enter">
              Kesimden renk dönüşümüne, özenli yaklaşımıyla Beylikdüzü'nde 5.0 puanlı bir saç stüdyosu.
            </p>
            <div className="hero-actions hero-enter">
              <a className="button button-acid" href={PHONE_LINK}>Randevu için ara <ArrowRight size={18} /></a>
              <a className="button button-glass" href={MAPS_URL} target="_blank" rel="noreferrer">Yol tarifi <ExternalLink size={17} /></a>
            </div>
          </div>

          <aside className="hero-rating hero-enter" aria-label="Google değerlendirmesi">
            <strong>5.0</strong>
            <div>
              <div className="stars" aria-label="5 yıldız üzerinden 5.0">
                {[0, 1, 2, 3, 4].map((star) => <Star key={star} size={13} fill="currentColor" />)}
              </div>
              <span>50 Google değerlendirmesi</span>
            </div>
          </aside>

          <a className="hero-scroll" href="#intro" aria-label="Aşağı kaydır">
            <ArrowDown size={18} />
            <span>Keşfet</span>
          </a>
        </section>

        <section className="intro section-pad" id="intro">
          <div className="intro-index reveal">
            <span>01 / YAKLAŞIM</span>
            <Scissors size={22} />
          </div>
          <div className="intro-copy reveal">
            <p className="eyebrow">HAİR REPAİR STUDİO</p>
            <h2>Değişim, saçınızı dinlemekle başlar.</h2>
            <p>
              FLAW, Beylikdüzü'nde aydınlık ve modern bir stüdyo deneyimi sunuyor. Google yorumlarında kesim, saç açma, kaliteli ürünler ve ilgili ekip yaklaşımı öne çıkıyor.
            </p>
          </div>
          <div className="intro-stamp reveal" aria-label="Google puanı 5.0">
            <span>GOOGLE</span>
            <strong>5.0</strong>
            <small>50 YORUM</small>
          </div>
        </section>

        <div className="kinetic-ribbon" aria-hidden="true">
          <div className="kinetic-track">
            <span>KESİM</span><i />
            <span>RENK</span><i />
            <span>BAKIM</span><i />
            <span>BEYLİKDÜZÜ</span><i />
            <span>KESİM</span><i />
            <span>RENK</span><i />
            <span>BAKIM</span><i />
            <span>BEYLİKDÜZÜ</span><i />
          </div>
        </div>

        <section className="services section-pad" id="services">
          <div className="services-heading reveal">
            <p className="eyebrow">02 / HİZMET ALANLARI</p>
            <h2>Saçınız için<br />net bir yön.</h2>
            <p>İşlem ayrıntıları, uygunluk ve ücret bilgisi için salonu arayın.</p>
          </div>

          <div className="service-list">
            {services.map((service) => (
              <article className="service-row reveal" key={service.number}>
                <span>{service.number}</span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
                <Sparkles size={20} />
              </article>
            ))}
          </div>
        </section>

        <section className="studio" id="studio">
          <div className="studio-heading section-pad reveal">
            <div>
              <p className="eyebrow">03 / STÜDYO</p>
              <h2>Gerçek mekan.<br />Gerçek detaylar.</h2>
            </div>
            <div className="gallery-controls">
              <span>{String(activeSlide + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span>
              <button type="button" aria-label="Önceki fotoğraf" onClick={() => moveGallery(-1)}><ArrowLeft /></button>
              <button type="button" aria-label="Sonraki fotoğraf" onClick={() => moveGallery(1)}><ArrowRight /></button>
            </div>
          </div>

          <div
            className="gallery-stage section-pad"
            onMouseEnter={() => { galleryPaused.current = true; }}
            onMouseLeave={() => { galleryPaused.current = false; }}
          >
            <button className="gallery-main reveal" type="button" onClick={() => setLightboxOpen(true)} aria-label={`${gallery[activeSlide].title} görselini büyüt`}>
              {gallery.map((item, index) => (
                <img
                  key={item.src}
                  className={index === activeSlide ? 'is-active' : ''}
                  src={item.src}
                  alt={item.alt}
                  loading={index < 2 ? 'eager' : 'lazy'}
                />
              ))}
              <span className="gallery-caption">
                <small>{gallery[activeSlide].note}</small>
                <strong>{gallery[activeSlide].title}</strong>
                <span>Görseli aç <ArrowRight size={17} /></span>
              </span>
            </button>

            <div className="gallery-thumbs reveal" aria-label="Stüdyo fotoğrafları">
              {gallery.map((item, index) => (
                <button
                  key={item.src}
                  className={index === activeSlide ? 'is-active' : ''}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`${item.title} fotoğrafını göster`}
                >
                  <img src={item.src} alt="" loading="lazy" />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="repair-lab section-pad">
          <div className="lab-image reveal">
            <img src="/generated/flaw-hair/images/color-products.jpg" alt="FLAW stüdyosundaki profesyonel saç ürünleri" loading="lazy" />
            <span>FLAW / PRODUCT DETAIL</span>
          </div>
          <div className="lab-copy reveal">
            <p className="eyebrow">04 / BAKIM YAKLAŞIMI</p>
            <h2>Ürün kadar, uygulama da önemli.</h2>
            <p>
              İşletmenin Google yorumlarında kaliteli ürünler ve özenli ekip yaklaşımı özellikle vurgulanıyor. Saçınız için önerilen işlemi ve bakım planını doğrudan stüdyoyla konuşun.
            </p>
            <a className="text-link" href={PHONE_LINK}>Bilgi almak için ara <ArrowRight size={18} /></a>
          </div>
        </section>

        <section className="proof section-pad" id="proof">
          <div className="proof-score reveal">
            <span>GOOGLE PUANI</span>
            <strong>5.0</strong>
            <div className="stars">
              {[0, 1, 2, 3, 4].map((star) => <Star key={star} size={19} fill="currentColor" />)}
            </div>
          </div>
          <div className="proof-copy reveal">
            <p className="eyebrow">50 GERÇEK DEĞERLENDİRME</p>
            <h2>İlgili ekip, özenli sonuç ve temiz bir stüdyo deneyimi.</h2>
            <p>Saç açma, kesim, kaliteli ürünler ve manikür; müşteri yorumlarında öne çıkan başlıklar arasında.</p>
            <div className="proof-tags">
              <span>Saç açma</span>
              <span>Kesim</span>
              <span>Kaliteli ürünler</span>
              <span>İlgili ekip</span>
              <span>Manikür</span>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-copy section-pad">
            <div className="contact-title reveal">
              <p className="eyebrow">05 / ZİYARET</p>
              <h2>Yeni görünümünüz için ilk adım.</h2>
              <a className="button button-acid" href={PHONE_LINK}>0540 337 10 37 <Phone size={17} /></a>
            </div>

            <div className="contact-details reveal">
              <article>
                <MapPin />
                <div>
                  <span>Adres</span>
                  <p>Yakuplu, 146. Sk. No:17/A, 34520 Beylikdüzü / İstanbul</p>
                  <a href={MAPS_URL} target="_blank" rel="noreferrer">Google Maps'te aç <ExternalLink size={14} /></a>
                </div>
              </article>
              <article>
                <CalendarDays />
                <div>
                  <span>Randevu</span>
                  <p>Uygun saat ve işlem bilgisi için gelmeden önce arayın.</p>
                </div>
              </article>
              <article>
                <Clock3 />
                <div className="hours-wrap">
                  <span>Çalışma saatleri</span>
                  <div className="hours-list">
                    {hours.map(([day, time]) => <p key={day}><b>{day}</b><em className={time === 'Kapalı' ? 'closed' : ''}>{time}</em></p>)}
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div className="map-frame section-pad reveal">
            <iframe
              title="FLAW Hair Repair Studio konumu"
              src="https://www.google.com/maps?q=40.9981782,28.6703842&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <section className="final-cta section-pad">
          <img src="/generated/flaw-hair/images/storefront.jpg" alt="" loading="lazy" />
          <div className="final-overlay" />
          <div className="final-copy reveal">
            <p className="eyebrow">FLAW HAİR REPAİR STUDİO</p>
            <h2>Sıradaki görünümünüz burada başlasın.</h2>
            <div>
              <a className="button button-acid" href={PHONE_LINK}>Randevu için ara <ArrowRight size={18} /></a>
              <a className="button button-glass" href={MAPS_URL} target="_blank" rel="noreferrer">Konumu aç <MapPin size={17} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-symbol">F</span>
          <div><strong>FLAW</strong><small>HAİR REPAİR STUDİO</small></div>
        </div>
        <div className="footer-links">
          <a href="#services">Hizmetler</a>
          <a href="#studio">Stüdyo</a>
          <a href={MAPS_URL} target="_blank" rel="noreferrer">Google Maps</a>
          <a href={PHONE_LINK}>Ara</a>
        </div>
        <p>© {new Date().getFullYear()} FLAW HAİR REPAİR STUDİO. Tüm hakları saklıdır.</p>
      </footer>

      <a className="buy-pill" href={CHECKOUT_URL} target="_blank" rel="noreferrer">
        <span>Beğendiyseniz, şimdi satın alın</span>
        <ArrowRight size={17} />
      </a>

      {lightboxOpen && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={gallery[activeSlide].title}>
          <button className="lightbox-close" type="button" onClick={() => setLightboxOpen(false)} aria-label="Görseli kapat"><X /></button>
          <img src={gallery[activeSlide].src} alt={gallery[activeSlide].alt} />
          <div className="lightbox-caption"><small>{String(activeSlide + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</small><strong>{gallery[activeSlide].title}</strong></div>
          <button className="lightbox-prev" type="button" onClick={() => moveGallery(-1)} aria-label="Önceki görsel"><ArrowLeft /></button>
          <button className="lightbox-next" type="button" onClick={() => moveGallery(1)} aria-label="Sonraki görsel"><ArrowRight /></button>
        </div>
      )}
    </div>
  );
}

export default App;
