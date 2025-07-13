import "./LandingPage.css";
import heroImage from "../../assets/hero-beef.jpeg"; // Replace with your actual image path
import product1 from "../../assets/beef-premium.jpeg";
import product2 from "../../assets/beef-stew.jpeg";
import product3 from "../../assets/beef-offals.jpeg";
import { useState } from "react";
import { Link } from "react-router-dom";
import AppDownload from "../../components/AppDownload/AppDownload";

export default function LandingPage() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Premium, Fresh Beef Delivered to Your Doorstep</h1>
          <p>
            From trusted farms to your table — explore our wide range of beef
            cuts and products.
          </p>
          <Link to={"/menu"} className="cta-btn">
            Browse Products
          </Link>
        </div>
      </section>

      {/* Highlights */}
      <section className="highlights-section">
        <div className="highlight">Fresh, Premium Beef</div>
        <div className="highlight">Affordable Prices</div>
        <div className="highlight">Nationwide Delivery</div>
        <div className="highlight">Hygienic, Professional Handling</div>
      </section>

      {/* Product Categories Preview */}
      <section className="products-preview">
        <h2>A Little From Our Beef Categories</h2>
        <div className="products-grid">
          <div className="product-card">
            <img src={product1} alt="Premium Cuts" />
            <h3>Premium Cuts</h3>
          </div>
          <div className="product-card">
            <img src={product2} alt="Economy Cuts" />
            <h3>Economy Cuts</h3>
          </div>
          <div className="product-card">
            <img src={product3} alt="Offals & Organs" />
            <h3>Offals & Organs</h3>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">1. Explore Products</div>
          <div className="step">2. Place Your Order</div>
          <div className="step">3. We Process & Package</div>
          <div className="step">4. Delivered to You</div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About Cornerstone Beef</h2>
        <p>
          At Cornerstone Beef, we’re passionate about supplying homes, markets,
          and food businesses with fresh, high-quality beef. With years of
          experience and a commitment to excellence, we ensure only the best
          reaches your kitchen.
        </p>
      </section>

      {/* Call-to-Action Banner */}
      <section className="cta-banner">
        <h2>Ready to Experience Quality Beef?</h2>
        <Link to={"/menu"} className="cta-btn">
          Shop Now
        </Link>
        <a href="#footer" className="cta-btn secondary">
          Contact Sales
        </a>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter-section">
        <h2>Stay Updated</h2>
        <form onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      {/* Download Mobile App */}
      <AppDownload />
    </div>
  );
}
