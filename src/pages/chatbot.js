import React, { useState, useEffect, useRef } from 'react';
import {
  Container, Paper, TextField, Button, Typography, CircularProgress, Menu, MenuItem
} from '@mui/material';
import { fetchImage, setError } from '@/store/slices/companySlice';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import Inspiration from "../Components/Inspiration";

const ChatBot = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [showDownloadText, setShowDownloadText] = useState(false);
  const router = useRouter();
  const [orientation, setOrientation] = useState('landscape');
  const [styles, setStyles] = useState(['abstract']);
  const [vibes, setVibes] = useState(['themes']); // Ensure vibes state is declared
  const [coreSubject, setCoreSubject] = useState(''); // Declare coreSubject state
  const [printType, setPrintType] = useState('canvas'); // Declare printType state


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
    console.log('Welcome message useEffect triggered');
    console.log('Received styles:', styles);
    console.log('Received vibes:', vibes);
    console.log('Received coreSubject:', coreSubject);
    console.log('Received printType:', printType);
    console.log('Received orientation:', orientation);
    // Update state with received values
    if (router.query.orientation) {
      setOrientation(router.query.orientation);
    }
    if (router.query.styles) {
      setStyles(JSON.parse(router.query.styles));
    }
    if (router.query.vibes) {
      setVibes(JSON.parse(router.query.vibes));
    }
    if (router.query.coreSubject) {
      setCoreSubject(router.query.coreSubject);
    }
    if (router.query.printType) {
      setPrintType(router.query.printType);
    }
    // Generate and display a new welcome message
    const welcomeMessage = generateWelcomeMessage();
    setMessages([...messages, welcomeMessage]);
    scrollToBottom();
  }, [router.query]);

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
  const handleSendMessage = async (userText) => {
    setLoading(true);

    try {
      // Combine the user's text with selected customization fields
      console.log('Received styles:', styles);
      console.log('Received vibes:', vibes);
      console.log('Received coreSubject:', coreSubject);
      console.log('Received printType:', printType);
      console.log('Received orientation:', orientation);

      const stylesString = Array.isArray(styles) && styles.length > 0 ? `with ${styles.join(', ')}` : '';
      const vibesString = Array.isArray(vibes) && vibes.length > 0 ? `with ${vibes.join(', ')}` : '';
      const promptMessage = `${printType} ${userText} ${coreSubject} ${vibesString} ${stylesString} ${orientation} image`;

      console.log('Generated promptMessage:', promptMessage);

      const res = await dispatch(fetchImage(promptMessage));

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

        setMessages([...messages, { sender: "user", content: userText }, aiMessage]);
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
    <div className="mt-10 mb-10">
      <Inspiration />
      <div className='flex justify-center gap-5 mt-10'>
        {/* <button className="text-2xl" type="button" onClick={router.back}> 
      &#8656;
    </button> */}
        {/* <p className='font-bold text-center text-2xl'>AI-Generated Art Printing Service</p> */}
      </div>
      <Container maxWidth="lg">
        <Paper elevation={10} className="mt-10 w-full h-full md:w-auto md:h-full sm:w-auto p-0">
          <div className="flex justify-between rounded-sm border-b-4 
            bg-[#ff9999] text-black mb-2 p-3 md:p-2">
            <h1 className='mt-1 text-lg'>Customised AI Image generator...</h1>
          </div>

          <div className="h-96 mx-2 overflow-y-auto mb-4 md:h-60
            scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            ref={messagesEndRef}>


            {messages.map((message, index) => (
              <div
                key={index}
                className={`msg ${message.sender === 'AI' ? 'received' : 'sent'} ${message.sender === 'AI' ? 'mb-4' : ''}`}
              >
                <div className={message.sender === 'user' ? 'user-message' : 'ai-message'}>
                  {message.content}
                  {message.image && (
                    <div className="relative group">
                      <img
                        src={message.image}
                        alt="Generated Image"
                        className="max-w-full h-auto my-0 cursor-pointer transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-30"
                        onClick={() => {
                          const proxyUrl = 'http://localhost:8080/proxy-image?url=' + encodeURIComponent(message.image);
                          window.open(proxyUrl, '_blank');
                        }}
                        onLoad={scrollToBottom}
                        onMouseEnter={() => setShowDownloadText(true)}
                        onMouseLeave={() => setShowDownloadText(false)}
                      />
                      {showDownloadText && message.sender === 'AI' && (
                        <div
                          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-black font-bold cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                          onClick={() => downloadImage(message.image)}
                        >
                          Click To Download &#8659;
                        </div>
                      )}
                    </div>
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
                 rounded-md w-48 sm:w-full h-14 mx-2 bg-[#ff9999] text-black font-[900]"
              onClick={() => {
                const message = inputValue;
                setMessages([...messages, { sender: 'user', content: message }]);
                handleSendMessage(message);
              }}
            >
              Generate
            </button>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default ChatBot;
