// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsAXqVQcIJviXxc6WXvOK-vhEeVZtdfec",
  authDomain: "data-storage-and-management.firebaseapp.com",
  projectId: "data-storage-and-management",
  storageBucket: "data-storage-and-management.appspot.com",
  messagingSenderId: "791932457449",
  appId: "1:791932457449:web:63d2ebc023baf6f654fb78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
