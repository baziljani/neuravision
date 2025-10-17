import React, { useEffect, useState } from "react";
import ChartCard from "./ChartCard";
import MetricCard from "./MetricCard";
import Notifications from "./Notifications";
import "./Dashboard.css";

const Dashboard = () => {
  const [accuracy, setAccuracy] = useState(97.6);
  const [models, setModels] = useState(32);
  const [response, setResponse] = useState(1.2);

  useEffect(() => {
    const interval = setInterval(() => {
      setAccuracy((prev) => Math.min(99.9, +(prev + (Math.random() * 0.05)).toFixed(2)));
      setModels((prev) => Math.max(30, Math.min(40, prev + (Math.random() > 0.5 ? 1 : -1))));
      setResponse((prev) => Math.max(0.8, Math.min(2.0, +(prev + (Math.random() * 0.05 - 0.02)).toFixed(2))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <div className="metrics">
        <MetricCard title="AI Accuracy" value={`${accuracy.toFixed(2)}%`} color="#00e6b8" />
        <MetricCard title="Active Models" value={models} color="#4facfe" />
        <MetricCard title="Response Time" value={`${response.toFixed(2)}s`} color="#ff6b81" />
      </div>
      <div className="charts">
        <ChartCard increasing={true} />
        <Notifications />
      </div>
    </div>
  );
};

export default Dashboard;
