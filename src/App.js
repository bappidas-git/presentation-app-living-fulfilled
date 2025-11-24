import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import StandalonePage from "./components/StandalonePage";
import LiveSessions from "./components/LiveSessions";
import Outcomes from "./components/Outcomes";
import LifeModel from "./components/LifeModel";
import Modules from "./components/Modules";
import Whiteboard from "./components/Whiteboard";
import EvidenceGallery from "./components/EvidenceGallery";
import ImageZoomModal from "./components/ImageZoomModal";
import LIFE_MODEL_IMG from "./assets/Living-Filfilled-Model.png";
import "./styles/App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLifeModelZoomed, setIsLifeModelZoomed] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          fontSize: "1.5rem",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard Route */}
        <Route
          path="/dashboard"
          element={<Dashboard onLogout={handleLogout} />}
        />

        {/* Live Sessions Route */}
        <Route
          path="/live-sessions"
          element={
            <StandalonePage title="Using Our LIVE Sessions">
              <LiveSessions />
            </StandalonePage>
          }
        />

        {/* Outcomes Route */}
        <Route
          path="/outcomes"
          element={
            <StandalonePage title="Your Outcomes">
              <Outcomes />
            </StandalonePage>
          }
        />

        {/* Life Model Route - Opens Zoom Modal */}
        <Route
          path="/life-model"
          element={
            <>
              <Dashboard onLogout={handleLogout} />
              <ImageZoomModal
                isOpen={true}
                onClose={() => window.history.back()}
                imageUrl={LIFE_MODEL_IMG}
                title="Living Fulfilled Life Model"
              />
            </>
          }
        />

        {/* Modules Route */}
        <Route
          path="/modules"
          element={
            <StandalonePage title="18 Modules Programme">
              <Modules />
            </StandalonePage>
          }
        />

        {/* Whiteboard Route - Full Screen */}
        <Route
          path="/whiteboard"
          element={
            <StandalonePage title="" fullScreen>
              {" "}
              {/* ← title is already empty string */}
              <Whiteboard standalone={true} />
            </StandalonePage>
          }
        />

        {/* Evidence Gallery Route */}
        <Route
          path="/evidence-gallery"
          element={
            <StandalonePage title="Evidence Based Life Planning">
              <EvidenceGallery />
            </StandalonePage>
          }
        />

        {/* Default Route - Redirect to Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
