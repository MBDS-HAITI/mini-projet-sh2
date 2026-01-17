let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let student = require('./routes/students');
let course = require('./routes/courses');
let grade = require('./routes/grades');
let agenda = require('./routes/agenda');
let user = require('../student_management/routes/Utilisateurs')
require('dotenv').config();
let dashboard = require('../student_management/Controller/dashboardController');
const router = require("express").Router();
const { authJwt, authorizeRoles } = require("../student_management/Authentification/Auth")
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const uri = process.env.MONGO_URI;
const frontAccessBase = process.env.FRONTEND_ACCESS_BASE;

mongoose.connect(uri);
const options = {};

const db = mongoose.connection;

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", frontAccessBase);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  // IMPORTANT pour le preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;
// les routes
const prefix = '/api';

app.route(prefix + '/students')
    .get(authJwt, authorizeRoles("SCOLARITE","ADMIN"), student.getAll)
    .post(authJwt, authorizeRoles("ADMIN", "SCOLARITE"), student.create);

app.route(prefix + '/student/:studentId')
    .get(authJwt, authorizeRoles("SCOLARITE","ADMIN", "STUDENT"), student.getStudent);

app.route(prefix + '/courses')
    .get(authJwt, authorizeRoles("ADMIN", "SCOLARITE", "STUDENT") ,course.getAll)
    .post(authJwt, authorizeRoles("ADMIN", "SCOLARITE") ,course.create);

app.route(prefix + '/grades')
    .get(authJwt, authorizeRoles("ADMIN", "SCOLARITE", "STUDENT") ,grade.getAll)
    .post(authJwt, authorizeRoles("ADMIN", "SCOLARITE") ,grade.create);

app.route(prefix + '/login')
    .post(user.login);

app.route(prefix + '/users')
.get(authJwt, authorizeRoles("ADMIN"), user.getAll)
.post(authJwt, authorizeRoles("ADMIN"),user.create);

app.route(prefix + '/dashboard/cards')
.get(authJwt, authorizeRoles("ADMIN", "SCOLARITE"), dashboard.getAggData);

app.route(prefix + '/dashboard/inscriptions')
.get(authJwt, authorizeRoles("ADMIN", "SCOLARITE"), dashboard.getInscriptionsData);

app.route(prefix + '/dashboard/courses')
.get(authJwt, authorizeRoles("ADMIN", "SCOLARITE"), dashboard.getCoursesData);

app.route(prefix + '/dashboard/appusing')
.get(authJwt, authorizeRoles("ADMIN"), dashboard.getUsingData);

app.route(prefix + '/agenda')
.get(authJwt, authorizeRoles("ADMIN", "SCOLARITE", "STUDENT"), agenda.getAgenda)
.post(authJwt, authorizeRoles("ADMIN", "SCOLARITE", "STUDENT"), agenda.createAgendaEvent);

app.route(prefix + '/dashboard/filters')
.get(authJwt, authorizeRoles("ADMIN", "SCOLARITE"), dashboard.getDashboardFilters);

app.get('/health', (req, res) => res.status(200).send('OK'));

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;


