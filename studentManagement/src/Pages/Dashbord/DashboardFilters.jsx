import { Grid, TextField, MenuItem, Paper } from "@mui/material";

function AdminFilters ({filters,
  sessions,
  programs,
  academicYears,
  roles, handleChange}){
    return (
    <Grid container spacing={2} mb={3}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <TextField
          select
          fullWidth
          label="Année académique"
          value={filters.academicYear || ""}
          onChange={handleChange("academicYear")}
        >
          <MenuItem value="">Toutes</MenuItem>
          {academicYears.map(y => (
            <MenuItem key={y} value={y}>{y}</MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <TextField
          select
          fullWidth
          label="Session"
          value={filters.sessionId || ""}
          onChange={handleChange("sessionId")}
        >
          <MenuItem value="">Toutes</MenuItem>
          {sessions.map(s => (
            <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <TextField
          select
          fullWidth
          label="Programme"
          value={filters.programId || ""}
          onChange={handleChange("programId")}
        >
          <MenuItem value="">Tous</MenuItem>
          {programs.map(p => (
            <MenuItem key={p._id} value={p._id}>{p.name}</MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <TextField
          select
          fullWidth
          label="Rôle"
          value={filters.role || ""}
          onChange={handleChange("role")}
        >
          <MenuItem value="">Tous</MenuItem>
          {roles.map(r => (
            <MenuItem key={r} value={r}>{r}</MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
}

function ScolariteFilters({sessions,
  programs, academicYears,filters, handleChange}){
    return (
    <Grid container spacing={2} mb={3}>
      <Grid size={{ xs: 12, sm: 4, md: 4 }}>
        <TextField
          select
          fullWidth
          label="Année académique"
          value={filters.academicYear || ""}
          onChange={handleChange("academicYear")}
        >
          <MenuItem value="">Toutes</MenuItem>
          {academicYears.map(y => (
            <MenuItem key={y} value={y}>{y}</MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid size={{ xs: 12, sm: 4, md: 4 }}>
        <TextField
          select
          fullWidth
          label="Session"
          value={filters.sessionId || ""}
          onChange={handleChange("sessionId")}
        >
          <MenuItem value="">Toutes</MenuItem>
          {sessions.map(s => (
            <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid size={{ xs: 12, sm: 4, md: 4 }}>
        <TextField
          select
          fullWidth
          label="Programme"
          value={filters.programId || ""}
          onChange={handleChange("programId")}
        >
          <MenuItem value="">Tous</MenuItem>
          {programs.map(p => (
            <MenuItem key={p._id} value={p._id}>{p.name}</MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
}

function StudentFilters({sessions,
  programs, academicYears,filters, handleChange}){
    return (<ScolariteFilters sessions = {sessions}
  programs = {programs} academicYears ={academicYears} filters ={filters} handleChange={handleChange}/>)
}

function DashboardFilters({
    user,
    filters,
  setFilters,
  sessions,
  programs,
  academicYears,
  roles
}) 
    {
    const handleChange = (field) => (event) => {
        setFilters(prev => ({
        ...prev,
        [field]: event.target.value || null
        }));
    };

  switch (user){
  case  "ADMIN" :
         return (<AdminFilters sessions = {sessions}
  programs = {programs} academicYears ={academicYears} filters ={filters} roles = {roles} handleChange={handleChange}/>);
    case "SCOLARITE":
        return (<ScolariteFilters sessions = {sessions}
  programs = {programs} academicYears ={academicYears} filters ={filters} handleChange={handleChange}/>);
  case "STUDENT":
        return (<StudentFilters sessions = {sessions}
  programs = {programs} academicYears ={academicYears} filters ={filters} handleChange={handleChange}/>);
  }
}

export {DashboardFilters};