import React, { useEffect, useState } from "react";
import "./Notifications.css";

const baseLogs = [
  "🧩 Model retrained successfully",
  "⚡ New dataset added: 10K samples",
];

const Notifications = () => {
  const [logs, setLogs] = useState([...baseLogs, "📊 Accuracy improved to 97.6%"]);
  useEffect(() => {
    const interval = setInterval(() => {
      const acc = (97.6 + Math.random() * 2).toFixed(2);
      setLogs((prev) => [
        `📊 Accuracy improved to ${acc}%`,
        ...baseLogs,
      ]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="notifications">
      <h3>System Activity</h3>
      <ul>
        {logs.map((log, i) => (
          <li key={i}>{log}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
