import React from 'react';
import { useRouter } from 'next/router';
import { Typography, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';

// Define a mapping of topics to corresponding image URLs
const topicImages = {
  'Astronaut exploring an alien planet': '/images/Astronaut.png',
  'Ancient temple in a jungle': '/images/ancient.png',
  'Underwater city picture': '/images/underwater.png',
  'Futuristic metropolis Image': '/images/futuristic.png',
    'Enchanted forest with magical creatures': '/images/enchanted.png',
    'Post-apocalyptic landscape': '/images/post.png',
    'Victorian-era street scene': '/images/victorian era.png',
    'Cyberpunk alleyway at night': '/images/cyberpunk.png',
    'Giant robot in a sci-fi battle': '/images/giant.png',
    'Majestic waterfall in a mountainous region': '/images/majestic.png',
    'Medieval castle during a siege': '/images/Medieval.png',
    'Space station orbiting a distant planet': '/images/space.png',
    'Sunset over a desert with camels': '/images/sunset.png',
    'A carnival in Venice during the Renaissance': '/images/carnival.png',
    'Mysterious ghost ship in a stormy sea': '/images/mysterious.png',
    'An opulent royal ballroom from the 18th century': '/images/opulent.png',
    'Hidden valley with dinosaurs': '/images/hidden.png',
    'Steampunk airship flying above clouds': '/images/steampunk.png',
    'Zen garden with cherry blossoms': '/images/zen.png',
    'Northern lights over a snowy landscape': '/images/northern.png',
};

const InspirationPage = () => {
  const router = useRouter();
  const { orientation, styles, printType, vibes, coreSubject } = router.query;

  // Example random prompts
  const randomPrompts = [
    'Astronaut exploring an alien planet',
    'Ancient temple in a jungle',
    'Underwater city picture',
    'Futuristic metropolis Image',
    'Enchanted forest with magical creatures',
    'Post-apocalyptic landscape',
    'Victorian-era street scene',
    'Cyberpunk alleyway at night',
    'Giant robot in a sci-fi battle',
    'Majestic waterfall in a mountainous region',
    'Medieval castle during a siege',
    'Space station orbiting a distant planet',
    'Sunset over a desert with camels',
    'A carnival in Venice during the Renaissance',
    'Mysterious ghost ship in a stormy sea',
    'An opulent royal ballroom from the 18th century',
    'Hidden valley with dinosaurs',
    'Steampunk airship flying above clouds',
    'Zen garden with cherry blossoms',
    'Northern lights over a snowy landscape',
  ];

  const handleBeArtisticClick = () => {
    // Assuming your ChatBot component is located at the route '/chatbot'
    router.push('/chatbot');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <div className='flex justify-center gap-5'>
      <button className="text-2xl" type="button" onClick={router.back}> 
      &#8656;
    </button>
      <h1 className='text-4xl '>
        Inspiration Section
      </h1>
      </div>
      <h4 className='text-center text-2xl mb-10 mt-5'>
        Fascinating Art Gallery
      </h4>
{/* <Typography>
        Orientation: {orientation}
      </Typography>
      <Typography>
        Styles: {Array.isArray(styles) ? styles.join(', ') : styles}
      </Typography>
      <Typography>
        Print Type: {printType}
      </Typography>
      <Typography>
        Vibes: {Array.isArray(vibes) ? vibes.join(', ') : vibes}
      </Typography>
      <Typography>
        Core Subject: {coreSubject}
      </Typography> */}
      <Grid container spacing={3}>
        {randomPrompts.map((prompt, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={topicImages[prompt] || 'placeholder_image_url'}
                alt={prompt}
              />
              <CardContent>
                <Typography className="line-clamp-2" variant="subtitle1">{prompt}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div className='flex justify-center'>
      <button
              className="hover:bg-[white] hover:text-[#ff9999]
                 hover:border-2 hover:border-[#ff9999] font-sans my-5
                 rounded-md w-48 sm:w-auto h-14 mx-2 bg-[#ff9999] text-black font-[900]"
                 onClick={handleBeArtisticClick}
            >
              BE ARTISTIC
            </button>
            </div>
    </Container>
  );
};

export default InspirationPage;
