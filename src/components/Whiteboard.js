import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "../styles/Whiteboard.css";

const Whiteboard = ({ standalone = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const whiteboardRef = useRef(null);
  const isInitialized = useRef(false);
  const textBoxesRef = useRef([]);
  const canvasStateRef = useRef(null); // Store canvas state

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    setTimeout(() => {
      initializeWhiteboard();
    }, 100);
  }, []);

  const initializeWhiteboard = () => {
    const board = document.getElementById("board");
    const overlay = document.getElementById("overlay");
    const uiLayer = document.getElementById("uiLayer");

    if (!board || !overlay || !uiLayer) return;

    const ctx = board.getContext("2d");
    const overlayCtx = overlay.getContext("2d");
    const toolbar = document.getElementById("toolbar");

    let drawing = false;
    let tool = "pen";
    let startX, startY;
    const eraserSize = 30;
    let textArmed = false;
    let previousTool = "pen";

    function saveCanvasState() {
      const board = document.getElementById("board");
      if (board && board.width > 0 && board.height > 0) {
        canvasStateRef.current = board.toDataURL();
      }
    }

    function restoreCanvasState() {
      const board = document.getElementById("board");
      const ctx = board.getContext("2d");

      if (canvasStateRef.current) {
        const img = new Image();
        img.onload = function () {
          // Fill with white first
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, board.width, board.height);
          // Draw saved content
          ctx.drawImage(img, 0, 0, board.width, board.height);
        };
        img.src = canvasStateRef.current;
      } else {
        // First time - just fill with white
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, board.width, board.height);
      }
    }

    function resizeCanvas() {
      const container = document.getElementById("wb-container");
      if (!container) return;

      // Save current state before resize
      saveCanvasState();

      const rect = container.getBoundingClientRect();
      board.width = overlay.width = rect.width;
      board.height = overlay.height = rect.height;

      // Restore state after resize
      restoreCanvasState();
    }

    resizeCanvas();

    // Store the resize function for external use
    window.whiteboardResize = resizeCanvas;

    if (toolbar) {
      toolbar.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-tool]");
        if (!btn) return;
        const selected = btn.dataset.tool;

        if (selected === "text") {
          previousTool = tool;
          tool = "text";
          textArmed = true;
          uiLayer.style.pointerEvents = "auto";
          overlay.style.pointerEvents = "none";
          highlightActive("text");
        } else {
          disarmText();
          setTool(selected);
        }
      });

      document
        .getElementById("clearBtn")
        ?.addEventListener("click", clearCanvas);
    }

    function highlightActive(t) {
      const buttons = toolbar?.querySelectorAll("button[data-tool]") || [];
      buttons.forEach((b) =>
        b.classList.toggle("active", b.dataset.tool === t)
      );
    }

    function setTool(newTool) {
      tool = newTool;
      overlayCtx.clearRect(0, 0, overlay.width, overlay.height);
      highlightActive(tool);
      overlay.style.pointerEvents = "auto";
      uiLayer.style.pointerEvents = "none";
    }

    function disarmText() {
      textArmed = false;
      if (tool === "text") {
        tool = previousTool || "pen";
        highlightActive(tool);
      }
      overlay.style.pointerEvents = "auto";
      uiLayer.style.pointerEvents = "none";
    }

    function clearCanvas() {
      // Clear saved state
      canvasStateRef.current = null;

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, board.width, board.height);
      overlayCtx.clearRect(0, 0, overlay.width, overlay.height);
      uiLayer.querySelectorAll(".text-wrap").forEach((n) => n.remove());
      textBoxesRef.current = [];
    }

    function drawArrow(c, x1, y1, x2, y2) {
      const headLen = 12;
      const angle = Math.atan2(y2 - y1, x2 - x1);
      c.beginPath();
      c.moveTo(x1, y1);
      c.lineTo(x2, y2);
      c.stroke();
      c.beginPath();
      c.moveTo(x2, y2);
      c.lineTo(
        x2 - headLen * Math.cos(angle - Math.PI / 6),
        y2 - headLen * Math.sin(angle - Math.PI / 6)
      );
      c.moveTo(x2, y2);
      c.lineTo(
        x2 - headLen * Math.cos(angle + Math.PI / 6),
        y2 - headLen * Math.sin(angle + Math.PI / 6)
      );
      c.stroke();
    }

    overlay.addEventListener("pointerdown", (e) => {
      if (tool === "text") return;
      drawing = true;
      startX = e.offsetX;
      startY = e.offsetY;
      if (tool === "pen" || tool === "highlighter") {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
      }
    });

    overlay.addEventListener("pointermove", (e) => {
      const x = e.offsetX,
        y = e.offsetY;
      overlayCtx.clearRect(0, 0, overlay.width, overlay.height);

      if (tool === "eraser") {
        overlayCtx.beginPath();
        overlayCtx.arc(x, y, eraserSize, 0, Math.PI * 2);
        overlayCtx.strokeStyle = "red";
        overlayCtx.lineWidth = 1;
        overlayCtx.stroke();
      }

      if (!drawing) return;

      if (tool === "pen") {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.globalCompositeOperation = "source-over";
        ctx.lineTo(x, y);
        ctx.stroke();
      } else if (tool === "highlighter") {
        ctx.strokeStyle = "rgba(255,255,0,0.3)";
        ctx.lineWidth = 15;
        ctx.globalCompositeOperation = "multiply";
        ctx.lineTo(x, y);
        ctx.stroke();
      } else if (tool === "eraser") {
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, eraserSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else {
        overlayCtx.save();
        overlayCtx.strokeStyle = "#000";
        overlayCtx.lineWidth = 2;
        overlayCtx.setLineDash([6, 4]);

        if (tool === "line" || tool === "arrow") {
          overlayCtx.beginPath();
          overlayCtx.moveTo(startX, startY);
          overlayCtx.lineTo(x, y);
          overlayCtx.stroke();
        } else if (tool === "rect") {
          overlayCtx.strokeRect(startX, startY, x - startX, y - startY);
        } else if (tool === "circle") {
          overlayCtx.beginPath();
          const r = Math.hypot(x - startX, y - startY);
          overlayCtx.arc(startX, startY, r, 0, Math.PI * 2);
          overlayCtx.stroke();
        }
        overlayCtx.restore();
      }
    });

    overlay.addEventListener("pointerup", (e) => {
      if (tool === "text") return;
      if (!drawing) return;
      drawing = false;
      const x = e.offsetX,
        y = e.offsetY;

      ctx.globalCompositeOperation = "source-over";
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";

      if (tool === "line") {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else if (tool === "arrow") {
        drawArrow(ctx, startX, startY, x, y);
      } else if (tool === "rect") {
        ctx.strokeRect(startX, startY, x - startX, y - startY);
      } else if (tool === "circle") {
        ctx.beginPath();
        const r = Math.hypot(x - startX, y - startY);
        ctx.arc(startX, startY, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      overlayCtx.clearRect(0, 0, overlay.width, overlay.height);
    });

    function clamp(val, min, max) {
      return Math.max(min, Math.min(max, val));
    }

    function createTextWrap(x, y) {
      const wrap = document.createElement("div");
      wrap.className = "text-wrap";
      wrap.style.left = x + "px";
      wrap.style.top = y + "px";
      wrap.style.width = "260px";
      wrap.style.height = "90px";

      const content = document.createElement("div");
      content.className = "text-content";
      content.setAttribute("contenteditable", "false");
      content.spellcheck = false;
      wrap.appendChild(content);

      const controls = document.createElement("div");
      controls.className = "box-controls";

      const dragBtn = document.createElement("button");
      dragBtn.className = "box-btn drag";
      dragBtn.title = "Drag";
      dragBtn.textContent = "⠿";

      const delBtn = document.createElement("button");
      delBtn.className = "box-btn delete";
      delBtn.title = "Delete";
      delBtn.textContent = "🗑";

      controls.appendChild(dragBtn);
      controls.appendChild(delBtn);
      wrap.appendChild(controls);
      uiLayer.appendChild(wrap);

      // Store text box reference
      textBoxesRef.current.push({ element: wrap, content: content });

      content.addEventListener("dblclick", () => {
        content.setAttribute("contenteditable", "true");
        content.focus();
        const sel = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(content);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      });

      content.addEventListener("blur", (ev) => {
        if (ev.relatedTarget && ev.relatedTarget.closest(".box-controls"))
          return;
        content.setAttribute("contenteditable", "false");
      });

      delBtn.addEventListener("click", () => {
        wrap.remove();
        textBoxesRef.current = textBoxesRef.current.filter(
          (tb) => tb.element !== wrap
        );
      });

      let dragging = false;
      let dragDX = 0,
        dragDY = 0;

      dragBtn.addEventListener("pointerdown", (ev) => {
        dragging = true;
        dragBtn.setPointerCapture(ev.pointerId);
        const wrapRect = wrap.getBoundingClientRect();
        dragDX = ev.clientX - wrapRect.left;
        dragDY = ev.clientY - wrapRect.top;
        ev.preventDefault();
      });

      dragBtn.addEventListener("pointermove", (ev) => {
        if (!dragging) return;
        const contRect = uiLayer.getBoundingClientRect();
        const newLeft = clamp(
          ev.clientX - contRect.left - dragDX,
          0,
          contRect.width - wrap.offsetWidth
        );
        const newTop = clamp(
          ev.clientY - contRect.top - dragDY,
          0,
          contRect.height - wrap.offsetHeight
        );
        wrap.style.left = newLeft + "px";
        wrap.style.top = newTop + "px";
      });

      dragBtn.addEventListener("pointerup", (ev) => {
        dragging = false;
        try {
          dragBtn.releasePointerCapture(ev.pointerId);
        } catch (e) {}
      });

      const ro = new ResizeObserver(() => {
        const contRect = uiLayer.getBoundingClientRect();
        const left = parseFloat(wrap.style.left);
        const top = parseFloat(wrap.style.top);
        const clampedLeft = clamp(left, 0, contRect.width - wrap.offsetWidth);
        const clampedTop = clamp(top, 0, contRect.height - wrap.offsetHeight);
        wrap.style.left = clampedLeft + "px";
        wrap.style.top = clampedTop + "px";
      });
      ro.observe(wrap);

      return wrap;
    }

    uiLayer.addEventListener("pointerdown", (e) => {
      if (tool !== "text" || !textArmed) return;
      if (e.target.closest(".box-controls")) return;

      const rect = uiLayer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createTextWrap(x, y);
      disarmText();
    });

    setTool("pen");
  };

  const saveWhiteboard = () => {
    const board = document.getElementById("board");
    const uiLayer = document.getElementById("uiLayer");

    if (!board) return;

    // Create a temporary canvas for rendering
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = board.width;
    tempCanvas.height = board.height;
    const tempCtx = tempCanvas.getContext("2d");

    // Fill with white background
    tempCtx.fillStyle = "#FFFFFF";
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Draw the board content
    tempCtx.drawImage(board, 0, 0);

    // Draw text boxes on top
    textBoxesRef.current.forEach(({ element, content }) => {
      const rect = element.getBoundingClientRect();
      const uiRect = uiLayer.getBoundingClientRect();

      const x = rect.left - uiRect.left;
      const y = rect.top - uiRect.top;
      const width = rect.width;
      const height = rect.height;

      const text = content.textContent || content.innerText;

      if (text && text.trim()) {
        // Draw text box background
        tempCtx.fillStyle = "rgba(255, 255, 255, 0.95)";
        tempCtx.fillRect(x, y, width, height);

        // Draw text box border
        tempCtx.strokeStyle = "#888";
        tempCtx.lineWidth = 2;
        tempCtx.setLineDash([5, 3]);
        tempCtx.strokeRect(x, y, width, height);
        tempCtx.setLineDash([]);

        // Draw text
        tempCtx.fillStyle = "#000";
        tempCtx.font = "14px Arial, sans-serif";
        tempCtx.textBaseline = "top";

        const lines = text.split("\n");
        const lineHeight = 20;
        const padding = 10;

        lines.forEach((line, index) => {
          const words = line.split(" ");
          let currentLine = "";
          let yPos = y + padding + index * lineHeight;

          words.forEach((word) => {
            const testLine = currentLine + word + " ";
            const metrics = tempCtx.measureText(testLine);

            if (metrics.width > width - padding * 2 && currentLine !== "") {
              tempCtx.fillText(currentLine, x + padding, yPos);
              currentLine = word + " ";
              yPos += lineHeight;
            } else {
              currentLine = testLine;
            }
          });

          tempCtx.fillText(currentLine, x + padding, yPos);
        });
      }
    });

    // Convert to JPEG with white background
    const link = document.createElement("a");
    link.download = `whiteboard-${Date.now()}.jpg`;
    link.href = tempCanvas.toDataURL("image/jpeg", 0.95);
    link.click();
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    // Call resize after DOM updates
    setTimeout(() => {
      if (window.whiteboardResize) {
        window.whiteboardResize();
      }
    }, 150);
  };

  return (
    <div
      className={`whiteboard-section ${isExpanded ? "expanded" : ""} ${
        standalone ? "standalone-mode" : ""
      }`}
    >
      {!standalone && (
        <div className="whiteboard-header-new">
          <h2 className="whiteboard-title">White Board</h2>
          <div className="title-underline"></div>
        </div>
      )}

      <div className="whiteboard-wrapper" id="wb-container">
        <div
          className={`whiteboard-section ${isExpanded ? "expanded" : ""} ${
            standalone ? "standalone-mode" : ""
          }`}
        >
          {!standalone && (
            <div className="whiteboard-header-new">
              <h2 className="whiteboard-title">White Board</h2>
              <div className="title-underline"></div>
            </div>
          )}

          <div className="whiteboard-wrapper" id="wb-container">
            <motion.section
              className={`whiteboard-section ${isExpanded ? "expanded" : ""}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              ref={whiteboardRef}
            >
              <div className="whiteboard-header-new">
                <h2 className="whiteboard-title">White Board</h2>
                <div className="title-underline"></div>
              </div>

              <div className="whiteboard-wrapper" id="wb-container">
                <div id="toolbar" className="wb-toolbar">
                  <button data-tool="pen">✏️ Pen</button>
                  <button data-tool="eraser">🩹 Eraser</button>
                  <button data-tool="line">📏 Line</button>
                  <button data-tool="arrow">➡️ Arrow</button>
                  <button data-tool="rect">▭ Rect</button>
                  <button data-tool="circle">⚪ Circle</button>
                  <button data-tool="highlighter">🖍 Highlighter</button>
                  <button data-tool="text">🔤 Text</button>
                  <button id="clearBtn">🗑 Clear</button>

                  <motion.button
                    onClick={saveWhiteboard}
                    className="wb-action-btn-inline save-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    💾 Save
                  </motion.button>

                  <motion.button
                    onClick={toggleExpand}
                    className="wb-action-btn-inline expand-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isExpanded ? "🗗 Minimize" : "⛶ Expand"}
                  </motion.button>
                </div>

                <div className="canvas-container">
                  <canvas id="board"></canvas>
                  <canvas id="overlay"></canvas>
                  <div id="uiLayer"></div>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whiteboard;
