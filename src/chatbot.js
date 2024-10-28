import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Ensure this is the correct path to your CSS file

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const welcomeMessage = { text: "Welcome to the GRC Chatbot! Ask about ISO standards.", sender: 'bot' };
        setMessages([welcomeMessage]);
    }, []);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (input.trim() !== '') {
            const userMessage = { text: input, sender: 'user' };
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setInput('');
            setIsTyping(true);

            try {
                const response = await axios.post('http://localhost:3000/api/chat', {
                    query: input, // Sending user input to your API
                });

                const botMessage = {
                    text: response.data.response || "I'm sorry, I don't understand that.",
                    sender: 'bot',
                };

                // Simulate a typing delay
                setTimeout(() => {
                    setMessages((prevMessages) => [...prevMessages, botMessage]);
                    setIsTyping(false);
                }, 1000);
            } catch (error) {
                console.error('Error calling the API:', error);
                const errorMessage = { text: 'Failed to get a response from the API.', sender: 'bot' };
                setMessages((prevMessages) => [...prevMessages, errorMessage]);
                setIsTyping(false);
            }
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">
                <img src="/Untitled design.png" alt="Bot" className="bot-icon" />
                <h1>GRC Chatbot</h1>
            </div>
            <div className="chatbot-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.sender === 'user' && (
                            <>
                                <img src="/Governance Risk Compliance.png" alt="User" className="user-image" />
                                <div className="message-bubble user-bubble">{msg.text}</div>
                            </>
                        )}
                        {msg.sender === 'bot' && (
                            <>
                                <img src="/Untitled design.png" alt="Bot" className="bot-image" />
                                <div className="message-bubble bot-bubble">{msg.text}</div>
                            </>
                        )}
                    </div>
                ))}
                {isTyping && <div className="message bot"><div className="typing-indicator">Typing...</div></div>}
            </div>
            <form onSubmit={handleSendMessage} className="chatbot-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type here..."
                />
                <button type="submit">
                    <img src="path/to/send-icon.png" alt="Send" />
                </button>
            </form>
        </div>
    );
};

export default Chatbot;
