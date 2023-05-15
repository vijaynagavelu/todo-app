import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuY2kCdzOQJCN-mm6O-s9XPL3DX-XopOA",
  authDomain: "twitter-clone-3069a.firebaseapp.com",
  projectId: "twitter-clone-3069a",
  storageBucket: "twitter-clone-3069a.appspot.com",
  messagingSenderId: "123506004022",
  appId: "1:123506004022:web:44de2aeef1207d23784897"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
