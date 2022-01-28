import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import mainTheme from '../../themes/mainTheme';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import MenuBar from '../../components/MenuBar';
import Footer from '../../components/Footer'
import { motion } from "framer-motion";


function Home() {
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <MenuBar />
      <motion.div initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0}} transition={{ delay: 0.8, duration: 0.5 }}>
        <Typography sx={{color: 'text.primary', fontWeight: 800, fontSize: 40, textAlign: 'center', mt: 10}}>
          Hello There
        </Typography>
      </motion.div>
      <motion.div initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0}} transition={{ delay: 1.2 }}>
        <Typography sx={{color: 'text.disabled', fontWeight: 300, fontSize: 24, textAlign: 'center'}}>
          General Kenobi
        </Typography>
      </motion.div>
      <Footer/>
    </ThemeProvider>
  );
}

export default Home;
