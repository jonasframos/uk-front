import { Navigate } from "react-router-dom";
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
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  } else {
    fillAdminDataFromToken(token);
  }

  return (
    // <div className="flex h-screen bg-gray_05">
    //   <div className="flex-shrink-0">
    //     <Navbar />
    //   </div>
    //   <div className="flex-1 flex flex-col overflow-hidden">
    //     <Header />
    //     <div className="flex-1 overflow-y-auto p-8">
    //       <Outlet />
    //     </div>
    //   </div>
    // </div>
    <></>
  );
};
export default ProtectedRoute;
