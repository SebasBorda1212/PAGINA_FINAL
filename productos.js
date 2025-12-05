// Verificar sesión y manejar botón ALQUILAR
document.addEventListener("DOMContentLoaded", () => {

    const botones = document.querySelectorAll(".btn-alquilar");

    botones.forEach(btn => {
        btn.addEventListener("click", () => {

            const usuario = JSON.parse(localStorage.getItem("usuario_activo"));
            const modelo = btn.getAttribute("data-modelo");

            // Si NO está logeado
            if (!usuario) {
                alert("Debes iniciar sesión para poder alquilar un vehículo.");
                document.getElementById("btnLogin")?.click(); 
                return;
            }

            // Si está logeado → mensaje
            alert(`Perfecto ${usuario.nombres}, un asesor se comunicará contigo sobre el modelo ${modelo}.`);
        });
    });

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
