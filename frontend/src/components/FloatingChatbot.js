// src/components/FloatingChatbot.js

import React, { useState, useEffect, useRef } from "react";
import { FaCommentDots, FaPaperPlane } from "react-icons/fa";
import "./FloatingChatbot.css";

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const socket = useRef(null);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    const wsProtocol =
      window.location.protocol === "https:" ? "wss://" : "ws://";
    const wsURL = wsProtocol + window.location.host + "/ws/chat/";

    socket.current = new WebSocket(wsURL);

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "start") {
      } else if (data.type === "chunk") {
        setMessages((prev) => {
          const updated = [...prev];
          const lastMsg = updated[updated.length - 1];

          if (lastMsg && lastMsg.sender === "bot" && lastMsg.isLoading) {
            lastMsg.text = data.content;
            lastMsg.isLoading = false;
          } else if (lastMsg && lastMsg.sender === "bot") {
            lastMsg.text += data.content;
          } else {
            updated.push({ sender: "bot", text: data.content });
          }
          return updated;
        });
      } else if (data.type === "end") {
        setIsLoading(false);
      } else {
        setMessages((prev) => [...prev, { sender: "bot", text: data.message }]);
        setIsLoading(false);
      }
    };

    socket.current.onclose = () => {
      console.error("Chat socket closed unexpectedly");
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Connection lost. Please refresh the page." },
      ]);
      setIsLoading(false);
    };

    return () => {
      socket.current.close();
    };
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const toggleChatWindow = () => {
    setIsOpen((prev) => !prev);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const message = inputValue.trim();
    if (
      message === "" ||
      !socket.current ||
      socket.current.readyState !== WebSocket.OPEN
    ) {
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: message },
    ]);

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", text: "", isLoading: true },
    ]);
    setIsLoading(true);

    // Send to backend
    socket.current.send(JSON.stringify({ message: message }));

    setInputValue("");
  };

  return (
    <>
      <div className="chatbot-widget" onClick={toggleChatWindow}>
        <FaCommentDots />
      </div>

      <div className={`chat-window ${isOpen ? "open" : ""}`}>
        <div className="chat-header">
          <h3>Reps &amp; Revenue AI Assistant</h3>
          <button onClick={toggleChatWindow} className="close-chat-btn">
            &times;
          </button>
        </div>
        <div className="chat-body" ref={chatBodyRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.isLoading ? (
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                msg.text
              )}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question..."
              autoComplete="off"
            />
            <button type="submit">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FloatingChatbot;
