// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: "property-management-2fd26.firebaseapp.com",
//   projectId: "property-management-2fd26",
//   storageBucket: "property-management-2fd26.appspot.com",
//   messagingSenderId: "964557915564",
//   appId: "1:964557915564:web:951550aff0aaf3f3f66609",
// };

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "food-delivery-app-79d73.firebaseapp.com",
  projectId: "food-delivery-app-79d73",
  storageBucket: "food-delivery-app-79d73.firebasestorage.app",
  messagingSenderId: "830008334816",
  appId: "1:830008334816:web:f14bb6cef7ed4800853385",
  measurementId: "G-Y5X5YPJBYK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
