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
            const form = document.createElement("form");

            //veridica el tipo de pregunta y crea los campos para responder 

            div.innerHTML = `
                <h2>${index + 1}. ${p.pregunta}</h2>
                <p><strong>Tipo:</strong> ${
                    p.tipo == 1?"opcion multiple"
                    : p.tipo == 2? "pregunta abierta": "casilla de verificacion" 
                
                
                }
                        
                </p>
                
                
                ${p.opciones && p.opciones.length > 0 ? 


                    `${p.tipo == 1 ? p.opciones.map( (op,i) => `

                        <input type="radio" id="opcion-${i}" name="pregunta${index}" value="?">
                        <label for="opcion-${i}">${op}</label><br>
                        
                    `).join(""):



                    p.tipo == 2 ? p.opciones.map(op => `
                        <input type="text" placeholder="tu respuesta...">
                        
                        
                    `).join(""):


                    p.opciones.map( (op, i) => `
                     
                        
                        <input type="checkbox" id="opcion-${i}" name="opcion-${i}" value="?">
                        <label for="opcion-${i}">${op}</label><br>
                        
                            
                        

                    `).join("")}`



                    : `<p>Sin opciones (pregunta abierta)</p>`}
                    
                <hr>
            `;

            preguntas.appendChild(div);
            
        });

    } catch (error) {
        console.error('Error en fetch:', error);
    }
});
