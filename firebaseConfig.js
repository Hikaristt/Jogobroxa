import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
window.location.href = "Index.html";
// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBg_v9Lu8-m0iVZ5TvLqZKXiuUflwVbJaY",
    authDomain: "covens-a3570.firebaseapp.com",
    projectId: "covens-a3570",
    storageBucket: "covens-a3570.firebasestorage.app",
    messagingSenderId: "819235244884",
    appId: "1:819235244884:web:d664e8cd24b543488f96c1",
    measurementId: "G-XR29TT0946"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Exporta as instâncias para serem usadas nos outros arquivos
export { auth, db };
