import { Navigate } from "react-router-dom";
import { ReactNode, useContext } from "react";
import { authContext } from "../../util/context";

export default function PrivateRoute({ element }: { element: ReactNode }) {
  const { isLoggedIn } = useContext(authContext);

  return isLoggedIn ? element : <Navigate to={"/explore"} replace />;
}
