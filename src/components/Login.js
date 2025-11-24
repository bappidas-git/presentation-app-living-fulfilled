import React, { useState } from "react";
import { motion } from "framer-motion";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";
import "../styles/Login.css";
import Logo from "../assets/Logo.png";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Hardcoded credentials
  const VALID_EMAIL = "freedom@livinfulfilled.com";
  const VALID_PASSWORD = "Sat@12345";

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters with uppercase, lowercase, number and special character";
    }

    // If there are validation errors, show them
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: Object.values(newErrors)[0],
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    // Check credentials
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (
        formData.email === VALID_EMAIL &&
        formData.password === VALID_PASSWORD
      ) {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back, Coach!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        // Store auth state
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", formData.email);

        // Call parent login handler
        onLogin();
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password. Please try again.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="login-card"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {/* Logo */}
          <motion.div
            className="login-logo"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <img src={Logo} alt="Living Fulfilled Logo" />
          </motion.div>

          {/* Title */}
          <motion.h1
            className="login-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Coach Login
          </motion.h1>

          <motion.p
            className="login-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Access your presentation dashboard
          </motion.p>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Input */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? "error" : ""}`}
                placeholder="Enter your email"
                autoComplete="email"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </motion.div>

            {/* Password Input */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errors.password ? "error" : ""}`}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="login-button"
              disabled={isLoading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? <span className="loading-spinner"></span> : "Login"}
            </motion.button>
          </form>

          {/* Footer */}
          <motion.p
            className="login-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Living Fulfilled © 2025
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
