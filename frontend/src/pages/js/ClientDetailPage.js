// frontend/src/pages/js/ClientDetailPage.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/ChatbotDashboard.css";

function ClientDetailPage() {
  const { clientId } = useParams();
  const [client, setClient] = useState(null);
  const [stats, setStats] = useState({});
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClientData();
  }, [clientId]);

  const fetchClientData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/clients/${clientId}/config/`,
        {
          credentials: "include",
        },
      );
      if (!response.ok) {
        if (response.status === 403) {
          window.location.href = "/admin/login/?next=/chatbot/dashboard";
          return;
        }
        throw new Error("Failed to fetch client data");
      }
      const data = await response.json();
      setClient(data.client);
      setStats(data.stats);
      setSessions(data.sessions || []);
    } catch (error) {
      console.error("Error fetching client data:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message, "success");
    });
  };

  const showToast = (message, type = "info") => {
    const toast = document.createElement("div");
    toast.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    toast.style.top = "20px";
    toast.style.right = "20px";
    toast.style.zIndex = "9999";
    toast.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">Client not found</div>
      </div>
    );
  }

  const embedCode = `<!-- Chatbot Widget -->
<script src="${window.location.origin}/widget/v1/chatbot.js"></script>
<script>
  initChatbot({
    apiKey: "${client.api_key}",
    apiEndpoint: "${window.location.origin}"
  });
</script>`;

  return (
    <div className="client-detail-page">
      <div className="container-fluid py-4">
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Link
                  to="/chatbot/dashboard"
                  className="btn btn-sm btn-outline-secondary mb-2"
                >
                  <i className="bi bi-arrow-left"></i> Back to Dashboard
                </Link>
                <h1>{client.name}</h1>
                <p className="text-muted">
                  <i className="bi bi-globe"></i> {client.domain}
                </p>
              </div>
              <div>
                <a
                  href={`/admin/chatbot/client/${client.id}/change/`}
                  className="btn btn-primary"
                >
                  <i className="bi bi-pencil"></i> Edit Client
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card glass-card">
              <div className="card-body text-center">
                <h3 className="text-primary">{stats.total_sessions || 0}</h3>
                <p className="text-muted mb-0">Total Sessions</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card glass-card">
              <div className="card-body text-center">
                <h3 className="text-success">
                  {stats.sessions_last_30_days || 0}
                </h3>
                <p className="text-muted mb-0">Last 30 Days</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card glass-card">
              <div className="card-body text-center">
                <h3 className="text-info">{stats.total_messages || 0}</h3>
                <p className="text-muted mb-0">Total Messages</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card glass-card">
              <div className="card-body text-center">
                <h3 className="text-warning">
                  {stats.avg_messages_per_session
                    ? stats.avg_messages_per_session.toFixed(1)
                    : "0.0"}
                </h3>
                <p className="text-muted mb-0">Avg Msgs/Session</p>
              </div>
            </div>
          </div>
        </div>

        {/* API Configuration */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card glass-card">
              <div className="card-header">
                <h5>API Configuration</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">
                    <strong>API Key</strong>
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control font-monospace"
                      value={client.api_key}
                      readOnly
                    />
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        copyToClipboard(
                          client.api_key,
                          "API Key copied to clipboard!",
                        )
                      }
                    >
                      <i className="bi bi-clipboard"></i> Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Embed Code */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card glass-card">
              <div className="card-header">
                <h5>Widget Embed Code</h5>
              </div>
              <div className="card-body">
                <p>
                  Copy this code to embed the chatbot on{" "}
                  <strong>{client.domain}</strong>:
                </p>
                <div className="bg-light p-3 rounded position-relative">
                  <pre className="mb-0">
                    <code>{embedCode}</code>
                  </pre>
                </div>
                <button
                  className="btn btn-outline-primary mt-3 me-2"
                  onClick={() =>
                    copyToClipboard(embedCode, "Embed code copied!")
                  }
                >
                  <i className="bi bi-clipboard"></i> Copy Embed Code
                </button>
                <Link
                  to="/chatbot/widget-demo"
                  className="btn btn-outline-secondary mt-3"
                >
                  <i className="bi bi-box-arrow-up-right"></i> Test Widget
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="row">
          <div className="col-12">
            <div className="card glass-card">
              <div className="card-header">
                <h5>Recent Sessions (Last 50)</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Session ID</th>
                        <th>Started</th>
                        <th>Ended</th>
                        <th>Duration</th>
                        <th>Messages</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessions.length === 0 ? (
                        <tr>
                          <td
                            colSpan="6"
                            className="text-center text-muted py-4"
                          >
                            No sessions recorded yet.
                            <br />
                            <small>
                              Sessions will appear here once users interact with
                              the chatbot.
                            </small>
                          </td>
                        </tr>
                      ) : (
                        sessions.map((session) => (
                          <tr key={session.session_id}>
                            <td>
                              <code>
                                {session.session_id.slice(0, 20)}
                                {session.session_id.length > 20 && "..."}
                              </code>
                            </td>
                            <td>
                              {new Date(session.started_at).toLocaleString()}
                            </td>
                            <td>
                              {session.ended_at
                                ? new Date(session.ended_at).toLocaleString()
                                : "—"}
                            </td>
                            <td>
                              {session.ended_at && session.started_at
                                ? `${Math.round(
                                    (new Date(session.ended_at) -
                                      new Date(session.started_at)) /
                                      1000,
                                  )}s`
                                : "—"}
                            </td>
                            <td>
                              <span className="badge bg-info">
                                {session.message_count}
                              </span>
                            </td>
                            <td>
                              {session.ended_at ? (
                                <span className="badge bg-secondary">
                                  Ended
                                </span>
                              ) : (
                                <span className="badge bg-success">Active</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDetailPage;
