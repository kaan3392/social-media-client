import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "sosyal-e1e62.firebaseapp.com",
  projectId: "sosyal-e1e62",
  storageBucket: "sosyal-e1e62.appspot.com",
  messagingSenderId: "364049473961",
  appId: "1:364049473961:web:d5a9e867317ed8ff6624b8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
