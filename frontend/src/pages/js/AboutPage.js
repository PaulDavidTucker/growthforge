// src/pages/AboutPage.js
import React from "react";
import "../css/AboutPage.css";
import Testimonials from "../../components/Testimonials";

const AboutPage = () => {
  return (
    <div className="about-page container">
      <h1>About GrowthForge</h1>
      <p className="about-intro">
        We are a team of digital marketers, developers, and lawyers dedicated to
        helping small businesses achieve exponential growth through technology
        and automation.
      </p>
      <div className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to level the playing field for small businesses by
          providing them with the same powerful sales and automation tools that
          large enterprises use. We believe in the power of smart systems to
          create sustainable growth and free up entrepreneurs to focus on
          innovation.
        </p>
      </div>
      <Testimonials />
    </div>
  );
};

export default AboutPage;
