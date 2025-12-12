
import { Box } from "@mui/material";
import {Header} from "./Header";
import { Outlet } from "react-router-dom";

function Layout({themeMode, setThemeMode}){
    return (
       <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Header themeMode={themeMode} setThemeMode={setThemeMode} />
      <Box component="main" sx={{ flex: 1, p: { xs: 1, md: 3 }, mt: { xs: "56px", md: "64px" } }}>
        <Outlet />
      </Box>
    </Box>
    );
}
export {Layout}