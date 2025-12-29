import React from 'react';

const ActivitiesSection = () => {
  const activities = [
    { title: "Running", desc: "Built for speed, endurance, and comfort", icon: "⚡", color: "#ff4d00" },
    { title: "Training / Gym", desc: "Engineered for strength and daily sessions", icon: "💪", color: "#4d79ff" },
    { title: "Yoga & Flex", desc: "Soft, stretchy, and non-restrictive", icon: "✨", color: "#d433ff" },
    { title: "Sports & Outdoor", desc: "Durable gear for any adventure", icon: "🏔️", color: "#00c853" },
    { title: "Athleisure", desc: "Comfort and style for everyday wear", icon: "☕", color: "#ff9100" },
    { title: "HIIT & CrossFit", desc: "Designed for intense workouts", icon: "🔥", color: "#ff3d00" },
    { title: "Walking & Jogging", desc: "Lightweight gear for daily walks", icon: "👣", color: "#00b0ff" },
    { title: "Home / Indoor", desc: "Comfortable essentials for at-home fitness", icon: "🏠", color: "#7c4dff" },
    { title: "Travel & Lifestyle", desc: "Versatile gear for life on the move", icon: "✈️", color: "#3B82F6" },
    { title: "Winter Training", desc: "Warm layers without bulk", icon: "❄️", color: "#64748B" },
    { title: "Heat Zone", icon: "☀️", desc: "Ultra-breathable for hot conditions", color: "#F59E0B" },
    { title: "Gym Essentials", desc: "Accessories for your training kit", icon: "🎒", color: "#475569" }
  ];

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#fdfdfd', minHeight: '100vh', color: '#1a1a1a' }}>
      {/* --- INLINE CSS --- */}
      <style>{`
        .nav-link { text-decoration: none; color: #333; font-weight: 500; font-size: 14px; margin: 0 15px; }
        .nav-link:hover { color: #ff4d00; }
        
        .grid-container {
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(1, 1fr);
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto 60px;
        }

        /* Mobile Responsive Breakpoints */
        @media (max-width: 639px) {
          .nav-menu { display: none !important; } /* Hide menu on mobile */
        }
        @media (min-width: 640px) { 
          .grid-container { grid-template-columns: repeat(2, 1fr); } 
        }
        @media (min-width: 1024px) { 
          .grid-container { grid-template-columns: repeat(4, 1fr); } 
        }
        
        .card {
          background: white;
          padding: 30px 25px;
          border-radius: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          border: 1px solid #f0f0f0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        
        .card:hover { 
          transform: translateY(-8px); 
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .icon-box {
          width: 48px; 
          height: 48px; 
          border-radius: 14px;
          display: flex; 
          align-items: center; 
          justify-content: center;
          color: white; 
          font-size: 22px; 
          margin-bottom: 20px;
        }
      `}</style>

      {/* --- NAVBAR --- */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 40px', borderBottom: '1px solid #f0f0f0', backgroundColor: '#fff',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ fontWeight: '900', fontSize: '22px', color: '#ff4d00', letterSpacing: '-1px' }}>RUNN</div>
        
        <div className="nav-menu" style={{ display: 'flex' }}>
          <a href="#" className="nav-link">Shop</a>
          <a href="#" className="nav-link">Activities</a>
          <a href="#" className="nav-link">Collections</a>
          <a href="#" className="nav-link">About</a>
        </div>

        <div style={{ display: 'flex', gap: '22px', alignItems: 'center', fontSize: '18px' }}>
          <span style={{ cursor: 'pointer' }}>🔍</span>
          <span style={{ cursor: 'pointer' }}>♡</span>
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <span>🛍️</span>
            <span style={{
              position: 'absolute', top: '-8px', right: '-8px', background: '#ff4d00',
              color: 'white', borderRadius: '50%', width: '16px', height: '16px', 
              fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 'bold'
            }}>0</span>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section style={{ textAlign: 'center', padding: '80px 20px 40px' }}>
        <span style={{
          background: '#fff0eb', color: '#ff4d00', padding: '6px 16px',
          borderRadius: '20px', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase'
        }}>
          Shop By Activity
        </span>
        <h1 style={{ 
          fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', 
          margin: '24px 0', 
          fontWeight: '900',
          lineHeight: '1.1',
          letterSpacing: '-1px'
        }}>
          GEAR FOR EVERY <span style={{ color: '#ff4d00' }}>MOVE</span>
        </h1>
        <p style={{ color: '#64748b', maxWidth: '650px', margin: '0 auto', fontSize: '18px', lineHeight: '1.6' }}>
          Whether you're hitting the gym, running trails, or finding your zen — we've got 
          performance wear designed for your lifestyle.
        </p>
      </section>

      {/* --- GRID SECTION --- */}
      <div className="grid-container">
        {activities.map((item, idx) => (
          <div key={idx} className="card">
            <div className="icon-box" style={{ backgroundColor: item.color }}>
              {item.icon}
            </div>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', fontWeight: '700' }}>{item.title}</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5' }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesSection;