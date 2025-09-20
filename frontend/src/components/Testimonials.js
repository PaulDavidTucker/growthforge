// src/components/Testimonials.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Testimonials.css";

// Simple star component
const Stars = ({ count }) => (
  <div className="stars">
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < count ? "filled" : ""}>
        &#9733;
      </span>
    ))}
  </div>
);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const result = await axios.get("/api/testimonials/");
        setTestimonials(result.data);
      } catch (error) {
        console.error("Error fetching testimonials", error);
      }
    };
    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) return null; // Don't render if there are no testimonials

  return (
    <section className="testimonials">
      <div className="container">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-scroller">
          {testimonials.map((item) => (
            <div key={item.id} className="testimonial-card">
              <Stars count={item.rating} />
              <p className="quote">"{item.quote}"</p>
              <p className="client">
                <strong>{item.client_name}</strong> {item.company}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
