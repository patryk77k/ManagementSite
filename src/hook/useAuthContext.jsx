import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const context = useContext(AuthContext);

if (context === undefined) {
  throw Error("useAuthContext() must be inside AuthContextProvider");
}
return context;
