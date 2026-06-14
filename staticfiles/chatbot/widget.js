// Chatbot Widget v1.0
(function() {
    'use strict';

    // Widget configuration
    let config = {
        apiKey: '',
        apiEndpoint: '',
        title: 'Chat with us',
        primaryColor: '#0077ff',
        position: 'bottom-right',
        welcomeMessage: 'Hello! How can I help you today?'
    };

    // Widget state
    let socket = null;
    let sessionId = null;
    let isOpen = false;
    let messageHistory = [];

    // Generate unique session ID
    function generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Initialize WebSocket connection
    function initWebSocket() {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/ws/chat/`;
        
        socket = new WebSocket(wsUrl);
        
        socket.onopen = function() {
            // Authenticate the session
            socket.send(JSON.stringify({
                type: 'auth',
                api_key: config.apiKey,
                session_id: sessionId
            }));
        };
        
        socket.onmessage = function(event) {
            const data = JSON.parse(event.data);
            handleSocketMessage(data);
        };
        
        socket.onerror = function(error) {
            console.error('WebSocket error:', error);
            addMessage('bot', 'Connection error. Please try again.');
        };
        
        socket.onclose = function() {
            // Attempt to reconnect after 3 seconds
            setTimeout(initWebSocket, 3000);
        };
    }

    // Handle incoming WebSocket messages
    function handleSocketMessage(data) {
        if (data.type === 'chunk') {
            // Update the last bot message or create new one
            updateOrCreateBotMessage(data.content);
        } else if (data.type === 'end') {
            // Message complete
        } else if (data.type === 'error') {
            addMessage('bot', 'Error: ' + data.message);
        } else if (data.message) {
            addMessage('bot', data.message);
        }
    }

    // Update existing bot message or create new one
    function updateOrCreateBotMessage(text) {
        const chatBody = document.getElementById('chatbot-messages');
        const lastMessage = chatBody.lastElementChild;
        
        if (lastMessage && lastMessage.classList.contains('bot-message') && lastMessage.classList.contains('streaming')) {
            lastMessage.textContent += text;
        } else {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'chatbot-message bot-message streaming';
            messageDiv.textContent = text;
            chatBody.appendChild(messageDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }

    // Add a message to the chat
    function addMessage(sender, text) {
        const chatBody = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}-message`;
        messageDiv.textContent = text;
        
        // Remove streaming class from previous messages
        const streamingMessages = chatBody.querySelectorAll('.streaming');
        streamingMessages.forEach(msg => msg.classList.remove('streaming'));
        
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
        
        messageHistory.push({ sender, text });
    }

    // Send a message
    function sendMessage(text) {
        if (!text.trim() || !socket || socket.readyState !== WebSocket.OPEN) return;
        
        addMessage('user', text);
        
        socket.send(JSON.stringify({
            type: 'message',
            message: text,
            session_id: sessionId,
            api_key: config.apiKey
        }));
    }

    // Create widget HTML
    function createWidget() {
        // Container
        const container = document.createElement('div');
        container.id = 'chatbot-widget-container';
        container.innerHTML = `
            <style>
                #chatbot-widget-container {
                    position: fixed;
                    ${config.position === 'bottom-left' ? 'left: 20px;' : 'right: 20px;'}
                    bottom: 20px;
                    z-index: 9999;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                }
                
                .chatbot-toggle {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: ${config.primaryColor};
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    color: white;
                    font-size: 24px;
                }
                
                .chatbot-toggle:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
                }
                
                .chatbot-window {
                    position: absolute;
                    bottom: 80px;
                    ${config.position === 'bottom-left' ? 'left: 0;' : 'right: 0;'}
                    width: 350px;
                    height: 500px;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                    display: none;
                    flex-direction: column;
                    overflow: hidden;
                    ${config.position === 'bottom-left' ? 'transform-origin: bottom left;' : 'transform-origin: bottom right;'}
                    animation: chatbotSlideIn 0.3s ease;
                }
                
                @keyframes chatbotSlideIn {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                .chatbot-window.open {
                    display: flex;
                }
                
                .chatbot-header {
                    background: ${config.primaryColor};
                    color: white;
                    padding: 16px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .chatbot-header h3 {
                    margin: 0;
                    font-size: 16px;
                    font-weight: 600;
                }
                
                .chatbot-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 20px;
                    cursor: pointer;
                    opacity: 0.8;
                    transition: opacity 0.2s;
                }
                
                .chatbot-close:hover {
                    opacity: 1;
                }
                
                .chatbot-messages {
                    flex: 1;
                    padding: 20px;
                    overflow-y: auto;
                    background: #f8f9fa;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                
                .chatbot-message {
                    max-width: 80%;
                    padding: 12px 16px;
                    border-radius: 18px;
                    font-size: 14px;
                    line-height: 1.4;
                    animation: messagePopIn 0.3s ease;
                }
                
                @keyframes messagePopIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .user-message {
                    background: ${config.primaryColor};
                    color: white;
                    align-self: flex-end;
                    border-bottom-right-radius: 4px;
                }
                
                .bot-message {
                    background: white;
                    color: #333;
                    align-self: flex-start;
                    border-bottom-left-radius: 4px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }
                
                .chatbot-input-container {
                    padding: 16px;
                    background: white;
                    border-top: 1px solid #e9ecef;
                    display: flex;
                    gap: 10px;
                }
                
                .chatbot-input {
                    flex: 1;
                    padding: 12px 16px;
                    border: 1px solid #dee2e6;
                    border-radius: 24px;
                    font-size: 14px;
                    outline: none;
                    transition: border-color 0.2s;
                }
                
                .chatbot-input:focus {
                    border-color: ${config.primaryColor};
                }
                
                .chatbot-send {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: ${config.primaryColor};
                    border: none;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                
                .chatbot-send:hover {
                    transform: scale(1.05);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                }
                
                @media (max-width: 480px) {
                    .chatbot-window {
                        width: calc(100vw - 40px);
                        height: 70vh;
                        ${config.position === 'bottom-left' ? 'left: 0;' : 'right: 0;'}
                    }
                }
            </style>
            
            <button class="chatbot-toggle" id="chatbot-toggle">
                💬
            </button>
            
            <div class="chatbot-window" id="chatbot-window">
                <div class="chatbot-header">
                    <h3>${config.title}</h3>
                    <button class="chatbot-close" id="chatbot-close">×</button>
                </div>
                <div class="chatbot-messages" id="chatbot-messages"></div>
                <div class="chatbot-input-container">
                    <input type="text" class="chatbot-input" id="chatbot-input" placeholder="Type a message...">
                    <button class="chatbot-send" id="chatbot-send">➤</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(container);
        
        // Event listeners
        document.getElementById('chatbot-toggle').addEventListener('click', toggleChat);
        document.getElementById('chatbot-close').addEventListener('click', toggleChat);
        document.getElementById('chatbot-send').addEventListener('click', handleSend);
        document.getElementById('chatbot-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleSend();
        });
    }

    // Toggle chat window
    function toggleChat() {
        const window = document.getElementById('chatbot-window');
        isOpen = !isOpen;
        window.classList.toggle('open', isOpen);
        
        if (isOpen && messageHistory.length === 0) {
            addMessage('bot', config.welcomeMessage);
        }
        
        if (isOpen) {
            document.getElementById('chatbot-input').focus();
        }
    }

    // Handle send button
    function handleSend() {
        const input = document.getElementById('chatbot-input');
        const text = input.value.trim();
        
        if (text) {
            sendMessage(text);
            input.value = '';
        }
    }

    // Global init function
    window.initChatbot = function(userConfig) {
        // Merge user config with defaults
        config = Object.assign({}, config, userConfig);
        
        // Validate required fields
        if (!config.apiKey) {
            console.error('Chatbot: apiKey is required');
            return;
        }
        
        // Generate session ID
        sessionId = generateSessionId();
        
        // Create widget
        createWidget();
        
        // Initialize WebSocket
        initWebSocket();
        
        console.log('Chatbot initialized with session:', sessionId);
    };
    
    // Public API
    window.chatbotAPI = {
        open: function() {
            if (!isOpen) toggleChat();
        },
        close: function() {
            if (isOpen) toggleChat();
        },
        sendMessage: function(text) {
            sendMessage(text);
        },
        on: function(event, callback) {
            // Event handling would go here
        }
    };
})();
