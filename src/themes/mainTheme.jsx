import { createTheme } from '@mui/material/styles';

// Fonts
import '@fontsource/inter/100.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';

// Main Theme
const mainTheme = createTheme({
  typography: {
    fontFamily: 'Inter',
    button: {
      textTransform: 'none'
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      500: "#7289DA",
    }
  },
});

export default mainTheme;
