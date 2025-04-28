import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import { lazy, Suspense, useContext } from "react";
import { HandleContext } from "./hooks/HandleState";
import { Toaster } from "react-hot-toast";
import Loader from "./components/shared/Loader";
const AdminDashBoard = lazy(() => import("./pages/AdminDashBoard"));
const AdminOrders = lazy(() => import("./pages/AdminOrders"));
const AdminUsers = lazy(() => import("./pages/AdminUsers"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminSeller = lazy(() => import("./pages/AdminSeller"));

function App() {
  const { adminExist } = useContext(HandleContext);
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route element={<ProtectRoute user={adminExist} />}>
            <Route path="/" element={<AdminDashBoard />} />
            <Route path="/orders" element={<AdminOrders />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/seller" element={<AdminSeller />} />
          </Route>

          <Route
            path="/login"
            element={
              <ProtectRoute user={!adminExist} redirect="/">
                <Admin />
              </ProtectRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
