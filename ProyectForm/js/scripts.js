//funcion que verifica la contraseña y el usuario
function verifyPassword(event){

    event.preventDefault();

    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;


    //si el usuario es admin, se manda a crear la encuesta 
    if ( user === "123" && password === "123" ){
        window.location.href = "./html/generateForm.html";
        return;
    }


    //si el usuario es comun, se manda a contestar la encuesta
    if (user === "user" && password === "user"){
        window.location.href = "./html/answerForm.html";
        return;
    }
    //si la contraseña es incorrecta lo menciona
    alert("Usuario o contraseña son incorrectos ");
    
}//fin funcion verifyPassword

//funcion que se encarga de generar las respuestas
function generateAnswers(event){
    event.preventDefault();
    const answer = document.createElement("input");
    answer.placeholder = "respuesta";
    
    
    
    return answer;

}


//funcion para generar la cantidad preguntas de checkboxes
function generateQuestions(event) {
    event.preventDefault();

    const jump1 = document.createElement("br");
    
    
    const container = document.createElement("div");
    

    const lblQuestion = document.createElement("label");
    lblQuestion.textContent = "pregunta no."
    container.appendChild(lblQuestion);

    const question = document.createElement("input");
    question.placeholder = "Ingresa la pregunta";

    container.appendChild(jump1);

    //crea el objeto select que sirve como menu de seleccion para las preguntas
    const type = document.createElement("select");
    type.id = "typeQuestions";

    //crea la opcion de "opcion multiple" dentro del selector
    const multipleChoice = document.createElement("option");
    multipleChoice.value = "chekBoxes";
    multipleChoice.text = "Opcion Multiple";

    //crea la opcion de "texto" dentro del selector
    const free = document.createElement("option");
    free.value = "text";
    free.text = "Texto";

    //crea la opcion de "casillas" dentro del selector
    const boxes = document.createElement("option");
    boxes.value = "boxes";
    boxes.text = "Casillas";
    
    //mete las opciones dentro del selector
    type.appendChild(multipleChoice);
    type.appendChild(free);
    type.appendChild(boxes);

    //mete las preguntas y el selector al div principal
    container.appendChild(question);
    container.appendChild(type);

    //añade un salto de linea
    const jump = document.createElement("br");
    container.appendChild(jump);

    // agrega las preguntas al final del body
    document.body.appendChild(container);
    container.appendChild(generateAnswers(event));

}//fin funcion generateQuestion

