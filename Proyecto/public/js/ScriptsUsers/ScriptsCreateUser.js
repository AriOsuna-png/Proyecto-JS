document.getElementById("userForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const nombre = document.getElementById("nameUser").value;
  const password = document.getElementById("passwordUser").value;
  const tipo = document.querySelector('input[name="typeUser"]:checked')?.value;

  if (!nombre || !password || !tipo) {
    alert("Completa todos los campos");
    return;
  }

  try {
    const response = await fetch("/usuarios ", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, password, tipo })
    });

    const data = await response.json();
    console.log(data);
    alert("Usuario creado con el nombre: " + nombre);

    // Limpiar formulario
    document.getElementById("userForm").reset();
  } catch (error) {
    console.error(error);
    alert("Error al crear usuario");
  }
});
