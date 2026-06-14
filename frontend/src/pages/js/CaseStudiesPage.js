// src/pages/CaseStudiesPage.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/CaseStudiesPage.css";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../components/LoadingSpinner";

const CaseStudiesPage = () => {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const result = await axios.get("/api/casestudies/");
        setStudies(result.data);
      } catch (error) {
        console.error("Error fetching case studies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudies();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>
          Case Studies | Reps &amp; Revenue - Reps and Revenue Digital Marketing
          Agency
        </title>
        <meta
          name="description"
          content="Examples from previous success stories, hear about the changes that took them from zero to hero."
        />
        <meta property="og:title" content="Case Studies | Reps & Revenue" />
        <meta
          property="og:description"
          content="Examples from previous success stories, hear about the changes that took them from zero to hero."
        />
      </Helmet>
      <div className="case-studies-page">
        <div className="container">
          <div className="page-header">
            <h1>Our Work</h1>
            <p>
              A selection of live websites we have built for small businesses.
              Each one is custom designed, mobile responsive and built to turn
              visitors into customers.
            </p>
          </div>

          <div className="studies-list">
            {studies.length > 0 ? (
              studies.map((study, index) => (
                <div
                  key={study.id}
                  className={`study-entry ${index % 2 !== 0 ? "reverse" : ""}`}
                >
                  <div className="study-image">
                    {/* The corrected line using the full image_url from the API */}
                    <img src={study.image_url} alt={study.title} />
                  </div>
                  <div className="study-content">
                    <h3>{study.client_name}</h3>
                    <h2>{study.title}</h2>
                    <div className="problem-solution">
                      <h4>The Challenge</h4>
                      <p>{study.problem}</p>
                      <h4>Our Solution</h4>
                      <p>{study.solution}</p>
                    </div>
                    <div className="results-box">
                      <p>Results:</p>
                      <strong>{study.results}</strong>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center" }}>
                <h3>No case studies to display yet.</h3>
                <p>Check back soon to see our latest success stories!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseStudiesPage;
