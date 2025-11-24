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
            <h1>Título de la encuesta: ${data.data.tituloEncuesta}</h1>
            <p>Descripción: ${data.data.descripcionEncuesta}</p>
            <hr>
        `;

        // Recorrer las preguntas
        data.data.datos.forEach((p, index) => {
            const div = document.createElement("div");

            div.innerHTML = `
                <h2>${index + 1}. ${p.pregunta}</h2>
                <p><strong>Tipo:</strong> ${
                    p.tipo == 1?"opcion multiple"
                    : p.tipo == 2? "pregunta abierta": "casilla de verificacion" 
                
                
                }
                
                
                
                </p>
                
                

                ${p.opciones && p.opciones.length > 0
                    ? `${p.opciones.map(op => `${op}`).join("")}`
                    : `<p>Sin opciones (pregunta abierta)</p>`}
                    
                <hr>
            `;

            preguntas.appendChild(div);
        });

    } catch (error) {
        console.error('Error en fetch:', error);
    }
});
