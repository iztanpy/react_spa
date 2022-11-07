import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2JvXNAcHl7dgTD_EOPXa1o6LKoeoFv7c",
  authDomain: "otoot-9dde3.firebaseapp.com",
  projectId: "otoot-9dde3",
  storageBucket: "otoot-9dde3.appspot.com",
  messagingSenderId: "799964611816",
  appId: "1:799964611816:web:14e25b4ed1b7eb3ed6f55d",
  measurementId: "G-CESCXGMFMB",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
