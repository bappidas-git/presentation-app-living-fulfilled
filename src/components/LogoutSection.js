import React from "react";
import { motion } from "framer-motion";
import { Logout } from "@mui/icons-material";
import Swal from "sweetalert2";
import "../styles/LogoutSection.css";

const LogoutSection = ({ onLogout }) => {
  const handleLogout = () => {
    Swal.fire({
      title: "Logout Confirmation",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear auth state
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userEmail");

        Swal.fire({
          icon: "success",
          title: "Logged Out Successfully",
          text: "See you next time!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        // Call parent logout handler
        onLogout();
      }
    });
  };

  return (
    <motion.section
      className="logout-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="logout-container">
        <div className="logout-content">
          <div className="logout-info">
            <h3>Session Active</h3>
            <p>You are currently logged in as a coach</p>
          </div>

          <motion.button
            className="logout-button"
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Logout />
            <span>Logout</span>
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

export default LogoutSection;
