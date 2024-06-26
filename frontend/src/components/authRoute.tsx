import { Navigate } from "react-router-dom";
import { ReactNode, useContext } from "react";
import { AuthContext } from "../util/context";

export default function AuthRoute({ element }: { element: ReactNode }) {
  const { isLoggedIn } = useContext(AuthContext);
  console.log(isLoggedIn);

  return isLoggedIn ? <Navigate to={"/dashboard"} replace /> : element;
}
