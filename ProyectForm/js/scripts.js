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

//funcion para generar la cantidad preguntas de checkboxes
function generateCheckBoxes(event) {
    event.preventDefault(); // 👈 evita que el formulario recargue la página

    const cantidad = document.getElementById("quantityCheck").value;
    const opciones = document.getElementById("quantityOptions").value;

    const container = document.createElement("div");

    for (let i = 1; i <= cantidad; i++) {
        const pregunta = document.createElement("h3");
        pregunta.textContent = `Pregunta ${i}`;
        container.appendChild(pregunta);

        for (let j = 1; j <= opciones; j++) {
            const label = document.createElement("label");
            label.textContent = `Opción ${j}`;
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = `pregunta${i}`;
            checkbox.value = `opcion${j}`;
            
            container.appendChild(checkbox);
            container.appendChild(label);
            container.appendChild(document.createElement("br"));
        }
    }

    // 👇 agrega las preguntas al final del body
    document.body.appendChild(container);
}

