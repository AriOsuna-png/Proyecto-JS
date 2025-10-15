const botonAgregar = document.getElementById('agregar-pregunta');
const contenedorPreguntas = document.getElementById('preguntas-container');

function detectarTipo() {
    const tipo = contenedorPreguntas.querySelector('select').value;
    return tipo;
}

function generarPreguntaMultiple() {
    const pregunta_nueva = document.createElement("div");
    pregunta_nueva.classList.add("fila-pregunta");

    const inputPregunta = document.createElement("input");
    inputPregunta.type = "text";
    inputPregunta.placeholder = "Pregunta";
    inputPregunta.classList.add("inputs");

    pregunta_nueva.appendChild(inputPregunta);

    contenedorPreguntas.insertBefore(
        pregunta_nueva,
        contenedorPreguntas.querySelector('.contenedor-botones')
    );
}

botonAgregar.addEventListener('click', () => {
    const tipo = detectarTipo();

    if (tipo === "1") {
        generarPreguntaMultiple();
    }
});

/*
botonAgregar.addEventListener('click', () => {

    const tipo = detectarTipo();

    if (tipo === 1){
        generarPreguntaMultiple()
    }
    /*
    // Creamos el contenedor de la nueva pregunta
    const nuevaPregunta = document.createElement('div');
    nuevaPregunta.classList.add('fila-pregunta');

    // Creamos el input para la nueva pregunta
    const inputPregunta = document.createElement('input');
    inputPregunta.type = 'text';
    inputPregunta.placeholder = 'Pregunta';
    inputPregunta.classList.add('inputs');

    // Creamos el selector para la nueva pregunta
    const selector = document.createElement('select');
    selector.classList.add('selector');

    const optionMultiple = document.createElement('option');
    optionMultiple.value = 'opcion-multiple';
    optionMultiple.textContent = 'Opcion multiple';

    const optionAbierta = document.createElement('option');
    optionAbierta.value = 'pregunta-abierta';
    optionAbierta.textContent = 'Pregunta abierta';

    const optionCasillas = document.createElement('option');
    optionCasillas.value = 'casillas';
    optionCasillas.textContent = 'Casillas de verificación';

    // Agregamos input y selector al contenedor de la nueva pregunta
    nuevaPregunta.appendChild(inputPregunta);
    

    // Insertamos la nueva pregunta antes del botón
    contenedorPreguntas.insertBefore(nuevaPregunta, contenedorPreguntas.querySelector('.contenedor-botones'));
    
   
});
*/
