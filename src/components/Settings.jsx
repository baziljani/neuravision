import React from 'react';
import './Settings.css';

const Settings = () => {
  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="settings-content">
        <div className="settings-section">
          <h3>General Settings</h3>
          <div className="setting-item">
            <label>
              Notifications
              <input type="checkbox" defaultChecked />
            </label>
          </div>
          <div className="setting-item">
            <label>
              Auto-Update
              <input type="checkbox" defaultChecked />
            </label>
          </div>
        </div>
        
        <div className="settings-section">
          <h3>Model Settings</h3>
          <div className="setting-item">
            <label>
              Model Precision
              <select defaultValue="high">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>
          <div className="setting-item">
            <label>
              Processing Mode
              <select defaultValue="gpu">
                <option value="cpu">CPU</option>
                <option value="gpu">GPU</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;