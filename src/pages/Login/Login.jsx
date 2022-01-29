import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import mainTheme from '../../themes/mainTheme';
import MenuBar from '../../components/MenuBar';
import Footer from '../../components/Footer';
import Twemoji from '../../scripts/Twemoji';


export default function VerticalLinearStepper() {
  return (
    <ThemeProvider theme={mainTheme}>
    <CssBaseline />
      <MenuBar/>
      <Footer />
      <div style={{padding: 20}}>
        <Typography variant='h1' sx={{fontWeight: 700}}>
          Log In - <Twemoji emoji="👋" />
        </Typography>

      </div>
    </ThemeProvider>
  );
}
