import React from 'react';
import './Performance.css';

const Performance = () => {
  return (
    <div className="performance-container">
      <h2>System Performance</h2>
      <div className="performance-content">
        <div className="performance-card">
          <h3>CPU Usage</h3>
          <div className="metric">
            <div className="metric-value">45%</div>
            <div className="metric-label">Current Load</div>
          </div>
        </div>
        <div className="performance-card">
          <h3>Memory Usage</h3>
          <div className="metric">
            <div className="metric-value">6.8 GB</div>
            <div className="metric-label">Of 16 GB</div>
          </div>
        </div>
        <div className="performance-card">
          <h3>GPU Status</h3>
          <div className="metric">
            <div className="metric-value">72%</div>
            <div className="metric-label">Utilization</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;