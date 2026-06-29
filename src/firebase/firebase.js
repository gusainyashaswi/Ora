import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";


const app = initializeApp(firebaseConfig);

const firebaseConfig = {
  apiKey: "AIzaSyCahMtwdA_RjR0cMl4uaDVnoIjmy9U3dDg",
  authDomain: "oraapp-5bd8c.firebaseapp.com",
  projectId: "oraapp-5bd8c",
  storageBucket: "oraapp-5bd8c.firebasestorage.app",
  messagingSenderId: "52749657771",
  appId: "1:52749657771:web:c738caf1f3c7a4c2ee39ee"
};

export const auth = getAuth(app);