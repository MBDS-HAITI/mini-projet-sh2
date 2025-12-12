import {Routes, Route} from "react-router-dom";
import { Layout } from "../layouts/layout";
import { LogInApp } from "../Pages/Authentification/LogInApp";
import { Dashboard } from "../Pages/Dashbord/Dashboard";
import { Students } from "../Pages/Students/Students";
import { Courses } from "../Pages/Courses/Courses";
import { Grades } from "../Pages/Grades/Grades";

function AppRouters({ themeMode, setThemeMode }){
    return (
        
    <Routes>
    <Route path="/" element={<LogInApp/>}/>
          
      <Route element={<Layout themeMode={themeMode} setThemeMode={setThemeMode} />}>
          <Route path="/tableauDeBord" element={<Dashboard/>}/>
          <Route path= "/etudiants" element ={<Students/>}/>
          <Route path="/cours" element={<Courses/>}/>
          <Route path="/notes" element={<Grades/>}/>
       </Route>
      </Routes>
    );
}

export {AppRouters}