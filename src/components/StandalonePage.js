import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowBack } from "@mui/icons-material";
import Logo from "../assets/Logo.png";
import "../styles/StandalonePage.css";

const StandalonePage = ({ title, children, fullScreen = false }) => {
  const navigate = useNavigate();

  return (
    <div className={`standalone-apple ${fullScreen ? "fullscreen" : ""}`}>
      <header className="standalone-apple-header">
        <div className="header-left-standalone-page">
          <img
            src={Logo}
            alt="Living Fulfilled"
            className="header-logo-small"
          />

          <button
            className="back-button-apple"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowBack fontSize="small" />
            <span>Dashboard</span>
          </button>
        </div>
      </header>

      <motion.main
        className="standalone-apple-content"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default StandalonePage;
