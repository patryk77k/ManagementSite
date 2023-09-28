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
      //update online status

      const res = await signInWithEmailAndPassword(auth, email, password);

      dispatch({ type: "LOGIN", payload: res.user });
      const { uid } = user;
      const userRef = doc(db, "users", uid);
      console.log(userRef);
      await updateDoc(userRef, {
        online: true,
      });
      setIsPending(false);
    } catch (err) {
      setErr(err.message);
      setIsPending(false);
    }
  };

  return { login, err, isPending };
};
