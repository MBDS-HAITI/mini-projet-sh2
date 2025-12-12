import { useState, useRef } from "react";
import {
  AppBar, Toolbar, Box, IconButton, Typography, InputBase, Avatar,
  Menu as MuiMenu, MenuItem, Tooltip, Button, Drawer, List, ListItemButton
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

import { NavLink } from "react-router-dom";

const MotionAppBar = motion.create(AppBar);

// ---------------- SEARCH BAR ----------------
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

// ------------------- HEADER COMPONENT --------------------
export default function Header({ themeMode, setThemeMode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [menuMobileOpen, setMenuMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const openUserMenu = Boolean(anchorEl);
  const avatarRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // NEW → icon color depending on theme
  const iconColor = theme.palette.mode === "light" ? "#374151" : "#ffffff";

  const navItems = [
    { label: "Dashboard", to: "/tableauDeBord", icon: <DashboardIcon fontSize="small" sx={{ color: iconColor }} /> },
    { label: "Étudiants", to: "/etudiants", icon: <PeopleIcon fontSize="small" sx={{ color: iconColor }} /> },
    { label: "Cours", to: "/cours", icon: <MenuBookIcon fontSize="small" sx={{ color: iconColor }} /> },
    { label: "Notes", to: "/notes", icon: <GradeIcon fontSize="small" sx={{ color: iconColor }} /> }
  ];

  // Height adapts automatically
  const expandedHeight = isMobile ? 56 : 64;
  const collapsedHeight = isMobile ? 40 : 48;

  return (
    <MotionConfig transition={{ duration: 0.25, ease: [0.25, 0.8, 0.25, 1] }}>
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
          borderBottom: `1px solid ${theme.palette.divider}`,
          overflow: "hidden"
        }}
      >
        <Toolbar sx={{ height: "100%", minHeight: "unset", px: { xs: 1, sm: 2, md: 3 } }}>
          
          {/* MOBILE HAMBURGER */}
          {isMobile && (
            <IconButton onClick={() => setMenuMobileOpen(true)}>
              <MenuIcon sx={{ color: iconColor }} />
            </IconButton>
          )}

          {/* IMAGE LOGO (UPBAR) */}
          <Box component="img"
            src="/mbds_logo_transparent.svg"
            alt="Logo"
            sx={{
              height: collapsed ? 28 : 34,
              width: "auto",
              ml: 1,
              mr: 2,
              transition: "0.25s"
            }}
          />

          {/* LEFT TITLE (DESKTOP) */}
          {!isMobile && (
            <>
              <IconButton onClick={() => setCollapsed(!collapsed)}>
                <MenuIcon sx={{ color: iconColor }} />
              </IconButton>

              {!collapsed && (
                <Typography variant="h6" sx={{ ml: 1, fontWeight: 600, color: iconColor }}>
                  MBDS Haiti
                </Typography>
              )}
            </>
          )}

          {/* NAV MENU (HIDDEN ON MOBILE) */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
              {navItems.map((it) => (
                <NavLink key={it.to} to={it.to} style={{ textDecoration: "none" }}>
                  <Button
                    startIcon={it.icon}
                    sx={{
                      color: iconColor,
                      textTransform: "none",
                      px: 1.5,
                      minWidth: 56,
                      borderRadius: 1.5,
                      "&:hover": { backgroundColor: theme.palette.action.hover }
                    }}
                  >
                    {!collapsed && it.label}
                  </Button>
                </NavLink>
              ))}
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {/* SEARCH (DESKTOP ONLY) */}
          {!isMobile && !collapsed && (
            <Search>
              <SearchIcon sx={{ color: iconColor }} />
              <SearchInput placeholder="Rechercher..." />
            </Search>
          )}

          {/* RIGHT ICONS */}
          <IconButton onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}>
            {themeMode === "dark"
              ? <Brightness7Icon sx={{ color: iconColor }} />
              : <Brightness4Icon sx={{ color: iconColor }} />
            }
          </IconButton>

          <IconButton>
            <NotificationsIcon sx={{ color: iconColor }} />
          </IconButton>

          <IconButton ref={avatarRef} onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0.2 }}>
            <Avatar sx={{ width: 34, height: 34, bgcolor: "primary.main" }}>S</Avatar>
          </IconButton>

          <MuiMenu anchorEl={anchorEl} open={openUserMenu} onClose={() => setAnchorEl(null)}>
            <MenuItem>Mon profil</MenuItem>
            <MenuItem>Paramètres</MenuItem>
            <MenuItem>Déconnexion</MenuItem>
          </MuiMenu>
        </Toolbar>
      </MotionAppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="left"
        open={menuMobileOpen}
        onClose={() => setMenuMobileOpen(false)}
      >
        <Box sx={{ width: 220, p: 2, textAlign: "center" }}>
          {/* IMAGE LOGO IN DRAWER */}
          <Box
            component="img"
            src="/mbds_logo_transparent.svg"
            alt="Logo"
            sx={{ width: 100, height: "auto", mb: 2 }}
          />
        </Box>

        <List sx={{ width: 220 }}>
          {navItems.map((it) => (
            <ListItemButton component={NavLink} to={it.to} key={it.to}>
              {it.icon}
              <span style={{ marginLeft: 8, color: iconColor }}>{it.label}</span>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </MotionConfig>
  );
}


export {Header}