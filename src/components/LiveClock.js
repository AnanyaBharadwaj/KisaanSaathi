// src/components/LiveClock.js
import React, { useState, useEffect } from 'react';

const LiveClock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000); // Update every second

    return () => clearInterval(timer); // Clear interval on component unmount
  }, []);

  return (
    <div className="clock">
      {time}
    </div>
  );
};

export default LiveClock;
