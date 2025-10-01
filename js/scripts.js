/* Imprimir lista de nombres
 crea un programa en JavaScript que cumpla con lo siguiente

 1. Define un objeto llamado grupo
    Este objeto debe tener una lista de 10 nombres.
2. Crea una funcion llamada ImprimirNombres
   Esta funcion debe correr la lista de nombres
   y mostrarlos en la consola uno a uno.
3. Llama a la duncion imprimir Nombres para mostrar
   todos los nombres.*/

let grupo =  [ {

    nombre: "Heber",
    apellido: "Zurita"
   
  }, {

    nombre: "Jesus",
    apellido: "Rojo"
    
  }, {

    nombre: "Ari",
    apellido: "maluma"
    
  }, {

    nombre: "Aguado",
    apellido: "caragillo"
    
  }, {

    nombre: "piedro",
    apellido: "piedra"
    
  }, {

    nombre: "ernesto",
    apellido: "domingues"
    
  }, {

    nombre: "Carlos",
    apellido: "Rubio"
    
  }, {

    nombre: "Tristan",
    apellido: "Patron"
    
  }, {

    nombre: "Gabriel",
    apellido: "lizarraga"
    
  }, {

    nombre: "santiago",
    apellido: "Lopez"
    
  }
]

function listaNombres (){

    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    for(let i = 0; 1 < grupo.length; i++){
      let li = document.createElement("li");
      li.textContent = grupo[i].nombre + " " + grupo[i].apellido;
      lista.appendChild[li];
    }
}