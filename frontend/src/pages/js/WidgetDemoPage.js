// frontend/src/pages/js/WidgetDemoPage.js
import React, { useState, useEffect } from "react";
import "../css/WidgetDemo.css";

function WidgetDemoPage() {
  const [config, setConfig] = useState({
    apiKey: "demo-key-12345",
    title: "AI Sales Assistant",
    primaryColor: "#764ba2",
    position: "bottom-right",
    welcomeMessage:
      "Hello! I'm a demo assistant. Ask me anything to see how I work!",
  });

  useEffect(() => {
    updateWidget();
  }, []);

  const updateWidget = () => {
    // Remove existing widget if present
    const existingContainer = document.querySelector(".chatbot-container");
    if (existingContainer) {
      existingContainer.remove();
    }

    // Remove existing script
    const existingScript = document.querySelector('script[src*="chatbot.js"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Load the widget script
    const script = document.createElement("script");
    script.src = "/widget/v1/chatbot.js";
    script.onload = () => {
      if (window.initChatbot) {
        window.initChatbot({
          ...config,
          apiEndpoint: window.location.origin,
        });
      }
    };
    document.body.appendChild(script);
  };

  const handleConfigChange = (key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdateWidget = () => {
    updateWidget();
    showToast("Widget updated successfully!");
  };

  const copyEmbedCode = () => {
    const embedCode = generateEmbedCode();
    navigator.clipboard.writeText(embedCode).then(() => {
      showToast("Embed code copied to clipboard!");
    });
  };

  const generateEmbedCode = () => {
    return `<script src="${window.location.origin}/widget/v1/chatbot.js"></script>
<script>
initChatbot({
  apiKey: "${config.apiKey}",
  apiEndpoint: "${window.location.origin}",
  title: "${config.title}",
  primaryColor: "${config.primaryColor}",
  position: "${config.position}",
  welcomeMessage: "${config.welcomeMessage}"
});
</script>`;
  };

  const showToast = (message) => {
    const toast = document.createElement("div");
    toast.className = "toast-notification show";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  };

  return (
    <div className="widget-demo-page">
      <div className="demo-container">
        <div className="demo-header">
          <h1>🤖 Chatbot Widget Demo</h1>
          <p className="text-muted">
            Instantly test and customize your chatbot widget settings.
          </p>
        </div>

        <div className="config-panel glass-card">
          <h3 className="mb-3">Widget Configuration</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <div className="form-group">
              <label htmlFor="apiKey">API Key:</label>
              <input
                type="text"
                id="apiKey"
                value={config.apiKey}
                onChange={(e) => handleConfigChange("apiKey", e.target.value)}
                placeholder="Your API key"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Header Title:</label>
              <input
                type="text"
                id="title"
                value={config.title}
                onChange={(e) => handleConfigChange("title", e.target.value)}
                placeholder="Chatbot title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="primaryColor">Primary Color:</label>
              <input
                type="color"
                id="primaryColor"
                value={config.primaryColor}
                onChange={(e) =>
                  handleConfigChange("primaryColor", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="position">Position:</label>
              <select
                id="position"
                className="form-select"
                value={config.position}
                onChange={(e) => handleConfigChange("position", e.target.value)}
              >
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
              </select>
            </div>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="welcomeMessage">Welcome Message:</label>
            <textarea
              id="welcomeMessage"
              rows="2"
              className="form-control"
              value={config.welcomeMessage}
              onChange={(e) =>
                handleConfigChange("welcomeMessage", e.target.value)
              }
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={handleUpdateWidget}>
            <i className="bi bi-arrow-clockwise"></i> Update Widget
          </button>
        </div>

        <div className="config-panel glass-card">
          <h3>Embed Code</h3>
          <p>Copy this code to embed the final widget on your website:</p>
          <div className="embed-code">{generateEmbedCode()}</div>
          <button className="btn btn-secondary mt-3" onClick={copyEmbedCode}>
            <i className="bi bi-clipboard"></i> Copy Code
          </button>
        </div>
      </div>
    </div>
  );
}

export default WidgetDemoPage;
