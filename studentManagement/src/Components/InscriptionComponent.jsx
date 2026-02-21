
import {
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    Button, TextField, MenuItem,Chip,
    OutlinedInput
} from "@mui/material";

function InscriptionCard({navigate, code, handleChange, enrollment, sessions, programs, courses, handleEnroll }){
    return (
        <Box p={3} maxWidth={900} mx="auto">
            <Typography variant="h6" gutterBottom>🎓 Inscription Académique</Typography>

            <Card sx={{ mb: 3, bgcolor: "#f5f5f5" }}>
                <CardContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2">Code étudiant</Typography>
                            <Typography>{code}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card elevation={3}>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                label="Session"
                                name="sessionId"
                                value={enrollment.sessionId}
                                onChange={handleChange}
                                slotProps={{
                                    select: {
                                        sx: { width: '100%' }
                                    }
                                }}
                            >
                                {sessions.map((s) => (
                                    <MenuItem key={s._id} value={s._id}>{s.name} | {s.academicYear}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                label="Programme"
                                name="programId"
                                value={enrollment.programId}
                                onChange={handleChange}
                                slotProps={{
                                    select: {
                                        sx: { width: '100%' }
                                    }
                                }}
                            >
                                {programs.map((p) => (
                                    <MenuItem key={p._id} value={p._id}>{p.name}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Cours"
                                name="courseIds"
                                slotProps={{
                                    select: {
                                        multiple: true,
                                    }
                                }}
                                value={enrollment.courseIds}
                                onChange={handleChange}
                            >
                                {courses.map((c) => (
                                    <MenuItem key={c._id} value={c._id}>{c.name} | {c.code}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>

                    <Box mt={4} display="flex" justifyContent="space-between">
                        <Button onClick={() => navigate(-1)}>Retour</Button>
                        <Button
                            variant="contained"
                            color="success"
                            size="medium"
                            onClick={handleEnroll}
                            disabled={!enrollment.sessionId || !enrollment.programId}
                        >
                            Confirmer l'inscription
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export {InscriptionCard}