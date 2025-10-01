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
