import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
window.location.href = "Index.html";
document.addEventListener("DOMContentLoaded", () => {
    const player = document.getElementById("player");
    const map = document.querySelector(".movable-area");

    let posX = 50, posY = 50;
    let targetX = posX, targetY = posY;
    const speed = 2;

    player.style.left = `${posX}px`;
    player.style.top = `${posY}px`;

    function movePlayer() {
        let dx = targetX - posX;
        let dy = targetY - posY;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > speed) {
            posX += (dx / distance) * speed;
            posY += (dy / distance) * speed;
            player.style.left = `${posX}px`;
            player.style.top = `${posY}px`;
            requestAnimationFrame(movePlayer);
        }
    }

    map.addEventListener("click", (e) => {
        let rect = map.getBoundingClientRect();
        targetX = e.clientX - rect.left - player.clientWidth / 2;
        targetY = e.clientY - rect.top - player.clientHeight / 2;
        movePlayer();
    });

    // Carregar dados do usuário
    function carregarDadosUsuario(userId) {
        const userRef = doc(db, "usuarios", userId);

        getDoc(userRef).then((docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                console.log("Dados carregados:", data); // Debug

                const avatarImg = document.getElementById("player-avatar");
                const playerImg = document.getElementById("player");

                if (data.foto) {
                    avatarImg.src = data.foto;
                } else {
                    console.warn("Avatar não encontrado, usando padrão.");
                    avatarImg.src = "placeholder.jpg";
                }

                if (data.pixel) {
                    playerImg.src = data.pixel;
                } else {
                    console.warn("Pixel não encontrado, usando padrão.");
                    playerImg.src = "placeholder_pixel.png";
                }

                document.getElementById("player-name").innerText = data.nome || "Desconhecido";
                document.getElementById("player-level").innerText = `Nível: ${data.nivel || 0}`;
                document.getElementById("player-exp").innerText = `EXP: ${data.exp || 0}`;
                document.getElementById("player-ryos").innerText = data.ryos || 0;
                document.getElementById("player-cupons").innerText = data.cupons || 0;
                document.getElementById("player-pb").innerText = data.pb || 0;
            } else {
                console.error("Nenhum dado encontrado para este usuário.");
            }
        }).catch(error => console.error("Erro ao buscar dados:", error));
    }

    // Autenticação de usuário
    onAuthStateChanged(auth, (user) => {
        if (user) {
            carregarDadosUsuario(user.uid);
        } else {
            console.error("Nenhum usuário autenticado.");
        }
    });

    // Menu Toggle Superior
    const menuToggle = document.getElementById("menu-toggle");
    const menuOptions = document.getElementById("menu-options");

    menuToggle.addEventListener("click", () => {
        menuOptions.style.display = menuOptions.style.display === "flex" ? "none" : "flex";
    });

    // Modais do menu superior
    const rankingsModal = document.getElementById("rankings-modal");
    const personagemModal = document.getElementById("personagem-modal");
    const servosModal = document.getElementById("servos-modal");

    const closeRankingsModal = document.getElementById("close-rankings-modal");
    const closePersonagemModal = document.getElementById("close-personagem-modal");
    const closeServosModal = document.getElementById("close-servos-modal");

    // Funções para abrir/fechar as modais do menu superior
    function openModal(modal) {
        closeAllModals();
        modal.style.display = "flex";
    }

    function closeAllModals() {
        rankingsModal.style.display = "none";
        personagemModal.style.display = "none";
        servosModal.style.display = "none";
    }

    // Abertura das modais do menu superior
    document.getElementById("rankings-option").addEventListener("click", () => openModal(rankingsModal));
    document.getElementById("personagem-option").addEventListener("click", () => openModal(personagemModal));
    document.getElementById("servos-option").addEventListener("click", () => openModal(servosModal));

    // Fechar as modais do menu superior
    closeRankingsModal.addEventListener("click", () => rankingsModal.style.display = "none");
    closePersonagemModal.addEventListener("click", () => personagemModal.style.display = "none");
    closeServosModal.addEventListener("click", () => servosModal.style.display = "none");

    // Menu Toggle Inferior
    const bottomMenuToggle = document.getElementById("bottom-menu-toggle");
    const bottomMenu = document.getElementById("bottom-menu");

    // Modais do menu inferior
    const formacaoModal = document.getElementById("formacao-modal");
    const guildasModal = document.getElementById("guildas-modal");
    const equipamentosModal = document.getElementById("equipamentos-modal");
    const relacionamentosModal = document.getElementById("relacionamentos-modal");

    // Funções para abrir/fechar as modais do menu inferior
    function openBottomModal(modal) {
        closeAllBottomModals();
        modal.style.display = "flex";
    }

    function closeAllBottomModals() {
        formacaoModal.style.display = "none";
        guildasModal.style.display = "none";
        equipamentosModal.style.display = "none";
        relacionamentosModal.style.display = "none";
    }

    // Toggle do menu inferior
    bottomMenuToggle.addEventListener("click", () => {
        bottomMenu.style.display = bottomMenu.style.display === "block" ? "none" : "block";
    });

    // Abertura das modais do menu inferior
    document.getElementById("formacao-option").addEventListener("click", () => openBottomModal(formacaoModal));
    document.getElementById("guildas-option").addEventListener("click", () => openBottomModal(guildasModal));
    document.getElementById("equipamentos-option").addEventListener("click", () => openBottomModal(equipamentosModal));
    document.getElementById("relacionamentos-option").addEventListener("click", () => openBottomModal(relacionamentosModal));

    // Fechar as modais do menu inferior
    document.getElementById("close-formacao-modal").addEventListener("click", () => formacaoModal.style.display = "none");
    document.getElementById("close-guildas-modal").addEventListener("click", () => guildasModal.style.display = "none");
    document.getElementById("close-equipamentos-modal").addEventListener("click", () => equipamentosModal.style.display = "none");
    document.getElementById("close-relacionamentos-modal").addEventListener("click", () => relacionamentosModal.style.display = "none");

    // Fechar modal ao clicar no "x"
    const closeBtns = document.querySelectorAll('.close-btn');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const modal = btn.closest('.modal');
            modal.style.display = 'none';
        });
    });

    function carregarRanking() {
        const rankingsList = document.getElementById("rankings-list");

        // Referência à coleção de usuários no Firebase
        const usuariosRef = collection(db, "usuarios");

        // Buscar todos os documentos de usuários
        getDocs(usuariosRef).then((querySnapshot) => {
            // Criar um array de usuários
            let usuarios = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                usuarios.push({
                    id: doc.id,
                    nome: data.nome,
                    nivel: data.nivel || 0,
                    pb: data.pb || 0,
                    avatar: data.foto || "placeholder.jpg"
                });
            });

            // Ordenar os usuários por PB (do maior para o menor)
            usuarios.sort((a, b) => b.pb - a.pb);

            // Limpar a lista antes de adicionar os novos rankings
            rankingsList.innerHTML = "";

            // Exibir os rankings
           // Alteração no código que exibe os rankings
    usuarios.forEach((usuario, index) => {
    const rankItem = document.createElement("div");
    rankItem.classList.add("rank-item");

    // Criar o HTML para cada item do ranking
    rankItem.innerHTML = `
        <img src="${usuario.avatar}" alt="${usuario.nome} Avatar">
        <div class="rank-name">${usuario.nome}</div>
        <div class="rank-level">Nível: ${usuario.nivel}</div>
        <div class="rank-character">Personagem: ${usuario.personagem}</div>  <!-- Adicionando puxar personagem -->
        <div class="rank-pb">PB: ${usuario.pb}</div>
    `;

    rankingsList.appendChild(rankItem);
});

        }).catch((error) => {
            console.error("Erro ao carregar o ranking:", error);
        });
    }

    // Carregar o ranking ao abrir a modal de rankings
    const rankingsOption = document.getElementById("rankings-option");
    const closeRankingsModalBtn = document.getElementById("close-rankings-modal");

    rankingsOption.addEventListener("click", () => {
        carregarRanking(); // Carregar o ranking ao abrir a modal
        rankingsModal.style.display = "block";
    });

    closeRankingsModalBtn.addEventListener("click", () => {
        rankingsModal.style.display = "none";
    });
});
