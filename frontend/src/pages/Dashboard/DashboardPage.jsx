import React from "react";
import {
  Users,
  Megaphone,
  Newspaper,
  PlusCircle,
  Pencil,
  Trash2,
  CheckCircle,
  Loader2,
  Lightbulb,
} from "lucide-react";

import "./Dashboard.css";

const Dashboard = () => {
  return (
    <main className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, Admin. Manage content, users, and system activity.</p>
      </header>

      {/* Metrics */}
      <section>
        <h2 className="section-title">Key Stats</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <Users className="metric-icon" />
            <h4>Total Users</h4>
            <p>540</p>
          </div>
          <div className="metric-card">
            <Megaphone className="metric-icon" />
            <h4>Announcements</h4>
            <p>12</p>
          </div>
          <div className="metric-card">
            <Newspaper className="metric-icon" />
            <h4>News Items</h4>
            <p>24</p>
          </div>
          <div className="metric-card">
            <CheckCircle className="metric-icon" />
            <h4>Completed Projects</h4>
            <p>18</p>
          </div>
        </div>
      </section>

      {/* Announcements & News */}
      <section className="admin-flex-grid">
        <div className="card-box">
          <h3>
            <Megaphone size={18} className="icon-inline" /> Latest Announcements
          </h3>
          <ul>
            <li>Upcoming youth innovation summit – Oct 2</li>
            <li>Public holiday announced for Eid celebrations</li>
            <li>Call for teachers in remote LGAs</li>
          </ul>
        </div>

        <div className="card-box">
          <h3>
            <Newspaper size={18} className="icon-inline" /> News & Updates
          </h3>
          <ul>
            <li>Governor flags off road project in Argungu</li>
            <li>Over 10,000 farmers receive subsidies</li>
            <li>New health mobile units launched</li>
          </ul>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions">
          <button className="action-button">
            <PlusCircle size={16} /> Add News
          </button>
          <button className="action-button">
            <PlusCircle size={16} /> Post Announcement
          </button>
          <button className="action-button">
            <Pencil size={16} /> Manage Projects
          </button>
          <button className="action-button">
            <Trash2 size={16} /> Delete Content
          </button>
        </div>
      </section>

      {/* Project Overview */}
      <section className="admin-flex-grid">
        <div className="card-box">
          <h3>
            <CheckCircle size={18} className="icon-inline" /> Completed Projects
          </h3>
          <ul>
            <li>150 Schools Renovated</li>
            <li>Medical outreach in 21 LGAs</li>
            <li>Roads constructed in remote areas</li>
            <li>Youth Bootcamp for entrepreneurs</li>
          </ul>
        </div>

        <div className="card-box">
          <h3>
            <Loader2 size={18} className="icon-inline" /> Ongoing Projects
          </h3>
          <ul>
            <li>Modern hospital in Yauri (70% complete)</li>
            <li>Teacher recruitment across Kebbi</li>
            <li>Agricultural mechanization program</li>
          </ul>
        </div>

        <div className="card-box">
          <h3>
            <Lightbulb size={18} className="icon-inline" /> Proposed Projects
          </h3>
          <ul>
            <li>Kebbi Tech Innovation Park</li>
            <li>Solar-powered water supply</li>
            <li>Smart city model in Birnin Kebbi</li>
          </ul>
        </div>
      </section>

      <footer className="dashboard-footer">
        <p>© 2025 Kebbi State Government Admin Panel</p>
      </footer>
    </main>
  );
};

export default Dashboard;
