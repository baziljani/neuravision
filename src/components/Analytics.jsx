import React from 'react';
import './Analytics.css';

const Analytics = () => {
  return (
    <div className="analytics-container">
      <h2>Analytics</h2>
      <div className="analytics-content">
        <div className="analytics-card">
          <h3>User Engagement</h3>
          <p>Weekly Active Users: 2,345</p>
          <p>Average Session Duration: 15 minutes</p>
        </div>
        <div className="analytics-card">
          <h3>Model Performance</h3>
          <p>Accuracy: 97.6%</p>
          <p>Processing Speed: 1.2s</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;