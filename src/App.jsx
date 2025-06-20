import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthSystem from "./AuthSystem";
import Dashboard from "./Dashboard"; // create this component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthSystem />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
