import React from "react";
import "./OurProcess.css";

const OurProcess = () => {
  return (
    <section className="process-section">
      <div className="container">
        <h2 className="section-title">Our Path to Your Success</h2>
        <div className="process-grid">
          <div className="process-step">
            <div className="step-number">01</div>
            <h3>Discovery &amp; Strategy</h3>
            <p>
              We dive deep into your brand, goals, and audience to craft a
              bespoke strategy for maximum impact.
            </p>
          </div>
          <div className="process-step">
            <div className="step-number">02</div>
            <h3>Execution &amp; Build</h3>
            <p>
              Our expert team builds your custom funnels, chatbots, and
              automation sequences with precision and care.
            </p>
          </div>
          <div className="process-step">
            <div className="step-number">03</div>
            <h3>Launch &amp; Optimize</h3>
            <p>
              We deploy, test, and relentlessly optimize every component, using
              data to drive decisions and maximize ROI.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
