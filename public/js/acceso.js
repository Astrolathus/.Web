document.getElementById("FormularioAcceso").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    var usuario = document.getElementById("username").value;
    var contraseña = document.getElementById("password").value;

    if (usuario === "root" && contraseña === "1234") {
        window.location.href = "vistaAdmin.html";
    } else {
        alert("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
    }
});
