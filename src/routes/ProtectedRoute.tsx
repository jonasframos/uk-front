import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./routes";
import { getAuthToken } from "../utils/functions/auth";
import { useStore } from "../store/useStore";

const ProtectedRoute: React.FC<{ redirectPath?: string }> = ({
  redirectPath = ROUTES.LOGIN.PATH,
}) => {
  const fillAdminDataFromToken = useStore(
    (state) => state.auth.fillAdminDataFromToken
  );

  const token = getAuthToken();
  if (!token) return <Navigate to={redirectPath} replace />;
  else fillAdminDataFromToken(token);

  return (
    <div className="flex h-screen bg-gray_05 justify-center">
      <Outlet />
    </div>
  );
};
export default ProtectedRoute;
