import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const { dispatch } = useAuthContext();

  const register = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    dispatch({ type: "SIGNUP", payload: res.user });
  };

  return { register };
};
