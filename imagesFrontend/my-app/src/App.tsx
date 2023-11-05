import React, { useEffect } from 'react';
import './App.css';
import ImageUploader from './ImageUploader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { purple, red } from '@mui/material/colors';

function App() {
  useEffect(() => {
    document.title = "PhotoApp"; 
  }, []);

  return (
    <div className="App" style={{ backgroundColor: 'white', marginTop: '10px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px' }}>
      <Typography variant='h6' sx={{ fontSize: '50px', color: 'secondary' }}>Gallery</Typography>
      <ImageUploader />
    </div>
  );
}

export default App;
