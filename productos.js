const modal = document.getElementById("customModal");
const overlay = document.getElementById("overlay");

function openModal(title, message) {
    if (!modal || !overlay) return;
    modal.classList.add("show");
    overlay.classList.add("show");

    document.querySelector(".modal-header-custom h3").textContent = title;
    document.querySelector(".modal-text").textContent = message;
}

document.getElementById("btnAudi")?.addEventListener("click", () =>
    openModal("Audi", "Lujo, innovación y tecnología avanzada en cada detalle.")
);

document.getElementById("btnBMW")?.addEventListener("click", () =>
    openModal("BMW", "Conducción deportiva con ingeniería alemana de precisión.")
);

document.getElementById("btnMazda")?.addEventListener("click", () =>
    openModal("Mazda", "Diseño emocional y conducción dinámica y eficiente.")
);
