import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import "../css/ChatbotDemo.css";

const ChatbotDemo = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef(null);
  const socket = useRef(null);

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
        setMessages((prev) => {
          if (
            prev.length === 0 ||
            prev[prev.length - 1].text !== data.message
          ) {
            return [...prev, { sender: "bot", text: data.message }];
          }
          return prev;
        });
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
      if (socket.current) socket.current.close();
    };
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !input.trim() ||
      !socket.current ||
      socket.current.readyState !== WebSocket.OPEN
    )
      return;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setIsLoading(true);

    socket.current.send(JSON.stringify({ message: input }));

    setInput("");
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
          <div className="chat-window-demo" ref={chatBodyRef}>
            {" "}
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="message bot loading">
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
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
