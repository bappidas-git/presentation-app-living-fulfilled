import React, { useState } from "react";
import { motion } from "framer-motion";
import GalleryModal from "./GalleryModal";
import "../styles/EvidenceGallery.css";

import WB1 from "../assets/wb-1.jpg";
import WB2 from "../assets/wb-2.png";
import WB3 from "../assets/wb-3.png";
import WB4 from "../assets/wb-4.png";
import WB5 from "../assets/wb-5.png";
import WB6 from "../assets/wb-6.png";
import WB7 from "../assets/wb-7.png";
import WB8 from "../assets/wb-8.png";

const EvidenceGallery = ({ standalone = false }) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      thumb: WB1,
      full: WB1,
      title: "",
      description: "",
    },
    {
      thumb: WB2,
      full: WB2,
      title: "",
      description: "",
    },
    {
      thumb: WB3,
      full: WB3,
      title: "",
      description: "",
    },
    {
      thumb: WB4,
      full: WB4,
      title: "",
      description: "",
    },
    {
      thumb: WB5,
      full: WB5,
      title: "",
      description: "",
    },
    {
      thumb: WB6,
      full: WB6,
      title: "",
      description: "",
    },
    {
      thumb: WB7,
      full: WB7,
      title: "",
      description: "",
    },
    {
      thumb: WB8,
      full: WB8,
      title: "",
      description: "",
    },
  ];

  const openGallery = (index) => {
    setCurrentIndex(index);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
  };

  return (
    <motion.section
      className="evidence-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="evidence-container">
        <div className="section-header">
          <h2 className="section-title">
            Evidence Based Life Planning & Self-Development
          </h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Research-backed methodologies and proven frameworks
          </p>
        </div>

        <div className="gallery-grid">
          {images.map((img, index) => (
            <motion.div
              key={index}
              className="gallery-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openGallery(index)}
            >
              <img src={img.thumb} alt={img.title} />
              <motion.div
                className="gallery-overlay"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span>🔍 View</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <GalleryModal
        isOpen={galleryOpen}
        onClose={closeGallery}
        images={images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </motion.section>
  );
};

export default EvidenceGallery;
