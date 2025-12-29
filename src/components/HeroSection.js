import React from "react";

export default function HeroSection() {
  return (
    <>
      <section className="hero">
        <div className="overlay"></div>

        <div className="hero-content">
          <span className="badge">NEW COLLECTION 2025</span>

          <h1 className="title">
            UNSTOPPABLE <br />
            <span>YOU</span>
          </h1>

          <p className="description">
            Engineered for athletes who refuse to slow down. Premium gym wear
            designed for speed, strength, and unstoppable performance.
          </p>

          <div className="buttons">
            <button className="btn primary">SHOP NOW →</button>
            <button className="btn secondary">▶ EXPLORE ACTIVITIES</button>
          </div>

          <div className="stats">
            <div className="stat">
              <h3>50K+</h3>
              <p>ATHLETES</p>
            </div>
            <div className="stat">
              <h3>12</h3>
              <p>ACTIVITIES</p>
            </div>
            <div className="stat">
              <h3>100%</h3>
              <p>PERFORMANCE</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .hero {
          position: relative;
          height: 100vh;
          background: url("https://images.unsplash.com/photo-1605296867304-46d5465a13f1")
            center/cover no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 8%;
          color: white;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(0,0,0,0.85),
            rgba(0,0,0,0.45),
            rgba(0,0,0,0.2)
          );
        }

        .hero-content {
          position: relative;
          max-width: 700px;
          z-index: 2;
          text-align: center;
        }

        .badge {
          display: inline-block;
          background: #ff6a00;
          color: #000;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .title {
          font-size: 64px;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .title span {
          color: #ff6a00;
        }

        .description {
          font-size: 18px;
          color: #ddd;
          line-height: 1.6;
          margin: 0 auto 30px;
          max-width: 520px;
        }

        .buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .btn {
          padding: 14px 28px;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          border: none;
        }

        .btn.primary {
          background: #ff6a00;
          color: white;
        }

        .btn.secondary {
          background: transparent;
          color: white;
          border: 2px solid rgba(255,255,255,0.6);
        }

        .btn.secondary:hover {
          background: rgba(255,255,255,0.1);
        }

        .stats {
          display: flex;
          gap: 50px;
          justify-content: center;
          margin-top: 10px;
        }

        .stat h3 {
          font-size: 36px;
          font-weight: 800;
          color: #ff6a00;
          margin-bottom: 6px;
        }

        .stat p {
          font-size: 13px;
          letter-spacing: 1px;
          color: #ccc;
        }

        @media (max-width: 768px) {
          .hero {
            padding: 0 5%;
            min-height: 100vh;
          }

          .title {
            font-size: 42px;
          }

          .description {
            font-size: 16px;
          }

          .stats {
            gap: 30px;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </>
  );
}
