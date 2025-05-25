import { useState, useEffect, useCallback } from 'react';

const useTimer = (isPlaying) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const reset = useCallback(() => {
    setTime(0);
  }, []);

  return { time, reset };
};

export default useTimer;