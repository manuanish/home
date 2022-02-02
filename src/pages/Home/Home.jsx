import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import mainTheme from '../../themes/mainTheme';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import * as React from 'react';
import MenuBar from '../../components/MenuBar';
import Project from '../../components/Project';
import FooterNoAbs from '../../components/FooterNoAbs'
import { motion } from "framer-motion";
import Twemoji from '../../scripts/Twemoji';
import { DiPython, DiHtml5, DiNodejsSmall, DiCss3Full } from "react-icons/di";
import './Home.css';


function Home() {
  return (

    <ThemeProvider theme={mainTheme}>
      <motion.div className='mainBackground' initial={{opacity: 0}} animate={{opacity: 1}} transition={{ delay: 1, duration: 2 }}>
      </motion.div>
      <motion.div className='hideBackground' initial={{opacity: 0, y: -10}} animate={{opacity: 1, y: 0}} transition={{ delay: 0, duration: 1 }}>
      </motion.div>
      <motion.div initial={{opacity: 0}} animate={{opacity: 0.2}} transition={{ delay: 2, duration: 1 }} className='line1'></motion.div>
      <motion.div initial={{opacity: 0}} animate={{opacity: 0.4}} transition={{ delay: 2.5, duration: 1 }} className='line2'></motion.div>
      <motion.div initial={{opacity: 0}} animate={{opacity: 0.3}} transition={{ delay: 3, duration: 1 }} className='line3'></motion.div>
      <CssBaseline />
      <MenuBar />
      <div className='mainText'>
        <motion.div initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0}} transition={{ delay: 0.8, duration: 0.5 }}>
          <Typography component='div' sx={{color: 'text.primary', fontWeight: 800, fontSize: 40, textAlign: 'center', mt: 10}}>
            <p className='titleText'>
              Hello There! <Twemoji emoji="👋"/>
            </p>
          </Typography>
        </motion.div>
        <motion.div initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0}} transition={{ delay: 1.2 }}>
          <Typography sx={{color: 'text.disabled', fontWeight: 300, fontSize: 24, textAlign: 'center'}}>
            Welcome to my website. <Twemoji emoji=""/>
          </Typography>
        </motion.div>
      </div>
        <Card sx={{width: '100%', mt: 28, boxShadow: 0, background: 'inherit'}}>
          <motion.div initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0}} transition={{ delay: 1.6, duration: 0.5 }}>
            <Typography sx={{color: 'text.primary', fontWeight: 800, fontSize: 30, ml: 5, mb: 4}}>
              <Twemoji emoji="📖"/>&nbsp;  Projects
            </Typography>
          </motion.div>
          <Box sx={{ flexWrap: 'wrap', display: 'inline-flex', mb: 8, width: '100%', mr: 4, justifyContent: 'space-evenly'}}>
            <Project
              projectTitle='Bon5R'
              projectDescription='A Chat application designed for areas with low internet. Inpsired by Discord, Slack.'
              languages={<div>
                <DiNodejsSmall />
                <DiHtml5/>
                <DiCss3Full/>
              </div>}
              projectLink='https://github.com/manuanish/bon5r'
              delay={1.8}
              pinned={true}
            />
            <Project
              projectTitle='YoutubeDownloader'
              projectDescription='An application to download videos from youtube - it uses PyQT to create the GUI.'
              languages={<div>
                <DiPython/>
              </div>}
              projectLink='https://github.com/manuanish/YoutubeDownloader'
              delay={2}
            />
            <Project
              projectTitle='markdown-website'
              projectDescription='Simple demo of create a static website using markdown (without Jekyll) and NodeJS instead.'
              languages={<div>
                <DiHtml5/>
                <DiCss3Full/>
              </div>}
              projectLink='https://github.com/manuanish/markdown-website'
              delay={2.2}
            />
          </Box>
        </Card>
      <FooterNoAbs/>
    </ThemeProvider>
  );
}

export default Home;
