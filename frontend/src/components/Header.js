import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import MainLogo from "../Images/Mainlogo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  // NEW: Separate state for controlling display (to allow transition before hiding)
  const [displayNav, setDisplayNav] = useState("none");

  useEffect(() => {
    if (window.innerWidth < 992) {
      if (isOpen) {
        // When opening: Immediately show and allow scrolling prevention
        setDisplayNav("flex");
        document.body.classList.add("body-no-scroll");
      } else {
        // When closing: Delay hiding to allow slide-out transition (300ms)
        const timeoutId = setTimeout(() => {
          setDisplayNav("none");
        }, 300); // Matches CSS transition duration

        document.body.classList.remove("body-no-scroll");

        // Cleanup timeout if component unmounts
        return () => clearTimeout(timeoutId);
      }

      // General cleanup on unmount
      return () => {
        document.body.classList.remove("body-no-scroll");
      };
    } else {
      setDisplayNav("flex");
    }
  }, [isOpen]);

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
          <img src={MainLogo} alt="LogoImage" />
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

        <nav
          className={`nav-links ${isOpen ? "active" : ""}`}
          style={{ display: displayNav }}
        >
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

      {isOpen && <div className="backdrop" onClick={closeMenu} />}
    </header>
  );
};

export default Header;
