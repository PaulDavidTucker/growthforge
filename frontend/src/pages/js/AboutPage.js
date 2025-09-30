// src/pages/AboutPage.js
import React from "react";
import "../css/AboutPage.css";
import Testimonials from "../../components/Testimonials";
import { Helmet } from "react-helmet-async";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>
          About Us | Reps &amp; Revenue - Reps and Revenue Digital Marketing
          Agency
        </title>
        <meta
          name="description"
          content="Learn about the mission and expert team at GrowthSource, a results-driven digital marketing agency specializing in sales funnels, AI, and automation."
        />
        {/* Add Open Graph tags for social sharing */}
        <meta property="og:title" content="About Us | Reps & Revenue" />
        <meta
          property="og:description"
          content="Learn about the mission and expert team at Reps & Revenue. Reps and Revenue is a small business specialising in SME digital growth."
        />
      </Helmet>

      <div className="about-page container">
        <h1>About Reps &amp; Revenue</h1>
        <p className="about-intro">
          We are a team of digital marketers, developers, and lawyers dedicated
          to helping small businesses achieve exponential growth through
          technology and automation. Reps &amp; Revenue is a small business
          founded by three passionate individuals combining their expertise.
        </p>
        <div className="mission-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to level the playing field for small businesses by
            providing them with the same powerful sales and automation tools
            that large enterprises use. We believe in the power of smart systems
            to create sustainable growth and free up entrepreneurs to focus on
            innovation. Small businesses are the cornerstone of civilisation,
            with individuals working hard to juggle the pressures of scaling
            something they care deeply about.
          </p>
        </div>
        <Testimonials />
      </div>
    </>
  );
};

export default AboutPage;
