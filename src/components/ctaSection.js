import React from "react";

export default function CtaSection() {
  return (
    <section className="newsletter-section">
      <div className="container">
        {/* Badge */}
        <div className="badge-wrapper">
          <span className="join-badge">
            <span className="flash-icon">⚡</span> JOIN THE MOVEMENT
          </span>
        </div>

        {/* Heading */}
        <h2 className="main-heading">
          STAY <span className="highlight">UNSTOPPABLE</span>
        </h2>

        {/* Description */}
        <p className="description">
          Subscribe to get exclusive early access, special offers, and 
          workout tips delivered straight to your inbox.
        </p>

        {/* Form Area */}
        <form className="subscribe-form" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="email-input"
            required 
          />
          <button type="submit" className="subscribe-btn">
            SUBSCRIBE <span className="send-icon">➤</span>
          </button>
        </form>

        {/* Benefits/Trust marks */}
        <div className="trust-markers">
          <span>✓ No spam, ever</span>
          <span>✓ Exclusive offers</span>
          <span>✓ Unsubscribe anytime</span>
        </div>
      </div>

      <style>{`
        .newsletter-section {
          /* Radial gradient to match your screenshot */
          background: radial-gradient(circle at center, #2c1a10 0%, #0f0f0f 100%);
          padding: 100px 20px;
          text-align: center;
          color: white;
          font-family: 'Inter', sans-serif;
        }

        .container {
          max-width: 700px;
          margin: 0 auto;
        }

        .badge-wrapper {
          margin-bottom: 24px;
        }

        .join-badge {
          background: rgba(255, 106, 0, 0.1);
          border: 1px solid rgba(255, 106, 0, 0.3);
          color: #ff6a00;
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .flash-icon {
          margin-right: 5px;
        }

        .main-heading {
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 20px;
          text-transform: uppercase;
        }

        .highlight {
          color: #ff6a00;
        }

        .description {
          font-size: 18px;
          color: #b0b0b0;
          line-height: 1.6;
          margin-bottom: 40px;
        }

        .subscribe-form {
          display: flex;
          gap: 12px;
          background: rgba(255, 255, 255, 0.05);
          padding: 8px;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 30px;
        }

        .email-input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 12px 24px;
          color: white;
          font-size: 16px;
          outline: none;
        }

        .subscribe-btn {
          background: #ff6a00;
          color: white;
          border: none;
          padding: 14px 32px;
          border-radius: 40px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .subscribe-btn:hover {
          background: #e55a00;
          transform: scale(1.02);
        }

        .send-icon {
          font-size: 12px;
        }

        .trust-markers {
          display: flex;
          justify-content: center;
          gap: 24px;
          color: #666;
          font-size: 14px;
        }

        /* --- MOBILE RESPONSIVENESS --- */
        @media (max-width: 600px) {
          .newsletter-section {
            padding: 60px 16px;
          }

          .subscribe-form {
            flex-direction: column;
            background: transparent;
            border: none;
            padding: 0;
            gap: 16px;
          }

          .email-input {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 40px;
            padding: 18px 24px;
            text-align: center;
          }

          .subscribe-btn {
            width: 100%;
            justify-content: center;
            padding: 18px;
          }

          .trust-markers {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </section>
  );
}