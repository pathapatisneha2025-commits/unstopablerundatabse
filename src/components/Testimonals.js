import React from "react";

const testimonials = [
  {
    name: "Marcus Johnson",
    role: "Marathon Runner",
    image: "https://i.pravatar.cc/150?u=marcus",
    text: "RUNN gear has completely transformed my training. The breathability and fit are unmatched. I've shaved minutes off my marathon time!",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "CrossFit Athlete",
    image: "https://i.pravatar.cc/150?u=sarah",
    text: "Finally, workout gear that can keep up with my intensity. The durability is incredible — these pieces survive every workout without breaking down.",
    rating: 5,
  },
  {
    name: "David Martinez",
    role: "Personal Trainer",
    image: "https://i.pravatar.cc/150?u=david",
    text: "I recommend RUNN to all my clients. The performance fit allows full range of motion, and the quality is professional-grade.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-container">
      <div className="header-box">
        <span className="pill-badge">TESTIMONIALS</span>
        <h2 className="title">
          TRUSTED BY <span className="highlight">ATHLETES</span>
        </h2>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <div className="card-top">
              <div className="stars">
                {[...Array(item.rating)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
              <div className="quote-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H12.017V21H14.017ZM6.017 21L6.017 18C6.017 16.8954 6.91243 16 8.017 16H11.017C11.5693 16 12.017 15.5523 12.017 15V9C12.017 8.44772 11.5693 8 11.017 8H8.017C7.46472 8 7.017 8.44772 7.017 9V12C7.017 12.5523 6.56929 13 6.017 13H4.017V21H6.017Z" />
                </svg>
              </div>
            </div>

            <p className="testimonial-text">"{item.text}"</p>

            <div className="user-info">
              <img src={item.image} alt={item.name} className="user-avatar" />
              <div className="user-details">
                <h4 className="user-name">{item.name}</h4>
                <p className="user-role">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .testimonials-container {
          background-color: #f8f9fa;
          padding: 80px 20px;
          font-family: 'Inter', system-ui, sans-serif;
        }

        .header-box {
          text-align: center;
          margin-bottom: 60px;
        }

        .pill-badge {
          background: rgba(255, 106, 0, 0.1);
          color: #ff6a00;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 900;
          margin-top: 20px;
          color: #111;
          text-transform: uppercase;
        }

        .highlight {
          color: #ff6a00;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .testimonial-card {
          background: white;
          padding: 40px;
          border-radius: 24px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .star {
          color: #ff6a00;
          font-size: 18px;
          margin-right: 2px;
        }

        .quote-icon {
          color: rgba(255, 106, 0, 0.2);
          background: rgba(255, 106, 0, 0.05);
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .testimonial-text {
          font-size: 16px;
          line-height: 1.6;
          color: #444;
          margin-bottom: 30px;
          font-style: italic;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .user-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }

        .user-name {
          font-size: 16px;
          font-weight: 700;
          margin: 0;
          color: #111;
        }

        .user-role {
          font-size: 14px;
          color: #777;
          margin: 0;
        }

        /* --- TABLET RESPONSIVENESS --- */
        @media (max-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        /* --- MOBILE RESPONSIVENESS --- */
        @media (max-width: 768px) {
          .testimonials-container {
            padding: 50px 16px;
          }

          .testimonials-grid {
            grid-template-columns: 1fr; /* Single column stack */
          }

          .testimonial-card {
            padding: 30px;
          }

          .title {
            font-size: 32px;
          }
        }
      `}</style>
    </section>
  );
}