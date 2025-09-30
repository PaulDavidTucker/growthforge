import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/js/HomePage";
import AboutPage from "./pages/js/AboutPage";
import PackagesPage from "./pages/js/PackagesPage";
import ContactPage from "./pages/js/ContactPage";
import BlogListPage from "./pages/js/BlogListPage";
import BlogPostPage from "./pages/js/BlogPostPage";
import CaseStudiesPage from "./pages/js/CaseStudiesPage";
import FloatingChatbot from "./components/FloatingChatbot";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />g
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <FloatingChatbot />
    </Router>
  );
}

export default App;
