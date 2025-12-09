const idUsuario = sessionStorage.getItem("usuarioID");
console.log(idUsuario);

if(!idUsuario){
    console.error("No hay usuario logueado en sessionStorage");
} else {
    cargarEncuestasUsuario(idUsuario);
}

//========== Obtener encuestas ==========
async function cargarEncuestasUsuario(id){
    try{
        const res = await fetch(`http://localhost:3001/encuestasUsuario/${id}`);
        const data = await res.json();

        console.log("📌 Respuesta del servidor:", data);

        if(data.success && Array.isArray(data.encuestas) && data.encuestas.length > 0){
            mostrarEncuestas(data.encuestas);
        }else{
            console.warn("⚠ No se encontraron encuestas del usuario");
        }

    }catch(error){
        console.error("Error al obtener encuestas:", error);
    }
}

//========== Pintar encuestas ==========
function mostrarEncuestas(encuestas){
    const contenedor = document.getElementById("contenedor-encuestas");
    contenedor.innerHTML = "";

    encuestas.forEach(enc => {
        const div = document.createElement("div");
        const br = document.createElement("br");
        div.classList.add("contenedor-form");

        div.innerHTML = `
        
            <h1>${enc.tituloEncuesta}</h1>
            <h3>${enc.descripcionEncuesta}</h3>
            
        `;

        contenedor.appendChild(div);
        contenedor.appendChild(br);
    });
}
