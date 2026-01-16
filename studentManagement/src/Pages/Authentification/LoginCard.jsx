import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../../DataAccess/Services/authentificationService";

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result = await login(email, password);
      console.log(result);
      if(result.user.role == "STUDENT")
      {
        console.log("/etudiant/" + result.studentId);
        navigate("/etudiant/" + result.studentId, { replace: true });}
      else
      {
        navigate("/tableauDeBord", { replace: true });
      }
    } catch {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <Card elevation={8} sx={{ maxWidth: 420, mx: "auto" }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          Connexion
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} mt={2}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            label="Mot de passe"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
          >
            Se connecter
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export  {LoginCard};