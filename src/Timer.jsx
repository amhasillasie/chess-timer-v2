import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Play, Pause, RotateCcw, Home, User, Sun, Moon, Target, Clock } from "lucide-react";

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
  const [theme, setTheme] = useState('light');
  const timerRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };
        
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
    <div className="app-container">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>
      
      <div className="timer-container">
        <div className="timer-header">
          <h2 className="timer-title">Chess Timer</h2>
          <div className="timer-status">
            {!active && paused && (
              <>
                <Target size={16} />
                <span className="status-text">Ready to start!</span>
              </>
            )}
            {active && !paused && (
              <>
                <Clock size={16} />
                <span className="status-text">Player {active} turn</span>
              </>
            )}
            {paused && active && (
              <>
                <Pause size={16} />
                <span className="status-text">Game paused</span>
              </>
            )}
          </div>
        </div>

        <div className="time">
          <div
            onClick={handleToggle}
            className={`timer-card timea ${
              active === "A" ? "active" : "inactive"
            } ${timeA <= 60 ? "warning" : ""}`}
          >
            <div className="player-info">
              <User className="player-avatar" />
              <p className="player-name">Player 1</p>
            </div>
            <div className="timer-display">{formatTime(timeA)}</div>
            <div className="timer-indicator">
              {active === "A" && !paused && <div className="pulse-dot"></div>}
            </div>
          </div>
          
          <div className="vs-divider">VS</div>
          
          <div
            onClick={handleToggle}
            className={`timer-card timeb ${
              active === "B" ? "active" : "inactive"
            } ${timeB <= 60 ? "warning" : ""}`}
          >
            <div className="player-info">
              <User className="player-avatar" />
              <p className="player-name">Player 2</p>
            </div>
            <div className="timer-display">{formatTime(timeB)}</div>
            <div className="timer-indicator">
              {active === "B" && !paused && <div className="pulse-dot"></div>}
            </div>
          </div>
        </div>

        <div className="control-buttons"> 
          <button onClick={handleStart} className="btn-primary" disabled={!paused && active}>
            <Play className="btn-icon" />
            <span>Start</span>
          </button>
          <button onClick={handlePause} className="btn-warning" disabled={paused}>
            <Pause className="btn-icon" />
            <span>Pause</span>
          </button>
          <button onClick={handleReset} className="btn-secondary">
            <RotateCcw className="btn-icon" />
            <span>Reset</span>
          </button>
          <button onClick={handleStop} className="btn-danger">
            <Home className="btn-icon" />
            <span>Home</span>
          </button>
        </div>
      </div>
      
      <footer className="footer">
        <p className="footer-text">© 2024 Amsh Tech Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
}
