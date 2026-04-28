import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import { Layout } from "./components/layout/Layout";
import AdminRoute from "./routes/AdminRoute";

// Lazy load pages (performance boost)
const AddItem = lazy(() => import("./pages/AddItem"));
const ListItems = lazy(() => import("./pages/ListItems"));
const Orders = lazy(() => import("./pages/Orders"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<AdminRoute />}>
          <Route element={<Layout />}>
            <Route path="/add" element={<AddItem />} />
            <Route path="/list" element={<ListItems />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Route>

        {/*  Catch-all (ALWAYS login) */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
