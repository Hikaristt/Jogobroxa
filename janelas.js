import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

window.location.href = "Index.html";

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const menuOptions = document.getElementById("menu-options");
    
    const rankingsModal = document.getElementById("rankings-modal");
    const personagemModal = document.getElementById("personagem-modal");
    const servosModal = document.getElementById("servos-modal");

    const closeRankingsModal = document.getElementById("close-rankings-modal");
    const closePersonagemModal = document.getElementById("close-personagem-modal");
    const closeServosModal = document.getElementById("close-servos-modal");

    // Toggle de menu
    menuToggle.addEventListener("click", () => {
        menuOptions.style.display = menuOptions.style.display === "flex" ? "none" : "flex";
    });

    // Abrir e fechar as modais
    function openModal(modal) {
        closeAllModals();
        modal.style.display = "flex";
    }

    function closeAllModals() {
        rankingsModal.style.display = "none";
        personagemModal.style.display = "none";
        servosModal.style.display = "none";
    }

    document.getElementById("rankings-option").addEventListener("click", () => openModal(rankingsModal));
    document.getElementById("personagem-option").addEventListener("click", () => openModal(personagemModal));
    document.getElementById("servos-option").addEventListener("click", () => openModal(servosModal));

    closeRankingsModal.addEventListener("click", () => rankingsModal.style.display = "none");
    closePersonagemModal.addEventListener("click", () => personagemModal.style.display = "none");
    closeServosModal.addEventListener("click", () => servosModal.style.display = "none");
});
