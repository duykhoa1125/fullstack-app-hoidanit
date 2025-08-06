import { createContext } from "react";

// Define the auth state type
export interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
    name: string;
  };
}

// Define the context type
export interface AuthContextType {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
}

// Create context with default values
export const AuthContext = createContext<AuthContextType>({
  auth: {
    isAuthenticated: false,
    user: {
      email: "",
      name: "",
    },
  },
  setAuth: () => {},
});