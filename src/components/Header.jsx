import React from "react";
import "./Header.css";

const Header = ({ toggleTheme, darkMode, brightness, setBrightness }) => {
  return (
    <header className="header">
      <h1>🧠 NeuraVision</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={toggleTheme}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
        <label style={{ color: '#fff', fontWeight: 500 }}>
          Brightness
          <input
            type="range"
            min={0.5}
            max={1.5}
            step={0.01}
            value={brightness}
            onChange={e => setBrightness(Number(e.target.value))}
            style={{ marginLeft: 8 }}
          />
        </label>
      </div>
    </header>
  );
};

export default Header;
