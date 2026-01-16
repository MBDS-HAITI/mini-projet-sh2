import { useState, useRef } from "react";
import {
  AppBar, Toolbar, Box, IconButton, Typography, InputBase, Avatar,
  Menu as MuiMenu, MenuItem, Button, Drawer, List, ListItemButton
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { MotionConfig, motion } from "framer-motion";
import { useTheme, useMediaQuery } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GradeIcon from "@mui/icons-material/Grade";

import { logout } from "../DataAccess/Services/authentificationService";
import { NavLink, useNavigate } from "react-router-dom";

const MotionAppBar = motion.create(AppBar);

/* ---------------- SEARCH BAR ---------------- */
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.15) },
  padding: "6px 10px",
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "100%",
  [theme.breakpoints.up("sm")]: { width: 350 }
}));

const SearchInput = styled(InputBase)(() => ({
  color: "inherit",
  width: "100%"
}));

/* ---------------- HEADER ---------------- */
export default function Header({ themeMode, setThemeMode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [menuMobileOpen, setMenuMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const openUserMenu = Boolean(anchorEl);
  const avatarRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const iconColor = theme.palette.mode === "light" ? "#374151" : "#ffffff";

  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", to: "/tableauDeBord", icon: <DashboardIcon fontSize="small" sx={{ color: iconColor }} /> },
    { label: "Étudiants", to: "/etudiants", icon: <PeopleIcon fontSize="small" sx={{ color: iconColor }} /> },
    { label: "Agenda", to: "/agenda", icon: <PeopleIcon fontSize="small" sx={{ color: iconColor }} /> },
    { label: "Cours", to: "/cours", icon: <MenuBookIcon fontSize="small" sx={{ color: iconColor }} /> },
    { label: "Notes", to: "/notes", icon: <GradeIcon fontSize="small" sx={{ color: iconColor }} /> },
    { label: "Programmes", to: "/cours", icon: <MenuBookIcon fontSize="small" sx={{ color: iconColor }} /> },
    { label: "Sessions", to: "/notes", icon: <GradeIcon fontSize="small" sx={{ color: iconColor }} /> }
  ];

  const expandedHeight = isMobile ? 56 : 64;
  const collapsedHeight = isMobile ? 40 : 48;

  const logOutJsx = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <MotionConfig transition={{ duration: 0.25 }}>
      <MotionAppBar
        position="fixed"
        animate={{ height: collapsed ? collapsedHeight : expandedHeight }}
        sx={{
          zIndex: (t) => t.zIndex.drawer + 1,
          background: theme.palette.mode === "dark"
            ? "rgba(6,7,13,0.6)"
            : "rgba(255,255,255,0.7)",
          backdropFilter: "blur(8px)",
          boxShadow: "none",
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Toolbar sx={{ height: "100%", minHeight: "unset" }}>
          {/* MOBILE */}
          {isMobile && (
            <IconButton onClick={() => setMenuMobileOpen(true)}>
              <MenuIcon sx={{ color: iconColor }} />
            </IconButton>
          )}

          {/* LOGO */}
          <Box
            component="img"
            src="/mbds_logo_transparent.svg"
            alt="Logo"
            sx={{ height: collapsed ? 28 : 34, ml: 1, mr: 2 }}
          />

          {/* DESKTOP MENU */}
          {!isMobile && (
            <>
              <IconButton onClick={() => setCollapsed(!collapsed)}>
                <MenuIcon sx={{ color: iconColor }} />
              </IconButton>

              <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
                {navItems.map((it) => (
                  <NavLink key={it.to} to={it.to} style={{ textDecoration: "none" }}>
                    <Button
                      startIcon={it.icon}
                      sx={{
                        color: iconColor,
                        textTransform: "none",
                        borderRadius: 1.5,
                        "&:hover": { backgroundColor: theme.palette.action.hover }
                      }}
                    >
                      {!collapsed && it.label}
                    </Button>
                  </NavLink>
                ))}
              </Box>
            </>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {!isMobile && !collapsed && (
            <Search>
              <SearchIcon sx={{ color: iconColor }} />
              <SearchInput placeholder="Rechercher..." />
            </Search>
          )}

          <IconButton onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}>
            {themeMode === "dark"
              ? <Brightness7Icon sx={{ color: iconColor }} />
              : <Brightness4Icon sx={{ color: iconColor }} />}
          </IconButton>

          <IconButton>
            <NotificationsIcon sx={{ color: iconColor }} />
          </IconButton>

          <IconButton ref={avatarRef} onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar sx={{ bgcolor: "primary.main" }}>S</Avatar>
          </IconButton>

          <MuiMenu anchorEl={anchorEl} open={openUserMenu} onClose={() => setAnchorEl(null)}>
            <MenuItem>Mon profil</MenuItem>
            <MenuItem onClick={logOutJsx}>Déconnexion</MenuItem>
          </MuiMenu>
        </Toolbar>
      </MotionAppBar>

      {/* MOBILE DRAWER */}
      <Drawer open={menuMobileOpen} onClose={() => setMenuMobileOpen(false)}>
        <List sx={{ width: 220 }}>
          {navItems.map((it) => (
            <ListItemButton key={it.to} component={NavLink} to={it.to}>
              {it.icon}
              <span style={{ marginLeft: 8 }}>{it.label}</span>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </MotionConfig>
  );
}

export { Header };
