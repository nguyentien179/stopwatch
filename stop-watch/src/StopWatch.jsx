import React from "react";
import { useState, useRef, useEffect } from "react";

function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }
  function stop() {
    setIsRunning(false);
  }
  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }
  function formatTime() {
    let hour = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minute = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let second = Math.floor((elapsedTime / 1000) % 60);
    let millisecond = Math.floor((elapsedTime % 1000) / 10);

    return `${minute}:${second}:${millisecond}`;
  }
  return (
    <>
      <div className="stopwatch">
        <div className="display">{formatTime()}</div>
        <div className="controls">
          <button className="startBtn" onClick={start}>
            Start
          </button>
          <button className="stopBtn" onClick={stop}>
            Stop
          </button>
          <button className="resetBtn" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
}
export default StopWatch;
