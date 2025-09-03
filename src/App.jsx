import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Timer from "./Timer";
   
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timer" element={<Timer />} />
      </Routes>
    </Router>
  );
}
