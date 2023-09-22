import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState, useReducer } from "react";

export const useFirestore = (collection) => {
  const [data, setData] = useState("");
  console.log(data);

  
  useEffect(() => {
    const getData = async () => {
      const ref = collection(db, collection);
      const response = await getDocs(ref);

      let result = [];
      response.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      setData(result);
    };
    getData();
  }, []);
  return { getData };
};
