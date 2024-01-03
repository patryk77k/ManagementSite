import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config"; // Dodane

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "SIGNOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
    });

    const autoLogin = async () => {
      try {
        const res = await signInWithEmailAndPassword(
          auth,
          "guest@gmail.com",
          "123456"
        );

        // Ustawienie użytkownika jako "online" w bazie danych
        if (res.user) {
          const userRef = doc(db, "users", res.user.uid);
          await updateDoc(userRef, { online: true });
        }

        dispatch({ type: "LOGIN", payload: res.user });
      } catch (error) {
        console.error("Błąd logowania przy starcie strony:", error);
      }
    };

    autoLogin();

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
