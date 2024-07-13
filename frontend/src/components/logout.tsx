import { useContext, useEffect } from "react";
import { authContext } from "../util/context";

export default function Logout() {
  const { setLoggedIn } = useContext(authContext);
  useEffect(() => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setLoggedIn(false);
  }, []);
  return null;
}
