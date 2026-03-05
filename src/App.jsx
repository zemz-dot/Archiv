import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Plus,
  ArrowDown,
  ShoppingBag,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import rentVisual from './assets/how-to-rent.png';
import AppDownloadPopup from './components/ui/AppDownloadPopup';

const USERS = [
  { id: 1, name: 'bellahadid', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop' },
  { id: 2, name: 'emmachamberlain', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop' },
  { id: 3, name: 'sophiaroe', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=150&auto=format&fit=crop' },
];

const POSTS = [
  {
    id: 1,
    title: "VINTAGE SLIP",
    price: 85,
    rrp: 1200,
    user: 'bellahadid',
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop",
    brand: "SAINT LAURENT",
    location: "NEW YORK",
    size: "UK 8",
    color: "Noir",
    category: "Dresses",
    occasion: "Evening",
    description: "A piece of history. Perfectly preserved silk archive."
  },
  {
    id: 2,
    title: "OVERSIZED SHELL",
    price: 120,
    rrp: 850,
    user: 'sophiaroe',
    image: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=1000&auto=format&fit=crop",
    brand: "ACNE STUDIOS",
    location: "BERLIN",
    size: "UK 10",
    color: "Sage",
    category: "Outerwear",
    occasion: "Daily",
    description: "Volume and texture. Authentic Stockholm archive."
  },
  {
    id: 3,
    title: "TAN LEATHER TOTE",
    price: 45,
    rrp: 2100,
    user: 'emmachamberlain',
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop",
    brand: "CELINE",
    location: "PARIS",
    size: "OS",
    color: "Tan",
    category: "Bags",
    occasion: "Work",
    description: "Minimalist leather for everyday rotation."
  },
  {
    id: 4,
    title: "STRUCTURED KNIT",
    price: 70,
    rrp: 450,
    user: 'sophiaroe',
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1000&auto=format&fit=crop",
    brand: "MAX MARA",
    location: "MILAN",
    size: "UK 12",
    color: "Cream",
    category: "Knitwear",
    occasion: "Daily",
    description: "Italian cashmere. Weightless and warm."
  },
  {
    id: 5,
    title: "UTILITY DENIM",
    price: 40,
    rrp: 300,
    user: 'alex_nyc',
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000&auto=format&fit=crop",
    brand: "OUR LEGACY",
    location: "LA",
    size: "UK 30",
    color: "Indigo",
    category: "Denim",
    occasion: "Casual",
    description: "Raw indigo. Worn-in perfection."
  },
  {
    id: 6,
    title: "SILK MAXI",
    price: 250,
    rrp: 3500,
    user: 'zara_dubai',
    image: "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=1000&auto=format&fit=crop",
    brand: "ELIE SAAB",
    location: "DUBAI",
    size: "UK 6",
    color: "Silver",
    category: "Dresses",
    occasion: "Wedding Guest",
    description: "Hand-embellished couture. A moment captured."
  },
  {
    id: 7,
    title: "ARCHIVE TRENCH",
    price: 95,
    rrp: 1800,
    user: 'haileybieber',
    image: "https://images.unsplash.com/photo-1594235412402-b5ecd2f84446?q=80&w=1000&auto=format&fit=crop",
    brand: "BURBERRY",
    location: "LONDON",
    size: "UK 8",
    color: "Beige",
    category: "Outerwear",
    occasion: "Rainy Day",
    description: "The definitive gabardine. A staple for rainy days in the city."
  },
  {
    id: 8,
    title: "VELVET LOAFER",
    price: 50,
    rrp: 650,
    user: 'luca_roma',
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1000&auto=format&fit=crop",
    brand: "GUCCI",
    location: "ROME",
    size: "UK 9",
    color: "Emerald",
    category: "Shoes",
    occasion: "Evening",
    description: "Emerald velvet. Handcrafted in Italy."
  },
  {
    id: 9,
    title: "TECH SHELL",
    price: 65,
    rrp: 400,
    user: 'mia_tokyo',
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop",
    brand: "ARC'TERYX",
    location: "SEATTLE",
    size: "UK 10",
    color: "Black",
    category: "Outerwear",
    occasion: "Sport",
    description: "Performance meets archive. High-altitude rotation."
  },
  {
    id: 10,
    title: "CROPPED BIKER",
    price: 110,
    rrp: 1500,
    user: 'bellahadid',
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop",
    brand: "CASSANDRA",
    location: "NYC",
    size: "UK 8",
    color: "Black",
    category: "Outerwear",
    occasion: "Evening",
    description: "Heavyweight grained leather. Perfectly distressed."
  },
  {
    id: 11,
    title: "MONOGRAM TOTE",
    price: 55,
    rrp: 1800,
    user: 'oliviapalermo',
    image: "https://images.unsplash.com/photo-1584917033904-491a3c7c259b?q=80&w=1000&auto=format&fit=crop",
    brand: "FENDI",
    location: "MILAN",
    size: "OS",
    color: "Brown",
    category: "Bags",
    occasion: "Daily",
    description: "Iconic archive accessory. Timeless silhouette."
  },
  {
    id: 12,
    title: "LINEN RESORT",
    price: 35,
    rrp: 250,
    user: 'bella_miami',
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    brand: "CULT GAIA",
    location: "MIAMI",
    size: "UK 10",
    color: "White",
    category: "Dresses",
    occasion: "Vacation",
    description: "Vibrant and weightless. Perfect for beach sunsets."
  }
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`header-fixed ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="brand-wrapper">
        <span className="brand-name">ARCHIV</span>
        <span className="brand-tagline">BY Z3MZ</span>
      </div>

      <div className="nav-innovative">
        <a href="#feed">Explore</a>
        <a href="#collections">Archive</a>
        <a href="#how">Loop</a>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <button style={{ fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase' }}>Sign In</button>
        <button className="btn-primary" style={{ padding: '8px 20px', borderRadius: '40px' }}>Join</button>
      </div>
    </nav>
  );
};

const PostModal = ({ post, onClose }) => {
  const [selectedDuration, setSelectedDuration] = useState('4');

  if (!post) return null;

  const rentalOptions = [
    { id: '4', days: '4+ days', daily: '£11.00', total: '£44', recommended: true },
    { id: '7', days: '7+ days', daily: '£6.71', total: '£47', recommended: false },
    { id: '28', days: '28+ days', daily: '£4.43', total: '£124', recommended: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-luxe-overlay"
      onClick={onClose}
    >
      <div className="modal-container-pdp" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'fixed', top: 40, right: 40, zIndex: 10 }}>
          <X size={32} />
        </button>

        <div className="pdp-gallery">
          <div className="pdp-thumbnails">
            {[post.image, post.image, post.image].map((img, i) => (
              <div key={i} className={`thumb-item ${i === 0 ? 'active' : ''}`}>
                <img src={img} alt="thumbnail" />
              </div>
            ))}
          </div>
          <div className="pdp-main-img">
            <img src={post.image} alt={post.title} />
          </div>
        </div>

        <div className="pdp-info-sidebar">
          <div className="pdp-brand">{post.brand}</div>
          <h1 className="pdp-title">{post.title}</h1>
          <div className="pdp-price">${post.price} <span>/ day</span></div>
          <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '5px', marginBottom: '30px' }}>RRP ${post.rrp}</div>

          <div className="pdp-section">
            <span className="pdp-label">Rental Options</span>
            <div className="rental-duration-options">
              {rentalOptions.map(option => (
                <div
                  key={option.id}
                  className={`rental-option-card ${selectedDuration === option.id ? 'selected' : ''}`}
                  onClick={() => setSelectedDuration(option.id)}
                >
                  {option.recommended && <div className="recommended-badge">Recommended</div>}
                  <div className="duration-info">
                    <div className="duration-days">{option.days}</div>
                    <div className="duration-daily-price">{option.daily}/day</div>
                  </div>
                  <div className="duration-total">
                    <div className="total-label">From</div>
                    <div className="total-price">{option.total}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pdp-section">
            <span className="pdp-label">Select Rental Dates</span>
            <div className="calendar-mock">
              {Array.from({ length: 31 }).map((_, i) => (
                <div key={i} className={`cal-day ${i > 10 && i < 25 ? 'avail' : ''}`}>
                  {i + 1}
                </div>
              ))}
            </div>
            <div style={{ marginTop: '10px', fontSize: '0.7rem', color: '#888' }}>
              Minimum rental: {selectedDuration === '28' ? '28' : selectedDuration === '7' ? '7' : '4'} days for this selection.
            </div>
          </div>

          <div className="pdp-section">
            <span className="pdp-label">Size</span>
            <div className="size-selector">
              {['UK 6', 'UK 8', 'UK 10', 'UK 12', 'OS'].map(size => (
                <div key={size} className={`size-pill ${size === post.size ? 'active' : ''}`}>{size}</div>
              ))}
            </div>
          </div>

          <div className="pdp-section">
            <span className="pdp-label">Lender</span>
            <div className="lender-badge">
              <div className="lender-avatar" style={{ background: `url(https://i.pravatar.cc/150?u=${post.user}) center/cover` }}></div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>@{post.user}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 700 }}>VERIFIED ARCHIVIST</div>
              </div>
            </div>
          </div>

          <div className="pdp-section">
            <button className="pdp-btn">
              RENT NOW
            </button>
            <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.75rem', textDecoration: 'underline', color: '#888', cursor: 'pointer' }}>
              Ask the Lender a Question
            </div>
          </div>

          <div className="app-download-pdp">
            <p>Scan the code to download/open the app & rent this item!</p>
            <div className="qr-placeholder">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://archiv.app/rent/sweatshirt" alt="QR Code" />
            </div>
          </div>

          <div style={{ marginTop: '40px', paddingBottom: '40px', fontSize: '0.9rem', color: '#555', lineHeight: 1.6 }}>
            {post.description} This archive piece has been curated for the modern circulator.
            Includes professional dry cleaning and ARCHIV insurance.
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const HowItWorks = () => (
  <section id="how" className="manual-section">
    <div className="container-luxe">
      <header className="manual-header-luxe">
        <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.2em' }}>THE ARCHIV WAY</span>
        <h2>The Circulation Manual</h2>
      </header>

      {/* Magazine Spread: How to Rent */}
      <div className="manual-grid" style={{ marginBottom: '200px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div style={{ marginBottom: '60px' }}>
            <span className="pdp-brand" style={{ color: '#aaa' }}>PROTOCOL 01</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '4rem', fontStyle: 'italic' }}>How to Rent</h3>
          </div>

          <div style={{ display: 'grid', gap: '20px' }}>
            {[
              { step: "01", title: "CHOOSE YOUR ARCHIVE", desc: "Browse over 150,000 items. Find listings in your local area using the ‘Rentals Near Me’ tool." },
              { step: "02", title: "SEND RENTAL REQUESTS", desc: "Select dates and enter delivery details to submit your request. Communicate directly with your Lender." },
              { step: "03", title: "RECEIVE YOUR RENTAL", desc: "Arrange delivery or in person collection. Receive your item and enjoy your rotated look!" },
              { step: "04", title: "LEAVE A REVIEW", desc: "Once returned, leave a review. Share your look by tagging @archiv_z3mz." }
            ].map(s => (
              <div key={s.step} className="step-card-luxe">
                <div className="step-num-luxe">{s.step}</div>
                <div className="step-content-luxe">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="manual-img-matte"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ maxWidth: '400px', alignSelf: 'center' }}
        >
          <img src={rentVisual} alt="Rent Manual Visual" />
          <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '3rem', color: '#eee', zIndex: -2 }}>Editorial</div>
        </motion.div>
      </div>

      {/* Magazine Spread: How to Lend */}
      <div className="manual-grid" style={{ marginBottom: '200px', gridTemplateColumns: '0.8fr 1.2fr' }}>
        <motion.div
          className="manual-img-matte"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ maxWidth: '400px', alignSelf: 'center', gridRow: '1' }}
        >
          <img src="https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=2000&auto=format&fit=crop" alt="Lend Manual Visual" />
          <div style={{ position: 'absolute', top: '-40px', left: '-40px', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '3rem', color: '#eee', zIndex: -2 }}>Archivist</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ paddingLeft: '60px' }}
        >
          <div style={{ marginBottom: '60px' }}>
            <span className="pdp-brand" style={{ color: '#aaa' }}>PROTOCOL 02</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '4rem', fontStyle: 'italic' }}>How to Lend</h3>
          </div>

          <div style={{ display: 'grid', gap: '20px' }}>
            {[
              { step: "01", title: "LIST YOUR WARDROBE", desc: "List in under 2 minutes. Upload 3+ photos and write a clear description." },
              { step: "02", title: "APPROVE REQUESTS", desc: "You choose to approve or decline. Communicate directly with your potential Renter." },
              { step: "03", title: "SEND YOUR RENTAL", desc: "Once accepted, either send or arrange collection. Renters return it, you handle cleaning." },
              { step: "04", title: "GET PAID", desc: "Once complete, leave feedback. Payment available in your balance in 1-2 days." }
            ].map(s => (
              <div key={s.step} className="step-card-luxe">
                <div className="step-num-luxe">{s.step}</div>
                <div className="step-content-luxe">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Ecosystem Section */}
      <div style={{ background: '#000', color: '#fff', padding: '120px 8%', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: 'var(--accent)', filter: 'blur(150px)', opacity: 0.2 }}></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent)' }}>THE ECOSYSTEM</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '4.5rem', marginTop: '20px', lineHeight: 0.9 }}>Dashboard & Wallet</h2>
            <p style={{ fontSize: '1.2rem', color: '#999', marginTop: '40px', lineHeight: 1.6 }}>
              The circular economy reimagined. Use your earnings to fund your next rotation instantly. No withdrawals needed, just pure circulation.
            </p>
            <button className="btn-primary" style={{ marginTop: '50px', padding: '20px 40px', background: '#fff', color: '#000' }}>Explore Your Wallet</button>
          </div>
          <div style={{ position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop" style={{ width: '100%', borderRadius: '8px', opacity: 0.8 }} alt="Dashboard preview" />
            <div style={{ position: 'absolute', inset: '0', background: 'linear-gradient(to top, #000, transparent)' }}></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HeroSection = () => (
  <section className="hero-br">
    <div className="hero-br-content">
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Lend & Monetize <br /> Your Wardrobe.
      </motion.h1>
      <p>
        The world's largest shared wardrobe. Join our community-powered platform transforming how we consume fashion.
        <b> US Based. Global Reach.</b>
      </p>
      <div className="br-btn-group">
        <button className="btn-primary" style={{ padding: '20px 40px' }} onClick={() => document.getElementById('shop').scrollIntoView({ behavior: 'smooth' })}>
          Shop The Archive
        </button>
        <button style={{ background: '#fff', border: '1px solid #000', padding: '20px 40px', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem' }}>
          How it Works
        </button>
      </div>
    </div>
    <div className="hero-br-img">
      <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2000&auto=format&fit=crop" alt="Hero Archive" />
    </div>
  </section>
);

const BenefitSection = () => (
  <section className="benefits-section">
    <div className="container-luxe">
      <div className="benefits-grid">
        <div className="benefit-item">
          <div className="benefit-icon"><Plus size={32} /></div>
          <h3>List Your Archive</h3>
          <p>List your items in under 2 minutes. Peer-to-peer fashion sharing at its most fluid.</p>
        </div>
        <div className="benefit-item">
          <div className="benefit-icon"><ShoppingBag size={32} /></div>
          <h3>Rent Designer</h3>
          <p>Browse over 150,000 items from the archives of America’s tastemakers.</p>
        </div>
        <div className="benefit-item">
          <div className="benefit-icon"><Star size={32} /></div>
          <h3>Consume Consciously</h3>
          <p>Extend the lifecycle of fashion. Join the circular economy without compromise.</p>
        </div>
      </div>
    </div>
  </section>
);

const ShowcaseSection = () => (
  <section style={{ padding: '100px 0', borderTop: '1px solid #eee' }}>
    <div className="container-luxe">
      <div className="showcase-row">
        <div className="showcase-img">
          <img src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=1500&auto=format&fit=crop" alt="Men's Wardrobe" />
        </div>
        <div className="showcase-text">
          <span style={{ color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em' }}>Curated Selections</span>
          <h2>The Tastemaker List</h2>
          <p>Rent directly from the closets of US fashion icons. From Bella Hadid's staples to Emma Chamberlain's vintage gems.</p>
          <button className="btn-primary" style={{ padding: '15px 30px', background: 'transparent', color: '#000', border: '1px solid #000' }}>Explore Lists</button>
        </div>
      </div>

      <div className="showcase-row">
        <div className="showcase-img">
          <img src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1500&auto=format&fit=crop" alt="Archive Space" />
        </div>
        <div className="showcase-text">
          <span style={{ color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em' }}>New Feature</span>
          <h2>Rentals Near Me</h2>
          <p>DiscoverJacquemus and Self-Portrait just streets away. Pick up your rental with ease and minimize your footprint.</p>
          <button className="btn-primary" style={{ padding: '15px 30px' }}>Discover Locally</button>
        </div>
      </div>
    </div>
  </section>
);

const MembershipPage = () => (
  <div style={{ background: '#fff' }}>
    <section className="membership-hero">
      <span style={{ color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.2em' }}>Privileges</span>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '5rem', marginTop: '10px' }}>Elevate Your Loop</h1>
      <p style={{ maxWidth: '600px', margin: '20px auto', color: '#666', fontSize: '1.1rem' }}>
        Unlock premium features, lower fees, and priority access to the most coveted archives in the world.
      </p>
    </section>

    <div className="pricing-grid">
      <div className="price-card">
        <span style={{ fontSize: '0.7rem', fontWeight: 700, marginBottom: '20px', display: 'block' }}>SILVER</span>
        <h3>Standard</h3>
        <div className="price">$25 <span>/ mo</span></div>
        <ul>
          <li><Star size={16} /> 10% off all rentals</li>
          <li><Star size={16} /> 1 Insurance waiver / mo</li>
          <li><Star size={16} /> Standard cleaning</li>
        </ul>
        <button className="btn-primary" style={{ width: '100%', padding: '15px' }}>Subscribe</button>
      </div>

      <div className="price-card featured">
        <div style={{ position: 'absolute', top: '20px', right: '40px', background: 'var(--accent)', color: '#fff', fontSize: '0.6rem', padding: '4px 10px', borderRadius: '20px', fontWeight: 700 }}>MOST POPULAR</div>
        <span style={{ fontSize: '0.7rem', fontWeight: 700, marginBottom: '20px', display: 'block', color: 'rgba(255,255,255,0.6)' }}>GOLD</span>
        <h3>Archivist</h3>
        <div className="price">$55 <span>/ mo</span></div>
        <ul>
          <li><Star size={16} /> 20% off all rentals</li>
          <li><Star size={16} /> Unlimited items / mo</li>
          <li><Star size={16} /> 2 Insurance waivers / mo</li>
          <li><Star size={16} /> Priority collection</li>
        </ul>
        <button className="btn-primary" style={{ width: '100%', padding: '15px', background: '#fff', color: '#000' }}>Subscribe</button>
      </div>

      <div className="price-card">
        <span style={{ fontSize: '0.7rem', fontWeight: 700, marginBottom: '20px', display: 'block' }}>PLATINUM</span>
        <h3>Curator</h3>
        <div className="price">$95 <span>/ mo</span></div>
        <ul>
          <li><Star size={16} /> 30% off all rentals</li>
          <li><Star size={16} /> Free dry cleaning</li>
          <li><Star size={16} /> Concierge styling</li>
          <li><Star size={16} /> White glove delivery</li>
        </ul>
        <button className="btn-primary" style={{ width: '100%', padding: '15px' }}>Subscribe</button>
      </div>
    </div>

    <section className="credits-container">
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem' }}>ARCHIV Credits</h2>
        <p style={{ color: '#666' }}>Top up your balance for instant rentals.</p>
      </div>
      <div className="credits-grid">
        {[
          { credits: 100, cost: 10 },
          { credits: 500, cost: 45 },
          { credits: 1200, cost: 100 },
          { credits: 3000, cost: 240 }
        ].map(pack => (
          <div key={pack.credits} className="credit-pack">
            <h4>{pack.credits}</h4>
            <div className="cost">${pack.cost}</div>
            <p style={{ fontSize: '0.7rem', marginTop: '10px' }}>CREDITS</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const COLLECTIONS = [
  { id: 'birthday', title: 'Birthday', items: 240, image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop', desc: 'The ultimate edit for your special day. From statement minis to elegant midis.' },
  { id: 'wedding', title: 'Wedding Guest', items: 560, image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop', desc: 'Be the best-dressed guest with our curated archive of luxury occasion wear.' },
  { id: 'vacation', title: 'Vacation Edit', items: 180, image: 'https://images.unsplash.com/photo-1520931061294-7ca04b97ea2a?q=80&w=1000&auto=format&fit=crop', desc: 'Resort-ready pieces for your next getaway. Light linens and vibrant prints.' },
  { id: 'work', title: 'Power Dressing', items: 320, image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1000&auto=format&fit=crop', desc: 'Elevated staples for the modern professional. Structured blazers and timeless knits.' },
  { id: 'party', title: 'Late Night', items: 410, image: 'https://images.unsplash.com/photo-1466150036782-869a824aeb25?q=80&w=1000&auto=format&fit=crop', desc: 'Pieces designed for the dance floor. High-shine fabrics and daring silhouettes.' },
  { id: 'winter', title: 'Winter Archive', items: 215, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop', desc: 'Heavyweight heritage pieces to keep you warm and avant-garde.' }
];

const CollectionsGrid = ({ onSelect }) => (
  <section style={{ padding: '160px 0' }}>
    <div className="container-luxe">
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <span style={{ color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.2em' }}>Curation</span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '5rem', marginTop: '10px' }}>Explore Collections</h2>
      </div>
      <div className="collections-grid">
        {COLLECTIONS.map(col => (
          <div key={col.id} className="collection-card" onClick={() => onSelect(col)}>
            <img src={col.image} alt={col.title} />
            <div className="collection-card-overlay">
              <span>{col.items} Items</span>
              <h3>{col.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem', fontWeight: 700 }}>
                VIEW COLLECTION <ArrowRight size={12} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CollectionDetail = ({ collection, onBack, onPostClick }) => (
  <div style={{ background: '#fff' }}>
    <section className="collection-hero">
      <div className="container-luxe">
        <div style={{ marginBottom: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', fontWeight: 700 }} onClick={onBack}>
          <ArrowRight style={{ transform: 'rotate(180deg)' }} size={16} /> BACK TO COLLECTIONS
        </div>
        <span style={{ color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem' }}>ARCHIV COLLECTION</span>
        <h1>{collection.title}</h1>
        <p>{collection.desc}</p>
      </div>
    </section>

    <section style={{ padding: '80px 0' }}>
      <div className="container-luxe">
        <div className="market-grid">
          {POSTS.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="item-card-br"
              onClick={() => onPostClick(post)}
            >
              <div className="item-img-wrapper">
                <img src={post.image} alt={post.title} loading="lazy" />
                <div className="heart-btn">
                  <Plus size={18} style={{ transform: 'rotate(45deg)' }} />
                </div>
              </div>
              <div className="item-card-details">
                <div className="brand">{post.brand}</div>
                <div className="title">{post.title}</div>
                <div style={{ fontSize: '0.7rem', color: '#999', marginBottom: '8px' }}>Size: {post.size} • RRP ${post.rrp}</div>
                <div className="price-row">
                  <div className="price">${post.price} <span>/ day</span></div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent)' }}>{collection.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

function App() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [view, setView] = useState('home'); // home, collections, detail
  const [selectedCollection, setSelectedCollection] = useState(null);

  // Filter States
  const [filters, setFilters] = useState({
    category: 'All',
    size: 'All',
    color: 'All',
    occasion: 'All'
  });

  const filteredPosts = POSTS.filter(post => {
    return (filters.category === 'All' || post.category === filters.category) &&
      (filters.size === 'All' || post.size === filters.size) &&
      (filters.color === 'All' || post.color === filters.color) &&
      (filters.occasion === 'All' || post.occasion === filters.occasion);
  });

  const handleCollectionSelect = (col) => {
    setSelectedCollection(col);
    setView('detail');
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      <nav className={`header-fixed header-scrolled`}>
        <div className="brand-wrapper" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>
          <span className="brand-name">ARCHIV</span>
          <span className="brand-tagline">BY Z3MZ</span>
        </div>

        <div className="nav-innovative">
          <a href="#" onClick={() => setView('home')}>Explore</a>
          <a href="#" onClick={() => setView('collections')}>Collections</a>
          <a href="#" onClick={() => setView('membership')}>Membership</a>
          <a href="#how" onClick={() => setView('home')}>Loop</a>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button style={{ fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase' }}>Sign In</button>
          <button className="btn-primary" style={{ padding: '8px 20px', borderRadius: '40px' }}>Join</button>
        </div>
      </nav>

      {view === 'home' && (
        <>
          <HeroSection />
          <BenefitSection />
          <ShowcaseSection />

          <section id="shop" style={{ padding: '100px 0', background: '#fff' }}>
            <div className="container-luxe">
              <div style={{ marginBottom: '60px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
                  <div>
                    <span style={{ color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem' }}>Global Loop</span>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem' }}>The Archive Feed</h2>
                  </div>
                  <div style={{ display: 'flex', gap: '30px' }} onClick={() => setView('collections')}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#aaa', cursor: 'pointer', borderBottom: '1px solid #000', paddingBottom: '5px' }}>VIEW ALL COLLECTIONS</span>
                  </div>
                </div>

                {/* MVP Filter Bar */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', background: '#f9f9f9', padding: '30px', borderRadius: '4px', marginBottom: '40px' }}>
                  <div className="filter-group">
                    <label style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Category</label>
                    <div className="category-filter-bar" style={{ padding: 0, margin: 0, gap: '10px' }}>
                      {['All', 'Dresses', 'Bags', 'Outerwear', 'Knitwear', 'Shoes', 'Sweatshirts'].map(cat => (
                        <div
                          key={cat}
                          className={`category-pill ${filters.category === cat ? 'active' : ''}`}
                          onClick={() => setFilters({ ...filters, category: cat })}
                          style={{ fontSize: '0.65rem', padding: '10px 15px' }}
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="filter-group">
                    <label style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Size (UK)</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {['All', 'UK 6', 'UK 8', 'UK 10', 'UK 12', 'UK 30', 'OS'].map(size => (
                        <div
                          key={size}
                          className={`category-pill ${filters.size === size ? 'active' : ''}`}
                          onClick={() => setFilters({ ...filters, size: size })}
                          style={{ fontSize: '0.65rem', padding: '10px 12px' }}
                        >
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="filter-group">
                    <label style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Occasion</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {['All', 'Wedding Guest', 'Evening', 'Daily', 'Casual', 'Vacation', 'Rainy Day', 'Sport', 'Work'].map(occ => (
                        <div
                          key={occ}
                          className={`category-pill ${filters.occasion === occ ? 'active' : ''}`}
                          onClick={() => setFilters({ ...filters, occasion: occ })}
                          style={{ fontSize: '0.65rem', padding: '10px 12px' }}
                        >
                          {occ}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="market-grid">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="item-card-br"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="item-img-wrapper">
                      <img src={post.image} alt={post.title} loading="lazy" />
                      <div className="heart-btn" onClick={(e) => { e.stopPropagation(); }}>
                        <Plus size={18} style={{ transform: 'rotate(45deg)' }} />
                      </div>
                    </div>
                    <div className="item-card-details">
                      <div className="brand">{post.brand}</div>
                      <div className="title">{post.title}</div>
                      <div style={{ fontSize: '0.7rem', color: '#999', marginBottom: '8px' }}>Size: {post.size} • RRP ${post.rrp}</div>
                      <div className="price-row">
                        <div className="price">${post.price} <span>/ day</span></div>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent)' }}>{post.occasion}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '100px 0', opacity: 0.5 }}>
                  <p>No archive pieces found matching those filters.</p>
                  <button
                    onClick={() => setFilters({ category: 'All', size: 'All', color: 'All', occasion: 'All' })}
                    style={{ marginTop: '20px', textDecoration: 'underline', cursor: 'pointer', background: 'none', border: 'none' }}
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              <div style={{ textAlign: 'center', marginTop: '80px' }}>
                <button className="btn-primary" style={{ padding: '20px 60px' }}>View All Feed</button>
              </div>
            </div>
          </section>
          <HowItWorks />
        </>
      )}

      {view === 'collections' && (
        <CollectionsGrid onSelect={handleCollectionSelect} />
      )}

      {view === 'membership' && (
        <MembershipPage />
      )}

      {view === 'detail' && selectedCollection && (
        <CollectionDetail
          collection={selectedCollection}
          onBack={() => setView('collections')}
          onPostClick={setSelectedPost}
        />
      )}

      <footer style={{ padding: '100px 4%', borderTop: '1px solid #eee', background: '#fff' }}>
        <div className="container-luxe">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem' }}>ARCHIV</h2>
              <p style={{ color: '#888', marginTop: '10px' }}>Powered by Z3mz</p>
            </div>
            <div style={{ display: 'flex', gap: '100px' }}>
              <div style={{ display: 'grid', gap: '12px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>COMMUNITY</span>
                <a href="#" style={{ textDecoration: 'none', color: '#666', fontSize: '0.9rem' }}>The Loop</a>
                <a href="#" style={{ textDecoration: 'none', color: '#666', fontSize: '0.9rem' }}>Tastemakers</a>
                <a href="#" style={{ textDecoration: 'none', color: '#666', fontSize: '0.9rem' }}>Security</a>
              </div>
              <div style={{ display: 'grid', gap: '12px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>LEGAL</span>
                <a href="#" style={{ textDecoration: 'none', color: '#666', fontSize: '0.9rem' }}>Terms</a>
                <a href="#" style={{ textDecoration: 'none', color: '#666', fontSize: '0.9rem' }}>Privacy</a>
                <a href="#" style={{ textDecoration: 'none', color: '#666', fontSize: '0.9rem' }}>Protection</a>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '80px', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5 }}>
            © 2026 ARCHIV BY Z3MZ. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>

      <div className="powered-by">POWERED BY Z3MZ</div>

      <AnimatePresence>
        {selectedPost && (
          <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
        )}
      </AnimatePresence>
      <AppDownloadPopup />
    </div>
  );
}

export default App;
