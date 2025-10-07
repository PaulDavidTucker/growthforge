import React from "react";
import { Link } from "react-router-dom";
import "./CTASection.css";

const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <h2>Ready to Scale Your Business?</h2>
        <p>
          Let's build your automated growth engine. Schedule a free,
          no-obligation strategy call with our experts today.
        </p>
        <Link to="/contact" className="btn">
          Book Your Free Strategy Call
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
