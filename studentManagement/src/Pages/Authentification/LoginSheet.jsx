import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { login } from "../../DataAccess/Services/authentificationService";

function LoginSheet({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(email, password);
      const studentId = data?.user?.studentd;              
      console.log(data);
      onClose();
      if(!studentId)
        navigate("/tableauDeBord", { replace: true });
      else
        navigate("/etudiant/" + studentId, { replace: true });
    } catch (err) {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <Drawer anchor="top" open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 4,
          maxWidth: 420,
          mx: "auto",
        }}
      >
        <Stack spacing={2}>
          <Typography fontWeight={700} textAlign="center">
            Connexion
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />

          <TextField
            type="password"
            label="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />

          <Button
            type="submit"
            sx={{
              mt: 1,
              borderRadius: 6,
              py: 1.2,
              background:
                "linear-gradient(135deg,#2774AE,#4F9DDE)",
              color: "white",
            }}
          >
            Se connecter
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}

export { LoginSheet };
