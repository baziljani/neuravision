import { useState, useEffect } from 'react';

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastActive, setLastActive] = useState(new Date());
  const [uptimeSeconds, setUptimeSeconds] = useState(0);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setLastActive(new Date());
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Track uptime
    const uptimeInterval = setInterval(() => {
      setUptimeSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(uptimeInterval);
    };
  }, []);

  return {
    isOnline,
    lastActive,
    uptimeSeconds,
    uptimeFormatted: formatUptime(uptimeSeconds)
  };
};

const formatUptime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours}h ${minutes}m ${remainingSeconds}s`;
};