import { useState } from "react";
import { auth, storage, db } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [err, setErr] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setErr(null);
    setIsPending(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error("Could not complete signup");
      }
      // upload user thumbnail

      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const storageRef = ref(storage, uploadPath);

      // Przesyła miniaturę zdjęcia do Firebase Storage
      await uploadBytes(storageRef, thumbnail);

      // Pobiera adres URL przesłanego pliku
      const imgUrl = await getDownloadURL(storageRef);
      console.log(imgUrl);

      // add display name to user
      await updateProfile(auth.currentUser, { displayName, photoURL: imgUrl });

      // create a user document
      const docRef = doc(db, "users", res.user.uid);
      await setDoc(docRef, {
        online: true,
        displayName,
        photoURL: imgUrl,
      });

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
