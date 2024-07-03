import { Navigate } from "react-router-dom";
import { useAppSelector } from "../common/redux";
import { toast } from "react-toastify";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const UserRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    toast.warning("Bạn cần đăng nhập trước");
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default UserRoute;
