import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/BlogListPage.css";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../components/LoadingSpinner";

const BlogListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await axios("/api/blog/");
        setPosts(result.data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div class="container" style={{ textAlign: "center" }}>
        <h3>No Blog posts to display yet!</h3>
        <p>Check back soon to hear from our team!</p>
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
      <div className="blog-list-page container">
        <h1>Reps &amp; Revenue Blog</h1>
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.id} className="post-summary glass-card">
              <h2>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="post-meta">
                By {post.author_name} on{" "}
                {new Date(post.created_on).toLocaleDateString()}
              </p>
              <p>{post.content.substring(0, 200)}...</p>
              <Link to={`/blog/${post.slug}`} className="btn-read-more">
                Read More
              </Link>
            </article>
          ))
        ) : (
          <div style={{ textAlign: "center" }}>
            <h3>No Blog posts to display yet!</h3>
            <p>Check back soon to hear from our team!</p>
          </div>
        )}
      </div>
    </>
  );
};
export default BlogListPage;
