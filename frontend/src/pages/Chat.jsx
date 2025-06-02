import React, { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';
import axios from 'axios';
import '../style/Chat.css';
import { API_URL } from '../store';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const chatContainerRef = useRef(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        // scrollToBottom();
    }, [messages]);

    // Focus input on component mount
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const addMessage = (content, isUser) => {
        setMessages(prevMessages => [
            ...prevMessages,
            { content, isUser, id: Date.now() }
        ]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (input.trim() === '') return;
        
        const userMessage = input;
        addMessage(userMessage, true);
        setInput('');
        setIsLoading(true);

        try {
            // Get CSRF token from cookies if needed
            // const csrftoken = getCookie('csrftoken');
            console.log(userMessage)
            const response = await axios.post(`${API_URL}/chat/generate/`, {
                message: userMessage
            }, {
                headers: {
                    // 'X-CSRFToken': csrftoken
                }
            });
            
            const botResponse = response.data.response.choices[0].message.content;
            addMessage(botResponse, false);
        } catch (error) {
            console.error('Error sending message:', error);
            addMessage('Sorry, an error occurred.', false);
        } finally {
            setIsLoading(false);
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

    // Function to render message content with markdown for bot messages
    const renderMessageContent = (content, isUser) => {
        if (isUser) {
            return content;
        } else {
            return <div dangerouslySetInnerHTML={{ __html: marked(content) }} />;
        }
    };

    return (
        <div className="chat-page">
            <div className="chat-container" ref={chatContainerRef}>
                <div className="messages" id="messages">
                    {messages.map(message => (
                        <div 
                            key={message.id} 
                            className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
                        >
                            {renderMessageContent(message.content, message.isUser)}
                        </div>
                    ))}
                    
                    {isLoading && (
                        <div className="loading">
                            <div className="loading-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                </div>
            </div>
            
            <div className="input-container">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        className="input-box" 
                        placeholder="Send a message..." 
                        value={input}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        ref={inputRef}
                    />
                </form>
            </div>
        </div>
    );
}
