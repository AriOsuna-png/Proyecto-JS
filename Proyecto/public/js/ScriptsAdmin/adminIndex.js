const idUsuario = sessionStorage.getItem("usuarioID");

if(!idUsuario){
    console.error("No hay usuario logueado en sessionStorage");
} else {
    cargarEncuestasUsuario(idUsuario);
    obtenerNombreUsuario();  // importante para que cargue el nombre
}

//========== Obtener encuestas ==========
async function cargarEncuestasUsuario(id){
    try{
        const res = await fetch(`http://localhost:3001/encuestasUsuario/${id}`);
        const data = await res.json();

        console.log("📌 Respuesta del servidor:", data);

        if(data.success && Array.isArray(data.encuestas) && data.encuestas.length > 0){
            mostrarEncuestas(data.encuestas);
        }else{
            console.warn("⚠ No se encontraron encuestas del usuario");
        }

    }catch(error){
        console.error("Error al obtener encuestas:", error);
    }
} 

async function obtenerNombreUsuario() {
    const id = sessionStorage.getItem("usuarioID");

    const res = await fetch(`http://localhost:3001/obtenerNombreUsuario/${id}`);
    const data = await res.json();

    console.log(data);

    if(data.success){
        document.getElementById("usuario").innerText = data.nombre;
    }
    console.log(data.nombre);
}

//========== Pintar encuestas ==========
//--> Se guarda el ObjectId en sessionStorage al dar clic
function mostrarEncuestas(encuestas){
    const contenedor = document.getElementById("contenedor-encuestas");
    contenedor.innerHTML = "";

    encuestas.forEach(enc => {
        const div = document.createElement("div");
        const br = document.createElement("br");
        div.classList.add("contenedor-form");

        div.innerHTML = `
            <h1>${enc.tituloEncuesta}</h1>
            <h3>${enc.descripcionEncuesta}</h3>

            <button class="opci ver-encuesta" data-id="${enc._id}">
                <img src="../../imagenes/vista.png" class="opci">
            </button>
        `;

        contenedor.appendChild(div);
        contenedor.appendChild(br);

        // Evento para guardar el ObjectId al presionar el botón
        div.querySelector(".ver-encuesta").addEventListener("click", () => {
            sessionStorage.setItem("idEncuesta", enc._id); // Guarda ObjectId
            window.location.href = "../../html/Admin/respuestas.html"; // Redirección
        });
    });
}

