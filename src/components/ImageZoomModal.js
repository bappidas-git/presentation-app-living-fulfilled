import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/ImageZoomModal.css";

const ImageZoomModal = ({ isOpen, onClose, imageUrl, title }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "+" || e.key === "=") {
        handleZoomIn();
      } else if (e.key === "-") {
        handleZoomOut();
      } else if (e.key === "0") {
        handleReset();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isOpen, scale]);

  const handleZoomIn = () => {
    setScale((prev) => {
      const newScale = Math.min(prev + 0.5, 5);
      console.log("Zoom In - New Scale:", newScale);
      return newScale;
    });
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const newScale = Math.max(prev - 0.5, 0.5);
      console.log("Zoom Out - New Scale:", newScale);
      if (newScale <= 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newScale;
    });
  };

  const handleReset = () => {
    console.log("Reset triggered");
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Mouse drag handlers
  const handlePointerDown = (e) => {
    if (scale <= 1) return;

    setIsDragging(true);
    setStartDrag({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    e.preventDefault();
  };

  const handlePointerMove = (e) => {
    if (!isDragging || scale <= 1) return;

    setPosition({
      x: e.clientX - startDrag.x,
      y: e.clientY - startDrag.y,
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Mouse wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();

    if (e.deltaY < 0) {
      // Scroll up - zoom in
      handleZoomIn();
    } else {
      // Scroll down - zoom out
      handleZoomOut();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="zoom-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Controls */}
          <motion.div
            className="zoom-controls"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <button
              onClick={handleZoomIn}
              className="zoom-btn"
              title="Zoom In (+ key)"
            >
              ➕ Zoom In
            </button>

            <button
              onClick={handleZoomOut}
              className="zoom-btn"
              title="Zoom Out (- key)"
            >
              ➖ Zoom Out
            </button>

            <button
              onClick={handleReset}
              className="zoom-btn reset-btn"
              title="Reset (0 key)"
            >
              🔄 Reset
            </button>

            <span className="zoom-indicator" title="Current zoom level">
              {Math.round(scale * 100)}%
            </span>

            <button
              onClick={onClose}
              className="zoom-btn close-zoom"
              title="Close (ESC key)"
            >
              ✕ Close
            </button>
          </motion.div>

          {/* Image Container */}
          <div
            className="zoom-content"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onWheel={handleWheel}
          >
            <div
              className="zoom-image-wrapper"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                cursor:
                  scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
                transition: isDragging
                  ? "none"
                  : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <img
                src={imageUrl}
                alt={title}
                draggable={false}
                style={{
                  display: "block",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              />
            </div>
          </div>

          {/* Hints */}
          {scale > 1 && (
            <motion.div
              className="zoom-hint"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              💡 Drag to pan | Scroll to zoom | Press ESC to close
            </motion.div>
          )}

          {scale === 1 && (
            <motion.div
              className="zoom-hint"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              💡 Use Zoom In button or scroll wheel to zoom
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageZoomModal;
