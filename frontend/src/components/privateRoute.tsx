import { Navigate } from "react-router-dom";
import { ReactNode, useContext } from "react";
import { AuthContext } from "../util/context";

export default function PrivateRoute({ element }: { element: ReactNode }) {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? element : <Navigate to={"/"} replace />;
}
