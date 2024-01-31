import React, { useState, useEffect, useRef } from 'react';
import {
  Container, Paper, TextField, Button, Typography, CircularProgress, Menu, MenuItem
} from '@mui/material';
import { fetchImage, setError } from '@/store/slices/companySlice';
import { useDispatch, useSelector } from "react-redux";



const ChatBot = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setHighlighted(true);
    const timeout = setTimeout(() => {
      setHighlighted(false);
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Generate and display a new welcome message
    const welcomeMessage = generateWelcomeMessage();
    setMessages([...messages, welcomeMessage]);
    scrollToBottom();
  }, []);

  const generateWelcomeMessage = () => {
    const welcomeMessages = [
      "Welcome to Merlin AI-chatbot for Image generation. Text your picture...",
      "Hello there! Merlin AI-chatbot Ready to generate some AI art?",
      "Greetings from Merlin AI-chatbot! Excited to help you with AI-generated art!",
      // Add more welcome messages as needed
    ];

    const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
    return { sender: 'AI', content: welcomeMessages[randomIndex] };
  };

  // Modify your handleSendMessage function in ChatBot.js
  const handleSendMessage = async (message) => {
    setLoading(true);

    try {
      const res = await dispatch(fetchImage(message));

      if (res && res.data) {
        console.log('Response from backend:', res.data);
        const imageUrl = res.data.data[0].url;
        console.log('Image URL:', imageUrl);

        const aiMessage = {
          sender: "AI",
          content: res.data.reply,
          image: imageUrl,
        };

        console.log('AI Message:', aiMessage);

        setMessages([...messages, { sender: "user", content: message }, aiMessage]);
        scrollToBottom();
        setInputValue("");
      } else {
        console.error("Invalid response:", res);
        dispatch(setError("Invalid response from the server"));
      }
    } catch (error) {
      console.error("Error:", error);
      dispatch(setError(error.message));
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    const container = messagesEndRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };


  return (
    <div className="mt-10">
      
      <p className='font-bold text-center text-2xl'>AI-Generated Art Printing Service</p>
      <Container maxWidth="xs">
        <Paper elevation={10} className="mt-10 w-full h-full md:w-auto md:h-full sm:w-auto p-0">
          <div className="flex justify-between rounded-sm border-b-4 
            bg-[#ff9999] text-black mb-2 p-3 md:p-2">
            <h1 className='mt-1 text-lg'>Pick The Picture...</h1>
          </div>

          <div className="h-96 mx-2 overflow-y-auto mb-4 md:h-60
            scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            ref={messagesEndRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`msg ${message.sender === 'AI' ? 'received' : 'sent'} ${message.sender === 'AI' ? 'mb-4' : ''
                  }`}
              >
                <div className={message.sender === 'user'}>
                  {message.content}
                  {message.image && (
                    <a
                      href={message.image}
                      download="generated_image.png"
                      target="_blank" // Optional: opens the link in a new tab/window
                      rel="noopener noreferrer"
                    >
                      <img
                        src={message.image}
                        alt="Generated Image"
                        className="max-w-full h-auto my-0 cursor-pointer"
                        onLoad={scrollToBottom}
                      />
                    </a>
                  )}

                </div>
              </div>
            ))}
          </div>

          {loading && (
            <div className="ml-5">
              <CircularProgress size={20} sx={{ color: "#ff9999" }} />
            </div>
          )}

          <div className="flex ml-3">
            <TextField
              className="my-5 text-xs"
              label="Enter your search..."
              variant="outlined"
              fullWidth
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <button
              className="hover:bg-[white] hover:text-[#ff9999]
                 hover:border-2 hover:border-[#ff9999] font-sans my-5
                 rounded-md w-48 sm:w-auto h-14 mx-2 bg-[#ff9999] text-black font-[900]"
              onClick={() => {
                const message = inputValue;
                setMessages([...messages, { sender: 'user', content: message }]);
                handleSendMessage(message);
              }}
            >
              Ask
            </button>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default ChatBot;
