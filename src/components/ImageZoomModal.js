import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/ImageZoomModal.css";

const ImageZoomModal = ({ isOpen, onClose, imageUrl, title }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [fitScale, setFitScale] = useState(1);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

  const imageRef = useRef(null);
  const containerRef = useRef(null);

  // Calculate viewport size
  useEffect(() => {
    const updateViewportSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setViewportSize({ width: rect.width, height: rect.height });
      }
    };

    updateViewportSize();
    window.addEventListener('resize', updateViewportSize);
    return () => window.removeEventListener('resize', updateViewportSize);
  }, [isOpen]);

  // Load image and calculate fit-to-window scale
  useEffect(() => {
    if (isOpen && imageUrl) {
      const img = new Image();
      img.onload = () => {
        setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });

        // Calculate fit-to-window scale with some padding
        const padding = 40; // 20px padding on each side
        const availableWidth = window.innerWidth - padding;
        const availableHeight = window.innerHeight - 200; // Account for controls and hints

        const scaleX = availableWidth / img.naturalWidth;
        const scaleY = availableHeight / img.naturalHeight;
        const calculatedFitScale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 100%

        setFitScale(calculatedFitScale);
        setScale(1); // Start at 100% zoom
        setPosition({ x: 0, y: 0 });
      };
      img.src = imageUrl;
    }
  }, [isOpen, imageUrl]);

  // Reset when modal opens/closes
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

  // Helper function to constrain position within boundaries
  const constrainPosition = useCallback((pos, currentScale, imgDims, viewportDims) => {
    if (!imgDims.width || !imgDims.height || !viewportDims.width || !viewportDims.height) {
      return { x: 0, y: 0 };
    }

    const scaledWidth = imgDims.width * currentScale;
    const scaledHeight = imgDims.height * currentScale;

    // If image is smaller than viewport, center it
    if (scaledWidth <= viewportDims.width && scaledHeight <= viewportDims.height) {
      return { x: 0, y: 0 };
    }

    // Calculate max pan boundaries
    const maxX = Math.max(0, (scaledWidth - viewportDims.width) / 2);
    const maxY = Math.max(0, (scaledHeight - viewportDims.height) / 2);

    return {
      x: Math.max(-maxX, Math.min(maxX, pos.x)),
      y: Math.max(-maxY, Math.min(maxY, pos.y))
    };
  }, []);

  const handleZoomIn = useCallback((centerPoint = null) => {
    setScale((prev) => {
      const newScale = Math.min(prev + 0.25, 5);

      // If zooming to a point, adjust position to keep that point centered
      if (centerPoint && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = centerPoint.x - rect.left - rect.width / 2;
        const y = centerPoint.y - rect.top - rect.height / 2;

        const scaleRatio = newScale / prev;
        setPosition((prevPos) => {
          const newPos = {
            x: prevPos.x - x * (scaleRatio - 1),
            y: prevPos.y - y * (scaleRatio - 1)
          };
          return constrainPosition(newPos, newScale, imageDimensions, viewportSize);
        });
      }

      return newScale;
    });
  }, [constrainPosition, imageDimensions, viewportSize]);

  const handleZoomOut = useCallback((centerPoint = null) => {
    setScale((prev) => {
      const newScale = Math.max(prev - 0.25, fitScale * 0.5);

      // If zooming to a point, adjust position to keep that point centered
      if (centerPoint && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = centerPoint.x - rect.left - rect.width / 2;
        const y = centerPoint.y - rect.top - rect.height / 2;

        const scaleRatio = newScale / prev;
        setPosition((prevPos) => {
          const newPos = {
            x: prevPos.x - x * (scaleRatio - 1),
            y: prevPos.y - y * (scaleRatio - 1)
          };
          return constrainPosition(newPos, newScale, imageDimensions, viewportSize);
        });
      } else {
        setPosition((prevPos) => constrainPosition(prevPos, newScale, imageDimensions, viewportSize));
      }

      return newScale;
    });
  }, [constrainPosition, fitScale, imageDimensions, viewportSize]);

  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleFitToWindow = useCallback(() => {
    setScale(fitScale);
    setPosition({ x: 0, y: 0 });
  }, [fitScale]);

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
      } else if (e.key === "f" || e.key === "F") {
        handleFitToWindow();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isOpen, onClose, handleZoomIn, handleZoomOut, handleReset, handleFitToWindow]);

  // Mouse drag handlers
  const handlePointerDown = (e) => {
    // Check if image is larger than viewport at current scale
    const scaledWidth = imageDimensions.width * scale;
    const scaledHeight = imageDimensions.height * scale;
    const canPan = scaledWidth > viewportSize.width || scaledHeight > viewportSize.height;

    if (!canPan) return;

    setIsDragging(true);
    setStartDrag({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    e.preventDefault();
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;

    const newPosition = {
      x: e.clientX - startDrag.x,
      y: e.clientY - startDrag.y,
    };

    // Apply constraints while dragging
    const constrainedPosition = constrainPosition(newPosition, scale, imageDimensions, viewportSize);
    setPosition(constrainedPosition);
  };

  const handlePointerUp = () => {
    if (isDragging) {
      setIsDragging(false);
      // Final constraint check on release
      setPosition((pos) => constrainPosition(pos, scale, imageDimensions, viewportSize));
    }
  };

  // Mouse wheel zoom with smooth scaling
  const handleWheel = (e) => {
    e.preventDefault();

    const delta = e.deltaY;
    const zoomSpeed = 0.1; // Smooth zoom speed

    setScale((prev) => {
      const zoomFactor = delta > 0 ? 1 - zoomSpeed : 1 + zoomSpeed;
      const newScale = Math.max(fitScale * 0.5, Math.min(prev * zoomFactor, 5));

      // Zoom towards cursor position
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const scaleRatio = newScale / prev;
        setPosition((prevPos) => {
          const newPos = {
            x: prevPos.x - x * (scaleRatio - 1),
            y: prevPos.y - y * (scaleRatio - 1)
          };
          return constrainPosition(newPos, newScale, imageDimensions, viewportSize);
        });
      }

      return newScale;
    });
  };

  if (!isOpen) return null;

  // Check if image is pannable
  const scaledWidth = imageDimensions.width * scale;
  const scaledHeight = imageDimensions.height * scale;
  const canPan = scaledWidth > viewportSize.width || scaledHeight > viewportSize.height;

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
              onClick={() => handleZoomIn()}
              className="zoom-btn"
              title="Zoom In (+ key)"
            >
              ➕ Zoom In
            </button>

            <button
              onClick={() => handleZoomOut()}
              className="zoom-btn"
              title="Zoom Out (- key)"
            >
              ➖ Zoom Out
            </button>

            <button
              onClick={handleReset}
              className="zoom-btn reset-btn"
              title="Reset to 100% (0 key)"
            >
              🔄 100%
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
            ref={containerRef}
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
                cursor: canPan ? (isDragging ? "grabbing" : "grab") : "default",
                transition: isDragging
                  ? "none"
                  : "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <img
                ref={imageRef}
                src={imageUrl}
                alt={title}
                draggable={false}
                style={{
                  display: "block",
                  width: `${imageDimensions.width}px`,
                  height: `${imageDimensions.height}px`,
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageZoomModal;
