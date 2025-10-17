import React from "react";
import "./MetricCard.css";

const MetricCard = ({ title, value, color }) => {
  return (
    <div className="metric-card" style={{ borderTop: `4px solid ${color}` }}>
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
};

export default MetricCard;
