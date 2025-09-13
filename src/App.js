import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Chatbot from "./Chatbot";
import AdminLogin from "./AdminLogin";
import UserLogin from "./UserLogin";
import Register from "./Register";

const App = () => {
  const [user, setUser] = useState(null);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [history, setHistory] = useState([]);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const addMessageToHistory = (message) => {
    if (!history.includes(message)) {
      setHistory((prev) => [...prev, message]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setHistory([]);
  };

  return (
    <Router>
      <Routes>
        {/* Home / Chatbot Route */}
        <Route
          path="/"
          element={
            user ? (
              <div style={{ display: "flex", height: "100vh" }}>
                <Sidebar history={history} setSelectedPrompt={setSelectedPrompt} />

                <div style={{ flex: 1, position: "relative" }}>
                  {/* Top bar with username + logout */}
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px"
                    }}
                  >
             
                    <button
                      style={{
                        padding: "3px 7px",
                        backgroundColor: "#d9534f",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>

                  <Chatbot
                    user={user}
                    selectedPrompt={selectedPrompt}
                    addMessageToHistory={addMessageToHistory}
                  />
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* User Login */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <div style={{ maxWidth: "400px", margin: "50px auto" }}>
                <UserLogin setUser={setUser} />
                <p className="text-center mt-3">
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
            )
          }
        />

        {/* User Registration */}
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <div style={{ maxWidth: "400px", margin: "50px auto" }}>
                <Register />
                <p className="text-center mt-3">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            )
          }
        />

        {/* ✅ Admin Panel (kept separate from user) */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
