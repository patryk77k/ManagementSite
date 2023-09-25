import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const useCollection = (collectionName, queryConditions) => {
  const [documents, setDocuments] = useState([]);

  const queryRef = useRef(queryConditions).current;

  useEffect(() => {
    const getData = async () => {
      let ref = collection(db, collectionName);

      if (queryRef) {
        ref = query(ref, where(...queryRef));
      }

      onSnapshot(ref, (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({ id: doc.id, ...doc.data() });
        });
        setDocuments(result);
      });
    };
    getData(collectionName);
  }, [collectionName, queryRef]);
  return { documents };
};
