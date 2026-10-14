// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyBABLYFrJvmiAVRY3Dusqdyq3sloSED2O0",
  authDomain: "parcial02-fca82.firebaseapp.com",
  projectId: "parcial02-fca82",
  storageBucket: "parcial02-fca82.firebasestorage.app",
  messagingSenderId: "703499347773",
  appId: "1:703499347773:web:de8c01c9aa609ff7084754",
  measurementId: "G-TRTK4HJ72Y"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);