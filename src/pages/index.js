import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import ChatBot from '@/Components/ChatBot';

const WelcomePage = () => {
  const router = useRouter();
  const [orientation, setOrientation] = useState('landscape'); // Set default value to 'landscape'
  const [styles, setStyles] = useState(['abstract']); // Set default value to ['abstract']
  const [printType, setPrintType] = useState('canvas'); // Set default value to 'canvas'
  const [vibes, setVibes] = useState(['themes']); // Set default value to ['themes']
  const [coreSubject, setCoreSubject] = useState('');
  const [randomWelcomeMessage, setRandomWelcomeMessage] = useState('');


  useEffect(() => {
    // Array of welcome messages
    const welcomeMessages = [
      "Welcome to our AI-Generated Art Printing Service!",
      "Discover unique art prints with our AI service!",
      "Transform your ideas into beautiful art prints with our AI!",
      // Add more welcome messages as needed
    ];

    // Select a random welcome message
    const selectedWelcomeMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

    setRandomWelcomeMessage(selectedWelcomeMessage);
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  const handleOrientationChange = (event) => {
    setOrientation(event.target.value);
  };

  const handleStylesChange = (event) => {
    setStyles(event.target.value);
  };

  const handlePrintTypeChange = (event) => {
    setPrintType(event.target.value);
  };

  const handleVibesChange = (event) => {
    setVibes(event.target.value);
  };

  const handleCoreSubjectChange = (event) => {
    setCoreSubject(event.target.value);
  };

  const handleSubmit = () => {
    router.push({
      pathname: '/chatbot',
      query: {
        orientation,
        styles: JSON.stringify(styles),
        printType,
        vibes: JSON.stringify(vibes),
        coreSubject,
      },
    });
  };
  

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>  
      <h1 className='text-center text-4xl mb-5'>
        AI-Generated Art Printing Service!
      </h1>
      <h1 className='text-center text-xl mb-10'>
        {randomWelcomeMessage}
        </h1>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Orientation Selection</InputLabel>
        <Select value={orientation} onChange={handleOrientationChange} label="Orientation Selection">
          <MenuItem value="landscape">Landscape</MenuItem>
          <MenuItem value="portrait">Portrait</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Style Selection</InputLabel>
        <Select multiple value={styles} onChange={handleStylesChange} label="Style Selection">
          <MenuItem value="abstract">Abstract</MenuItem>
          <MenuItem value="impressionist">Impressionist</MenuItem>
          <MenuItem value="cubist">Cubist</MenuItem>
          {/* Add more styles as needed */}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Print Type</InputLabel>
        <Select value={printType} onChange={handlePrintTypeChange} label="Print Type">
          <MenuItem value="canvas">Canvas</MenuItem>
          <MenuItem value="canvasFramed">Canvas with Frame</MenuItem>
          <MenuItem value="sticker">Sticker</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Vibe Selection</InputLabel>
        <Select multiple value={vibes} onChange={handleVibesChange} label="Vibe Selection">
        <MenuItem value="themes">Themes</MenuItem>
          <MenuItem value="emotions">Emotions</MenuItem>
          <MenuItem value="calm">Calm</MenuItem>
          <MenuItem value="energetic">Energetic</MenuItem>
          <MenuItem value="mysterious">Mysterious</MenuItem>
          {/* Add more vibes as needed */}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Core Subject Input"
        value={coreSubject}
        onChange={handleCoreSubjectChange}
        sx={{ mb: 2 }}
      />
     <div className='flex justify-center'>
      <button
              className="hover:bg-[white] hover:text-[#ff9999]
                 hover:border-2 hover:border-[#ff9999] font-sans my-5
                 rounded-md w-48 sm:w-full h-14 mx-2 bg-[#ff9999] text-black font-[900]"
                 onClick={handleSubmit}
            >
              START JOURNEY
            </button>
            </div>
    </Container>
  );
};

export default WelcomePage;
