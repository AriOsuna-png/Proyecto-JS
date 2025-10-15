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

      // ✅ Aquí decidimos a qué página ir según el tipo
      if (data.usuario.tipo === "admin") {
        window.location.href = "/html/Admin/adminIndex.html";
      } else {
        window.location.href = "/html/user.html";
      }

    } else {
      alert(data.mensaje || "Usuario o contraseña incorrectos");
    }

  } catch (error) {
    console.error(error);
    alert("Error al conectar con el servidor");
  }
});
