const idUsuario = sessionStorage.getItem("usuarioID");
const idEncuesta = sessionStorage.getItem("idEncuesta");

console.log("ID Encuesta cargado:", idEncuesta);

// ==================== CARGAR NOMBRE USUARIO ====================
async function obtenerNombreUsuario() {
    const id = sessionStorage.getItem("usuarioID");

    if(!id) return;

    try{
        const res = await fetch(`http://localhost:3001/obtenerNombreUsuario/${id}`);
        const data = await res.json();

        if(data.success){
            document.getElementById("usuario").innerText = data.nombre;
        }

    }catch(err){
        console.error("Error al obtener nombre:", err);
    }
}


// ==================== CARGAR AUTOMÁTICAMENTE ENCUESTA ====================
document.addEventListener("DOMContentLoaded", () => {
    obtenerNombreUsuario();

    if(idEncuesta){
        cargarEncuestaID(idEncuesta);
    } else {
        console.log("⚠ No hay idEncuesta en sessionStorage");
    }
});


// ==================== OBTENER ENCUESTA POR OBJECTID ====================
async function cargarEncuestaID(idEncuesta){
    try {
        const response = await fetch("http://localhost:3001/obtenerEncuestaID", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ idEncuesta })
        });

        const data = await response.json();

        if (!data.success) {
            alert("No existe la encuesta.");
            return;
        }

        const preguntas = document.getElementById("encuestaContenedor");
        preguntas.innerHTML = `
            <h1 style="margin-bottom:5px;">${data.data.tituloEncuesta}</h1>
            <p>${data.data.descripcionEncuesta}</p>
            <hr></hr>
            `;

        data.data.datos.forEach((p, index) => {
            const div = document.createElement("div");
            div.className = "preguntas";
            
            let contenido = `<h3>${index + 1}. ${p.pregunta}</h3>`;
            

            // 🔘 Tipo 1: Radio
            if (p.tipo == 1 && p.opciones) {
                contenido += p.opciones.map((op)=>`
                    <label class="radio-container">
                        <input type="radio" name="pregunta-${index}" value="${op}" disabled>
                        <span class="radiomark"></span> ${op}
                    </label><br>
                `).join("");

            // ✍ Tipo 2: Abierta
            } else if (p.tipo == 2) {
                contenido += `<input type="text" class="inputs" name="pregunta-${index}" placeholder="Escribe tu respuesta..." disabled>`;

            // ☑ Tipo 3: Múltiple
            } else if(p.opciones) {
                contenido += p.opciones.map((op)=>`
                    <label class="checkbox-container">
                        <input type="checkbox" name="pregunta-${index}" value="${op}" disabled>
                        <span class="checkmark"></span> ${op}
                    </label><br>
                `).join("");
            }

            div.innerHTML = contenido;
            preguntas.appendChild(div);
        });

        // Se guarda para envíos de respuestas
        window.encuestaActual = data.data;

    } catch (error) {
        console.error('Error al cargar encuesta:', error);
    }
}
