import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import "bootstrap-icons/font/bootstrap-icons.css";

import HomePage from "./pages/js/HomePage";
import AboutPage from "./pages/js/AboutPage";
import PackagesPage from "./pages/js/PackagesPage";
import ContactPage from "./pages/js/ContactPage";
import BlogListPage from "./pages/js/BlogListPage";
import BlogPostPage from "./pages/js/BlogPostPage";
import CaseStudiesPage from "./pages/js/CaseStudiesPage";
import FloatingChatbot from "./components/FloatingChatbot";
import CTASection from "./components/CTASection";
import ChatbotDashboardPage from "./pages/js/ChatbotDashboardPage";
import ClientDetailPage from "./pages/js/ClientDetailPage";
import WidgetDemoPage from "./pages/js/WidgetDemoPage";
import ChatbotDocsPage from "./pages/js/ChatbotDocsPage";

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
          <Route path="/chatbot/dashboard" element={<ChatbotDashboardPage />} />
          <Route
            path="/chatbot/client/:clientId"
            element={<ClientDetailPage />}
          />
          <Route path="/chatbot/widget-demo" element={<WidgetDemoPage />} />
          <Route path="/chatbot/docs" element={<ChatbotDocsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <CTASection />
      <Footer />
      <FloatingChatbot />
    </Router>
  );
}

export default App;
