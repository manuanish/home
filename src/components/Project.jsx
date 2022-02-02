import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CodeIcon from '@mui/icons-material/Code';
import { pink, grey } from '@mui/material/colors';
import LinkIcon from '@mui/icons-material/Link';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded';
import Tooltip from '@mui/material/Tooltip';

import { motion } from "framer-motion";

export default function Project(props) {
  return (
    <motion.div style={{ bottom: 0, padding: 8}} initial={{opacity: 0, y: 5}} animate={{opacity: 1, y: 0}} transition={{delay: props.delay}}>
      <Card sx={{width: '300px', p: 2}} variant='outlined' style={{boxShadow: !props.pinned ? 'none' : '0px 0px 50px 4px rgba(114, 137, 218, 0.1)'}}>
        <Typography component='span' sx={{color: 'text.primary', fontSize: 20, fontWeight: 600}}>
          {props.projectTitle}
          <Tooltip title="Pinned by @manuanish" placement='top'>
            <PushPinRoundedIcon style={{float: 'right', display: !props.pinned ? 'none' : ''}} color = 'success'/>
          </Tooltip>
        </Typography>
        <Divider sx={{m: 1, ml: 0, mr: 0}}/>
        <Typography component='span' sx={{color: 'text.secondary', fontSize: 16, fontWeight: 400}}>
          {props.projectDescription}
        </Typography>
        <Box sx={{display: 'flex', mt: 4, gap: 0.5, fontSize: 24}}>
          <Box sx={{flexGrow: 1, mt: 1, color: 'text.disabled'}}>
            {props.languages}
          </Box>
          <a href={props.projectLink} style={{textDecoration: 'none'}} target='_blank'>
            <IconButton><ReplyRoundedIcon /></IconButton>
          </a>
        </Box>
      </Card>
    </motion.div>
  );
}
