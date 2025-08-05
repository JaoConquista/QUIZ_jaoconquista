import { createTheme } from "@mui/material/styles";
import { amber } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: amber[500],
    },
    secondary: {
      main: amber[700],
    },
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
  },
  typography: {
    fontFamily: "'Geist Sans', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
});

export default theme;
