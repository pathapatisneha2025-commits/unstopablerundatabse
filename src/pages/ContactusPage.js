import React from "react";
import { LuMail, LuPhone, LuMapPin, LuSend } from "react-icons/lu";

export default function ContactUs() {
  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="overlay" />
        <div className="hero-content">
          <span className="badge">GET IN TOUCH</span>
          <h1>
            CONTACT <span>US</span>
          </h1>
          <p>
            Have a question, need support, or want to collaborate?
            We’re here to help.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-section">
        <div className="contact-container">
          
          {/* LEFT INFO */}
          <div className="contact-info">
            <h2>
              LET’S <span>CONNECT</span>
            </h2>
            <p>
              Reach out to us anytime. Our team will respond as soon as possible.
            </p>

            <div className="info-item">
              <LuMail />
              <div>
                <h4>Email</h4>
                <p>support@yourbrand.com</p>
              </div>
            </div>

            <div className="info-item">
              <LuPhone />
              <div>
                <h4>Phone</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="info-item">
              <LuMapPin />
              <div>
                <h4>Location</h4>
                <p>India · Worldwide Shipping</p>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <form className="contact-form">
            <h3>Send a Message</h3>

            <div className="input-group">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Email Address" required />
            </div>

            <input type="text" placeholder="Subject" required />
            <textarea placeholder="Your Message" rows="5" required />

            <button type="submit">
              SEND MESSAGE <LuSend />
            </button>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section className="contact-cta">
        <h2>
          READY TO <span>MOVE</span> WITH US?
        </h2>
        <p>
          Discover performance wear built for every goal.
        </p>
        <button>SHOP COLLECTION →</button>
      </section>

      {/* CSS */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        /* HERO */
        .contact-hero {
          position: relative;
          height: 80vh;
          background: url("https://images.unsplash.com/photo-1521805103424-d8f8430e8933")
            center/cover no-repeat;
          display: flex;
          align-items: center;
          padding: 0 8%;
          color: white;
        }

        .contact-hero .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(0,0,0,0.85),
            rgba(0,0,0,0.4)
          );
        }

        .hero-content {
          position: relative;
          max-width: 600px;
          z-index: 2;
        }

        .badge {
          display: inline-block;
          background: rgba(255,106,0,0.15);
          color: #ff6a00;
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          margin-bottom: 20px;
        }

        .hero-content h1 {
          font-size: 56px;
          font-weight: 900;
          margin-bottom: 16px;
        }

        .hero-content h1 span {
          color: #ff6a00;
        }

        .hero-content p {
          font-size: 18px;
          color: #ddd;
          line-height: 1.6;
        }

        /* CONTACT */
        .contact-section {
          padding: 100px 24px;
          background: #fff;
        }

        .contact-container {
          max-width: 1200px;
          margin: auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: flex-start;
        }

        .contact-info h2 {
          font-size: 44px;
          font-weight: 900;
          margin-bottom: 16px;
          color: #0f172a;
        }

        .contact-info h2 span {
          color: #ff6a00;
        }

        .contact-info p {
          font-size: 17px;
          color: #475569;
          margin-bottom: 30px;
        }

        .info-item {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-bottom: 22px;
        }

        .info-item svg {
          font-size: 22px;
          color: #ff6a00;
        }

        .info-item h4 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 2px;
          color: #0f172a;
        }

        .info-item p {
          font-size: 15px;
          color: #64748b;
        }

        /* FORM */
        .contact-form {
          background: #f8fafc;
          padding: 40px;
          border-radius: 28px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }

        .contact-form h3 {
          font-size: 26px;
          font-weight: 800;
          margin-bottom: 24px;
          color: #0f172a;
        }

        .input-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          font-size: 15px;
          margin-bottom: 16px;
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          outline: none;
          border-color: #ff6a00;
        }

        .contact-form button {
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          padding: 14px;
          width: 100%;
          border-radius: 30px;
          border: none;
          background: #ff6a00;
          color: white;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }

        /* CTA */
        .contact-cta {
          padding: 100px 24px;
          background: #0f172a;
          color: white;
          text-align: center;
        }

        .contact-cta h2 {
          font-size: 44px;
          font-weight: 900;
          margin-bottom: 16px;
        }

        .contact-cta h2 span {
          color: #ff6a00;
        }

        .contact-cta p {
          font-size: 18px;
          color: #cbd5f5;
          margin-bottom: 28px;
        }

        .contact-cta button {
          padding: 16px 36px;
          border-radius: 30px;
          border: none;
          background: #ff6a00;
          color: white;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .contact-container {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 38px;
          }

          .input-group {
            grid-template-columns: 1fr;
          }

          .contact-info h2,
          .contact-cta h2 {
            font-size: 34px;
          }
        }
      `}</style>
    </>
  );
}
