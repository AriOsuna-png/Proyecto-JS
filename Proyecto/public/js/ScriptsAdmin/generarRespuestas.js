const contenedorPreguntas = document.getElementById("preguntas-añadidas");

// Función para crear una nueva respuesta según tipo
function generarRespuesta(bloque, i, tipo) {
    const pregunta_nueva = document.createElement("div");
    pregunta_nueva.classList.add("fila-pregunta");
    pregunta_nueva.id = `pregunta_${i}`;

    if (tipo === "1") { // Opción múltiple
        const radioButton = document.createElement("input");
        radioButton.type = "radio";
        radioButton.name = `respuestaGrupo_${i}`;
        radioButton.classList.add("radio-opcion");
        pregunta_nueva.appendChild(radioButton);

        const textRadio = document.createElement("input");
        textRadio.type = "text";
        textRadio.placeholder = "Opción...";
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
        textCheckbox.placeholder = "Opción...";
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
contenedorPreguntas.addEventListener("click", (event) => {
    const botonAgregar = event.target.closest(".boton-agregar");
    const botonEliminar = event.target.closest(".btn-borrar");

    if (botonAgregar) {
        const bloque = botonAgregar.closest(".preguntas");
        if (!bloque.i) bloque.i = 0;
        if (!bloque.tipoActual) bloque.tipoActual = null;

        const select = bloque.querySelector("select");
        const tipoSeleccionado = select.value;

        // Validación de tipo
        if (!bloque.tipoActual) bloque.tipoActual = tipoSeleccionado;
        if (bloque.tipoActual !== tipoSeleccionado) {
            alert("Solo puedes agregar respuestas del mismo tipo. Elimina las anteriores si quieres cambiar el tipo.");
            return;
        }

        bloque.i++;
        generarRespuesta(bloque, bloque.i, tipoSeleccionado);
    }

    if (botonEliminar) {
        const fila = botonEliminar.closest(".fila-pregunta");
        const bloque = fila.closest(".preguntas");
        fila.remove();

        // Reiniciar si no quedan preguntas
        if (bloque.querySelectorAll(".fila-pregunta").length-1 === 0) {
            bloque.tipoActual = null;
            bloque.i = 0;
        }
    }
});

// Función para crear un nuevo bloque de preguntas
const botonAgregarPregunta = document.getElementById("agregar-pregunta");
botonAgregarPregunta.addEventListener("click", (e) => {
    e.preventDefault(); // Prevenir envío del formulario
    crearNuevoContenedor();
});

function crearNuevoContenedor() {
    const nuevo = document.createElement("div");
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

        <div class="respuestas-añadidas"></div> <!-- Aquí se agregarán las respuestas -->

        <div class="contenedor-botones">
            <button type="button" class="boton-agregar">
                <img src="../../imagenes/anadir.png" class="botonHeaders">
                Agregar nueva opción
            </button>
        </div>
    `;

    contenedorPreguntas.appendChild(nuevo);
}
