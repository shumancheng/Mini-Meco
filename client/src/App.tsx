import "./App.css";
import LoginScreen from "./screens/Auth/LoginScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/" Component={LoginScreen} />
      </Routes>
    </Router>
  );
}

export default App;
