import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [err, setErr] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setErr(false);
    setIsPending(true);

    try {
      //update online status
      const { uid } = user;
      const userRef = doc(db, "users", uid);
      console.log(userRef);
      await updateDoc(userRef, {
        online: false,
      });

      await signOut(auth);
      dispatch({ type: "SIGNOUT" });
      setIsPending(false);

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
