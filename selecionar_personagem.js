import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
window.location.href = "Index.html";
let personagemSelecionado = null;
let imagemSelecionada = null;

// Mapeamento de personagens para suas imagens
const imagensPersonagens = {
    "Sede das Profundezas": "Sede-das-profundezas.webp",
    "Trovão Carmesim": "Relampago-Carmesim.webp",
    "Espectro Rubro": "Espectro-Rubro.webp"
};

// Função para selecionar um personagem
function selecionar(personagem) {
    personagemSelecionado = personagem;
    imagemSelecionada = imagensPersonagens[personagem]; // Pega a URL correspondente
    document.getElementById("mensagem").innerText = `Você escolheu: ${personagem}`;
}

// Função para confirmar seleção e salvar no banco
function confirmarSelecao() {
    if (!personagemSelecionado) {
        document.getElementById("mensagem").innerText = "Escolha um personagem antes de confirmar!";
        return;
    }

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userRef = doc(db, "usuarios", user.uid);

            await updateDoc(userRef, {
                personagem: personagemSelecionado,
                imagemPersonagem: imagemSelecionada // Salva a imagem no banco!
            });

            window.location.href = "jogo.html"; // Redireciona direto para o jogo
        } else {
            document.getElementById("mensagem").innerText = "Erro: Usuário não autenticado.";
        }
    });
}

// Tornar as funções globais
window.selecionar = selecionar;
window.confirmarSelecao = confirmarSelecao;
