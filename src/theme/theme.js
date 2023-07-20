import { createTheme } from '@mui/material/styles';

const palette = {
    red: "#A7001E",
    black: "#317AC1",
    blue: "#317AC1",
    grey: "#E5E7E6",
}

const typo = {
    bigTitleBold: {
        fontSize: 38,
        fontWeight: "bold",
    },
    bigTitle: {
      fontSize: 42,
    },
    titleBold: {
        fontSize: 24,
        fontWeight: "bold"
    },
    normal: {
        fontSize: 18,
        fontWeight: "light"
    }
}

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      // light, dark, contrastText: will be calculated from palette.primary.main,
      main: palette.red,
    },
    blue: {
      main: palette.blue
    },
    black: {
      main: palette.black
    },
    background: {
        default: "#000000",
        paper: palette.grey
    },
    secondary: {
      main: palette.blue,
      //light, dark: will be calculated from palette.secondary.main,
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
  typography: {
    ...typo
  },
  spacing: 8,
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
});

export default theme;