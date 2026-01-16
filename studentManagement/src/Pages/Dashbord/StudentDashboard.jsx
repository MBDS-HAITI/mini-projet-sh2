

import {Grid, Typography, Box, Container } from "@mui/material";
import { StatCard } from "./Component/StatCard";
import { PBarChart } from "./Component/PBarChart";
import { PLineChart } from "./Component/PLineChart";
import { DashboardFilters } from "./DashboardFilters";
import {getAggregateData, getInscriptionsData, getCoursesData, getDashboardFilters} from "../../DataAccess/Services/dashboardService";
import { useState, useEffect} from "react";
import { PBarChart3 } from "./Component/PBarchart3";




function StatsCards({ data }) {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title="Inscriptions totales"
          value={data.totalInscriptions}
          color="#1976d2"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title="Inscriptions actives"
          value={data.activeInscriptions}
          color="#2e7d32"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title="Taux de réussite"
          value={`${data.activeRate}%`}
          color="#ed6c02"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title="Abandons"
          value={`${data.abandonRate}%`}
          color="#d32f2f"
        />
      </Grid>
    </Grid>
  );
}

function StudentDashBoard(){
const [filters, setFilters] = useState({
  academicYear: null,
  sessionId: null,
  programId: null
});

const [filterOptions, setFilterOptions] = useState({
  sessions: [],
  programs: [],
  academicYears: []
});

const [aggregatedData, setAggregatedData] = useState({});
const [inscriptionData, setInscriptionData] = useState({});
const [courseData, setCourseData] = useState({});
  
useEffect(() => {
  getDashboardFilters()
    .then(res => setFilterOptions(res.data))
    .catch(console.error);
}, []);

  useEffect(() => {
  getAggregateData(filters)
    .then(res => setAggregatedData(res.data))
    .catch(console.error);

  getInscriptionsData(filters)
    .then(res => setInscriptionData(res.data))
    .catch(console.error);

  getCoursesData(filters)
    .then(res => setCourseData(res.data))
    .catch(console.error);
}, [filters]);


return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
        <DashboardFilters user = {"STUDENT"} filters={filters} setFilters={setFilters} {...filterOptions}/>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Tableau de bord
      </Typography>
        <StatsCards data ={aggregatedData} />

        {/* Zone administrative : Suivi inscriptions */}
        <Grid container spacing={3} mt={1}>
            <Grid size={{ xs: 12, md: 6 }}>
                <PLineChart title = {"Inscriptions par session"} data={inscriptionData.byTime} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <PBarChart title = {"Inscriptions par programme"} data={inscriptionData.bySessionProgram} />
            </Grid>
        </Grid>
        <Grid container spacing={3} mt={1}>
            <Grid size={{ xs: 12, md: 6 }}>
                <PBarChart title={"Répartition etudiants par cours"} data={courseData.studentsByCourse} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <PBarChart3 title={"Min, moyenne et max par cours"} data={courseData.gradesStatsByCourse} />
            </Grid>
        </Grid>
    </Container>
    );
}
export {StudentDashBoard};