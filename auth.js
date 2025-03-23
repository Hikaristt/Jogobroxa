import { auth, db } from "./firebaseConfig.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
window.location.href = "Index.html";
// Cadastro
async function cadastrar() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;
    const username = document.getElementById("username").value;

    if (!username) {
        document.getElementById("mensagem").innerText = "Digite um nome de usuário!";
        return;
    }

    createUserWithEmailAndPassword(auth, email, senha)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const uid = user.uid;

            await setDoc(doc(db, "usuarios", uid), {
                email: email,
                username: username,
                nivel: 1,
                exp: 0,
                ryos: 1000,
                cupons: 0,
                personagem: null, // Ainda não escolheu
                pb: 0,
                guilda: null
            });

            document.getElementById("mensagem").innerText = "Cadastro realizado com sucesso!";
            toggleForm(); // Voltar para tela de login após cadastro
        })
        .catch((error) => {
            document.getElementById("mensagem").innerText = "Erro: " + error.message;
        });
}

// Login
async function logar() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, senha)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const uid = user.uid;

            const userRef = doc(db, "usuarios", uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists() && userSnap.data().personagem) {
                window.location.href = "jogo.html"; // Se já tem personagem, vai direto para o jogo
            } else {
                window.location.href = "perfil.html"; // Primeiro login → criar perfil
            }
        })
        .catch((error) => {
            document.getElementById("mensagem").innerText = "Erro: " + error.message;
        });
}

// Exportar funções para serem usadas no HTML
window.cadastrar = cadastrar;
window.logar = logar;
