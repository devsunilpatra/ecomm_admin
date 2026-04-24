import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const AdminRoute = () => {
  const { user, accessToken, isHydrated } = useAuthStore();
  console.log(accessToken, "accessToken", user, "user" )
  const location = useLocation();

  // Wait for hydration
  if (!isHydrated) {
    return <div className="p-4">Loading...</div>;
  }

  // Not logged in
  if (!accessToken) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Not admin
  if (user !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;