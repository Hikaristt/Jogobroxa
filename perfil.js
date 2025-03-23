import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
window.location.href = "Index.html";
// Função para salvar o nome e ir para a seleção de personagem
function salvarNome() {
    const nome = document.getElementById("username").value;

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userRef = doc(db, "usuarios", user.uid);
            await setDoc(userRef, { nome: nome }, { merge: true });

            window.location.href = "selecionar_personagem.html";
        } else {
            alert("Erro: Nenhum usuário logado!");
        }
    });
}

window.salvarNome = salvarNome;
