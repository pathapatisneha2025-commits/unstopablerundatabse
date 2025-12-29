import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuSearch,
  LuHeart,
  LuUser,
  LuShoppingBag,
  LuMenu,
  LuX,
} from "react-icons/lu";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <nav className="navbar">
        {/* LOGO */}
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <img src="/companylogo.png" alt="RUNN" className="logo-desktop" />
          </Link>
        </div>

        {/* MENU */}
        <ul className={`nav-links ${open ? "active" : ""}`}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/shop" onClick={closeMenu}>Shop</Link></li>
          <li><Link to="/activitypage" onClick={closeMenu}>Activities</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About</Link></li>
          <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
        </ul>

        {/* ICONS */}
        <div className="nav-icons">
          <LuSearch />
          <LuHeart />
          <LuUser />
          <div className="cart">
            <LuShoppingBag />
            <small>0</small>
          </div>
        </div>

        {/* HAMBURGER */}
        <div
          className={`hamburger ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <LuX /> : <LuMenu />}
        </div>
      </nav>

      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          height: 72px;
          background: #e6e6e6;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          padding: 0 40px;
        }

        .logo-desktop {
          width: 70px;
        }

        .nav-links {
          display: flex;
          justify-content: center;
          gap: 36px;
          list-style: none;
        }

        .nav-links a {
          text-decoration: none;
          font-size: 16px;
          color: #1f2937;
          font-weight: 500;
        }

        .nav-links a:hover {
          color: #ff6a00;
        }

        .nav-icons {
          display: flex;
          gap: 22px;
          font-size: 20px;
          align-items: center;
        }

        .cart {
          position: relative;
        }

        .cart small {
          position: absolute;
          top: -6px;
          right: -8px;
          background: #ff6a00;
          color: white;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 50%;
        }

        /* HAMBURGER BUTTON */
        .hamburger {
          display: none;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
        }

        .hamburger:active {
          transform: scale(0.92);
        }

        .hamburger.open {
          background: #ff6a00;
          color: #ffffff;
          transform: rotate(90deg);
        }

        /* MOBILE */
        @media (max-width: 900px) {
          .navbar {
            grid-template-columns: auto auto;
            padding: 0 20px;
          }

          .nav-links {
            position: absolute;
            top: 72px;
            left: 0;
            width: 100%;
            background: #e6e6e6;
            flex-direction: column;
            gap: 24px;
            padding: 28px 0;
            display: none;
            box-shadow: 0 6px 14px rgba(0,0,0,0.08);
          }

          .nav-links.active {
            display: flex;
          }

          .nav-icons {
            display: none;
          }

          .hamburger {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
