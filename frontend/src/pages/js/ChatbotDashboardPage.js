// frontend/src/pages/js/ChatbotDashboardPage.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/ChatbotDashboard.css";

function ChatbotDashboardPage() {
  const [clients, setClients] = useState([]);
  const [recentSessions, setRecentSessions] = useState([]);
  const [stats, setStats] = useState({
    totalClients: 0,
    totalSessions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/chatbot/dashboard/", {
        credentials: "include",
      });
      if (!response.ok) {
        if (response.status === 403) {
          window.location.href = "/admin/login/?next=/chatbot/dashboard";
          return;
        }
        throw new Error("Failed to fetch dashboard data");
      }
      const data = await response.json();
      setClients(data.clients || []);
      setRecentSessions(data.recent_sessions || []);
      setStats({
        totalClients: data.total_clients || 0,
        totalSessions: data.total_sessions || 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyApiKey = (apiKey) => {
    navigator.clipboard.writeText(apiKey).then(() => {
      showToast("API Key copied to clipboard!", "success");
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
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
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

  return (
    <div className="chatbot-dashboard-page">
      <div className="container-fluid py-4">
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1>Chatbot Dashboard</h1>
                <p className="text-muted">
                  Manage your chatbot clients and monitor activity
                </p>
              </div>
              <div>
                <a
                  href="/admin/chatbot/client/add/"
                  className="btn btn-primary"
                >
                  <i className="bi bi-plus-circle"></i> New Client
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card glass-card">
              <div className="card-body text-center">
                <h3 className="text-primary">{stats.totalClients}</h3>
                <p className="text-muted mb-0">Active Clients</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card glass-card">
              <div className="card-body text-center">
                <h3 className="text-success">{stats.totalSessions}</h3>
                <p className="text-muted mb-0">Total Sessions</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card glass-card">
              <div className="card-body text-center">
                <h3 className="text-info">{clients.length}</h3>
                <p className="text-muted mb-0">Domains</p>
              </div>
            </div>
          </div>
        </div>

        {/* Clients List */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card glass-card">
              <div className="card-header">
                <h5>Clients</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Domain</th>
                        <th>Sessions</th>
                        <th>Total Messages</th>
                        <th>API Key</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-center py-4">
                            <p className="text-muted mb-3">No clients yet</p>
                            <a
                              href="/admin/chatbot/client/add/"
                              className="btn btn-primary"
                            >
                              <i className="bi bi-plus-circle"></i> Create Your
                              First Client
                            </a>
                          </td>
                        </tr>
                      ) : (
                        clients.map((client) => (
                          <tr key={client.id}>
                            <td>
                              <strong>{client.name}</strong>
                              {!client.is_active && (
                                <span className="badge bg-secondary ms-2">
                                  Inactive
                                </span>
                              )}
                            </td>
                            <td>
                              <code>{client.domain}</code>
                            </td>
                            <td>
                              <span className="badge bg-info">
                                {client.session_count || 0}
                              </span>
                            </td>
                            <td>{client.total_messages || 0}</td>
                            <td>
                              <code className="text-muted">
                                {client.api_key.slice(0, 12)}...
                              </code>
                              <button
                                className="btn btn-sm btn-outline-secondary ms-2"
                                onClick={() => copyApiKey(client.api_key)}
                                title="Copy API Key"
                              >
                                <i className="bi bi-clipboard"></i>
                              </button>
                            </td>
                            <td>
                              {new Date(client.created_at).toLocaleDateString()}
                            </td>
                            <td>
                              <Link
                                to={`/chatbot/client/${client.id}`}
                                className="btn btn-sm btn-outline-primary me-2"
                              >
                                <i className="bi bi-eye"></i> View
                              </Link>
                              <a
                                href={`/admin/chatbot/client/${client.id}/change/`}
                                className="btn btn-sm btn-outline-secondary"
                              >
                                <i className="bi bi-pencil"></i> Edit
                              </a>
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

        {/* Recent Activity */}
        <div className="row">
          <div className="col-12">
            <div className="card glass-card">
              <div className="card-header">
                <h5>Recent Sessions</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Client</th>
                        <th>Session ID</th>
                        <th>Started</th>
                        <th>Messages</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentSessions.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center text-muted">
                            No sessions yet
                          </td>
                        </tr>
                      ) : (
                        recentSessions.map((session) => (
                          <tr key={session.session_id}>
                            <td>
                              <Link to={`/chatbot/client/${session.client.id}`}>
                                {session.client.name}
                              </Link>
                            </td>
                            <td>
                              <code>{session.session_id.slice(0, 16)}...</code>
                            </td>
                            <td>
                              {new Date(session.started_at).toLocaleString()}
                            </td>
                            <td>{session.message_count}</td>
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

export default ChatbotDashboardPage;
