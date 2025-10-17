import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import Performance from "./components/Performance";
import Settings from "./components/Settings";
import MindGame from "./components/MindGame";
import StatusBar from "./components/StatusBar";
import { NotificationProvider } from "./context/NotificationContext";
import { useOnlineStatus } from "./hooks/useOnlineStatus";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [brightness, setBrightness] = useState(1);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.body.style.filter = `brightness(${brightness})`;
  }, [darkMode, brightness]);

  const { isOnline } = useOnlineStatus();

  useEffect(() => {
    // Update page title with online status
    document.title = `NeuraVision ${isOnline ? '● Online' : '○ Offline'}`;
  }, [isOnline]);

  return (
    <NotificationProvider>
      <div className={`app ${darkMode ? "dark" : ""}`}>
        <Sidebar />
        <div className="main-content">
          <Header
            toggleTheme={() => setDarkMode(!darkMode)}
            darkMode={darkMode}
            brightness={brightness}
            setBrightness={setBrightness}
          />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/mind-game" element={<MindGame />} />
          </Routes>
          <StatusBar />
        </div>
      </div>
    </NotificationProvider>
  );
}

export default App;
