import React, { useState } from "react";
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
          <img src="/companylogo.png" alt="RUNN" className="logo-desktop" />
        </div>

        {/* CENTER MENU */}
        <ul className={`nav-links ${open ? "active" : ""}`}>
           <li>
            <a href="/" onClick={closeMenu}>Home</a>
          </li>
          <li>
            <a href="/shop" onClick={closeMenu}>Shop</a>
          </li>
          <li>
            <a href="/activitypage" onClick={closeMenu}>Activities</a>
          </li>
       
          <li>
            <a href="/about" onClick={closeMenu}>About</a>
          </li>
             <li>
            <a href="/contact" onClick={closeMenu}>Contact</a>
          </li>
        </ul>

        {/* RIGHT ICONS */}
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
        <div className="hamburger" onClick={() => setOpen(!open)}>
          {open ? <LuX /> : <LuMenu />}
        </div>
      </nav>

      <style>{`
        * { box-sizing: border-box; }

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
        }

        .nav-links a:hover {
          color: #ff6a00;
        }

        .nav-icons {
          display: flex;
          gap: 22px;
          font-size: 20px;
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

        .hamburger {
          display: none;
          font-size: 26px;
          cursor: pointer;
        }

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
            padding: 26px 0;
            display: none;
          }

          .nav-links.active {
            display: flex;
          }

          .nav-icons {
            display: none;
          }

          .hamburger {
            display: block;
          }
        }
      `}</style>
    </>
  );
}
