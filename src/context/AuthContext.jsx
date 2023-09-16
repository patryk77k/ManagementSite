import { createContext } from "react";
import { useReducer } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const userAuth = () => {};

  const [state, dispatch] = useReducer(userAuth, { user: null });
  return (
    <AuthContext.Provider value={(state, dispatch)}>
      {children}
    </AuthContext.Provider>
  );
};
