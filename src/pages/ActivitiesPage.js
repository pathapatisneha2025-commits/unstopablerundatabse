import React from "react";

export default function ActivitiesPage() {
  const activities = [
    {
      title: "Running",
      desc: "Built for speed, endurance, and comfort",
      icon: "⚡",
    },
    {
      title: "Training / Gym",
      desc: "Engineered for strength and daily sessions",
      icon: "🏋️",
    },
    {
      title: "Yoga & Flex",
      desc: "Soft, stretchy, and non-restrictive",
      icon: "✨",
    },
    {
      title: "Sports & Outdoor",
      desc: "Durable gear for any adventure",
      icon: "⛰️",
    },
    {
      title: "Athleisure",
      desc: "Comfort and style for everyday wear",
      icon: "☕",
    },
    {
      title: "HIIT & CrossFit",
      desc: "Designed for intense workouts",
      icon: "🔥",
    },
    {
      title: "Walking & Jogging",
      desc: "Lightweight gear for daily walks",
      icon: "👟",
    },
    {
      title: "Home / Indoor",
      desc: "Comfortable essentials for at-home fitness",
      icon: "🏠",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="activities-hero">
        <span className="badge">SHOP BY ACTIVITY</span>
        <h1>
          GEAR FOR EVERY <span>MOVE</span>
        </h1>
        <p>
          Whether you're hitting the gym, running trails, or finding your zen —
          we’ve got performance wear designed for your lifestyle.
        </p>
      </section>

      {/* GRID */}
      <section className="activities-grid-section">
        <div className="activities-grid">
          {activities.map((item, index) => (
            <div className="activity-card" key={index}>
              <div className="icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CSS */}
      <style>{`
        /* HERO */
        .activities-hero {
          background: #f7f7f7;
          padding: 90px 16px 70px;
          text-align: center;
        }

        .badge {
          display: inline-block;
          background: rgba(255,106,0,0.15);
          color: #ff6a00;
          padding: 8px 18px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 18px;
        }

        .activities-hero h1 {
          font-size: 52px;
          font-weight: 800;
          margin-bottom: 18px;
          color: #222;
        }

        .activities-hero h1 span {
          color: #ff6a00;
        }

        .activities-hero p {
          max-width: 700px;
          margin: auto;
          font-size: 18px;
          color: #555;
          line-height: 1.6;
        }

        /* GRID */
        .activities-grid-section {
          padding: 70px 16px;
          background: #ffffff;
        }

        .activities-grid {
          max-width: 1200px;
          margin: auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 26px;
        }

        .activity-card {
          background: #f9f9f9;
          border-radius: 18px;
          padding: 28px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .activity-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.08);
        }

        .icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: linear-gradient(135deg, #ff6a00, #ff8c32);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          margin-bottom: 18px;
        }

        .activity-card h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #222;
        }

        .activity-card p {
          font-size: 15px;
          color: #666;
          line-height: 1.5;
        }

        /* TABLET */
        @media (max-width: 1024px) {
          .activities-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .activities-hero h1 {
            font-size: 44px;
          }
        }

        /* MOBILE */
        @media (max-width: 600px) {
          .activities-hero {
            padding: 70px 14px 50px;
          }

          .activities-hero h1 {
            font-size: 34px;
          }

          .activities-hero p {
            font-size: 16px;
          }

          .activities-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
