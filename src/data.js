// src/data.js

// 🌈 Dashboard metrics data
export const metricsData = [
  { id: 1, title: "AI Accuracy", value: "97.6%", color: "#00e6b8" },
  { id: 2, title: "Active Models", value: "32", color: "#4facfe" },
  { id: 3, title: "Response Time", value: "1.2s", color: "#ff6b81" },
  { id: 4, title: "Data Streams", value: "12K+", color: "#ffb347" },
];

// 📊 Chart data (Model Performance)
export const performanceData = [
  { name: "Mon", value: 30 },
  { name: "Tue", value: 50 },
  { name: "Wed", value: 80 },
  { name: "Thu", value: 60 },
  { name: "Fri", value: 100 },
  { name: "Sat", value: 90 },
  { name: "Sun", value: 70 },
];

// ⚙️ System activity logs
export const systemLogs = [
  "🧠 Neural model retrained successfully",
  "⚡ New dataset integrated: 10K samples",
  "📈 Accuracy improved to 97.6%",
  "🛰️ API ping: Stable connection",
  "💾 Model checkpoint saved (v1.6)",
  "🎯 User engagement increased by 14%",
];

// 🌐 AI model network visualization (optional future feature)
export const nodeNetwork = [
  { id: 1, name: "Vision Model", connections: [2, 3] },
  { id: 2, name: "Audio Model", connections: [1, 4] },
  { id: 3, name: "Language Model", connections: [1, 4] },
  { id: 4, name: "Core AI Engine", connections: [2, 3] },
];
