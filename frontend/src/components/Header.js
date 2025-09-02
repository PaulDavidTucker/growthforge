import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <NavLink to="/" className="logo">
          GrowthForge
        </NavLink>
        <nav>
          <NavLink to="/" activeClassName="active" exact>
            Home
          </NavLink>
          <NavLink to="/about" activeClassName="active">
            About
          </NavLink>
          <NavLink to="/packages" activeClassName="active">
            Packages
          </NavLink>
          <NavLink to="/case-studies" activeClassName="active">
            Case Studies
          </NavLink>
          <NavLink to="/blog" activeClassName="active">
            Blog
          </NavLink>
          <NavLink to="/contact" activeClassName="active">
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
