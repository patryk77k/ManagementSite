import { createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ color: "red" }}>
      {children}
    </AuthContext.Provider>
  );
};
