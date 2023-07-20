import { createTheme } from '@mui/material/styles';

const palette = {
    red: "#A7001E"
}

const theme = createTheme({
  palette: {
    primary: {
      // light, dark, contrastText: will be calculated from palette.primary.main,
      main: palette.red,
    },
    background: {
        default: "#000000",
        paper: palette.red
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    text: {
        primary: palette.red,
        secondary: "#000000"
    },
    /*custom: {
      light: '#ffa726',
      main: '#f57c00',
      dark: '#ef6c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },*/
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export default theme;