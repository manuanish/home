import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { motion } from "framer-motion";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import './MenuBar.css';
import '../scripts/firebase';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
 Link
} from "react-router-dom";

const auth = getAuth();

const CURRENT_USER = null



const drawerWidth = 240;

export default function MenuBar() {
  const [currentUser, setCurrentUser] = React.useState(auth.currentUser)
  const getCurrentUser = async () => {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setCurrentUser(auth.currentUser);
      } else {
        setCurrentUser(auth.currentUser);
      }
    });
  }

  React.useEffect(() => {
    getCurrentUser();
  }, []);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if (open){
      setAnchorEl(false);
    } else {
      setAnchorEl(event.currentTarget);
    }

  };
  const handleClose = () => {
   setAnchorEl(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [alignment, setAlignment] = React.useState(localStorage.getItem('CURRENT_THEME'));

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      localStorage.setItem('CURRENT_THEME', newAlignment);
      window.location.reload(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth)
  }

  const handleLogOutEvent = async () => {
    setAlertOpen(true);
    handleClose();
    await handleSignOut();
  }


  const drawerLoggedOut = (
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
              <Link to='/home' style={{textDecoration: 'none', color: 'inherit'}}>
                Home
              </Link>
            </ListItemText>
          </motion.div>
        </ListItem>
        <ListItem button>
          <motion.div style={{display: 'flex'}} initial={{ opacity: 0, x: -5 }} whileInView={{ opacity: 1, x: 0 }} transition={{delay: 0.8}}>
            <ListItemIcon sx={{ml: 1, mr: -2, alignSelf: 'center' }}>
              <LoginRoundedIcon />
            </ListItemIcon>
            <ListItemText>
              <Link to="/log-in" style={{textDecoration: 'none', color: 'inherit'}}>
                Log in
              </Link>
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
              <Link to="/sign-up" style={{textDecoration: 'none', color: '#7289DA'}}>
                Sign Up
              </Link>
            </ListItemText>
          </ListItem>
        </List>
      </motion.div>
      <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{delay: 1.4}}>
        <Divider />
      </motion.div>
      <motion.div initial={{opacity: 0, y: 5}} whileInView={{opacity: 1, y: 0}} transition={{delay: 1.6}} style={{margin: 32}}>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="light"><LightModeRoundedIcon/> &nbsp; Light</ToggleButton>
        <ToggleButton value="dark"><DarkModeRoundedIcon/> &nbsp; Dark</ToggleButton>
      </ToggleButtonGroup>
      </motion.div>
    </div>
  );

  try {
    var isNull = auth.currentUser.emailVerified
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
                {drawerLoggedOut}
                </Drawer>
              </motion.div>
                <motion.div initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0}} style={{flexGrow: 1}} transition={{ delay: 0.2 }}>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 900, color: '#7289DA' }}>
                    <Link to="/home" style={{textDecoration: 'none', color: '#7289DA'}}>
                      manuanish.github.io
                    </Link>
                  </Typography>
                </motion.div>
                <motion.div initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0}} transition={{ delay: 0.3 }}>
                  <IconButton variant='outlined' onClick={handleClick} aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
                    <Avatar></Avatar>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <motion.div initial={{opacity: 0, y: -5}} whileInView={{opacity: 1, y: 0}} transition={{ delay: 0.1 }}>
                        <MenuItem onClick={handleClose}><AccountCircleRoundedIcon/> &nbsp; Profile</MenuItem>
                      </motion.div>
                      <motion.div initial={{opacity: 0, y: -5}} whileInView={{opacity: 1, y: 0}} transition={{ delay: 0.2 }}>
                        <MenuItem onClick={handleClose}><SettingsRoundedIcon/> &nbsp; My account</MenuItem>
                      </motion.div>
                      <motion.div initial={{opacity: 0, y: -5}} whileInView={{opacity: 1, y: 0}} transition={{ delay: 0.3 }}>
                        <Divider sx={{m: 2}}/>
                      </motion.div>
                      <motion.div initial={{opacity: 0, y: -5}} whileInView={{opacity: 1, y: 0}} transition={{ delay: 0.4 }}>
                        <MenuItem onClick={handleLogOutEvent}><LogoutRoundedIcon color='error'/> &nbsp; <Typography color='error'>Logout</Typography></MenuItem>
                      </motion.div>
                    </Menu>
                  </IconButton>
                </motion.div>
              </Toolbar>
            </div>
          </Box>
        );
  } catch {
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
            {drawerLoggedOut}
          </Drawer>
            </motion.div>
            <motion.div initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0}} style={{flexGrow: 1}} transition={{ delay: 0.2 }}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 900, color: '#7289DA' }}>
                <Link to="/home" style={{textDecoration: 'none', color: '#7289DA'}}>
                  manuanish.github.io
                </Link>
              </Typography>
            </motion.div>
            <motion.div className='menuBarButton' initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0}} transition={{ delay: 0.3 }}>
              <Link to="/log-in" style={{textDecoration: 'none'}}>
                <Button variant='outlined'>Log In</Button>
              </Link>
            </motion.div>
            <motion.div className='menuBarButton' initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0}} transition={{ delay: 0.4 }} style={{marginLeft: 10}}>
              <Link to="/sign-up" style={{textDecoration: 'none'}}>
                <Button variant='contained' disableElevation>Sign Up</Button>
              </Link>
            </motion.div>
          </Toolbar>
        </div>
        <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => setAlertOpen(false)}>
         <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{ width: '100%' }}>
           Logged Out Successfully!
         </Alert>
       </Snackbar>
      </Box>
    );
  }
}
