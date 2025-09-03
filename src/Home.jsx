import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function Home() {
  const [minutes, setMinutes] = useState();
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(`/timer?minutes=${minutes}`);
  };

  return (
    <div className="first">
      <h1 className="home">Chess Timer Setup</h1><br/> <br/>  <br/>  <br/> <br/>  <br/>
     <div className="general"> <p className="p"> enter Minutes per player</p>
      <input
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        className="input"
      /> <br/>  <br/>  <br/>  <br/> 
      <button onClick={handleStart} className="go">
        Go
      </button></div><br/>  <br/>  <br/>  <br/> <br/>  <br/>  <br/>  <br/> 
    </div>
  );
}
