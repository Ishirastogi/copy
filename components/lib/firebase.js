import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSX0w1Rp_KU2SyNq-k-2u1l3glSGVR-u8",
  authDomain: "oodwallah.firebaseapp.com",
  projectId: "oodwallah",
  appId: "1:69311026194:web:701bb4c37f0194acf1f4cb",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
