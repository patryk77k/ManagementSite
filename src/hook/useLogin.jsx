import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
  const login = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
        //   console.log(user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return { login };
};
