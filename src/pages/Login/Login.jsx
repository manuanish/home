import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import mainTheme from '../../themes/mainTheme';
import MenuBar from '../../components/MenuBar';
import Footer from '../../components/Footer';
import Twemoji from '../../scripts/Twemoji';
import { motion } from "framer-motion";
import './LogIn.css';
import '../../scripts/firebase';
import {
 useNavigate
} from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, getDoc, doc, setDoc } from "firebase/firestore";
const db = getFirestore();

const auth = getAuth();

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 330,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  m: 0,
  outline: 'none',
  borderRadius: 3
};



export default function SignUp() {
  const navigate = useNavigate();
  const [formValues, setformValues] = React.useState({
    emailValue: '',
    passwordValue: '',
    passwordErrorText: '',
    emailErrorText: '',
    emailError: false,
    passwordError: false,
    emailColor: '',
    passwordColor: '',
  });

  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const [openModal, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await signInWithEmailAndPassword(auth, formValues.emailValue, formValues.passwordValue)
      .then((userCredential) => {
        if (auth.currentUser.emailVerified) {
          setLoading(false);
          const user = userCredential.user;
          // ...
          setformValues({
            ...formValues,
            emailColor: 'success',
            emailFocused: true,
            passwordErrorText: '',
            emailErrorText: '',
            passwordError: false,
            passwordConfirmError: false,
            passwordColor: 'success',
            passwordFocused: true,
          });
          setOpen(true);
          navigate("/home");
        } else {
          signOut(auth)
          setLoading(false);
          setformValues({
            ...formValues,
            emailErrorText: 'Email is not verified.',
            emailError: true
          });
        }
      })
      .catch((error) => {

      });
  }

  const handlePasswordChange = (event) => {
    event.preventDefault();
    setformValues({
      ...formValues,
      passwordValue: event.target.value,
      passwordErrorText: '',
      passwordError: false,
      usernameFocused: false,
      emailFocused: false,
      passwordFocused: true,
      passwordConfirmFocused: false,
      usernameColor: '',
      emailColor: '',
      passwordColor: '',
      passwordConfirmColor: ''
    });
  }

  const handleEmailChange = (event) => {
    event.preventDefault();
    setformValues({
      ...formValues,
      emailValue: event.target.value,
      emailErrorText: '',
      emailError: false,
      usernameFocused: false,
      emailFocused: true,
      passwordFocused: false,
      passwordConfirmFocused: false,
      usernameColor: '',
      emailColor: '',
      passwordColor: '',
      passwordConfirmColor: ''
    });
  }

  const handleUsernameFocus = (event) => {
    setformValues({
      ...formValues,
      usernameFocused: true,
      emailFocused: false,
      passwordFocused: false,
      passwordConfirmFocused: false,
      usernameColor: '',
      emailColor: '',
      passwordColor: '',
      passwordConfirmColor: ''
    });
  }
  const handleEmailFocus = (event) => {
    setformValues({
      ...formValues,
      usernameFocused: false,
      emailFocused: true,
      passwordFocused: false,
      passwordConfirmFocused: false,
      usernameColor: '',
      emailColor: '',
      passwordColor: '',
      passwordConfirmColor: ''
    });
  }
  const handlePasswordFocus = (event) => {
    setformValues({
      ...formValues,
      usernameFocused: false,
      emailFocused: false,
      passwordFocused: true,
      passwordConfirmFocused: false,
      usernameColor: '',
      emailColor: '',
      passwordColor: '',
      passwordConfirmColor: ''
    });
  }


  return (
    <ThemeProvider theme={mainTheme}>
    <CssBaseline />
      <MenuBar/>
      <Footer />
      <div style={{padding: 40, paddingLeft: 30}}>
        <Box sx={{ flexDirection: 'column' }} className="inputHolder">
          <form onSubmit={handleFormSubmit}>
            <motion.div initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0}} transition={{ delay: 0.6 }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                sx={{m: 1}}
                value={formValues.emailValue}
                error={formValues.emailError}
                helperText={formValues.emailErrorText}
                onChange={handleEmailChange}
                color={formValues.emailColor}
                focused={formValues.emailFocused}
                autoComplete="off"
                onFocus={handleEmailFocus}
                required
              />
            </motion.div>
            <motion.div initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0}} transition={{ delay: 0.7 }}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                sx={{m: 1}}
                value={formValues.passwordValue}
                error={formValues.passwordError}
                helperText={formValues.passwordErrorText}
                onChange={handlePasswordChange}
                color={formValues.passwordColor}
                focused={formValues.passwordFocused}
                autoComplete="off"
                onFocus={handlePasswordFocus}
                required
              />
            </motion.div>
            <motion.div initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0}} transition={{ delay: 0.8 }}>
              <LoadingButton sx={{m: 1, p: 1.5, mt: 1.5}} fullWidth disableElevation variant='contained' type='submit' loading={loading}>
                Log In
              </LoadingButton>
            </motion.div>
          </form>
        </Box>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
       <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
         Logged In Successfully!
       </Alert>
     </Snackbar>
    </ThemeProvider>
  );
}
