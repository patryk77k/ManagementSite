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
      // signup
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error("Could not complete signup");
      }
      // add display name to user
      await updateProfile(auth.currentUser, { displayName });

      dispatch({ type: "SIGNUP", payload: res.user });
      setIsPending(false);
    } catch (err) {
      setErr(err.message);
      setIsPending(false);
    }
  };

  return { signup, err, isPending };
};
