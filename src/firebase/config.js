// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from '"firebase/firestore';
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsiiY5h02qgm7k7g9dKq3U-8_2-CNfaBs",
  authDomain: "managementsite-c1e80.firebaseapp.com",
  projectId: "managementsite-c1e80",
  storageBucket: "managementsite-c1e80.appspot.com",
  messagingSenderId: "1062341531440",
  appId: "1:1062341531440:web:0566f6375c010a90fbdaf5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
