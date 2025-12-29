import React from "react";
import { LuZap, LuShieldCheck, LuHeartPulse, LuLeaf } from "react-icons/lu";

export default function AboutUs() {
  return (
    <>
      {/* HERO */}
      <section className="about-hero">
        <div className="overlay" />
        <div className="hero-content">
          <span className="badge">ABOUT OUR BRAND</span>
          <h1>
            BUILT FOR <span>MOTION</span>
          </h1>
          <p>
            We create performance-driven apparel for athletes, creators, and
            everyday movers who refuse to slow down.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="story">
        <div className="story-grid">
          <div className="story-text">
            <h2>
              OUR <span>STORY</span>
            </h2>
            <p>
              Born from a passion for fitness and design, our brand was created
              to bridge the gap between high-performance sportswear and everyday
              comfort.
            </p>
            <p>
              Every piece is engineered with precision — from breathable
              fabrics to ergonomic fits — so you can train harder, move freer,
              and live bolder.
            </p>
          </div>

          <div className="story-image">
            <img
              src="https://images.unsplash.com/photo-1599058917212-d750089bc07b"
              alt="Athlete training"
            />
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="values">
        <header>
          <span className="badge">WHAT DRIVES US</span>
          <h2>
            OUR <span>VALUES</span>
          </h2>
        </header>

        <div className="values-grid">
          <div className="value-card">
            <LuZap />
            <h3>Performance First</h3>
            <p>Designed to support speed, strength, and endurance.</p>
          </div>

          <div className="value-card">
            <LuShieldCheck />
            <h3>Premium Quality</h3>
            <p>High-grade materials tested for durability and comfort.</p>
          </div>

          <div className="value-card">
            <LuHeartPulse />
            <h3>Made for Movement</h3>
            <p>Flexible fits that move naturally with your body.</p>
          </div>

          <div className="value-card">
            <LuLeaf />
            <h3>Responsible Design</h3>
            <p>Thoughtful production with a focus on sustainability.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>
          JOIN THE <span>MOVEMENT</span>
        </h2>
        <p>
          This isn’t just apparel — it’s a mindset. Train harder. Live stronger.
        </p>
        <button>EXPLORE COLLECTION →</button>
      </section>

      {/* CSS */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        /* HERO */
        .about-hero {
          position: relative;
          height: 90vh;
          background: url("https://images.unsplash.com/photo-1517836357463-d25dfeac3438")
            center/cover no-repeat;
          display: flex;
          align-items: center;
          padding: 0 8%;
          color: white;
        }

        .about-hero .overlay {
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
          max-width: 650px;
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
          font-size: 64px;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 18px;
        }

        .hero-content h1 span {
          color: #ff6a00;
        }

        .hero-content p {
          font-size: 18px;
          color: #ddd;
          line-height: 1.6;
        }

        /* STORY */
        .story {
          padding: 100px 24px;
          background: #fff;
        }

        .story-grid {
          max-width: 1200px;
          margin: auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .story-text h2 {
          font-size: 48px;
          font-weight: 900;
          margin-bottom: 20px;
          color: #0f172a;
        }

        .story-text h2 span {
          color: #ff6a00;
        }

        .story-text p {
          font-size: 17px;
          color: #475569;
          line-height: 1.7;
          margin-bottom: 16px;
        }

        .story-image img {
          width: 100%;
          border-radius: 28px;
          object-fit: cover;
        }

        /* VALUES */
        .values {
          padding: 100px 24px;
          background: linear-gradient(180deg, #f8fafc, #eef2f7);
          text-align: center;
        }

        .values header {
          max-width: 600px;
          margin: auto;
          margin-bottom: 60px;
        }

        .values header h2 {
          font-size: 48px;
          font-weight: 900;
          color: #0f172a;
        }

        .values header h2 span {
          color: #ff6a00;
        }

        .values-grid {
          max-width: 1200px;
          margin: auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
        }

        .value-card {
          background: white;
          padding: 40px 30px;
          border-radius: 26px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }

        .value-card svg {
          font-size: 32px;
          color: #ff6a00;
          margin-bottom: 18px;
        }

        .value-card h3 {
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 10px;
          color: #0f172a;
        }

        .value-card p {
          font-size: 15px;
          color: #64748b;
          line-height: 1.5;
        }

        /* CTA */
        .about-cta {
          padding: 100px 24px;
          background: #0f172a;
          color: white;
          text-align: center;
        }

        .about-cta h2 {
          font-size: 48px;
          font-weight: 900;
          margin-bottom: 18px;
        }

        .about-cta h2 span {
          color: #ff6a00;
        }

        .about-cta p {
          font-size: 18px;
          color: #cbd5f5;
          margin-bottom: 30px;
        }

        .about-cta button {
          padding: 16px 34px;
          border-radius: 30px;
          border: none;
          background: #ff6a00;
          color: white;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .values-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 42px;
          }

          .story-grid {
            grid-template-columns: 1fr;
          }

          .values-grid {
            grid-template-columns: 1fr;
          }

          .about-cta h2 {
            font-size: 36px;
          }
        }
      `}</style>
    </>
  );
}
