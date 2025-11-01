const contenedorPreguntas = document.getElementById("preguntas-añadidas");

// Función para crear una nueva respuesta según tipo
function generarRespuesta(bloque, i, tipo) {
    const pregunta_nueva = document.createElement("div");
    const idPregunta = bloque.id; 
    pregunta_nueva.classList.add("fila-pregunta");
    pregunta_nueva.id = `pregunta_${i}`;

    if (tipo === "1") { // Opción múltiple
        const radioButton = document.createElement("input");
        radioButton.type = "radio";
        radioButton.name = `respuestaGrupo_${idPregunta}`;
        radioButton.classList.add("radio-opcion");
        pregunta_nueva.appendChild(radioButton);

        const textRadio = document.createElement("input");
        textRadio.type = "text";
        textRadio.placeholder = `Nueva opción`;
        textRadio.classList.add("inputs");
        pregunta_nueva.appendChild(textRadio);
        
    } else if (tipo === "2") { // Pregunta abierta
        const respueta = document.createElement("input");
        respueta.type = "text";
        respueta.placeholder = "Respuesta abierta...";
        respueta.classList.add("inputs");
        pregunta_nueva.appendChild(respueta);

    } else if (tipo === "3") { // Casilla de verificación
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("radio-opcion");
        pregunta_nueva.appendChild(checkbox);

        const textCheckbox = document.createElement("input");
        textCheckbox.type = "text";
        textCheckbox.placeholder = "Nueva opción";
        textCheckbox.classList.add("inputs");
        pregunta_nueva.appendChild(textCheckbox);
    }

    // Botón borrar
    const botonBorrar = document.createElement("button");
    botonBorrar.textContent = "X";
    botonBorrar.classList.add("btn-borrar");
    botonBorrar.dataset.id = i; 
    pregunta_nueva.appendChild(botonBorrar);

    // Insertar dentro del contenedor de respuestas del bloque
    const contenedorRespuestas = bloque.querySelector(".respuestas-añadidas");
    contenedorRespuestas.appendChild(pregunta_nueva);
}

// Delegación de eventos para botones "Agregar nueva opción" y eliminar
// Delegación de eventos para botones "Agregar nueva opción" y eliminar
contenedorPreguntas.addEventListener("click", (event) => {
    const botonAgregar = event.target.closest(".boton-agregar");    
    const botonEliminar = event.target.closest(".btn-borrar");
    const botonElimarPreguntas = event.target.closest(".botonBorrarPreguntas");

    if (botonAgregar) {
        const bloque = botonAgregar.closest(".preguntas");
        if (!bloque.i) bloque.i = 0;

        const select = bloque.querySelector("select");
        const tipoSeleccionado = select.value;

        bloque.i++;
        generarRespuesta(bloque, bloque.i, tipoSeleccionado);
    }

    if (botonEliminar) {
        const fila = botonEliminar.closest(".fila-pregunta");
        const bloque = fila.closest(".preguntas");
        fila.remove();

        // Reiniciar si no quedan respuestas
        if (bloque.querySelectorAll(".fila-pregunta").length - 1 === 0) {
            bloque.i = 0;
        }
    }

    if (botonElimarPreguntas){
        const bloque = botonElimarPreguntas.closest(".preguntas");
        bloque.remove();
    }
});




// Función para crear un nuevo bloque de preguntas
const botonAgregarPregunta = document.getElementById("agregar-pregunta");
let numeroPreguntas = 0;
botonAgregarPregunta.addEventListener("click", (e) => {
    numeroPreguntas +=1;
    e.preventDefault(); // Prevenir envío del formulario
    crearNuevoContenedor(numeroPreguntas);
});

function crearNuevoContenedor() {
    const nuevo = document.createElement("div");
    nuevo.id = numeroPreguntas;
    nuevo.classList.add("preguntas");

    nuevo.innerHTML = `
    <div class="fila-pregunta">
        <input type="text" placeholder="Pregunta" class="inputs">
        <select name="opciones" class="selector">
            <option value="1">Opción múltiple</option>
            <option value="2">Pregunta abierta</option>
            <option value="3">Casillas de verificación</option>
        </select>
    </div>

    <div class="respuestas-añadidas"></div>

    <div class="contenedor-botones">
        <button type="button" class="boton-agregar">
            <img src="../../imagenes/anadir.png" class="botonHeaders">
            Agregar nueva opción
        </button>
        
        <button class="boton-borrar oculto">
            <img src="../../imagenes/eliminar.png" class="botonBorrarPreguntas">
        </button>
    </div>
    `;

    contenedorPreguntas.appendChild(nuevo);

    const selector = nuevo.querySelector(".selector");
    const contenedorRespuestas = nuevo.querySelector(".respuestas-añadidas");
    const botonAgregar = nuevo.querySelector(".boton-agregar");

    // 🟩 Función para crear una fila de respuesta con botón borrar
    function crearFilaRespuesta(tipoInput, placeholder, name) {
        const fila = document.createElement("div");
        fila.classList.add("fila-pregunta");

        const inputOpcion = document.createElement("input");
        inputOpcion.type = tipoInput;
        inputOpcion.name = name;
        inputOpcion.classList.add("radio-opcion");

        const inputTexto = document.createElement("input");
        inputTexto.type = "text";
        inputTexto.placeholder = placeholder;
        inputTexto.classList.add("inputs");

        // 🟥 Botón eliminar opción
        const botonBorrar = document.createElement("button");
        botonBorrar.textContent = "X";
        botonBorrar.classList.add("btn-borrar");

        // Evento para borrar la fila actual
        botonBorrar.addEventListener("click", () => {
            fila.remove();
        });

        fila.appendChild(inputOpcion);
        fila.appendChild(inputTexto);
        fila.appendChild(botonBorrar);

        return fila;
    }

   selector.addEventListener("change", () => {
    const tipo = selector.value;
    contenedorRespuestas.innerHTML = ""; // Limpia respuestas

    if (tipo === "1") {
        // Opción múltiple (radio)
        for (let i = 1; i <= 2; i++) {
            contenedorRespuestas.appendChild(
                crearFilaRespuesta("radio", `Nueva opción`, `respuesta-${nuevo.id}`)
            );
        }
        botonAgregar.style.visibility = "visible";
    } else if (tipo === "2") {
        // Pregunta abierta
        const fila = document.createElement("div");
        fila.classList.add("fila-pregunta");

        const inputTexto = document.createElement("input");
        inputTexto.type = "text";
        inputTexto.placeholder = "Respuesta abierta...";
        inputTexto.classList.add("inputs");

        fila.appendChild(inputTexto);
        contenedorRespuestas.appendChild(fila);
        botonAgregar.style.visibility = "hidden"; // Ocultar botón
    } else if (tipo === "3") {
        // Casillas de verificación (checkbox)
        for (let i = 1; i <= 2; i++) {
            contenedorRespuestas.appendChild(
                crearFilaRespuesta("checkbox", `Nueva opción`, `respuesta-${nuevo.id}`)
            );
        }
        botonAgregar.style.visibility = "visible";
    }
});


    // ➕ Botón para agregar nuevas opciones manualmente
    botonAgregar.addEventListener("click", () => {
        const tipo = selector.value;

        if (tipo === "2") {
            alert("Las preguntas abiertas no requieren opciones adicionales.");
        }
    });

    // Crear por defecto 2 opciones si es múltiple al inicio
    for (let i = 1; i <= 2; i++) {
        contenedorRespuestas.appendChild(
            crearFilaRespuesta("radio", `Nueva opción`, `respuesta-${nuevo.id}`)
        );
    }
}



function visualizarBotonBorrar() {
    const bloques = document.querySelectorAll(".preguntas"); // Todos los bloques

    bloques.forEach(bloque => {
        const botonBorrar = bloque.querySelector(".boton-borrar");
        if (botonBorrar) {
            botonBorrar.classList.remove("oculto"); // Mostrar botón
        }
    });
}
function ocultarBotonBorrar() {
    const bloques = document.querySelectorAll(".preguntas"); // Todos los bloques

    bloques.forEach(bloque => {
        const botonBorrar = bloque.querySelector(".boton-borrar");
        if (botonBorrar) {
            botonBorrar.classList.add("oculto"); // Mostrar botón
        }
    });
}


const botonBorrarPreguntas = document.getElementById("borrar-pregunta");
let botonesVisibles = false;

botonBorrarPreguntas.addEventListener("click", (e) => {
    e.preventDefault();
    if (!botonesVisibles) {
        visualizarBotonBorrar();
        botonesVisibles = true;
    } else {
        ocultarBotonBorrar();
        botonesVisibles = false;
    }
});

function obtenerPreguntas() {
    const bloques = document.querySelectorAll(".preguntas");
    const datos = []; 

    bloques.forEach((bloque) => {
        const inputPregunta = bloque.querySelector('.fila-pregunta input');
        const textoPregunta = inputPregunta?.value.trim() || "";

        // Obtener el tipo directamente del selector dentro del bloque
        const selector = bloque.querySelector(".selector");
        const tipo = selector ? selector.value : "1"; // Por defecto "1" (opción múltiple)

        // Si la pregunta está vacía, no la guardamos
        if (textoPregunta === "") return;

        const respuestas = [];
        const filasRespuestas = bloque.querySelectorAll('.respuestas-añadidas .fila-pregunta');
        
        filasRespuestas.forEach((respuesta) => {
            const inputRespuesta = respuesta.querySelector('input[type="text"]');
            const textoRespuesta = inputRespuesta?.value.trim() || "";

            // Solo guardamos si tiene texto
            if (textoRespuesta !== "") {
                respuestas.push(textoRespuesta);
            }
        });

        // Guardamos los datos de cada bloque
        datos.push({
            pregunta: textoPregunta,
            tipo: tipo,
            opciones: respuestas
        });
    });

    return datos; 
}





const btnGuardar = document.getElementById("btnGuardar");
btnGuardar.addEventListener("click", async (e) => {
    e.preventDefault();
    let datos = obtenerPreguntas();
    try{    
        const tituloEncuesta = document.getElementById("tituloEncuesta").value;
        const descripcionEncuesta = document.getElementById("descripcionEncuesta").value;
        const clave = document.getElementById("claveEncuesta").value
        const idUsuario = sessionStorage.getItem("usuarioID");
    
        const response = await fetch('/guardar', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ tituloEncuesta, descripcionEncuesta, clave, idUsuario, datos})
        });

        const data = await response.json();
        console.log(data);
        alert("Encuesta creada con el titulo: " + tituloEncuesta);
    }catch(error){
    console.error(error);
    alert("Error al crear encuesta");
    }
});




