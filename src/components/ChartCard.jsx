import React, { useEffect, useRef, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./ChartCard.css";

const initialData = [
  { name: "Mon", value: 30 },
  { name: "Tue", value: 50 },
  { name: "Wed", value: 80 },
  { name: "Thu", value: 60 },
  { name: "Fri", value: 100 },
];


const ChartCard = ({ increasing }) => {
  const [data, setData] = useState(initialData);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setData((prev) => {
        // Simulate live update: shift left, add new value
        let nextValue;
        if (increasing) {
          nextValue = Math.max(prev[prev.length - 1].value, prev[prev.length - 1].value + Math.random() * 10);
        } else {
          nextValue = Math.max(20, Math.min(120, prev[prev.length - 1].value + (Math.random() * 20 - 10)));
        }
        const nextDay = `T${prev.length + 1}`;
        return [...prev.slice(1), { name: nextDay, value: Math.round(nextValue) }];
      });
    }, 2000);
    return () => clearInterval(intervalRef.current);
  }, [increasing]);

  return (
    <div className="chart-card">
      <h3>Model Performance (Live)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#4facfe" strokeWidth={3} dot={false} isAnimationActive={true} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartCard;
