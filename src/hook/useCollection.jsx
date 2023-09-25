import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export const useCollection = (collectionName) => {
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    const getData = async () => {
      onSnapshot(collection(db, collectionName), (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({ id: doc.id, ...doc.data() });
        });
        setData(result);
      });
    };
    getData(collectionName);
  }, []);
  return { data };
};
