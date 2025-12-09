// ==================== BUSCAR ENCUESTA ====================
document.getElementById("buscarEncuesta").addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        const clave = document.getElementById("clave").value;

        const response = await fetch('/obtenerEncuesta', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ clave })
        });

        const data = await response.json();

        if (!data.success) {
            console.error("No existe encuesta");
            return;
        }

        const preguntas = document.getElementById("encuestaContenedor");

        preguntas.innerHTML = ` 
            <h1 style="margin-bottom:5px;">${data.data.tituloEncuesta}</h1>
            <p>${data.data.descripcionEncuesta}</p>
            <hr>
        `;

        // Generar preguntas dinámicamente
        data.data.datos.forEach((p, index) => {
        const div = document.createElement("div");
        div.className = "preguntas";

        let contenido = `<h2>${index + 1}. ${p.pregunta}</h2>`;

        // ----- Tipo 1: opción múltiple (radio) -----
        if (p.tipo == 1 && p.opciones?.length > 0) {
            contenido += p.opciones.map((op,i)=>`
                <label class="radio-container">
                    <input type="radio" name="pregunta-${index}" value="${op}">
                    <span class="radiomark"></span> ${op}
                </label>
            `).join("");
        
        // ----- Tipo 2: pregunta abierta (input texto) -----
        } else if (p.tipo == 2) {
            contenido += `<input type="text" placeholder="Tu respuesta..." class="inputs">`;

        // ----- Tipo 3: checkbox múltiple -----
        } else if (p.opciones?.length > 0) {
            contenido += p.opciones.map((op,i)=>`
                <label class="checkbox-container">
                    <input type="checkbox" name="pregunta-${index}" value="${op}">
                    <span class="checkmark"></span> ${op}
                </label>
            `).join("");

        } else {
            contenido += `<p>Pregunta abierta (sin input definido)</p>`;
        }

        div.innerHTML = contenido;
        preguntas.appendChild(div);
    });
        // 🔥 Guardamos la encuesta para usarla en el guardado
        window.encuestaActual = data.data;

    } catch (error) {
        console.error('Error en fetch:', error);
    }
});


// ==================== GUARDAR RESPUESTAS ====================
document.getElementById("btnGuardar").addEventListener("click", async (e) => {
    e.preventDefault();

    const respuestas = [];
    const bloques = document.querySelectorAll("#encuestaContenedor .preguntas");

    bloques.forEach((bloque, index) => {
        const preguntaTexto = bloque.querySelector("h2").innerText.replace(`${index+1}. `, "");

        const seleccionados = [...bloque.querySelectorAll("input:checked")].map(i => i.value);
        const texto = bloque.querySelector("input[type='text']");

        respuestas.push({
            pregunta: preguntaTexto,
            respuesta: seleccionados.length > 0 ? seleccionados : (texto ? texto.value : null)
        });
    });

    const dataEnviar = {
        idEncuesta: window.encuestaActual._id,
        idUsuario: sessionStorage.getItem("usuarioID"),  // por ahora usa el de la encuesta
        respuestas,
        fecha: new Date()
    };

    console.log("💾 ENVIANDO A BD:", dataEnviar);

    const enviar = await fetch("/guardarRespuestas",{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body: JSON.stringify(dataEnviar)
    });

    const resultado = await enviar.json();
    console.log("📥 Respuesta del servidor:", resultado);

    if(resultado.success){
        alert("✔ Respuestas guardadas exitosamente");
    }else{
        alert("❌ Error al guardar");
    }
});
