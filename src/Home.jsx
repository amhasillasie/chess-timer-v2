import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Timer, Play, Sun, Moon } from "lucide-react";



export default function Home() {
  const [minutes, setMinutes] = useState();
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

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

  const handleStart = () => {
    navigate(`/timer?minutes=${minutes}`);
  };

  return (
    <div className="app-container">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>
      
      <div className="first">
        <Timer className="header-icon" />
        <h1 className="home">Chess Timer</h1>
        <p className="subtitle">Set up your game timer</p>
        <div className="general">
          <div className="input-group">
            <label className="input-label">Minutes per player</label>
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="input"
              placeholder="5"
              min="1"
              max="60"
            />
          </div>
          <button onClick={handleStart} className="go" disabled={!minutes || minutes <= 0}>
            <Play size={18} />
            <span>Start Game</span>
          </button>
        </div>
      </div>
      
      <footer className="footer">
        <p className="footer-text">© 2024 Amsh Tech Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
}
