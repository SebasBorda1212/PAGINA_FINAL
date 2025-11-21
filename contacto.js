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
