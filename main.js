// ===== Firebase imports =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ===== Firebase config =====
const firebaseConfig = {
  apiKey: "AIzaSyDYPJ4xZ8wx3KL7aVbji9A9KUWOYozKW-k",
  authDomain: "nextbook-78b81.firebaseapp.com",
  projectId: "nextbook-78b81",
  storageBucket: "nextbook-78b81.firebasestorage.app",
  messagingSenderId: "1022007364860",
  appId: "1:1022007364860:web:884e9d153221494e575b79"
};

// ===== Init =====
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ===== Login =====
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful ✅");
  } catch (error) {
    alert(error.message);
  }
};

// ===== Auth state =====
onAuthStateChanged(auth, (user) => {
  if (user) {
    loadPosts();
  }
});

// ===== Add post =====
window.addPost = async function () {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const user = auth.currentUser;

  if (!user) {
    alert("Please login first");
    return;
  }

  if (!title || !content) {
    alert("Title & content required");
    return;
  }

  try {
    await addDoc(collection(db, "posts"), {
      title: title,
      content: content,
      userId: user.uid,
      createdAt: serverTimestamp()
    });

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    loadPosts();
  } catch (error) {
    alert(error.message);
  }
};

// ===== Load posts =====
async function loadPosts() {
  const postsDiv = document.getElementById("posts");
  postsDiv.innerHTML = "";

  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.innerHTML = `
      <h4>${data.title}</h4>
      <p>${data.content}</p>
      <hr>
    `;
    postsDiv.appendChild(div);
  });
}
window.login = login;
window.signup = signup;
window.logout = logout;
window.addPost = addPost;
