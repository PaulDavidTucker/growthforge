// src/pages/AboutPage.js
import React from "react";
import "../css/AboutPage.css";
import Testimonials from "../../components/Testimonials";
import { Helmet } from "react-helmet-async";
import OurProcess from "../../components/OurProcess";

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
          We are a small team of designers and developers dedicated to helping
          small businesses get online with professional, affordable websites.
          Reps &amp; Revenue is built around a simple idea: high-quality web
          design should not come with an agency price tag or a months-long
          wait.
        </p>
        <div className="mission-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to level the playing field for small businesses by
            giving them the same polished online presence that larger companies
            enjoy. We believe every trade, coach, consultant and creative
            deserves a website they are proud to share, one that brings in
            customers and reflects the quality of their work. We do not just
            provide a service; we align ourselves with our clients' objectives,
            treating their goals as our own.
          </p>
        </div>
        <Testimonials />

        <OurProcess />
      </div>
    </>
  );
};

export default AboutPage;
