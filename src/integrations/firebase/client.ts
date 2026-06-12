import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCkkmQigv9v0JdI2d1MAEn66tOGHuGntA",
  authDomain: "dc-drip.firebaseapp.com",
  projectId: "dc-drip",
  storageBucket: "dc-drip.firebasestorage.app",
  messagingSenderId: "589554752408",
  appId: "1:589554752408:web:06c052c435ba902434e9ed",
  measurementId: "G-FWPQCSZ36R",
};

export const ADMIN_EMAIL = "helenhaile05@gmail.com";

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
