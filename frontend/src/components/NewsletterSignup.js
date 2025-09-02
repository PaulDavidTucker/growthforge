// src/components/NewsletterSignup.js
import React, { useState } from "react";
import axios from "axios";
import "./NewsletterSignup.css";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/subscribe/", { email: email });
      setMessage("Success! Thanks for subscribing.");
      setEmail("");
    } catch (error) {
      if (error.response && error.response.data.email) {
        setMessage(error.response.data.email[0]); // e.g., "subscriber with this email already exists."
      } else {
        setMessage("Error submitting. Please try again.");
      }
    }
  };

  return (
    <div className="newsletter-signup">
      <h4>Join Our Newsletter</h4>
      <p>Get growth tips and agency insights delivered to your inbox.</p>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn-newsletter">
          →
        </button>
      </form>
      {message && <p className="response-message">{message}</p>}
    </div>
  );
};

export default NewsletterSignup;
