import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  //realtime data for document
  useEffect(() => {
    const ref = doc(db, collection, id);
    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        setDocument({ ...snapshot.data(), id: snapshot.id });
        setError(null);
      },
      (err) => {
        console.error(err.message);
        setError("Failed to get document"); // Pass it as a function
      }
    );
    return () => unsub();
  }, [collection, id]);

  return { document, error };
};
