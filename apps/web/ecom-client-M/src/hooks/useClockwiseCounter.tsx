import { useState, useEffect } from "react";

/**
 * Custom Hook for a clockwise counter
 * @param {number} initialValue - The starting value of the counter (default: 0).
 * @param {number} interval - Interval in milliseconds for the counter to update (default: 1000).
 */
const useClockwiseCounter = (initialValue = 0, interval = 1000) => {
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount + 1); // Increment the counter
    }, interval);

    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, [interval]);

  return count;
};

export default useClockwiseCounter;
