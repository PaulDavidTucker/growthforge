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
        <h2>Ready for Your New Website?</h2>
        <p>
          Book a free sales call and we will walk you through our templates,
          examples and pricing, no obligation, no pressure.
        </p>
        <button onClick={handleCTAClick} className="btn">
          Book Your Free Sales Call
        </button>
      </div>
    </section>
  );
};

export default CTASection;
