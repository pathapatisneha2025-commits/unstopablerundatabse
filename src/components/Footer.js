import React from "react";
import { Link } from "react-router-dom"; // Added for optimized navigation
import { 
  FaInstagram, 
  FaFacebookF, 
  FaTwitter, 
  FaYoutube, 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaPhoneAlt 
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main-grid">
          
          {/* Brand Info Section */}
          <div className="footer-brand">
          <img src="/companylogo.png" alt="RUNN" className="logo-desktop" />
            <p className="brand-tagline">UNSTOPPABLE YOU</p>
            <p className="brand-description">
              Premium athletic wear engineered for performance. 
              Push your limits with gear that keeps up.
            </p>
            <div className="social-icons">
              {/* External links keep <a> tags */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>

          {/* Links Grid - Replaced <a> with <Link> */}
          <div className="links-container">
            <div className="footer-column">
              <h3>Shop</h3>
              <ul>
                <li><Link to="/shop/men">Men</Link></li>
                <li><Link to="/shop/women">Women</Link></li>
                <li><Link to="/shop/accessories">Accessories</Link></li>
                <li><Link to="/shop/new">New Arrivals</Link></li>
                <li><Link to="/shop/sale">Sale</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Support</h3>
              <ul>
                <li><Link to="/size-guide">Size Guide</Link></li>
                <li><Link to="/shipping">Shipping</Link></li>
                <li><Link to="/returns">Returns</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Company</h3>
              <ul>
                <li><Link to="/about">About RUNN</Link></li>
                <li><Link to="/sustainability">Sustainability</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/press">Press</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="footer-column contact-info">
            <h3>Contact</h3>
            <div className="contact-details">
              <div className="contact-item">
                <FaMapMarkerAlt className="icon-orange" />
                <span>123 Fitness Street, Active City, AC 12345</span>
              </div>
              <div className="contact-item">
                <FaEnvelope className="icon-orange" />
                <span>hello@runn.com</span>
              </div>
              <div className="contact-item">
                <FaPhoneAlt className="icon-orange" />
                <span>+1 (234) 567-890</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright">© {currentYear} RUNN. All rights reserved.</p>
          <div className="legal-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>

      <style>{`
        /* Styles remain the same for responsiveness */
        .footer { background-color: #1a1e23; color: #ffffff; padding: 80px 20px 40px; font-family: 'Inter', sans-serif; }
        .footer-container { max-width: 1200px; margin: 0 auto; }
        .footer-main-grid { display: grid; grid-template-columns: 1.5fr 3fr 1.2fr; gap: 60px; padding-bottom: 50px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
        .brand-logo { font-size: 32px; font-weight: 900; letter-spacing: 2px; margin: 0; }
        .brand-tagline { color: #ff6a00; font-size: 12px; font-weight: 700; letter-spacing: 2px; margin-bottom: 20px; }
        .brand-description { color: #9ca3af; font-size: 14px; line-height: 1.6; margin-bottom: 25px; }
        .social-icons { display: flex; gap: 15px; }
        .social-icons a { width: 38px; height: 38px; background: rgba(255, 255, 255, 0.08); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; transition: 0.3s ease; }
        .social-icons a:hover { background-color: #ff6a00; }
        .links-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .footer-column h3 { font-size: 18px; font-weight: 700; margin-bottom: 25px; color: white; text-transform: uppercase; }
        .footer-column ul { list-style: none; padding: 0; margin: 0; }
        .footer-column ul li { margin-bottom: 15px; }
        .footer-column ul li a { color: #9ca3af; text-decoration: none; font-size: 14px; transition: 0.2s; }
        .footer-column ul li a:hover { color: #ff6a00; }
        .contact-details { display: flex; flex-direction: column; gap: 15px; }
        .contact-item { display: flex; align-items: flex-start; gap: 12px; color: #9ca3af; font-size: 14px; }
        .icon-orange { color: #ff6a00; margin-top: 3px; flex-shrink: 0; }
        .footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 30px; color: #6b7280; font-size: 13px; }
        .legal-links { display: flex; gap: 30px; }
        .legal-links a { color: #6b7280; text-decoration: none; }

        @media (max-width: 1024px) {
          .footer-main-grid { grid-template-columns: 1fr; text-align: center; }
          .links-container { grid-template-columns: repeat(3, 1fr); }
          .social-icons, .contact-item { justify-content: center; }
        }

        @media (max-width: 640px) {
          .links-container { grid-template-columns: 1fr; gap: 30px; }
          .footer-bottom { flex-direction: column; gap: 20px; }
        }
      `}</style>
    </footer>
  );
}