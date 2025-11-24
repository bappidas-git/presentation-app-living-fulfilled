import React from "react";
import { motion } from "framer-motion";
import ImageZoomModal from "./ImageZoomModal";
import "../styles/LifeModel.css";
import LIFE_MODEL_IMG from "../assets/Living-Filfilled-Model.png";

const LifeModel = () => {
  const [isZoomed, setIsZoomed] = React.useState(false);
  const imageUrl = LIFE_MODEL_IMG;

  return (
    <motion.section
      className="life-model-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="life-model-container">
        <div className="section-header">
          <h2 className="section-title">The Living Fulfilled Life Model</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Click to explore the comprehensive life planning framework
          </p>
        </div>

        <motion.div
          className="life-model-preview"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsZoomed(true)}
        >
          <img src={imageUrl} alt="Life Model" />
          <motion.div
            className="preview-overlay"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span>🔍 Click to Zoom & Explore</span>
          </motion.div>
        </motion.div>
      </div>

      <ImageZoomModal
        isOpen={isZoomed}
        onClose={() => setIsZoomed(false)}
        imageUrl={imageUrl}
        title="Living Fulfilled Life Model"
      />
    </motion.section>
  );
};

export default LifeModel;
