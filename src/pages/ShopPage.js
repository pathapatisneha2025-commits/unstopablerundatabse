import React from "react";
import { LuHeart, LuEye } from "react-icons/lu";

export default function Shop() {
  const products = [
    {
      id: 1,
      name: "Pro Runner Tee",
      price: "$49.99",
      colors: "Orange Black White",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    },
    {
      id: 2,
      name: "Endurance Shorts",
      price: "$59.99",
      colors: "Black Navy",
      image:
        "https://images.unsplash.com/photo-1593032465171-8b6e24b4f0f2",
    },
    {
      id: 3,
      name: "Power Lift Tank",
      price: "$39.99",
      colors: "Orange Grey",
      image:
        "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
    },
    {
      id: 4,
      name: "Flex Training Joggers",
      price: "$79.99",
      colors: "Black Charcoal",
      image:
        "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
    },
  ];

  return (
    <>
      <div className="shop-page">
        {/* HEADER */}
        <div className="shop-header">
          <div className="back-link">← Back to Home</div>
          <h1>Shop All</h1>
          <p className="subtitle">
            Explore our complete collection of premium athletic wear
          </p>
        </div>

        {/* FILTERS */}
        <div className="shop-filters">
          <button>Filters</button>
          <button>Size ⌄</button>
          <button>Color ⌄</button>
          <button>Price ⌄</button>
          <span className="count">{products.length} products</span>
        </div>

        {/* PRODUCTS */}
        <div className="product-grid">
          {products.map((item) => (
            <div className="product-card" key={item.id}>
              <div className="image-wrapper">
                <img src={item.image} alt={item.name} />

                {/* ICONS */}
                <div className="hover-icons">
                  <span><LuHeart /></span>
                  <span><LuEye /></span>
                </div>

                {/* QUICK ADD */}
                <button className="quick-add">Quick Add</button>
              </div>

              <h3>{item.name}</h3>
              <p className="price">{item.price}</p>
              <p className="colors">{item.colors}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .shop-page {
          padding: 40px 60px;
          font-family: "Segoe UI", sans-serif;
        }

        .shop-header {
          margin-bottom: 30px;
        }

        .back-link {
          color: #777;
          cursor: pointer;
          margin-bottom: 10px;
        }

        .shop-header h1 {
          font-size: 48px;
          margin: 0;
        }

        .subtitle {
          color: #666;
          margin-top: 8px;
        }

        .shop-filters {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 30px 0;
          flex-wrap: wrap;
        }

        .shop-filters button {
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid #ddd;
          background: white;
          cursor: pointer;
        }

        .count {
          margin-left: auto;
          color: #666;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 30px;
        }

        .product-card h3 {
          margin: 12px 0 4px;
          font-size: 18px;
        }

        .price {
          font-weight: bold;
        }

        .colors {
          color: #777;
          font-size: 14px;
        }

        /* IMAGE */
        .image-wrapper {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
        }

        .image-wrapper img {
          width: 100%;
          height: 320px;
          object-fit: cover;
          border-radius: 18px;
          transition: transform 0.4s ease;
        }

        .product-card:hover img {
          transform: scale(1.05);
        }

        /* ICONS */
        .hover-icons {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.3s ease;
        }

        .hover-icons span {
          background: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 6px 16px rgba(0,0,0,0.15);
        }

        /* QUICK ADD */
        .quick-add {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background: #ff6a00;
          color: white;
          border: none;
          padding: 10px 28px;
          border-radius: 30px;
          font-weight: bold;
          cursor: pointer;
          opacity: 0;
          transition: all 0.3s ease;
        }

        /* HOVER EFFECT */
        .product-card:hover .hover-icons,
        .product-card:hover .quick-add {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .product-card:hover .hover-icons {
          transform: translateY(0);
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .shop-page {
            padding: 20px;
          }

          .shop-header h1 {
            font-size: 32px;
          }

          .count {
            width: 100%;
            margin-left: 0;
          }

          /* Always visible on mobile */
          .hover-icons,
          .quick-add {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </>
  );
}
