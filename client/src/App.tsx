import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "./screens/Auth/ForgotPassword";
import LoginScreen from "./screens/Auth/LoginScreen";
import ResetPassword from "./screens/Auth/ResetPassword";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="resetPassword" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
