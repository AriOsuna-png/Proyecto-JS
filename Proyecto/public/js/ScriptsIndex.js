document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const nombre = document.getElementById("user").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, password })
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      alert("Bienvenido " + data.usuario.nombre);

      sessionStorage.setItem("usuarioID", data.usuario._id);
      console.log("ID guardado:", data.usuario._id);

      if (data.usuario.tipo === "admin") {
        window.location.href = "/html/Admin/adminIndex.html";
      } else {
        window.location.href = "/html/Users/userIndex.html";
      }

    } else {
      alert(data.mensaje || "Usuario o contraseña incorrectos");
    }

  } catch (error) {
    console.error(error);
    alert("Error al conectar con el servidor");
  }
});
