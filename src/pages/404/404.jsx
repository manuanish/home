import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import mainTheme from '../../themes/mainTheme';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { motion } from "framer-motion";
import {
 Link
} from "react-router-dom";
import MenuBar from '../../components/MenuBar';
import Footer from '../../components/Footer';

const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
}

const item = {
  visible: { opacity: 1, x: 0},
  hidden: { opacity: 0, x: -5},
}

function BlankSlate() {
  return (

    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <MenuBar />
      <div style={{padding: 20}}>
      <motion.ul initial="hidden" animate="visible" variants={list} style={{listStyleType: 'none'}}>
        <motion.li variants={item} className='glitch'>
          <Typography sx={{color: '#7289DA', fontWeight: 900, fontSize: 48}}>
            404
          </Typography>
        </motion.li >
        <motion.li variants={item}>
          <Typography sx={{color: 'text.secondary', fontWeight: 400, fontSize: 18}}>
            Did you check the URL?
          </Typography>
        </motion.li >
        <motion.li variants={item}>
          <Link to="/home" style={{textDecoration: 'none'}}>
            <Button sx={{mt: 4}} variant='contained' disableElevation>Return Home</Button>
          </Link>
        </motion.li >
      </motion.ul>
      </div>
      <Footer />
    </ThemeProvider>

  );
}

export default BlankSlate;
