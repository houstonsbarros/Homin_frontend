import { Outlet } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";

// type ProtectedRouteProps = {
//   requiredRole?: "user" | "admin";
// };

const ProtectedRoute = () => {
  // const { user } = useAuth();

  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  // if (requiredRole === "admin" && user.role !== "admin") {
  //   return <Navigate to="/" replace />;
  // }

  return <Outlet />;
};

export default ProtectedRoute;
