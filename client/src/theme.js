import { createTheme } from "@mui/material/styles";

// Create a Material-UI theme instance
// https://mui.com/customization/theming/
const theme = createTheme({
  palette: {
    primary: {
      main: "#035469",
    },
    secondary: {
      main: "#70E65C", // Light green
    },

    background: {
      default: "#70B8DA", // Light Blue
      secondary: "white",
    },
  },
  typography: {
    fontWeightMedium: 600,
    fontSize: 17,
    h1: {
      fontSize: "2.2rem",
      fontWeight: 400,
      color: "#035469",
    },
    body1: {
      color: "black",
    },
  },
});

export default theme;
