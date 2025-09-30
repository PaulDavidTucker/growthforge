// src/pages/BlogPostPage.js - CORRECTED
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // <-- The key import
import "../css/BlogPostPage.css"; // We'll create this file
import { Helmet } from "react-helmet-async";

const BlogPostPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useParams() reads the URL and finds the ':slug' variable
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      // Good practice: Add a check to prevent fetching if slug is missing
      if (!slug) return;

      setLoading(true);
      try {
        // The URL now correctly uses the slug from the URL
        console.log(`Fetching post with slug: /api/blog/${slug}/`); // Debugging line
        const result = await axios.get(`/api/blog/${slug}/`);
        setPost(result.data);
        setError("");
      } catch (err) {
        console.error("Failed to fetch post:", err);
        setError("Post not found. It might have been moved or deleted.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]); // The effect re-runs if the slug in the URL changes

  if (loading) {
    return (
      <div className="container">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Blog | Reps &amp; Revenue - Reps and Revenue Digital Marketing Agency
        </title>
        <meta
          name="description"
          content="Learn about the mission and expert team at Reps and Revenue, a results-driven digital marketing agency specializing in sales funnels, AI, and automation."
        />
        <meta property="og:title" content="Blogs | Reps & Revenue" />
        <meta
          property="og:description"
          content="Hear from our expert team about their work, and what makes them so passionate about building businesses."
        />
      </Helmet>
      <div className="blog-post-page container">
        <h1>{post.title}</h1>
        <p className="post-meta">
          By {post.author_name} on{" "}
          {new Date(post.created_on).toLocaleDateString()}
        </p>
        {/* Using dangerouslySetInnerHTML is okay here since you control the content via the admin */}
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <button className="btn btn-primary" onClick={() => navigate("/blog")}>
          Back
        </button>
      </div>
    </>
  );
};

export default BlogPostPage;
