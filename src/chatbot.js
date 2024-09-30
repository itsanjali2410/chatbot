// src/Chatbot.js
import React, { useState, useEffect } from 'react';
import './App.css'; // Ensure this matches your CSS file name

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [data, setData] = useState({});
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        fetch('/data.json')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                const welcomeMessage = { text: "Welcome to the GRC Chatbot! Ask about ISO standards.", sender: 'bot' };
                setMessages([welcomeMessage]);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (input.trim() !== '') {
            const userMessage = { text: input, sender: 'user' };
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setInput('');

            setIsTyping(true);

            const lowerCaseInput = input.toLowerCase();
            let botResponse = "I'm sorry, I don't understand that.";

            for (const key in data) {
                if (key.toLowerCase() === lowerCaseInput) {
                    botResponse = `${key}: ${data[key].definition} \nRequirements: ${data[key].requirements.join(', ') || data[key].steps.join(', ')}`;
                    break;
                }
            }

            setTimeout(() => {
                const botMessage = { text: botResponse, sender: 'bot' };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
                setIsTyping(false);
            }, 1000);
        }
    };

    return (
        <div className="chatbot">
            <div className="chatbot-header">GRC Chatbot</div>
            <div className="chatbot-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`${msg.sender} message`}>
                        {msg.sender === 'user' && (
                            <>
                                <img src="path/to/user-image.png" alt="User" className="user-image" />
                                <span>{msg.text}</span>
                            </>
                        )}
                        {msg.sender === 'bot' && (
                            <>
                                <img src="path/to/bot-image.png" alt="Bot" className="bot-image" />
                                <span>{msg.text}</span>
                            </>
                        )}
                    </div>
                ))}
                {isTyping && <div className="bot message"><span className="typing-indicator">Typing...</span></div>}
            </div>
            <form onSubmit={handleSendMessage} className="chatbot-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about GRC..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chatbot;
