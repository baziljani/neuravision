import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import './StatusBar.css';

const StatusBar = () => {
  const { isOnline, lastActive, uptimeFormatted } = useOnlineStatus();

  return (
    <div className="status-bar">
      <div className="status-item">
        <span className={`status-dot ${isOnline ? 'online' : 'offline'}`}></span>
        {isOnline ? 'Online' : 'Offline'}
      </div>
      <div className="status-item">
        <i className="fas fa-clock"></i>
        Uptime: {uptimeFormatted}
      </div>
      <div className="status-item">
        <i className="fas fa-signal"></i>
        Last Active: {lastActive.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default StatusBar;