// TopBar.jsx
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function TopBar({ onLogin }) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "rgba(255,255,255,.85)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography fontWeight={800} color="primary">
            {/* 🎓 */}
            <Box component="img"
            src="/mbds_logo_transparent.svg"
            alt="Logo"
            sx={{
              height: 45,
              width: "auto",
              ml: 1,
              mr: 2,
              transition: "0.25s"
            }}
          />
          Haiti
        </Typography>

        <Button
          onClick={onLogin}
          sx={{
            borderRadius: 6,
            px: 3,
            background:
              "linear-gradient(135deg,#2774AE,#4F9DDE)",
            color: "white",
          }}
        >
          Connexion
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export { TopBar };
