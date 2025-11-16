// frontend/src/pages/js/ChatbotDocsPage.js
import React from "react";
import { Link } from "react-router-dom";
import "../css/ChatbotDocs.css";

function ChatbotDocsPage() {
  return (
    <div className="chatbot-docs-page">
      <div className="container py-5">
        <div className="docs-header text-center mb-5">
          <h1>Chatbot Widget Documentation</h1>
          <p className="lead text-muted">
            Everything you need to integrate our AI-powered chatbot into your
            website
          </p>
        </div>

        <div className="docs-content">
          {/* Quick Start */}
          <section className="doc-section glass-card mb-4">
            <h2>🚀 Quick Start</h2>
            <p>
              Get your chatbot up and running in under 5 minutes. Follow these
              simple steps:
            </p>
            <ol>
              <li>
                <strong>Get your API key:</strong> Contact us or log in to your{" "}
                <Link to="/chatbot/dashboard">dashboard</Link> to obtain your
                unique API key.
              </li>
              <li>
                <strong>Add the script:</strong> Copy the embed code below and
                paste it before the closing <code>&lt;/body&gt;</code> tag on
                your website.
              </li>
              <li>
                <strong>Configure (optional):</strong> Customize the chatbot's
                appearance and behavior using the configuration options.
              </li>
            </ol>

            <div className="code-block">
              <pre>
                <code>{`<!-- Add this before </body> -->
<script src="${window.location.origin}/widget/v1/chatbot.js"></script>
<script>
  initChatbot({
    apiKey: "YOUR_API_KEY_HERE",
    apiEndpoint: "${window.location.origin}"
  });
</script>`}</code>
              </pre>
            </div>
          </section>

          {/* Configuration Options */}
          <section className="doc-section glass-card mb-4">
            <h2>⚙️ Configuration Options</h2>
            <p>
              Customize your chatbot by passing configuration options to the{" "}
              <code>initChatbot()</code> function:
            </p>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>apiKey</code>
                  </td>
                  <td>string</td>
                  <td>
                    <em>required</em>
                  </td>
                  <td>Your unique API key for authentication</td>
                </tr>
                <tr>
                  <td>
                    <code>apiEndpoint</code>
                  </td>
                  <td>string</td>
                  <td>
                    <em>required</em>
                  </td>
                  <td>The base URL for the chatbot API</td>
                </tr>
                <tr>
                  <td>
                    <code>title</code>
                  </td>
                  <td>string</td>
                  <td>"Chat with us"</td>
                  <td>The title displayed in the chatbot header</td>
                </tr>
                <tr>
                  <td>
                    <code>primaryColor</code>
                  </td>
                  <td>string</td>
                  <td>"#0077ff"</td>
                  <td>The primary color for the chatbot UI (hex code)</td>
                </tr>
                <tr>
                  <td>
                    <code>position</code>
                  </td>
                  <td>string</td>
                  <td>"bottom-right"</td>
                  <td>
                    Position of the chatbot: "bottom-right" or "bottom-left"
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>welcomeMessage</code>
                  </td>
                  <td>string</td>
                  <td>"Hello! How can I help you today?"</td>
                  <td>The initial greeting message</td>
                </tr>
              </tbody>
            </table>

            <div className="code-block">
              <pre>
                <code>{`// Full configuration example
initChatbot({
  apiKey: "your-api-key",
  apiEndpoint: "${window.location.origin}",
  title: "Customer Support",
  primaryColor: "#764ba2",
  position: "bottom-left",
  welcomeMessage: "Hi! I'm here to help. What can I do for you?"
});`}</code>
              </pre>
            </div>
          </section>

          {/* Platform-Specific Guides */}
          <section className="doc-section glass-card mb-4">
            <h2>🔧 Platform-Specific Integration</h2>

            <h3 className="mt-4">WordPress</h3>
            <p>For WordPress sites, you have two options:</p>
            <ul>
              <li>
                <strong>Option 1:</strong> Use a custom HTML widget or plugin
                like "Insert Headers and Footers" to add the embed code to your
                site footer.
              </li>
              <li>
                <strong>Option 2:</strong> Edit your theme's{" "}
                <code>footer.php</code> file and paste the embed code before the
                closing <code>&lt;/body&gt;</code> tag.
              </li>
            </ul>
            <div className="alert alert-info">
              <strong>Coming Soon:</strong> We're developing a native WordPress
              plugin for even easier integration!
            </div>

            <h3 className="mt-4">Shopify</h3>
            <ol>
              <li>
                Go to{" "}
                <strong>Online Store → Themes → Actions → Edit Code</strong>
              </li>
              <li>
                Open the <code>theme.liquid</code> file
              </li>
              <li>
                Paste the embed code before the closing{" "}
                <code>&lt;/body&gt;</code> tag
              </li>
              <li>Save and preview your store</li>
            </ol>

            <h3 className="mt-4">Custom HTML/React/Vue</h3>
            <p>
              For custom applications, simply add the script tag to your main
              HTML file or initialize the chatbot in your application's entry
              point:
            </p>
            <div className="code-block">
              <pre>
                <code>{`// React example (useEffect hook)
useEffect(() => {
  const script = document.createElement('script');
  script.src = '${window.location.origin}/widget/v1/chatbot.js';
  script.onload = () => {
    window.initChatbot({
      apiKey: 'your-api-key',
      apiEndpoint: '${window.location.origin}'
    });
  };
  document.body.appendChild(script);
}, []);`}</code>
              </pre>
            </div>
          </section>

          {/* Testing */}
          <section className="doc-section glass-card mb-4">
            <h2>🧪 Testing Your Integration</h2>
            <p>Before going live, test your chatbot integration:</p>
            <ol>
              <li>
                Use our <Link to="/chatbot/widget-demo">Widget Demo</Link> to
                preview different configurations
              </li>
              <li>
                Test the chatbot on your staging/development environment first
              </li>
              <li>Verify that the chatbot appears in the correct position</li>
              <li>
                Send test messages to ensure the API connection is working
              </li>
              <li>
                Check the <Link to="/chatbot/dashboard">dashboard</Link> to see
                session data
              </li>
            </ol>
          </section>

          {/* Troubleshooting */}
          <section className="doc-section glass-card mb-4">
            <h2>🐛 Troubleshooting</h2>

            <h3>Chatbot not appearing?</h3>
            <ul>
              <li>Verify your API key is correct</li>
              <li>Check browser console for JavaScript errors</li>
              <li>
                Ensure the script is loading (check Network tab in DevTools)
              </li>
              <li>
                Make sure there are no Content Security Policy (CSP) issues
                blocking the script
              </li>
            </ul>

            <h3>Messages not sending?</h3>
            <ul>
              <li>Check that your domain is whitelisted in the dashboard</li>
              <li>Verify the WebSocket connection is established</li>
              <li>Look for CORS errors in the console</li>
            </ul>

            <h3>Styling conflicts?</h3>
            <ul>
              <li>
                The chatbot uses scoped styles to avoid conflicts, but if you
                notice issues, check for CSS specificity problems
              </li>
              <li>
                Try adjusting z-index values if the chatbot is hidden behind
                other elements
              </li>
            </ul>
          </section>

          {/* API Reference */}
          <section className="doc-section glass-card mb-4">
            <h2>📚 API Reference</h2>
            <p>Advanced usage and programmatic control:</p>

            <h3>JavaScript API</h3>
            <p>
              Once initialized, you can control the chatbot programmatically:
            </p>
            <div className="code-block">
              <pre>
                <code>{`// Open the chatbot
window.chatbotAPI.open();

// Close the chatbot
window.chatbotAPI.close();

// Send a message programmatically
window.chatbotAPI.sendMessage("Hello!");

// Listen for events
window.chatbotAPI.on('message', (data) => {
  console.log('New message:', data);
});`}</code>
              </pre>
            </div>

            <h3>REST API Endpoints</h3>
            <p>For backend integrations:</p>
            <ul>
              <li>
                <code>POST /api/chatbot/message/</code> - Send a message
              </li>
              <li>
                <code>GET /api/chatbot/sessions/</code> - Get session history
              </li>
              <li>
                <code>GET /api/chatbot/analytics/</code> - Get analytics data
              </li>
            </ul>
          </section>

          {/* Support */}
          <section className="doc-section glass-card mb-4">
            <h2>💬 Support & Contact</h2>
            <p>Need help? We're here for you:</p>
            <ul>
              <li>
                <strong>Email:</strong> support@youragency.com
              </li>
              <li>
                <strong>Dashboard:</strong>{" "}
                <Link to="/chatbot/dashboard">Manage your clients</Link>
              </li>
              <li>
                <strong>Demo:</strong>{" "}
                <Link to="/chatbot/widget-demo">Test the widget</Link>
              </li>
            </ul>
          </section>

          {/* CTA */}
          <div className="text-center mt-5">
            <h3>Ready to get started?</h3>
            <p className="text-muted mb-4">
              Try our widget demo or access your dashboard to manage clients
            </p>
            <Link to="/chatbot/widget-demo" className="btn btn-primary me-3">
              Try Demo
            </Link>
            <Link to="/chatbot/dashboard" className="btn btn-outline-primary">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatbotDocsPage;
