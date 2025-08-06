import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext, type AuthState } from "./auth-context";

// Define props type for AuthWrapper
interface AuthWrapperProps {
  children: ReactNode;
}

export const AuthWrapper = (props: AuthWrapperProps) => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: {
      email: "",
      name: "",
    },
  });

  return <AuthContext.Provider value={{ auth, setAuth }}>{props.children}</AuthContext.Provider>;
};
