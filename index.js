const modal = document.getElementById("customModal");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeModal");
const modalText = document.querySelector(".modal-text");
const modalTitle = document.querySelector(".modal-header-custom h3");

function showError(msg) {
    alert(msg);
}

function openModal(title, message) {
    if (!modal || !overlay) return;
    modal.classList.add("show");
    overlay.classList.add("show");
    modalTitle.textContent = title;
    modalText.textContent = message;
}

function closeModal() {
    if (!modal || !overlay) return;
    modal.classList.remove("show");
    overlay.classList.remove("show");
}

closeBtn?.addEventListener("click", closeModal);
overlay?.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

document.getElementById("btnInfo")?.addEventListener("click", () =>
    openModal("Mantente en Contacto", "Suscríbete para recibir actualizaciones, noticias y contenido exclusivo.")
);

document.getElementById("btn1")?.addEventListener("click", () =>
    openModal("Audi", "Audi destaca por su lujo, innovación y tecnología avanzada.")
);

document.getElementById("btn2")?.addEventListener("click", () =>
    openModal("Mazda", "Mazda combina diseño emocional con conducción dinámica.")
);


const loginModal = document.getElementById("loginModal");
const btnLogin = document.getElementById("btnLogin");
const closeLogin = document.getElementById("closeLogin");

btnLogin?.addEventListener("click", () => {
    loginModal.classList.add("show");
    overlay.classList.add("show");
});

closeLogin?.addEventListener("click", () => {
    loginModal.classList.remove("show");
    overlay.classList.remove("show");
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        loginModal.classList.remove("show");
        overlay.classList.remove("show");
    }
});


const registerModal = document.getElementById("registerModal");
const closeRegister = document.getElementById("closeRegister");

const btnRegisterLink = document.getElementById("openRegister");
const backToLogin = document.getElementById("backToLogin");

btnRegisterLink?.addEventListener("click", (e) => {
    e.preventDefault();
    loginModal.classList.remove("show");
    registerModal.classList.add("show");
    overlay.classList.add("show");
});

backToLogin?.addEventListener("click", (e) => {
    e.preventDefault();
    registerModal.classList.remove("show");
    loginModal.classList.add("show");
    overlay.classList.add("show");
});

closeRegister?.addEventListener("click", () => {
    registerModal.classList.remove("show");
    overlay.classList.remove("show");
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        registerModal.classList.remove("show");
    }
});


function validarCorreo(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarTelefono(tel) {
    return /^[0-9]{7,15}$/.test(tel);
}


const registerSend = document.getElementById("registerSend");
const msgSuccess = document.getElementById("registerSuccess");

registerSend?.addEventListener("click", () => {

    const nombres = document.getElementById("regNombres").value.trim();
    const apellidos = document.getElementById("regApellidos").value.trim();
    const correo = document.getElementById("regCorreo").value.trim();
    const telefono = document.getElementById("regTelefono").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if (!nombres || !apellidos || !correo || !telefono || !password) {
        showError("Todos los campos son obligatorios.");
        return;
    }

    if (!validarCorreo(correo)) {
        showError("El correo ingresado no es válido.");
        return;
    }

    if (!validarTelefono(telefono)) {
        showError("El teléfono debe ser numérico y entre 7 y 15 dígitos.");
        return;
    }

    const existing = JSON.parse(localStorage.getItem("usuario_registrado"));
    if (existing && existing.correo === correo) {
        showError("Este correo ya está registrado.");
        return;
    }

    const usuario = {
        nombres,
        apellidos,
        correo,
        telefono,
        password
    };

    localStorage.setItem("usuario_registrado", JSON.stringify(usuario));

    msgSuccess.style.display = "block";
    setTimeout(() => msgSuccess.style.display = "none", 3000);

    registerModal.classList.remove("show");
    overlay.classList.remove("show");

    document.getElementById("regNombres").value = "";
    document.getElementById("regApellidos").value = "";
    document.getElementById("regCorreo").value = "";
    document.getElementById("regTelefono").value = "";
    document.getElementById("regPassword").value = "";
});


const loginUser = document.getElementById("loginUser");
const welcomeBox = document.getElementById("welcomeUser");

document.getElementById("loginSend")?.addEventListener("click", () => {

    const correo = loginUser.value.trim();
    const password = document.getElementById("loginPass").value.trim();
    const registrado = JSON.parse(localStorage.getItem("usuario_registrado"));

    if (!correo || !password) {
        showError("Debe llenar todos los campos.");
        return;
    }

    if (!registrado || registrado.correo !== correo) {
        showError("Este usuario no existe.");
        return;
    }

    if (registrado.password !== password) {
        showError("Contraseña incorrecta.");
        return;
    }

    localStorage.setItem("usuario_activo", JSON.stringify(registrado));

    loginModal.classList.remove("show");
    overlay.classList.remove("show");

    mostrarUsuario();
});


function mostrarUsuario() {
    const user = JSON.parse(localStorage.getItem("usuario_activo"));

    if (user) {
        welcomeBox.style.display = "block";
        welcomeBox.textContent = `Bienvenido, ${user.nombres} ${user.apellidos}`;

        btnLogin.textContent = "Cerrar Sesión";
        btnLogin.onclick = cerrarSesion;
    }
}

mostrarUsuario();


function cerrarSesion() {
    localStorage.removeItem("usuario_activo");

    welcomeBox.style.display = "none";

    btnLogin.textContent = "Iniciar Sesión / Registrarse";
    btnLogin.onclick = () => {
        loginModal.classList.add("show");
        overlay.classList.add("show");
    };
}
