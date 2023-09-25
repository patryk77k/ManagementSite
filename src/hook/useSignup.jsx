import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [err, setErr] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setErr(null);
    setIsPending(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error("Could not complete signup");
      }

      await updateProfile(auth.currentUser, { displayName });

      dispatch({ type: "LOGIN", payload: res.user });
      setIsPending(false);
      setErr(null);
    } catch (err) {
      setErr(err.message);
      setIsPending(false);
    }
  };

  return { signup, err, isPending };
};
