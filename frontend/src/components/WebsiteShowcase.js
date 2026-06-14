import React from "react";
import "./WebsiteShowcase.css";

const examples = [
  {
    name: "Duston Group Services",
    url: "https://duston-group-services.co.uk/",
    category: "Trade Services",
    screenshot: "/static/screenshots/DustonGroupServices.png",
  },
  {
    name: "Ezekiel Plumbing",
    url: "https://ezekiel-plumbing.onrender.com",
    category: "Plumbing",
    screenshot: "/static/screenshots/Plumber.png",
  },
  {
    name: "The Strength Den",
    url: "https://thestrengthden.onrender.com",
    category: "Fitness & Coaching",
    screenshot: "/static/screenshots/strengthden.png",
  },
  {
    name: "Crystal Leadership",
    url: "https://crystal-leadership.onrender.com",
    category: "Coaching & Consulting",
    screenshot: "/static/screenshots/CrystalClarityLeadership.png",
  },
  {
    name: "Jake PT",
    url: "https://jake-pt.onrender.com",
    category: "Personal Training",
    screenshot: "/static/screenshots/Jake-PT.png",
  },
  {
    name: "Micro Ink",
    url: "https://www.microink.co.uk/",
    category: "Creative Services",
    screenshot: "/static/screenshots/Microink.png",
  },
];

const WebsiteShowcase = () => {
  return (
    <section className="showcase-section">
      <div className="container">
        <h2 className="section-title">Examples of Our Work</h2>
        <p className="showcase-intro">
          A selection of live sites we have built for clients. Click any card to
          open the site in a new tab.
        </p>
        <div className="showcase-grid">
          {examples.map((site) => (
            <a
              key={site.url}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="showcase-card glass-card"
            >
              <div className="showcase-thumb" aria-hidden="true">
                <img
                  src={site.screenshot}
                  alt={`${site.name} preview`}
                  loading="lazy"
                />
              </div>
              <div className="showcase-info">
                <span className="showcase-category">{site.category}</span>
                <h3>{site.name}</h3>
                <p className="showcase-url">{site.url}</p>
              </div>
            </a>
          ))}
        </div>
        <p className="showcase-note">
          Want to see your business here?{" "}
          <a href="/contact">Book a free sales call</a> and we will walk you
          through our templates and examples.
        </p>
      </div>
    </section>
  );
};

export default WebsiteShowcase;
