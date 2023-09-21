import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [err, setErr] = useState(null);
  const [isPending, setIsPending] = useState(false);
  
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setErr(false);
    setIsPending(true);
    try {
      await signOut(auth);
      dispatch({ type: "SIGNOUT" });

      if (!isCancelled) {
        setIsPending(false);
        setErr(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setErr(err.message);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, err, isPending };
};
