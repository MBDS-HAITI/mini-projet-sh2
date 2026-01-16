import { Navigate, Outlet } from "react-router-dom";
import {getCurrentUser} from "../DataAccess/Services/authentificationService"

const AuthChecking = () => {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet/>;
};

function RoleChecking ({roles, children}){
  const user = getCurrentUser();
  
  if (!user || (roles && !roles.includes(user.role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export {AuthChecking, RoleChecking};