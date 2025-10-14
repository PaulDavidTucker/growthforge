// src/components/FloatingChatbot.js

import React, { useState, useEffect, useRef } from "react";
import { FaCommentDots, FaPaperPlane } from "react-icons/fa"; // Using react-icons
import "./FloatingChatbot.css";

const FloatingChatbot = () => {
  // State to manage if the chat window is open or closed
  const [isOpen, setIsOpen] = useState(false);
  // State to store all chat messages
  const [messages, setMessages] = useState([]);
  // State for the user's current input
  const [inputValue, setInputValue] = useState("");

  // useRef to hold the WebSocket instance so it persists across re-renders
  const socket = useRef(null);
  // useRef to get a direct reference to the chat body for scrolling
  const chatBodyRef = useRef(null);

  useEffect(() => {
    const mobileMediaQuery = window.matchMedia("(max-width: 768px)");

    // Only auto-open if NOT mobile (one-time check on mount)
    if (!mobileMediaQuery.matches) {
      setIsOpen(true);

      // Schedule close after 2500ms
      const timeoutId = setTimeout(() => {
        setIsOpen(false);
      }, 2500);

      // Proper cleanup for the timeout (runs on unmount or if effect re-runs)
      return () => clearTimeout(timeoutId);
    }
  }, []);

  // This useEffect hook runs once when the component mounts
  useEffect(() => {
    // --- WebSocket Connection Logic ---
    const wsProtocol =
      window.location.protocol === "https:" ? "wss://" : "ws://";
    const wsURL = wsProtocol + window.location.host + "/ws/chat/";

    socket.current = new WebSocket(wsURL);

    // Handle incoming messages from the server
    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Add the new message from the bot to our messages state
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: data.message },
      ]);
    };

    // Handle WebSocket connection closing
    socket.current.onclose = () => {
      console.error("Chat socket closed unexpectedly");
      // You could add a message here to inform the user
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Connection lost. Please refresh the page." },
      ]);
    };

    // Cleanup: close the socket when the component unmounts
    return () => {
      socket.current.close();
    };
  }, []); // The empty array ensures this effect runs only once

  // This useEffect hook runs every time the messages array changes
  useEffect(() => {
    // Auto-scroll to the bottom of the chat body
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

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

    // Add the user's message to the state immediately
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: message },
    ]);

    // Send the message to the WebSocket server
    socket.current.send(JSON.stringify({ message: message }));

    // Clear the input field
    setInputValue("");
  };

  return (
    <>
      {/* The floating widget icon */}
      <div className="chatbot-widget" onClick={toggleChatWindow}>
        <FaCommentDots />
      </div>

      {/* The chat window itself, its visibility is controlled by the 'isOpen' state */}
      <div className={`chat-window ${isOpen ? "open" : ""}`}>
        <div className="chat-header">
          <h3>Reps &amp; Revenue AI Assistant</h3>
          <button onClick={toggleChatWindow} className="close-chat-btn">
            &times;
          </button>
        </div>
        <div className="chat-body" ref={chatBodyRef}>
          {/* Map over the messages array to display the chat history */}
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text}
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
