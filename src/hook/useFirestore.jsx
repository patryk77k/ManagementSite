import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const useFirestore = (collectionName) => {
  const [data, setData] = useState("");

  const addDocument = async ({ name, amount }) => {
    try {
      const response = await addDoc(collection(db, collectionName), {
        name,
        amount,
      });
      console.log(response);
      setData(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  return { addDocument, data };
};
