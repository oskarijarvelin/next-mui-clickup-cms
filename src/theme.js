import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red, amber, green } from '@mui/material/colors';
import { fiFI as dataGridFiFI } from '@mui/x-data-grid';
import { fiFI as coreFiFI } from '@mui/material/locale';
import { fiFI } from '@mui/x-date-pickers/locales';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#223388',
    },
    secondary: {
      main: '#19857b',
    },
    white: {
      main: '#FFF',
    },
    error: {
      main: red.A400,
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
},
dataGridFiFI,
coreFiFI,
fiFI
);

export default theme;