import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import "../css/ChatbotDemo.css";

const ChatbotDemo = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatBodyRef = useRef(null);

  useEffect(() => {
    setMessages([
      { text: "Hello! Ask me a question about our services.", sender: "bot" },
    ]);
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
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
      <div className="chatbot-demo-container">
        <h2>Try Our Interactive Demo</h2>
        <div className="chatbot-demo glass-card">
          <div className="chat-window" ref={chatBodyRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <form
              onSubmit={handleSubmit}
              style={{ width: "100%", display: "flex" }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotDemo;
