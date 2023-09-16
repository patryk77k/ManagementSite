import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export const useLogin = () => {
  const [err, setErr] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const login = async (email, password) => {
    setErr(null);
    setIsPending(true);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res.user);
      setIsPending(false);
    } catch (err) {
      setErr(err.message);
      setIsPending(false);
    }
  };

  return { login, err, isPending };
};
