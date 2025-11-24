import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/GalleryModal.css";

const GalleryModal = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  setCurrentIndex,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isOpen, currentIndex]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="gallery-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            className="gallery-close"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>

          <motion.button
            className="gallery-nav prev"
            onClick={prevImage}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            ‹
          </motion.button>

          <motion.button
            className="gallery-nav next"
            onClick={nextImage}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            ›
          </motion.button>

          <div className="gallery-main">
            <motion.img
              key={currentIndex}
              src={images[currentIndex].full}
              alt={`Image ${currentIndex + 1}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="gallery-thumbs">
            {images.map((img, idx) => (
              <motion.img
                key={idx}
                src={img.thumb}
                alt={`Thumbnail ${idx + 1}`}
                className={idx === currentIndex ? "active" : ""}
                onClick={() => setCurrentIndex(idx)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryModal;
