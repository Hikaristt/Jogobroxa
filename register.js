function toggleForm() {
    let title = document.getElementById("form-title");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let username = document.getElementById("username");
    let confirmPassword = document.getElementById("confirm-password");
    let loginBtn = document.getElementById("login-btn");
    let registerBtn = document.getElementById("register-btn");
    let backBtn = document.getElementById("back-btn");
    let confirmRegisterBtn = document.getElementById("confirm-register-btn");

    if (username.style.display === "none") {
        // Mudar para Registro
        title.innerText = "Registro";
        username.style.display = "block";
        confirmPassword.style.display = "block";
        loginBtn.style.display = "none";
        registerBtn.style.display = "none";
        backBtn.style.display = "block";
        confirmRegisterBtn.style.display = "block";
    } else {
        // Voltar para Login
        title.innerText = "Login";
        username.style.display = "none";
        confirmPassword.style.display = "none";
        loginBtn.style.display = "block";
        registerBtn.style.display = "block";
        backBtn.style.display = "none";
        confirmRegisterBtn.style.display = "none";
    }
}
function atualizarRelogio() {
    let agora = new Date();
    let data = agora.toLocaleDateString('pt-BR');
    let hora = agora.toLocaleTimeString('pt-BR');

    document.getElementById("datetime").innerText = `${data} | ${hora}`;
}

// Atualiza o relógio a cada segundo
setInterval(atualizarRelogio, 1000);

// Inicializa o relógio ao carregar a página
atualizarRelogio();

// Exportar funções para serem usadas no HTML
window.toggleForm = toggleForm;

window.location.href = "Index.html";
