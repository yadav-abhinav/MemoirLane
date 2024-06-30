import { PropsWithChildren, useEffect, useState } from "react";
import { authContext } from "../../util/context";
import { CustomJWTPayload } from "../../util/types";

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(() => {
    const token = localStorage.getItem("token");
    if (token?.length) return true;
    return false;
  });
  const [user, setUser] = useState<CustomJWTPayload>({ userId: "", email: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token?.length) {
      try {
        const userInfo = JSON.parse(atob(token.split(".")[1]));
        if (!userInfo.userId.length) throw new Error();
        setUser(userInfo);
      } catch (err) {
        localStorage.removeItem("token");
        setLoggedIn(false);
      }
    }
  }, [isLoggedIn]);

  return (
    <authContext.Provider value={{ user, isLoggedIn, setLoggedIn }}>
      {children}
    </authContext.Provider>
  );
}
