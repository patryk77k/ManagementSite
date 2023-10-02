import { useReducer } from "react";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, error: null, success: false };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        error: false,
        success: true,
      };
    case "DELETED_DOCUMENT":
      return { isPending: false, document: null, error: null, success: true };
    case "UPDATED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);

  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const addedDocument = await addDoc(collection(db, collectionName), {
        ...doc,
      });
      dispatch({ type: "ADDED_DOCUMENT", payload: addedDocument });
    } catch (err) {
      console.log(err.message);
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  const deleteDocument = async (id) => {
    try {
      await deleteDoc(doc(db, "transactions", id));
      dispatch({ type: "DELETED_DOCUMENT" });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  const updateDocument = async (id, updates) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const projectRef = doc(db, "projects", id);
      const updatedDocument = await updateDoc(projectRef, updates);
      dispatch({ type: "UPDATED_DOCUMENT", payload: updatedDocument });
      return updatedDocument;
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };
  return { addDocument, deleteDocument, updateDocument, response };
};
