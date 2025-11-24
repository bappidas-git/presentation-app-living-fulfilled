import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Logout, ArrowForward } from "@mui/icons-material";
import Swal from "sweetalert2";
import "../styles/Dashboard.css";
import Logo from "../assets/Logo.png";

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "apple-alert",
        confirmButton: "apple-button-confirm",
        cancelButton: "apple-button-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userEmail");

        Swal.fire({
          icon: "success",
          title: "Logged Out",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        onLogout();
      }
    });
  };

  const sections = [
    {
      id: "intro",
      title: "Introduction",
      subtitle: "Using Our LIVE Sessions",
      icon: "👥",
      color: "#667eea",
      route: "/live-sessions",
    },
    {
      id: "outcomes",
      title: "Your Outcomes",
      subtitle: "6 Deliverables",
      icon: "🎯",
      color: "#f093fb",
      route: "/outcomes",
    },
    {
      id: "lifemodel",
      title: "Life Model",
      subtitle: "Framework Overview",
      icon: "📊",
      color: "#4facfe",
      route: "/life-model",
    },
    {
      id: "whiteboard",
      title: "Inspired Conversations",
      subtitle: "Interactive Canvas",
      icon: "✏️",
      color: "#43e97b",
      route: "/whiteboard",
    },
    {
      id: "stage1",
      title: "Stage 1",
      subtitle: "6 Modules",
      icon: "1️⃣",
      color: "#fa709a",
      route: "/modules?stage=1",
    },
    {
      id: "stage2",
      title: "Stage 2",
      subtitle: "12 Modules",
      icon: "2️⃣",
      color: "#fee140",
      route: "/modules?stage=2",
    },
    {
      id: "evidence",
      title: "Evidence Gallery",
      subtitle: "Research & Proof",
      icon: "🔬",
      color: "#a8edea",
      route: "/evidence-gallery",
    },
  ];

  return (
    <div className="dashboard-apple">
      {/* Header */}
      <header className="dashboard-apple-header">
        <div className="header-left">
          <img src={Logo} alt="Living Fulfilled" className="header-logo" />
        </div>

        <h1 className="header-title">
          Life Planning & Self Development Coaching Platform
        </h1>

        <button className="logout-button-header" onClick={handleLogoutClick}>
          <Logout fontSize="small" />
          <span>Logout</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="dashboard-apple-main">
        <div className="dashboard-apple-grid">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              className="dashboard-apple-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              onClick={() => navigate(section.route)}
            >
              <div
                style={{ display: "flex", flexDirection: "row", gap: "15px" }}
              >
                <div
                  className="card-icon-wrapper"
                  style={{ background: section.color }}
                >
                  <span className="card-icon">{section.icon}</span>
                </div>
                <div className="card-text">
                  <h3 className="card-title">{section.title}</h3>
                  <p className="card-subtitle">{section.subtitle}</p>
                </div>
              </div>

              <ArrowForward className="card-arrow" />
            </motion.div>
          ))}

          {/* Session Status Card */}
          <motion.div
            className="dashboard-apple-card session-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <div className="session-indicator"></div>
            <div className="card-text">
              <h3 className="card-title">Session Active</h3>
              <p className="card-subtitle">Coach access granted</p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
