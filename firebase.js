import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDYPJ4xZ8wx3KL7aVbji9A9KUWOYozKW-k",
  authDomain: "nextbook-78b81.firebaseapp.com",
  projectId: "nextbook-78b81",
  storageBucket: "nextbook-78b81.appspot.com",
  messagingSenderId: "1022007364860",
  appId: "1:1022007364860:web:884e9d153221494e575b79"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
