// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyCMlxlqdmd7zpLFKLEy-IVdwkxAN5sV7vE",
  authDomain: "tarealogin-55baa.firebaseapp.com",
  projectId: "tarealogin-55baa",
  storageBucket: "tarealogin-55baa.firebasestorage.app",
  messagingSenderId: "619159852622",
  appId: "1:619159852622:web:867e7b8acc84a549e7151f",
  measurementId: "G-SLKX1RQR86"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);