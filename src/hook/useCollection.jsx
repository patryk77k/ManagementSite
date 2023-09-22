import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export const useCollection = (collectionName) => {
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    const getData = async () => {
      const ref = collection(db, collectionName);
      const response = await getDocs(ref);

      let result = [];
      response.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      setData(result);
    };
    getData(collectionName);
  }, []);
  return { data };
};
