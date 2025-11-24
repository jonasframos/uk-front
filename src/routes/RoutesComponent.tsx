import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login/Login";
import Map from "../pages/Map/Map";
import Insitucional from "../pages/Institutional/intitutional-page";

export const RoutesComponent: React.FC = () => {

  return (
    <Routes>
      <Route path={ROUTES.LOGIN.PATH} element={<Login />} />
      <Route path={ROUTES.INSTITUTIONAL.PATH} element={<Insitucional />} />
      <Route path="/status" element={<div>OK</div>} />
      <Route element={<ProtectedRoute />}>
        <>
        <Route path={ROUTES.MAP.PATH} element={<Map />} />
          {/* <Route path={ROUTES.DASHBOARD.PATH} element={<Dashboard />} />
          <Route path="/nao-encontrada" element={<NotFound />} /> */}
        </>
      </Route>
    </Routes>
  );
};