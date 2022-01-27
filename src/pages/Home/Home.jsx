import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import mainTheme from '../../themes/mainTheme';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import * as React from 'react';


function Home() {
  return (
    <div style={{padding: 40}}>
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <Typography sx={{color: '#7289DA', fontWeight: 900, fontSize: 32}}>
        Hello World!
      </Typography>
      <Typography sx={{color: 'text.primary', fontWeight: 500, fontSize: 20}}>
        Welcome to my website...
      </Typography>
    </ThemeProvider>
    </div>
  );
}

export default Home;
