
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "your_key",
  authDomain: "your_domain.firebaseapp.com",
  projectId: "your_projectID",
  storageBucket: "your_project.appspot.com",
  messagingSenderId: "your_ID",
  appId: "your_appID",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
