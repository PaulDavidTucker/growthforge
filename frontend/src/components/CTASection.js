import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CTASection.css";

const CTASection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCTAClick = () => {
    if (location.pathname === "/contact") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/contact");
    }
  };

  return (
    <section className="cta-section">
      <div className="container">
        <h2>Ready to Scale Your Business?</h2>
        <p>
          Let's build your automated growth engine. Schedule a free,
          no-obligation strategy call with our experts today.
        </p>
        <button onClick={handleCTAClick} className="btn">
          Book Your Free Strategy Call
        </button>
      </div>
    </section>
  );
};

export default CTASection;
