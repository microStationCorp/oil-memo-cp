import { createTheme } from "@mui/material/styles";
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#db0808",
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
