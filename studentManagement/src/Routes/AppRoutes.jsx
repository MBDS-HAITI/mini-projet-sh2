import {Routes, Route} from "react-router-dom";
import { Layout } from "../Layouts/Layout";
import { Dashboard } from "../Pages/Dashbord/Dashboard";
import { Students, StudentDetails } from "../Pages/Students/Students";
import { Courses } from "../Pages/Courses/Courses";
import { Agenda } from "../Pages/Agenda";
import { Grades } from "../Pages/Grades/Grades";
import { Home } from "../Pages/Home/Home";
import { Inscription } from "../Pages/Inscriptions/Inscription";
import { NewStudent } from "../Pages/Students/NewStudent";
import { Unauthorized } from "../Pages/Authentification/Unauthorized";
import { AuthChecking, RoleChecking } from "../Components/AuthCkeking";

function AppRouters({ themeMode, setThemeMode }){
  return (     
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/unauthorized" element={<Unauthorized/>}/>
        
        <Route element={<AuthChecking/>}>
          <Route element={<Layout themeMode={themeMode} setThemeMode={setThemeMode} />}>
          <Route path="/tableauDeBord" 
          element={
            <RoleChecking roles={["SCOLARITE", "ADMIN"]}>
            <Dashboard/>
          </RoleChecking>
         }/>
          <Route
          path="/etudiant/:id/:code"
          element={
            <RoleChecking roles={["SCOLARITE", "ADMIN", "STUDENT"]}>
              <StudentDetails />
            </RoleChecking>
          }/>

         <Route path= "/etudiants"
            element ={
                <RoleChecking roles={["SCOLARITE", "ADMIN"]}>
                  <Students/>
                </RoleChecking>
          }/>
          <Route path= "/inscription/:code"
            element ={
                <RoleChecking roles={["SCOLARITE", "ADMIN"]}>
                  <Inscription/>
                </RoleChecking>
          }/>
          <Route path= "/nouvel-etudiant"
            element ={
                <RoleChecking roles={["SCOLARITE", "ADMIN"]}>
                  <NewStudent/>
                </RoleChecking>
          }/>
          <Route path= "/agenda"
            element ={
                <RoleChecking roles={["SCOLARITE", "ADMIN", "STUDENT"]}>
                  <Agenda/>
                </RoleChecking>
          }/>

          <Route path="/cours" 
            element={
              <RoleChecking roles={["SCOLARITE", "STUDENT", "ADMIN"]}>
                  <Courses/>
                  </RoleChecking>
            }/>

          <Route path="/notes"
            element={
              <RoleChecking roles={["SCOLARITE", "STUDENT", "ADMIN"]}>
                <Grades/>
            </RoleChecking>
            }/>
          </Route>
        </Route>
    </Routes>
  );
}

export {AppRouters}