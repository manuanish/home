import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CodeIcon from '@mui/icons-material/Code';
import { pink, grey } from '@mui/material/colors';

import { motion } from "framer-motion";

export default function FooterNoAbs() {
  return (
    <motion.div style={{bottom: 0, padding: 40, width: '100%'}} initial={{opacity: 0, y: 5}} animate={{opacity: 1, y: 0}} transition={{ duration: 1, delay: 0.6}}>
      <Box sx={{ flexGrow: 1, width: '100%'}} >
        <Divider sx={{color: 'text.disabled', fontSize: 12}}>
          <CodeIcon sx={{verticalAlign: 'middle', color: grey[300], fontSize: 15}}/> with <FavoriteIcon sx={{fontSize: 'inherit', verticalAlign: 'middle', color: pink[500]}}/> by <Typography component='span' sx={{color: 'text.secondary', fontSize: 12}}>
            @manuanish
          </Typography>
        </Divider>
      </Box>
    </motion.div>
  );
}
