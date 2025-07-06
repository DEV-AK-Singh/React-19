import { useState, useEffect } from "react";
import "./App.css";
import styled from "styled-components";

const Button = styled.button((props)=>{
  return{
    backgroundColor: props.$isRunning===true ? "red" : props.$isRunning===false ? "green" : props.$color,
    color: "white",
    padding: "10px 20px",
    marginRight: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    "&:hover": {
      opacity: 0.8,
    },
  }
})

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId; 
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } 
    return () => {
      if (intervalId) {
        clearInterval(intervalId); 
      }
    };
  }, [isRunning]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
  };

  // Format time as HH:MM:SS:MS
  const formatTime = (timeInMs) => {
    const hours = Math.floor(timeInMs / 3600000);
    const minutes = Math.floor((timeInMs % 3600000) / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    const milliseconds = Math.floor((timeInMs % 1000) / 10);
    return `${hours.toString().padStart(2, "0")}
    :${minutes.toString().padStart(2, "0")}
    :${seconds.toString().padStart(2, "0")}
    :${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Stopwatch</h1>
      <div style={{ fontSize: "48px", marginBottom: "20px" }}>{formatTime(time)}</div>
      <div>
        <Button $isRunning={isRunning} onClick={startStop}>
          {isRunning ? "Stop" : "Start"}
        </Button>
        <Button $color={"black"} onClick={reset}>
          Reset
        </Button>
      </div>
    </div>
  );
}

export default Stopwatch;
