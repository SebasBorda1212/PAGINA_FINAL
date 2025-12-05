const form = document.getElementById("contactForm");

const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const messageInput = document.getElementById("messageInput");
const dateInput = document.getElementById("dateInput");
const genderInput = document.getElementById("genderInput");
const termsCheck = document.getElementById("termsCheck");

const nameLabel = document.querySelector("label[for='nameInput']");
const emailLabel = document.querySelector("label[for='emailInput']");
const messageLabel = document.querySelector("label[for='messageInput']");
const dateLabel = document.querySelector("label[for='dateInput']");
const genderLabel = document.querySelector("label[for='genderInput']");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const dateError = document.getElementById("dateError");
const genderError = document.getElementById("genderError");

const alertBox = document.getElementById("alertBox");
const successBox = document.getElementById("successBox");
const clearBox = document.getElementById("clearBox");

const savedMessages = document.getElementById("savedMessages");
const savedMessagesContainer = document.getElementById("savedMessagesContainer");
const toggleViewBtn = document.getElementById("toggleViewBtn");
const clearStorageBtn = document.getElementById("clearStorageBtn");
const deletedBox = document.getElementById("deletedBox");
const clearBtn = document.getElementById("clearBtn");

const progressBar = document.getElementById("progressBar");


function showError(input, label, errorMsg) {
    input.classList.add("input-error");
    label.classList.add("label-error");
    errorMsg.style.display = "block";
}

function hideError(input, label, errorMsg) {
    input.classList.remove("input-error");
    label.classList.remove("label-error");
    errorMsg.style.display = "none";
}


function updateProgress() {
    let progress = 0;

    if (nameInput.value.trim() !== "") progress += 20;
    if (/^\S+@\S+\.\S+$/.test(emailInput.value)) progress += 20;
    if (messageInput.value.trim() !== "") progress += 20;
    if (dateInput.value !== "") progress += 20;
    if (genderInput.value !== "") progress += 20;

    progressBar.style.width = progress + "%";
}


function validateOnInput(input, label, errorBox, condition) {
    input.addEventListener("input", () => {
        if (!condition()) showError(input, label, errorBox);
        else hideError(input, label, errorBox);
        updateProgress();
    });
}

validateOnInput(nameInput, nameLabel, nameError, () => nameInput.value.trim() !== "");
validateOnInput(emailInput, emailLabel, emailError, () => /^\S+@\S+\.\S+$/.test(emailInput.value));
validateOnInput(messageInput, messageLabel, messageError, () => messageInput.value.trim() !== "");

dateInput.addEventListener("change", () => {
    if (dateInput.value === "") showError(dateInput, dateLabel, dateError);
    else hideError(dateInput, dateLabel, dateError);
    updateProgress();
});

genderInput.addEventListener("change", () => {
    if (genderInput.value === "") showError(genderInput, genderLabel, genderError);
    else hideError(genderInput, genderLabel, genderError);
    updateProgress();
});


function saveData() {
    const data = JSON.parse(localStorage.getItem("contactoData") || "[]");

    data.push({
        nombre: nameInput.value.trim(),
        correo: emailInput.value.trim(),
        mensaje: messageInput.value.trim(),
        fechaNacimiento: dateInput.value,
        genero: genderInput.value,
        fecha: new Date().toLocaleString()
    });

    localStorage.setItem("contactoData", JSON.stringify(data));
}


function exportToJSON() {
    const data = JSON.parse(localStorage.getItem("contactoData") || "[]");
    const jsonStr = JSON.stringify(data, null, 4);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "contacto_data.json";
    a.click();
}


function renderMessages() {
    const data = JSON.parse(localStorage.getItem("contactoData") || "[]");
    savedMessages.innerHTML = "";

    data.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item bg-dark text-white d-flex justify-content-between";

        li.innerHTML = `
            <div>
                <strong>${item.nombre}</strong> - ${item.correo}<br>
                ${item.mensaje}<br>
                Fecha de nacimiento: ${item.fechaNacimiento}<br>
                Género: ${item.genero}<br>
                <small>${item.fecha}</small>
            </div>
            <button class="btn btn-danger btn-sm" onclick="deleteMessage(${index})">X</button>
        `;

        savedMessages.appendChild(li);
    });
}

function deleteMessage(index) {
    const data = JSON.parse(localStorage.getItem("contactoData") || "[]");
    data.splice(index, 1);
    localStorage.setItem("contactoData", JSON.stringify(data));
    renderMessages();
}


toggleViewBtn?.addEventListener("click", () => {
    if (savedMessagesContainer.style.display === "none") {
        savedMessagesContainer.style.display = "block";
        toggleViewBtn.textContent = "Ocultar datos";
        renderMessages();
    } else {
        savedMessagesContainer.style.display = "none";
        toggleViewBtn.textContent = "Ver datos";
    }
});


clearStorageBtn?.addEventListener("click", () => {
    localStorage.removeItem("contactoData");
    savedMessages.innerHTML = "";
    deletedBox.style.display = "block";
    setTimeout(() => deletedBox.style.display = "none", 3000);
});


clearBtn?.addEventListener("click", () => {
    form.reset();
    progressBar.style.width = "0%";

    hideError(nameInput, nameLabel, nameError);
    hideError(emailInput, emailLabel, emailError);
    hideError(messageInput, messageLabel, messageError);
    hideError(dateInput, dateLabel, dateError);
    hideError(genderInput, genderLabel, genderError);

    clearBox.style.display = "block";
    setTimeout(() => clearBox.style.display = "none", 3000);
});


form?.addEventListener("submit", (e) => {
    e.preventDefault();

    let error = false;

    if (nameInput.value.trim() === "") { showError(nameInput, nameLabel, nameError); error = true; }
    if (!/^\S+@\S+\.\S+$/.test(emailInput.value)) { showError(emailInput, emailLabel, emailError); error = true; }
    if (messageInput.value.trim() === "") { showError(messageInput, messageLabel, messageError); error = true; }
    if (dateInput.value === "") { showError(dateInput, dateLabel, dateError); error = true; }
    if (genderInput.value === "") { showError(genderInput, genderLabel, genderError); error = true; }
    if (!termsCheck.checked) { alert("Debes aceptar los términos y condiciones."); error = true; }

    if (error) {
        alertBox.style.display = "block";
        return;
    }

    alertBox.style.display = "none";
    successBox.style.display = "block";

    saveData();
    renderMessages();
    exportToJSON();

    form.reset();
    progressBar.style.width = "0%";

    hideError(nameInput, nameLabel, nameError);
    hideError(emailInput, emailLabel, emailError);
    hideError(messageInput, messageLabel, messageError);
    hideError(dateInput, dateLabel, dateError);
    hideError(genderInput, genderLabel, genderError);

    setTimeout(() => successBox.style.display = "none", 3000);
});


// Modales de login y registro

// Modal de login
const loginModal = document.getElementById("loginModal");
const btnLogin = document.getElementById("btnLogin");
const closeLogin = document.getElementById("closeLogin");

// Mostrar el modal de login al hacer clic en el botón "Iniciar sesión"
btnLogin?.addEventListener("click", () => {
    loginModal.classList.add("show");
    overlay.classList.add("show");
});

// Cerrar el modal de login
closeLogin?.addEventListener("click", () => {
    loginModal.classList.remove("show");
    overlay.classList.remove("show");
});

// Cerrar el modal de login al presionar "Escape"
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        loginModal.classList.remove("show");
        overlay.classList.remove("show");
    }
});

// Modal de registro
const registerModal = document.getElementById("registerModal");
const closeRegister = document.getElementById("closeRegister");

const btnRegisterLink = document.getElementById("openRegister");
const backToLogin = document.getElementById("backToLogin");

// Mostrar el modal de registro cuando se hace clic en "Crear cuenta"
btnRegisterLink?.addEventListener("click", (e) => {
    e.preventDefault();
    loginModal.classList.remove("show");
    registerModal.classList.add("show");
    overlay.classList.add("show");
});

// Volver al modal de login desde el de registro
backToLogin?.addEventListener("click", (e) => {
    e.preventDefault();
    registerModal.classList.remove("show");
    loginModal.classList.add("show");
    overlay.classList.add("show");
});

// Cerrar el modal de registro
closeRegister?.addEventListener("click", () => {
    registerModal.classList.remove("show");
    overlay.classList.remove("show");
});

// Cerrar el modal de registro al presionar "Escape"
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        registerModal.classList.remove("show");
    }
});

// Funciones de validación

// Validar formato de correo electrónico
function validarCorreo(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validar teléfono (solo números entre 7 y 15 dígitos)
function validarTelefono(tel) {
    return /^[0-9]{7,15}$/.test(tel);
}

// Enviar formulario de registro
const registerSend = document.getElementById("registerSend");
const msgSuccess = document.getElementById("registerSuccess");

registerSend?.addEventListener("click", () => {

    // Obtener valores del formulario
    const nombres = document.getElementById("regNombres").value.trim();
    const apellidos = document.getElementById("regApellidos").value.trim();
    const correo = document.getElementById("regCorreo").value.trim();
    const telefono = document.getElementById("regTelefono").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    // Verificar que todos los campos estén completos
    if (!nombres || !apellidos || !correo || !telefono || !password) {
        showError("Todos los campos son obligatorios.");
        return;
    }

    // Validar correo y teléfono
    if (!validarCorreo(correo)) {
        showError("El correo ingresado no es válido.");
        return;
    }

    if (!validarTelefono(telefono)) {
        showError("El teléfono debe ser numérico y entre 7 y 15 dígitos.");
        return;
    }

    // Verificar si el correo ya está registrado
    const existing = JSON.parse(localStorage.getItem("usuario_registrado"));
    if (existing && existing.correo === correo) {
        showError("Este correo ya está registrado.");
        return;
    }

    // Registrar el nuevo usuario en el localStorage
    const usuario = {
        nombres,
        apellidos,
        correo,
        telefono,
        password
    };

    localStorage.setItem("usuario_registrado", JSON.stringify(usuario));

    // Mostrar mensaje de éxito y limpiar el formulario
    msgSuccess.style.display = "block";
    setTimeout(() => msgSuccess.style.display = "none", 3000);

    // Cerrar el modal de registro
    registerModal.classList.remove("show");
    overlay.classList.remove("show");

    // Limpiar los campos del formulario
    document.getElementById("regNombres").value = "";
    document.getElementById("regApellidos").value = "";
    document.getElementById("regCorreo").value = "";
    document.getElementById("regTelefono").value = "";
    document.getElementById("regPassword").value = "";
});

// Enviar formulario de login
const loginUser = document.getElementById("loginUser");
const welcomeBox = document.getElementById("welcomeUser");

document.getElementById("loginSend")?.addEventListener("click", () => {

    // Obtener valores del formulario de login
    const correo = loginUser.value.trim();
    const password = document.getElementById("loginPass").value.trim();
    const registrado = JSON.parse(localStorage.getItem("usuario_registrado"));

    // Verificar que los campos de login estén completos
    if (!correo || !password) {
        showError("Debe llenar todos los campos.");
        return;
    }

    // Verificar que el usuario exista y la contraseña sea correcta
    if (!registrado || registrado.correo !== correo) {
        showError("Este usuario no existe.");
        return;
    }

    if (registrado.password !== password) {
        showError("Contraseña incorrecta.");
        return;
    }

    // Guardar el usuario activo en el localStorage
    localStorage.setItem("usuario_activo", JSON.stringify(registrado));

    // Cerrar el modal de login
    loginModal.classList.remove("show");
    overlay.classList.remove("show");

    // Mostrar el nombre del usuario
    mostrarUsuario();
});

// Función para mostrar el nombre del usuario activo
function mostrarUsuario() {
    const user = JSON.parse(localStorage.getItem("usuario_activo"));

    if (user) {
        welcomeBox.style.display = "block";
        welcomeBox.textContent = `Bienvenido, ${user.nombres} ${user.apellidos}`;

        // Cambiar texto del botón de login a "Cerrar Sesión"
        btnLogin.textContent = "Cerrar Sesión";
        btnLogin.onclick = cerrarSesion;
    }
}

// Mostrar usuario al cargar la página si ya hay un usuario activo
mostrarUsuario();

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("usuario_activo");

    welcomeBox.style.display = "none";

    // Restaurar el texto del botón de login
    btnLogin.textContent = "Iniciar Sesión / Registrarse";
    btnLogin.onclick = () => {
        loginModal.classList.add("show");
        overlay.classList.add("show");
    };
}