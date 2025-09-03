import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/BlogListPage.css";

const BlogListPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await axios("/api/blog/");
      setPosts(result.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="blog-list-page container">
      <h1>GrowthForge Blog</h1>
      {posts.map((post) => (
        <article key={post.id} className="post-summary">
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
      ))}
    </div>
  );
};
export default BlogListPage;
