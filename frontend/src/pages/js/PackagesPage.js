// src/pages/PackagesPage.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/PackagesPage.css";

const PackagesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="packages-page container">
      <div className="page-header">
        <h1>Website Pricing</h1>
        <p className="packages-intro">
          A simple, transparent pricing model designed for small businesses. Get
          a professional website without the agency price tag.
        </p>
      </div>

      <div className="package-grid">
        <div className="package-card glass-card">
          <h2>Start Your Build</h2>
          <div className="price">£50</div>
          <p className="description">
            Non-refundable deposit. We start designing and building your site
            straight away.
          </p>
          <ul>
            <li>✓ Custom website design</li>
            <li>✓ Mobile responsive layout</li>
            <li>✓ Unlimited revisions (within reason)</li>
            <li>✓ Delivered in 4-7 days</li>
          </ul>
          <Link to="/contact" className="btn">
            Get Started
          </Link>
        </div>

        <div className="package-card glass-card popular">
          <span className="popular-badge">Best Value</span>
          <h2>Full Website</h2>
          <div className="price">£250</div>
          <p className="description">
            Pay only if you love the site. Covers the full build, one year of
            hosting and ongoing support.
          </p>
          <ul>
            <li>✓ Full website ownership</li>
            <li>✓ 1 year hosting included</li>
            <li>✓ Unlimited future updates &amp; maintenance</li>
            <li>✓ Unlimited assistance (while hosted with us)</li>
            <li>✓ Revisions completed at no extra cost</li>
          </ul>
          <Link to="/contact" className="btn">
            Book a Sales Call
          </Link>
        </div>

        <div className="package-card glass-card">
          <h2>Bespoke Add-Ons</h2>
          <div className="price">Custom</div>
          <p className="description">
            Need more than a brochure site? We can build advanced features
            tailored to your business.
          </p>
          <ul>
            <li>✓ CRM integration</li>
            <li>✓ Conversational chatbots</li>
            <li>✓ Advanced tooling &amp; automations</li>
            <li>✓ Membership, booking or e-commerce features</li>
            <li>✓ Fully custom solutions</li>
          </ul>
          <Link to="/contact" className="btn">
            Contact Sales
          </Link>
        </div>
      </div>

      <section className="pricing-faq">
        <h2>How It Works</h2>
        <div className="faq-grid">
          <div className="faq-item glass-card">
            <h3>1. Book a sales call</h3>
            <p>
              We walk you through our templates and live examples so you can see
              the quality before committing.
            </p>
          </div>
          <div className="faq-item glass-card">
            <h3>2. Pay the £50 deposit</h3>
            <p>
              This gets your build started. It is non-refundable, but we include
              unlimited revisions while we fine-tune the design.
            </p>
          </div>
          <div className="faq-item glass-card">
            <h3>3. We deliver in 4-7 days</h3>
            <p>
              We show you the site on a call, capture any revisions and aim to
              beat the deadline.
            </p>
          </div>
          <div className="faq-item glass-card">
            <h3>4. Pay £250 to go live</h3>
            <p>
              If you want to keep the site, the £250 completion fee covers full
              ownership, one year of hosting and unlimited updates.
            </p>
          </div>
        </div>
      </section>


    </div>
  );
};

export default PackagesPage;
