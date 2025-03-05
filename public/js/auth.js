document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const showRegister = document.getElementById("show-register");
    const showLogin = document.getElementById("show-login");
    const formContainers = document.querySelectorAll(".form-container");

    // Gestion du switch entre login et inscription
    showRegister.addEventListener("click", (e) => {
        e.preventDefault();
        formContainers[0].classList.add("hidden");
        formContainers[1].classList.remove("hidden");
    });

    showLogin.addEventListener("click", (e) => {
        e.preventDefault();
        formContainers[1].classList.add("hidden");
        formContainers[0].classList.remove("hidden");
    });

    // Gestion de la connexion
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        alert(`Connexion avec ${email}`);
    });

    // Gestion de l'inscription
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const pseudo = document.getElementById("register-name").value;
        const email = document.getElementById("register-email").value;
        const mot_de_passe = document.getElementById("register-password").value;

        const userData = { pseudo, email, mot_de_passe };

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const result = await response.text();
            alert(result);  // Affiche un message de confirmation ou d'erreur
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de l\'inscription');
        }
    });
});
