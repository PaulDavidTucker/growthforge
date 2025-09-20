import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import MainLogo from "../Images/Mainlogo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <NavLink to="/" className="icon">
          <img src={MainLogo} alt="LogoImage"></img>
        </NavLink>

        {/* Hamburger toggle button */}
        <button
          className={`menu-toggle ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={`nav-links ${isOpen ? "active" : ""}`}>
          <NavLink to="/" activeClassName="active" exact onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/about" activeClassName="active" onClick={closeMenu}>
            About
          </NavLink>
          <NavLink to="/packages" activeClassName="active" onClick={closeMenu}>
            Packages
          </NavLink>
          <NavLink
            to="/case-studies"
            activeClassName="active"
            onClick={closeMenu}
          >
            Case Studies
          </NavLink>
          <NavLink to="/blog" activeClassName="active" onClick={closeMenu}>
            Blog
          </NavLink>
          <NavLink to="/contact" activeClassName="active" onClick={closeMenu}>
            Contact
          </NavLink>
        </nav>
      </div>

      {isOpen && <div className="backdrop" onClick={closeMenu}></div>}
    </header>
  );
};

export default Header;
