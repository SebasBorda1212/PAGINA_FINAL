const modal = document.getElementById("customModal");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeModal");
const modalText = document.querySelector(".modal-text");
const modalTitle = document.querySelector(".modal-header-custom h3");

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
