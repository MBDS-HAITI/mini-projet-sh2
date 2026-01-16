import { getCurrentUser} from "../../DataAccess/Services/authentificationService";
import { AdminDashBoard } from "./AdminDashboard";
import { ScolariteDashBoard } from "./ScolariteDashboard";
import {StudentDashBoard} from "./StudentDashboard";


function Dashboard(){

  const currentUser = getCurrentUser();
  const role = currentUser?.role;
    if (role === "ADMIN") {
    return <AdminDashBoard />;
  }

  if (role === "SCOLARITE") {
    return <ScolariteDashBoard />;
  }
  return null;
}

export {Dashboard}