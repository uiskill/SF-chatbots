import React, { useState, useEffect } from "react";


const Sidebar = ({ history, setSelectedPrompt }) => {

   const [messages, setMessages] = useState(() => {
      // Load from sessionStorage if available
      const saved = sessionStorage.getItem("chatMessages");
      return saved ? JSON.parse(saved) : [];
    });
  return (
    <div style={{ width: "250px", borderRight: "1px solid #ddd", backgroundColor: "#f8f8f8", padding: "10px" }}>
      <a className="navbar-brand ulockd-main-logo2" href="https://www.sandipfoundation.org/">
        <img src="https://www.sandipfoundation.org/images/header-logo.png" className="logo logo-display" alt="sandip foundation" />
      </a>
      <br />
      <h3 className="text-primary">Chat History</h3>
      {history.length === 0 && <p>No history yet</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {history.map((msg, i) => (
          <li
            key={i}
            style={{ padding: "8px", cursor: "pointer", borderBottom: "1px solid #eee" }}
            onClick={() => setSelectedPrompt(msg)}
          >
            {msg.length > 25 ? msg.substring(0, 25) + "..." : msg}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
