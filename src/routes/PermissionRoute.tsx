import { Navigate, Outlet } from "react-router-dom";

const PermissionRoute: React.FC<{ isAllowed: boolean }> = ({ isAllowed }) => {
  if (!isAllowed) {
    return <Navigate to="/nao-encontrada" replace />;
  }
  return <Outlet />;
};
export default PermissionRoute;
