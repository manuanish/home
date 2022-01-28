import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { motion } from "framer-motion";
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import './MenuBar.css';

const drawerWidth = 240;

export default function MenuBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{delay: 0.2}}>
        <Toolbar sx={{bgcolor: 'transparent'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ color: '#7289DA', mr: 2 }}
            onClick={handleDrawerToggle}
          >

          <CloseRoundedIcon />
          </IconButton>
        </Toolbar>
      </motion.div>
      <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{delay: 0.4}}>
        <Divider />
      </motion.div>
      <List>
        <ListItem button>
          <motion.div style={{display: 'flex'}} initial={{ opacity: 0, x: -5 }} whileInView={{ opacity: 1, x: 0 }} transition={{delay: 0.6}}>
            <ListItemIcon sx={{ml: 1, mr: -2, alignSelf: 'center' }}>
              <HomeRoundedIcon />
            </ListItemIcon>
            <ListItemText>
              Home
            </ListItemText>
          </motion.div>
        </ListItem>
        <ListItem button>
          <motion.div style={{display: 'flex'}} initial={{ opacity: 0, x: -5 }} whileInView={{ opacity: 1, x: 0 }} transition={{delay: 0.8}}>
            <ListItemIcon sx={{ml: 1, mr: -2, alignSelf: 'center' }}>
              <LoginRoundedIcon />
            </ListItemIcon>
            <ListItemText>
              Log In
            </ListItemText>
          </motion.div>
        </ListItem>
      </List>
      <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{delay: 1}}>
        <Divider />
      </motion.div>
      <motion.div initial={{opacity: 0, x: -5}} whileInView={{opacity: 1, x: 0}} transition={{delay: 1.2}}>
      <List>
        <ListItem button sx={{color: '#7289DA'}}>
          <ListItemIcon sx={{ml: 1, mr: -2, alignSelf: 'center' }}>
            <AddRoundedIcon sx={{color: '#7289DA'}}/>
          </ListItemIcon>
          <ListItemText>
            Sign Up
          </ListItemText>
        </ListItem>
      </List>
      </motion.div>
    </div>
  );

  return (
    <Box sx={{ flexGrow: 1, position: 'static'}}>
      <div style={{backgroundColor: 'inherit'}}>
        <Toolbar>
          <motion.div initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0}} transition={{ delay: 0.1 }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ color: '#7289DA', mr: 2 }}
              onClick={handleDrawerToggle}
            >
            <MenuIcon sx={{}}/>
            </IconButton>
            <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
          </motion.div>
          <motion.div initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0}} style={{flexGrow: 1}} transition={{ delay: 0.2 }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 900, color: '#7289DA' }}>
              manuanish.github.io
            </Typography>
          </motion.div>
          <motion.div className='menuBarButton' initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0}} transition={{ delay: 0.3 }}>
            <Button variant='outlined'>Log In</Button>
          </motion.div>
          <motion.div className='menuBarButton' initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0}} transition={{ delay: 0.4 }} style={{marginLeft: 10}}>
            <Button variant='contained'>Sign Up</Button>
          </motion.div>
        </Toolbar>
      </div>
    </Box>
  );
}
