
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../DataAccess/Services/authentificationService";

function LogInApp(){
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);
      const role = data.user.role;

        navigate("/tableauDeBord", { replace: true });
      
    } catch (err) {
      setError("Email ou mot de passe incorrect"); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Se connecter</button>
    </form>
  );
}

export {LogInApp}