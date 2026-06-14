import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import "../css/OnboardingPage.css";

const OnboardingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business_name: "",
    current_website: "",
    branding_notes: "",
    colour_preferences: "",
    layout_pages: "",
    font_preferences: "",
    image_notes: "",
    additional_features: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("/api/onboarding/", formData);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        business_name: "",
        current_website: "",
        branding_notes: "",
        colour_preferences: "",
        layout_pages: "",
        font_preferences: "",
        image_notes: "",
        additional_features: "",
      });
    } catch (error) {
      console.error("Error submitting onboarding form:", error);
      alert(
        "There was an error submitting the form. Please check your details and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Website Onboarding | Reps &amp; Revenue
        </title>
        <meta
          name="description"
          content="Tell us about your business and website requirements."
        />
      </Helmet>

      <div className="onboarding-page container">
        <div className="page-header">
          <h1>Website Onboarding</h1>
          <p>
            Fill in as much as you can below. The more detail you give us, the
            faster we can build a site you love.
          </p>
        </div>

        {submitted ? (
          <div className="onboarding-success glass-card">
            <h2>Thank you!</h2>
            <p>
              Your onboarding information has been received. We will review it
              and be in touch within 24 hours to confirm next steps.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="onboarding-form glass-card">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="business_name">Business Name</label>
                <input
                  type="text"
                  id="business_name"
                  name="business_name"
                  value={formData.business_name}
                  onChange={handleChange}
                  placeholder="Your Business Ltd"
                />
              </div>
              <div className="form-group">
                <label htmlFor="current_website">Current Website (if any)</label>
                <input
                  type="url"
                  id="current_website"
                  name="current_website"
                  value={formData.current_website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="branding_notes">Branding</label>
              <textarea
                id="branding_notes"
                name="branding_notes"
                value={formData.branding_notes}
                onChange={handleChange}
                placeholder="Describe your brand, tone and any existing logos or guidelines."
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="colour_preferences">Colours</label>
                <input
                  type="text"
                  id="colour_preferences"
                  name="colour_preferences"
                  value={formData.colour_preferences}
                  onChange={handleChange}
                  placeholder="e.g. navy blue, white, gold"
                />
              </div>
              <div className="form-group">
                <label htmlFor="font_preferences">Fonts</label>
                <input
                  type="text"
                  id="font_preferences"
                  name="font_preferences"
                  onChange={handleChange}
                  value={formData.font_preferences}
                  placeholder="e.g. clean sans-serif, classic serif"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="layout_pages">Layout / Pages Needed</label>
              <textarea
                id="layout_pages"
                name="layout_pages"
                value={formData.layout_pages}
                onChange={handleChange}
                placeholder="e.g. Home, About, Services, Contact, Testimonials"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="image_notes">Images</label>
              <textarea
                id="image_notes"
                name="image_notes"
                value={formData.image_notes}
                onChange={handleChange}
                placeholder="What photos, logos or graphics do you have? Let us know if you need help sourcing images."
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="additional_features">Additional Features</label>
              <textarea
                id="additional_features"
                name="additional_features"
                value={formData.additional_features}
                onChange={handleChange}
                placeholder="Anything else? e.g. chatbot, booking system, CRM integration, e-commerce."
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Submit Onboarding Form"}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default OnboardingPage;
