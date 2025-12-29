import React from "react";

export default function ShopByCollection() {
  const collections = [
    {
      title: "Men's Collection",
      subtitle: "PERFORMANCE MEETS STYLE",
      image: "https://images.unsplash.com/photo-1599058917212-d750089bc07c",
      link: "#",
    },
    {
      title: "Women's Collection",
      subtitle: "EMPOWER YOUR WORKOUT",
      image: "https://images.unsplash.com/photo-1554344058-80d1860b3c56",
      link: "#",
    },
    {
      title: "Accessories",
      subtitle: "COMPLETE YOUR KIT",
      image: "https://images.unsplash.com/photo-1520975922284-4f6c0d88c9f5",
      link: "#",
    },
  ];

  return (
    <>
      <section className="collection-section">
        <span className="badge">FEATURED</span>
        <h2 className="heading">
          SHOP BY <span>COLLECTION</span>
        </h2>

        <div className="collection-grid">
          {collections.map((item, index) => (
            <div className="collection-card" key={index}>
              <img src={item.image} alt={item.title} />
              <div className="overlay">
                <div className="content-wrapper">
                  <p className="subtitle">{item.subtitle}</p>
                  <h3>{item.title}</h3>
                  <a href={item.link} className="shop-link">
                    Shop Now <span className="arrow">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CSS */}
      <style>{`
        .collection-section {
          background: #0f1216; /* Darker background to match your screenshot */
          padding: 90px 16px;
          text-align: center;
          color: white;
          font-family: 'Inter', sans-serif;
        }

        .badge {
          display: inline-block;
          background: rgba(255, 106, 0, 0.15);
          color: #ff6a00;
          padding: 8px 18px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 18px;
          letter-spacing: 1px;
        }

        .heading {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 50px;
        }

        .heading span {
          color: #ff6a00;
        }

        .collection-grid {
          max-width: 1200px;
          margin: auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .collection-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          height: 480px;
          cursor: pointer;
          text-align: left;
        }

        .collection-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
        }

        .collection-card:hover img {
          transform: scale(1.1);
        }

        .collection-card .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0.3) 50%,
            transparent 100%
          );
          display: flex;
          align-items: flex-end;
          padding: 32px;
        }

        .subtitle {
          color: #ff6a00;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .collection-card h3 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .shop-link {
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: gap 0.3s ease;
        }

        .shop-link:hover {
          gap: 12px;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .collection-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .heading {
            font-size: 34px;
          }

          .collection-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .collection-card {
            height: 400px;
          }
        }
      `}</style>
    </>
  );
}