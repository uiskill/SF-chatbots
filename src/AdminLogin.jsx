import React, { useState, useEffect } from "react";
import ChatbotAdmin from "./ChatbotAdmin";

const API = "http://localhost/erp/login.php";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // Check localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("adminUser");
    if (storedUser) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const text = await res.text();
      const data = JSON.parse(text);

      if (data.success) {
        // Store user info in localStorage
        localStorage.setItem("adminUser", JSON.stringify({ username }));
        setLoggedIn(true);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    setLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      {loggedIn ? (
        <ChatbotAdmin onLogout={handleLogout} />
      ) : (
        <div className="card p-4 shadow-lg" style={{ width: "350px", borderRadius: "15px" }}>
          <div className="text-center mb-4">
            <h3 className="text-primary">User Login</h3>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg mb-2"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary btn-lg w-100" onClick={handleLogin}>
            Login
          </button>
          <div className="text-center mt-3 text-muted" style={{ fontSize: "0.9rem" }}>
            &copy; 2025 Sandip Foundation
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
