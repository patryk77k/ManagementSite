import { useState } from "react";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const useFirestore = (collectionName) => {
  const [data, setData] = useState("");

  const addDocument = async (doc) => {
    try {
      const response = await addDoc(collection(db, collectionName), { ...doc });
      console.log(response);
      setData(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteDocument = async (id) => {
    await deleteDoc(doc(db, "books", id));
  };

  return { addDocument, deleteDocument, data };
};
