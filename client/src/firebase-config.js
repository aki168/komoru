// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxJVt1QnaZdJSlfVWOmkeBzsLjvfvN_dQ",
  authDomain: "my-project-8763-356102.firebaseapp.com",
  projectId: "my-project-8763-356102",
  storageBucket: "my-project-8763-356102.appspot.com",
  messagingSenderId: "300310047900",
  appId: "1:300310047900:web:d603a58b5bd743ba645159",
  measurementId: "G-YYB11LCYHR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)