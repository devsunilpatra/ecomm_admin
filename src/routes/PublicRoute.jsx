import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const PublicRoute = () => {
  const { accessToken } = useAuthStore();

  if (accessToken) {
    return <Navigate to="/add" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
