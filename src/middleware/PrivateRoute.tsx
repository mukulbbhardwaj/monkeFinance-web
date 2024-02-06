import { Outlet, Navigate } from "react-router-dom";
import useStore from "@/store/userStore";


const PrivateRoute = () => {
    const user = useStore();
  return user.user ? <Outlet /> : <Navigate to={"/login"} />;
};
export default PrivateRoute;
