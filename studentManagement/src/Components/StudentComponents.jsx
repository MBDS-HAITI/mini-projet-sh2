
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate} from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useMediaQuery,
  Stack,
  TableContainer
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function StudentsTable({ rows, onRowSelect }) {
  const columns = [
    { field: "code", headerName: "Code", flex: 1 },
    { field: "lastName", headerName: "Nom", flex: 1 },
    { field: "firstName", headerName: "Prénom", flex: 1 },
    { field: "birthDay", headerName: "Age", flex: 1 },    
    { field: "integrationDate", headerName: "Date d'intégration", flex: 1 },
    { field: "email", headerName: "Couriel", flex: 1 },
    { field: "adress", headerName: "Adresse", flex: 1 }
  ];

  return (
    <Box
      sx={{
        height: 460,
        width: "100%",
        borderRadius: 4,
        overflow: "hidden",

        /* Header */
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#2774AE",
          color: "white",
          fontWeight: 700,
          fontSize: 15
        },

        /* Zebra rows */
        "& .MuiDataGrid-row:nth-of-type(odd)": {
          backgroundColor: "#F7FAFF"
        },

        /* Hover */
        "& .MuiDataGrid-row:hover": {
          backgroundColor: "rgba(39,116,174,0.12)",
          cursor: "pointer"
        },

        /* Remove borders */
        "& .MuiDataGrid-cell": {
          borderBottom: "none"
        }
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
            pagination: { paginationModel: { pageSize: 5 } }
        }}
        disableRowSelectionOnClick
        onRowClick={(params) => {
            onRowSelect(params.id);
        }}
    />
    </Box>
  );
}



function StudentList({students = []}){
    const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/etudiant/${id}`);
  };
 return (
    <StudentsTable
      rows={students}
      onRowSelect={handleRowClick}
    />
  );
}

function StudentCard({ data }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box p={{ xs: 1, md: 3 }}>
      <Typography variant="h4" gutterBottom>
        📘 Dossier académique
      </Typography>

      {data.map((session) => (
        <Accordion key={session._id} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack>
              <Typography variant="h6">{session.session.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Année : {session.session.academicYear} — {session.status}
              </Typography>
            </Stack>
          </AccordionSummary>

          <AccordionDetails>
            {/* 📊 GRAPHIQUE */}
            <Box mb={4}>
              <Typography variant="subtitle1" gutterBottom>
                Moyenne par cours
              </Typography>

              <ResponsiveContainer width="100%" height={isMobile ? 220 : 300}>
                <BarChart
                  data={session.courses.map(c => ({
                    name: isMobile
                      ? c.course.code
                      : c.course.name,
                    average: c.average
                  }))}
                  barSize={isMobile ? 20 : 35}
                >
                  <XAxis
                    dataKey="name"
                    angle={isMobile ? -30 : 0}
                    textAnchor={isMobile ? "end" : "middle"}
                    height={isMobile ? 60 : 30}
                  />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="average" />
                </BarChart>
              </ResponsiveContainer>
            </Box>

            {/* 📚 COURS */}
            <Grid container spacing={2}>
              {session.courses.map((course) => (
                <Grid item xs={12} md={6} key={course.course._id}>
                  <Card elevation={3}>
                    <CardContent>
                      <Stack
                        direction={isMobile ? "column" : "row"}
                        justifyContent="space-between"
                        alignItems={isMobile ? "flex-start" : "center"}
                        spacing={1}
                        mb={1}
                      >
                        <Typography variant="h6">
                          {course.course.name}
                        </Typography>

                        <Chip
                          label={`Moyenne : ${course.average}%`}
                          color={
                            course.average >= 80
                              ? "success"
                              : course.average >= 60
                              ? "warning"
                              : "error"
                          }
                          size={isMobile ? "small" : "medium"}
                        />
                      </Stack>

                      <Typography variant="body2" color="text.secondary" mb={2}>
                        {course.course.code} — {course.status}
                      </Typography>

                      {/* 📋 TABLE RESPONSIVE */}
                      <TableContainer sx={{ overflowX: "auto" }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Évaluation</TableCell>
                              <TableCell>Note</TableCell>
                              <TableCell>Coef</TableCell>
                              {!isMobile && <TableCell>Date</TableCell>}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {course.grades.map((g, idx) => (
                              <TableRow key={idx}>
                                <TableCell>{g.evaluationType.name}</TableCell>
                                <TableCell>{g.grade}</TableCell>
                                <TableCell>{g.coefficient}</TableCell>
                                {!isMobile && <TableCell>{g.date}</TableCell>}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}


export {StudentList, StudentCard}