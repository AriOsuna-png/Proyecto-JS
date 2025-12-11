const idUsuario = sessionStorage.getItem("usuarioID");
const idEncuesta = sessionStorage.getItem("idEncuesta");

console.log("ID Encuesta cargado:", idEncuesta);

// ==================== CARGAR NOMBRE USUARIO ====================
async function obtenerNombreUsuario() {
    const id = sessionStorage.getItem("usuarioID");
    if(!id) return;

    try {
        const res = await fetch(`http://localhost:3001/obtenerNombreUsuario/${id}`);
        const data = await res.json();

        if(data.success){
            document.getElementById("usuario").innerText = data.nombre;
        }

    } catch(err){
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


// ==================== OBTENER ENCUESTA CON CONTEO ====================
async function cargarEncuestaID(idEncuesta){

    try {
        // --- obtener estructura de encuesta ---
        const res1 = await fetch("http://localhost:3001/obtenerEncuestaID", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ idEncuesta })
        });

        const encuesta = await res1.json();

        // --- obtener conteo de respuestas ---
        const res2 = await fetch(`http://localhost:3001/contarRespuestas/${idEncuesta}`);
        const conteo = await res2.json();

        if (!encuesta.success) {
            alert("No existe la encuesta.");
            return;
        }

        const preguntas = document.getElementById("encuestaContenedor");

        preguntas.innerHTML = `
            <h1>${encuesta.data.tituloEncuesta}</h1>
            <p>${encuesta.data.descripcionEncuesta}</p>
            <hr>
        `;

        encuesta.data.datos.forEach((p, index) => {

            const div = document.createElement("div");
            div.className = "preguntas";

            let contenido = `<h3>${index + 1}. ${p.pregunta}</h3>`;

            // Obtener conteo de esta pregunta
            const c = conteo.conteo[p.pregunta] || {};



            // === RADIO ===
            if (p.tipo == 1) {
                contenido += p.opciones.map(op => {
                    const total = c[op] || 0;
                    return `
                        <label class="radio-container">
                            <input type="radio" disabled>
                            <span class="radiomark"></span> ${op}
                            <strong style="margin-left:10px; color:#4af;">(${total} respuestas)</strong>
                        </label><br>
                    `;
                }).join("");
            }

            // === PREGUNTA ABIERTA ===
            else if (p.tipo == 2) {
                const respuestasTexto = c ? Object.entries(c) : [];
                const total = respuestasTexto.length;

                contenido += `
                    <p style="color:#4af;"><strong>${total}</strong> respuestas de texto</p>
                `;

                if (total > 0) {
                    contenido += `<ul class = "lista-respuestas">`;
                    respuestasTexto.forEach(([respuesta, cantidad]) => {
                        contenido += `
                            <li class = "item-respuesta">
                                ${respuesta} 
                                <strong>(${cantidad})</strong>
                            </li>
                        `;
                    });
                    contenido += `</ul>`;
                }
            }


            // === CHECKBOX ===
            else {
                contenido += p.opciones.map(op => {
                    const total = c[op] || 0;
                    return `
                        <label class="checkbox-container">
                            <input type="checkbox" disabled>
                            <span class="checkmark"></span> ${op}
                            <strong style="margin-left:10px; color:#4af;">(${total} votos)</strong>
                        </label><br>
                    `;
                }).join("");
            }

            div.innerHTML = contenido;
            preguntas.appendChild(div);
            console.log("Conteo recibido:", conteo);

        });

    } catch (error) {
        console.error("Error al cargar encuesta:", error);
    }
}
