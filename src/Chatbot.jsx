import React, { useState, useEffect, useRef } from "react";

const Chatbot = ({ selectedPrompt, user }) => {
  const storageKey = `chatMessages_${user?.email || "guest"}`;

  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedPrompt) {
      setUserInput(selectedPrompt);
    }
  }, [selectedPrompt]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newUserMessage = { type: "user", text: userInput };
    setMessages((prev) => {
      const updated = [...prev, newUserMessage];
      sessionStorage.setItem(storageKey, JSON.stringify(updated));
      return updated;
    });

    setUserInput("");

    try {
      const formData = new FormData();
      formData.append("message", userInput);
      formData.append("user", user?.email); // ✅ send user email to backend too

      const res = await fetch("http://localhost/erp/chatbot.php", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const botMessage = { type: "bot", text: data.answer };
      setMessages((prev) => {
        const updated = [...prev, botMessage];
        sessionStorage.setItem(storageKey, JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      const botMessage = { type: "bot", text: "⚠️ Server error!" };
      setMessages((prev) => {
        const updated = [...prev, botMessage];
        sessionStorage.setItem(storageKey, JSON.stringify(updated));
        return updated;
      });
    }
  };

  return (
    <div className="chat-container d-flex flex-column">
      {/* Header */}
      <div className="chat-header bg-dark text-white p-3 d-flex justify-content-between">
        <h5 className="m-0">Sandip Foundation Chatbot</h5>
        <small style={{    marginRight: "81px",color:"#fff"}}>👤 {user?.name || user?.email}</small>
      </div>

      {/* Messages area */}
      <div className="chat-messages flex-grow-1 p-3 overflow-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`d-flex mb-3 ${
              msg.type === "user" ? "justify-content-end" : "justify-content-start"
            }`}
          >
            <div
              className={`message-bubble ${
                msg.type === "user" ? "user-message" : "bot-message"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <div className="chat-input border-top p-3 bg-white d-flex">
        <input
          type="text"
          className="form-control rounded-pill"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Message Sandip Foundation Chatbot..."
        />
        <button
          className="btn btn-dark ms-2 rounded-pill px-4"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
