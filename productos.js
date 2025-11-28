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
