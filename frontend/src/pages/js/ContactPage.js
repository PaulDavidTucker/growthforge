import React, { useState } from "react";
import axios from "axios";
import "../css/ContactPage.css";
import { Helmet } from "react-helmet-async";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/inquiries/", formData);
      alert("Thank you for your inquiry!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      alert("There was an error submitting your form. Please try again later.");
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Contact Page | Reps &amp; Revenue - Reps and Revenue Digital Marketing
          Agency
        </title>
        <meta
          name="description"
          content="Get in contact with the team! Leave us a message, or drop us an email directly. The Reps and Revenue inbox is constantly monitored."
        />
        <meta property="og:title" content="Contact Page | Reps & Revenue" />
        <meta
          property="og:description"
          content="Get in contact with the team! Leave us a message, or drop us an email directly."
        />
      </Helmet>
      <div className="contact-page container">
        <h1>Get in Touch</h1>

        {/* 🔹 Contact info block */}
        <div className="contact-info">
          <p>
            You can also reach us directly at{" "}
            <a href="mailto:info@repsandrevenue.com">info@repsandrevenue.com</a>
          </p>
        </div>

        <div className="contact-form glass-card">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name here.."
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email here.."
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message..."
              ></textarea>
            </div>
            <div className="button-group">
              <button type="submit" className="btn">
                Send Inquiry
              </button>

              <a
                href="mailto:info@repsandrevenue.com?subject=Inquiry%20from%20Website&body=Dear%20RepsAndRevenue%20Team,"
                className="btn secondary"
              >
                Email Us Instead
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
