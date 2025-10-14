// src/pages/BlogPostPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../css/BlogPostPage.css";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../components/LoadingSpinner"; // Adjust path if needed

const BlogPostPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      setLoading(true);
      try {
        console.log(`Fetching post with slug: /api/blog/${slug}/`);
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
  }, [slug]);

  // NEW: Utility function to format plain text with line breaks/paragraphs
  // If content already looks like HTML (has tags), render it as-is
  const formatContent = (content) => {
    if (!content) return "";

    // Quick check: If it contains HTML tags, assume it's pre-formatted
    if (/<[a-z][\s\S]*>/i.test(content)) {
      return content; // Return raw HTML
    }

    // Split by double newlines for paragraphs
    const paragraphs = content.split(/\n\s*\n/).map((paragraph) => {
      // Within each paragraph, replace single newlines with <br />
      const lines = paragraph
        .split(/\n/)
        .filter((line) => line.trim() !== "")
        .map((line) => `${line}<br />`);
      return `<p>${lines.join("")}</p>`;
    });

    return paragraphs.join("");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container">
        <h2>
          Something isn't quite right with the blog post, try again later!
        </h2>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Blog | Reps & Revenue - Reps and Revenue Digital Marketing Agency
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
        {/* Use the formatted content */}
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
        />
        <button className="btn btn-primary" onClick={() => navigate("/blog")}>
          Back
        </button>
      </div>
    </>
  );
};

export default BlogPostPage;
