import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5E56E7',
    },
    background: {
      default: '#F8F7FF',
    },
    text: {
      primary: '#333333',
    },
    grey: {
      100: '#F0F0F6',
      500: '#A0A0A0',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '48px',
      color: '#333333',
    },
    h2: {
      fontWeight: 600,
      fontSize: '30px',
      color: '#333333',
    },
    body1: {
      fontSize: '16px',
    },
    body2: {
      fontSize: '12px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          padding: '0 10px',
          height: '50px',
          boxShadow: '0 2px 5px 0 rgba(211, 209, 238, 0.5)',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          height: '40px',
          paddingLeft: '10px',
          '&.Mui-focused': {
            borderColor: '#5E56E7',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 2px 5px 0 rgba(211, 209, 238, 0.5)',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        body1: {
          fontFamily: 'Montserrat, sans-serif',
        },
        body2: {
          fontFamily: 'Montserrat, sans-serif',
        },
      },
    },
  },
});

export default theme;
