import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export const useCollection = (collectionName) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const getData = async () => {
      onSnapshot(collection(db, collectionName), (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({ id: doc.id, ...doc.data() });
        });
        setDocuments(result);
      });
    };
    getData(collectionName);
  }, []);
  return { documents };
};
