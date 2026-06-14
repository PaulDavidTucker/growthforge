import React from "react";
import "./OurProcess.css";

const OurProcess = () => {
  return (
    <section className="process-section">
      <div className="container">
        <h2 className="section-title">Our Path to Your New Website</h2>
        <div className="process-grid">
          <div className="process-step">
            <div className="step-number">01</div>
            <h3>Discovery &amp; Deposit</h3>
            <p>
              We discuss your business, show you templates and examples, then
              start your build for a £50 deposit.
            </p>
          </div>
          <div className="process-step">
            <div className="step-number">02</div>
            <h3>Design &amp; Build</h3>
            <p>
              Our team designs and builds your mobile-ready site, matching your
              branding, colours, fonts and imagery.
            </p>
          </div>
          <div className="process-step">
            <div className="step-number">03</div>
            <h3>Revisions, Launch &amp; Support</h3>
            <p>
              We show you the site on a call, make unlimited revisions and go
              live with one year of hosting and support included.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
