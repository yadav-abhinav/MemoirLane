import { Navigate } from "react-router-dom";
import { ReactNode, useContext } from "react";
import { authContext } from "../../util/context";

export default function AuthRoute({ element }: { element: ReactNode }) {
  const { isLoggedIn } = useContext(authContext);
  return isLoggedIn ? <Navigate to={"/login"} replace /> : element;
}
