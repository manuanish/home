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
import './SignUp.css';
import '../../scripts/firebase';
import { getAuth, fetchSignInMethodsForEmail, createUserWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";
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
  const [formValues, setformValues] = React.useState({
    usernameValue: '',
    emailValue: '',
    passwordValue: '',
    passwordConfirmValue: '',
    usernameErrorText: '',
    passwordErrorText: '',
    passwordConfirmErrorText: '',
    emailErrorText: '',
    usernameError: false,
    emailError: false,
    passwordError: false,
    passwordConfirmError: false,
    usernameColor: '',
    emailColor: '',
    passwordColor: '',
    passwordConfirmColor: '',
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
    if (formValues.passwordValue !== formValues.passwordConfirmValue) {
      setformValues({
        ...formValues,
        passwordErrorText: 'Passwords do not match.',
        passwordConfirmErrorText: 'Passwords do not match.',
        passwordError: true,
        passwordConfirmError: true
      });
      setLoading(false);
    } else {
      setLoading(true);
      if (formValues.passwordValue.length < 6){
        setformValues({
          ...formValues,
          passwordErrorText: 'Passwords is not strong ( < 6 characters)',
          passwordConfirmErrorText: 'Passwords is not strong ( < 6 characters)',
          passwordError: true,
          passwordConfirmError: true
        });
        setLoading(false);
      } else {
        setformValues({
          ...formValues,
          passwordErrorText: '',
          passwordConfirmErrorText: '',
          passwordError: false,
          passwordConfirmError: false,
          passwordColor: 'success',
          passwordConfirmColor: 'success',
          passwordFocused: true,
          passwordConfirmFocused: true,
        });
        setLoading(false);
        setLoading(true);

        var main_result = null;
        await fetchSignInMethodsForEmail(auth, formValues.emailValue).then((result) => {
          main_result = result;
        });

        if (main_result.length !== 0 ){
          setLoading(false);
          setformValues({
            ...formValues,
            emailErrorText: 'That email is taken.',
            emailError: true,
          });
        } else {
          setLoading(false);
          setformValues({
            ...formValues,
            emailColor: 'success',
            emailFocused: true,
            passwordErrorText: '',
            passwordConfirmErrorText: '',
            passwordError: false,
            passwordConfirmError: false,
            passwordColor: 'success',
            passwordConfirmColor: 'success',
            passwordFocused: true,
            passwordConfirmFocused: true,
          });
          setLoading(true);
          const docRef = doc(db, "username_list", formValues.usernameValue);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setLoading(false);
            setformValues({
              ...formValues,
              usernameErrorText: 'That username is taken.',
              usernameError: true,
            });
          } else {
            setLoading(false);
            setformValues({
              ...formValues,
              usernameColor: 'success',
              usernameFocused: true,
              emailColor: 'success',
              emailFocused: true,
              passwordErrorText: '',
              passwordConfirmErrorText: '',
              passwordError: false,
              passwordConfirmError: false,
              passwordColor: 'success',
              passwordConfirmColor: 'success',
              passwordFocused: true,
              passwordConfirmFocused: true,
            });
            setLoading(true)
            await createUserWithEmailAndPassword(auth, formValues.emailValue, formValues.passwordValue)
              .then((userCredential) => {
                setDoc(doc(db, "users", formValues.emailValue), {
                  username: formValues.usernameValue,
                  password: formValues.passwordValue
                });
                console.log(auth.currentUser)
                sendEmailVerification(auth.currentUser)
                 .then(() => {
                 })
                 .catch((error) => {
                     console.log('Email verification error', error);
                 });
              })
            signOut(auth).then(() => {
              setDoc(doc(db, "username_list", formValues.usernameValue), {
                exists: true,
              });
              setLoading(false)
              setOpen(true)
              setModalOpen(true)
            })
          }
        }
      }
    }
  }

  const handleUsernameChange = (event) => {
    event.preventDefault();
    setformValues({
      ...formValues,
      usernameValue: event.target.value,
      usernameErrorText: '',
      usernameError: false,
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

  const handleConfirmPasswordChange = (event) => {
    event.preventDefault();
    setformValues({
      ...formValues,
      passwordConfirmValue: event.target.value,
      passwordConfirmErrorText: '',
      passwordConfirmError: false,
      usernameFocused: false,
      emailFocused: false,
      passwordFocused: false,
      passwordConfirmFocused: true,
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
  const handleConfirmPasswordFocus = (event) => {
    setformValues({
      ...formValues,
      usernameFocused: false,
      emailFocused: false,
      passwordFocused: false,
      passwordConfirmFocused: true,
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
                label="Username"
                type="username"
                sx={{m: 1}}
                value={formValues.usernameValue}
                error={formValues.usernameError}
                helperText={formValues.usernameErrorText}
                onChange={handleUsernameChange}
                color={formValues.usernameColor}
                focused={formValues.usernameFocused}
                autoComplete="off"
                onFocus={handleUsernameFocus}
                required
              />
            </motion.div>
            <motion.div initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0}} transition={{ delay: 0.7 }}>
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
            <motion.div initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0}} transition={{ delay: 0.8 }}>
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
            <motion.div initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0}} transition={{ delay: 0.9 }}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                sx={{m: 1}}
                value={formValues.passwordConfirmValue}
                error={formValues.passwordConfirmError}
                helperText={formValues.passwordConfirmErrorText}
                onChange={handleConfirmPasswordChange}
                color={formValues.passwordConfirmColor}
                focused={formValues.passwordConfirmFocused}
                autoComplete="off"
                onFocus={handleConfirmPasswordFocus}
                required
              />
            </motion.div>
            <motion.div initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0}} transition={{ delay: 1 }}>
              <LoadingButton sx={{m: 1, p: 1.5, mt: 1.5}} fullWidth disableElevation variant='contained' type='submit' loading={loading}>Sign Up</LoadingButton>
            </motion.div>
          </form>
        </Box>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
       <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
         Account Created Successfully!
       </Alert>
     </Snackbar>
     <motion.div initial={{y: -5, opacity: 0}} whileInView={{y: 0, opacity: 1}}>
       <Modal
          open={openModal}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight: 800}}>
              Email verification
            </Typography>
            <Typography component="div" id="modal-modal-description" sx={{ mt: 2, fontWeight: 500, }}>
              Check your inbox at: <Typography sx={{mt: 1, fontWeight: 600, color: 'text.secondary'}}>{formValues.emailValue}</Typography>
            </Typography>
            <Button disableElevation onClick={handleModalClose} sx={{float: 'right', mt: 4}} variant="contained">Got it!</Button>
          </Box>
        </Modal>
      </motion.div>
    </ThemeProvider>
  );
}
