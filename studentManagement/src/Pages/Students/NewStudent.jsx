import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createStudent } from "../../DataAccess/Services/studentService";
function NewStudent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    selfPhone: "",
    birthDay: "",
    integrationDate :"",
    referencePhone : "",
    address : ""
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (field) => (event) => {
    setForm((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await createStudent(form);
      const studentId = response._id;
        console.log(studentId);
      navigate(`/inscription/${studentId}`);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création de l'étudiant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3} maxWidth={800} mx="auto">
      <Typography variant="h4" gutterBottom>
        👤 Nouvel étudiant
      </Typography>

      <Card elevation={3}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Prénom"
                fullWidth
                required
                value={form.firstName}
                onChange={handleChange("firstName")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Nom"
                fullWidth
                required
                value={form.lastName}
                onChange={handleChange("lastName")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Date de naissance"
                type="date"
                required
                fullWidth
                slotProps={{
                  inputLabel: {
                    shrink: true
                  }
                }}
                value={form.birthDay}
                onChange={handleChange("birthDay")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={form.email}
                onChange={handleChange("email")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Téléphone"
                slotProps={{
                    htmlInput: {
                        inputMode: 'tel',
                        pattern: '[+]?[0-9]*'
                    }
                }}
                fullWidth
                value={form.selfPhone}
                onChange={handleChange("selfPhone")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Téléphone de personne de référence"
                slotProps={{
                    htmlInput: {
                        inputMode: 'tel',
                        pattern: '[+]?[0-9]*'
                    }
                }}
                fullWidth
                required
                value={form.referencePhone}
                onChange={handleChange("referencePhone")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Adresse"
                fullWidth
                value={form.address}
                onChange={handleChange("address")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Date d'intégration"
                type="date"
                fullWidth
                slotProps={{
                  inputLabel: {
                    shrink: true
                  }
                }}
                value={form.integrationDate}
                onChange={handleChange("integrationDate")}
              />
            </Grid>
          </Grid>

          <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
            >
              Annuler
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Enregistrement..." : "Enregistrer et inscrire"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export {NewStudent};
