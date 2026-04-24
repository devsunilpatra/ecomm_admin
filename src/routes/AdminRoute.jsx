import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const AdminRoute = () => {
  const { accessToken, user } = useAuthStore();
  const location = useLocation();

  // Zustand rehydration check (important)
  const isHydrated = useAuthStore.persist?.hasHydrated?.();

  if (!isHydrated) {
    return <div className="p-4">Loading...</div>;
  }

  // Not logged in
  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Not admin
  if (user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  // Allowed
  return <Outlet />;
};

export default AdminRoute;
