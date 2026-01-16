import {Grid, Typography, Box, Container } from "@mui/material";
import { StatCard } from "./Component/StatCard";
import { PPieChart } from "./Component/PieChart";
import { PBarChart } from "./Component/PBarChart";
import { PAreaChart } from "./Component/PAreaChart";
import { PLineChart } from "./Component/PLineChart";
import { DashboardFilters } from "./DashboardFilters";
import "./dashboard.css";
import {getAggregateData, getInscriptionsData, getCoursesData, getUsageData, getDashboardFilters} from "../../DataAccess/Services/dashboardService";
const COLORS = ["#1976d2", "#2e7d32", "#ed6c02", "#d32f2f"];
import { useState, useEffect, useMemo } from "react";
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

function AdminDashBoard(){
 
const [filters, setFilters] = useState({
  academicYear: null,
  sessionId: null,
  programId: null,
  role: null
});

const [filterOptions, setFilterOptions] = useState({
  sessions: [],
  programs: [],
  academicYears: [],
  roles: []
});

const [aggregatedData, setAggregatedData] = useState({});
const [inscriptionData, setInscriptionData] = useState({});
const [courseData, setCourseData] = useState({});
const [usageData, setUsageData] = useState({});
  
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

  getUsageData(filters)
    .then(res => setUsageData(res.data))
    .catch(console.error);
}, [filters]);



const usersByRoleData = aggregatedData.usersByRole? Object.entries(aggregatedData.usersByRole).map(
  ([role, count]) => ({
    name: role,
    value: count
  })
) : [];

return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
        <DashboardFilters user = {"ADMIN"} filters={filters} setFilters={setFilters} {...filterOptions}/>
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
        {/* Suivi cours */}
        <Grid container spacing={3} mt={1}>
            {/* Suivi interets individuels pour cours */}
            <Grid size={{ xs: 12, md: 4 }}>
                <PBarChart title={"Répartition etudiants par cours"} data={courseData.studentsByCourse} />
            </Grid>
            {/* Suivi resultats cours */}
            <Grid size={{ xs: 12, md: 4 }}>
                <PBarChart3 title={"Min, moyenne et max par cours"} data={courseData.gradesStatsByCourse} />
            </Grid>

            {/* Suivi interets cours par programme */}
            <Grid size={{ xs: 12, md: 4 }}>
                <PPieChart title={"Inscription par cours par programme"} data={usersByRoleData} />
            </Grid>
        </Grid>
        {/* Suivi utilisation application */}
        <Grid container spacing={3} mt={1}>
            <Grid size={{ xs: 12, md: 4 }}>
                <PPieChart title={"Répartition des rôles"} data={usageData.usersByRole} />
            </Grid>
            {/* Repartition connection par role */}
            <Grid size={{ xs: 12, md: 4 }}>
                <PAreaChart title={"Connexion"} data={usageData.connectionsByRole} />
            </Grid>
            {/* Suivi visites sur l'application */}
            <Grid size={{ xs: 12, md: 4 }}>
                <PLineChart title={"Rapport utilsation"} data={usageData.appUsage} />
            </Grid>
            
        </Grid>
    </Container>
    
  );
}


export {AdminDashBoard};