import { useAuthContext } from "./useAuthContext";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = async () => {
    try {
      await signOut(auth); // Zakładam, że zmienna `auth` jest zdefiniowana gdzieś wcześniej w poprawnym kontekście
      dispatch({ type: "SIGNOUT" });
    } catch (err) {
      console.log(err.message);
    }
  };

  return { logout }; // Zwracamy funkcję `logout` jako właściwość obiektu
};
