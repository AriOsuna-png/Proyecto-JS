document.getElementById("buscarEncuesta").addEventListener("submit", async (event) =>{
    event.preventDefault();
    try {
    const clave = document.getElementById("clave").value;
    console.log('Enviando clave:', clave); // Ver qué se envía

    const response = await fetch('/obtenerEncuesta', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ clave })
    });

    console.log('Status:', response.status); // Ver código de respuesta

    const data = await response.json();
    console.log('Respuesta:', data);
    
    if (!data.success) {
        console.error('Error del servidor:', data.message);
    }

} catch (error) {
    console.error('Error en fetch:', error);
}



});