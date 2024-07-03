import { Navigate } from "react-router-dom";
import { useAppSelector } from "../common/redux";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: string;
}

const PrivateRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const userRole = useAppSelector((state) => state.auth.user?.role);

  if (!userRole || userRole !== requiredRole) {
    return <Navigate to="/access-denied" />;
  }

  return <>{children}</>;
};
export default PrivateRoute;
