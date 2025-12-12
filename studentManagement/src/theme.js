import { createTheme } from "@mui/material/styles";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: { main: "#4f46e5" },
          background: { default: "#f3f4f6", paper: "#fff" },
        }
      : {
          primary: { main: "#7c3aed" },
          background: { default: "#0b1220", paper: "#0b1220" },
        }),
  },
  components: {
    MuiAppBar: { defaultProps: { elevation: 0 } },
  },
});

export default function createAppTheme(mode = "light") {
  return createTheme(getDesignTokens(mode));
}