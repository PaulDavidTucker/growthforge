// src/components/ChatbotDemo.js
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "../css/ChatbotDemo.css";

const ChatbotDemo = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setMessages([
      { text: "Hello! Ask me a question about our services.", sender: "bot" },
    ]);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulated bot response
    setTimeout(() => {
      const botResponse = {
        text: "Thanks for your question! This is a demo, but a real chatbot could answer FAQs, book meetings, and more. Want to learn more?",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>
          Chatbot Demo | Reps &amp; Revenue - Reps and Revenue Digital Marketing
          Agency
        </title>
        <meta
          name="description"
          content="See an example of a chatbot built for our clients."
        />
        <meta property="og:title" content="Chatbot Demo | Reps & Revenue" />
        <meta
          property="og:description"
          content="See an example of one of our chatbot products that can be integrated into any site."
        />
      </Helmet>
      <div className="chatbot-demo">
        <h2>Want to try out a demo?</h2>
        <div className="chat-window">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </>
  );
};

export default ChatbotDemo;
