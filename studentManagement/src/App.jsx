import { useState } from 'react'
import { BrowserRouter} from 'react-router-dom'
import { AppRouters } from './Routes/AppRoutes'
import { ThemeProvider, CssBaseline } from "@mui/material";
import createAppTheme from "./theme";
import { useEffect, useMemo} from 'react';

function App() {
  const [count, setCount] = useState(0)
  const [mode, setMode] = useState(() => localStorage.getItem("theme") || "dark");
  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const theme = useMemo(() => createAppTheme(mode), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <AppRouters themeMode={mode} setThemeMode={setMode}/>
        </BrowserRouter>
    </CssBaseline>
    </ThemeProvider>
  )
}

export default App
