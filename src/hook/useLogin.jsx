import { auth, db } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { doc, updateDoc } from "firebase/firestore";

export const useLogin = () => {
  const [err, setErr] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const { user } = useAuthContext();

  const login = async (email, password) => {
    setErr(null);
    setIsPending(true);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      //update online status

      const userRef = doc(db, "users", res.user.uid);
      console.log(userRef);
      await updateDoc(userRef, {
        online: true,
      });

      dispatch({ type: "LOGIN", payload: res.user });

      setIsPending(false);
    } catch (err) {
      setErr(err.message);
      setIsPending(false);
    }
  };

  return { login, err, isPending };
};
