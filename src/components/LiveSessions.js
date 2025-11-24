import React from "react";
import { motion } from "framer-motion";
import "../styles/LiveSessions.css";
import CircleTickIcon from "../assets/circle-tick-icon.svg";

const LiveSessions = ({ standalone = false }) => {
  const mainPoints = [
    { number: "1", text: "How are you doing?" },
    { number: "2", text: "Questions you have" },
    { number: "3", text: "Life Plan: Actions & Decisions So Far" },
  ];

  const lastDayItems = [
    { number: "1", text: "Life Plan Excel" },
    { number: "2", text: "1 Page Blueprint" },
    { number: "3", text: "Vision Boards" },
  ];

  return (
    <motion.section
      className={`live-sessions ${standalone ? "standalone-mode" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="sessions-container">
        <div className="sessions-header">
          <h2 className="section-title">Using Our LIVE Sessions</h2>
          <div className="title-underline"></div>
        </div>

        <div className="sessions-content-new">
          {/* Coach Card */}
          <motion.div
            className="coach-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="coach-image-wrapper">
              <img
                src="https://livinfulfilled.com/wp-content/uploads/2025/08/sat-image.jpeg"
                alt="Sat Lunasky"
                className="coach-image"
              />
            </div>
            <div className="coach-info">
              <h3 className="coach-name">Sat Lunasky</h3>
              <p className="coach-title">Founder, Living Fulfilled</p>
            </div>
          </motion.div>

          {/* Session Details */}
          <div className="sessions-details-new">
            {/* Main Points Section */}
            <motion.div
              className="session-block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <ul className="bullet-list">
                {mainPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    className="bullet-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                  >
                    <div className="bullet-content">
                      <img
                        src={CircleTickIcon}
                        alt="bullet"
                        className="bullet-icon"
                      />
                      <span className="bullet-text">{point.text}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Day 1 Section */}
            <motion.div
              className="session-block highlight-block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="bullet-content">
                <h3 className="session-subtitle">
                  On Day 1: We will go through
                </h3>
              </div>
            </motion.div>
            <motion.div
              className="session-block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <ul className="bullet-list">
                <motion.li
                  className="bullet-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + 1 * 0.1, duration: 0.4 }}
                >
                  <div className="bullet-content">
                    <span className="bullet-number">1</span>
                    <span className="bullet-text">The Explainer Video</span>
                  </div>
                </motion.li>
                <motion.li
                  className="bullet-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + 2 * 0.1, duration: 0.4 }}
                >
                  <div className="bullet-content">
                    <span className="bullet-number">2</span>
                    <span className="bullet-text">Step 1 & 2 (18 Modules)</span>
                  </div>
                </motion.li>
                <motion.li
                  className="bullet-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + 3 * 0.1, duration: 0.4 }}
                >
                  <div className="bullet-content">
                    <span className="bullet-number">3</span>
                    <span className="bullet-text">Life plan in detail</span>
                  </div>
                </motion.li>
              </ul>
            </motion.div>

            {/* Last Day Section */}

            <motion.div
              className="session-block highlight-block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="bullet-content">
                <h3 className="session-subtitle">
                  On Last Day: We will go through 3 things
                </h3>
              </div>
            </motion.div>
            <motion.div
              className="session-block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <ul className="bullet-list">
                {lastDayItems.map((item, index) => (
                  <motion.li
                    key={index}
                    className="bullet-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                  >
                    <div className="bullet-content">
                      <span className="bullet-number">{item.number}</span>
                      <span className="bullet-text">{item.text}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default LiveSessions;
