import React from "react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Breathable",
      desc: "Advanced moisture-wicking fabrics that keep you cool and dry during intense workouts.",
      icon: "💨",
    },
    {
      title: "Durable",
      desc: "Premium materials built to withstand your toughest training sessions and beyond.",
      icon: "🛡️",
    },
    {
      title: "Performance Fit",
      desc: "Ergonomic designs that move with your body for unrestricted range of motion.",
      icon: "🎯",
    },
    {
      title: "Sustainable",
      desc: "Eco-conscious manufacturing using recycled materials where possible.",
      icon: "♻️",
    },
  ];

  return (
    <>
      <section className="athletes">
        <div className="athletes-container">
          {/* LEFT CONTENT */}
          <div className="athletes-left">
            <span className="badge">WHY RUNN?</span>
            <h2>
              BUILT FOR <span>ATHLETES</span>
            </h2>
            <p>
              Every piece of RUNN gear is crafted with one goal: to help you
              push beyond your limits. We combine cutting-edge technology with
              premium materials to create performance wear that matches your
              ambition.
            </p>

            <div className="buttons">
              <button className="primary">SHOP COLLECTION</button>
              <button className="secondary">LEARN MORE</button>
            </div>
          </div>

          {/* RIGHT CARDS */}
          <div className="athletes-right">
            {features.map((item, index) => (
              <div className="feature-card" key={index}>
                <div className="icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CSS */}
      <style>{`
        .athletes {
          padding: 90px 16px;
          background: linear-gradient(to right, #fff7f1, #ffffff);
        }

        .athletes-container {
          max-width: 1200px;
          margin: auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .badge {
          display: inline-block;
          background: #ffe7d6;
          color: #ff6a00;
          padding: 8px 18px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .athletes-left h2 {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 18px;
        }

        .athletes-left h2 span {
          color: #ff6a00;
        }

        .athletes-left p {
          font-size: 18px;
          color: #555;
          line-height: 1.7;
          max-width: 520px;
          margin-bottom: 36px;
        }

        .buttons {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .primary {
          background: #ff6a00;
          color: #fff;
          border: none;
          padding: 14px 28px;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }

        .secondary {
          background: transparent;
          color: #ff6a00;
          border: 2px solid #ff6a00;
          padding: 14px 28px;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }

        .athletes-right {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .feature-card {
          background: #f5f5f5;
          padding: 28px;
          border-radius: 20px;
        }

        .icon {
          width: 56px;
          height: 56px;
          background: #ff6a00;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          font-size: 22px;
          margin-bottom: 18px;
        }

        .feature-card h3 {
          font-size: 20px;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .feature-card p {
          font-size: 15px;
          color: #666;
          line-height: 1.6;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .athletes-container {
            grid-template-columns: 1fr;
          }

          .athletes-right {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .athletes-left h2 {
            font-size: 34px;
          }

          .athletes-left p {
            font-size: 16px;
          }

          .athletes-right {
            grid-template-columns: 1fr;
          }

          .buttons {
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}
