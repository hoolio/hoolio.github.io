import { createTheme } from "@mui/material/styles";
import { blue, grey, red } from "@mui/material/colors";

export const palette = {
  primary: {
    light: grey[400],
    main: grey[600],
    dark: grey[800],
  },
  secondary: {
    light: blue[400],
    main: blue[600],
    dark: blue[800],
  },
  error: {
    main: red[700],
  },
};

const theme = createTheme({
  palette,
});

export default theme;
