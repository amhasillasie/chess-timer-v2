import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Timer() {
  const query = useQuery();  
  const navigate = useNavigate();  
  const initialMinutes = parseInt(query.get("minutes")) || 5;
  const initialSeconds = initialMinutes * 60; 
                   
  const [timeA, setTimeA] = useState(initialSeconds);
  const [timeB, setTimeB] = useState(initialSeconds); 
  const [active, setActive] = useState(null);
  const [paused, setPaused] = useState(true);
  const timerRef = useRef(null);
        
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (paused || !active) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      if (active === "A") {
        setTimeA((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (active === "B") {
        setTimeB((prev) => (prev > 0 ? prev - 1 : 0));
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [active, paused]);

  const handleToggle = () => {
    if (paused) return;
    setActive((prev) => (prev === "A" ? "B" : "A"));
  };

  const handlePause = () => setPaused(true);
  const handleStart = () => {
    if (!active) setActive("A");
    setPaused(false);
  };
  const handleReset = () => {
    setPaused(true);
    setTimeA(initialSeconds);
    setTimeB(initialSeconds);
    setActive(null);
  };
  const handleStop = () => {
    handleReset();
    navigate("/");
  };

  return (
    <div className="p-4 space-y-4">
      <div className="button"> 
        <button onClick={handlePause} className="Pause">Pause</button>
        <button onClick={handleStart} className="Start">Start</button>
        <button onClick={handleReset} className="Reset">Reset</button>
        <button onClick={handleStop} className="Back">Back</button>
      </div>
<br/><br/><br/><br/><br/><br/><br/><br/>
      <div className="time">
        
        <div
          onClick={handleToggle}
          className={`timea ${
            active === "A" ? "bg-gray-200" : "bg-white"
          } shadow-md`}
        ><p className="player1">player 1</p>
          {formatTime(timeA)}
        </div>
        <div
          onClick={handleToggle}
          className={`timeb ${
            active === "B" ? "bg-gray-200" : "bg-white"
          } shadow-md`}
        ><p className="player2">player 2</p>
          {formatTime(timeB)}
        </div>
      </div>
    </div>
  );
}
