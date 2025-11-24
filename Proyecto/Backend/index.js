const express = require("express");
const cors = require("cors");
const path = require("path");
const { connectDB } = require("./db");
const bcrypt = require("bcryptjs");
const { error } = require("console");
const app = express();
app.use(cors());
app.use(express.json());



app.use(express.static(path.join(__dirname, "../public")));

app.post("/usuarios", async (req, res) => {
  try {
    const { nombre, password, tipo } = req.body;

    if (!nombre || !password || !tipo) {
      return res.status(400).json({ error: "nombre, password y tipo requeridos" });
    }

    const db = await connectDB();
    const collection = db.collection("usuarios");

    // Verificar si el usuario ya existe
    const existe = await collection.findOne({ nombre });
    if (existe) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar usuario
    const resultado = await collection.insertOne({
      nombre,
      password: hashedPassword,
      tipo,        // ✅ Guardamos el tipo
      creadoEn: new Date()
    });

    res.json({ mensaje: "Usuario creado", id: resultado.insertedId });

  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: error.message });
  }
});//fin usuarios

app.post('/login', async (req, res) => {
    try{
        const {nombre, password} = req.body;

        if (!nombre || !password){

            return res.status(400).json({ error:"nombre y contraseña son requeridos" });
        }

        const db = await connectDB();
        const collection = db.collection('usuarios');

        const usuario = await collection.findOne({ nombre });
        if(!usuario){
            return res.status(401).json({mensaje: "usuario o contraseña incorrectos"});
        }
        const match = await bcrypt.compare(password, usuario.password);
        if (!match){
            return res.status(401).json({mensaje: "usuario o contraseña incorrectos"});
        }

        const { password: _pw, ...usersafe } = usuario;

        res.json({
            mensaje: "Login exitoso",
            usuario: usersafe
        });


    }catch (error) {
    console.error("error del servidor", error);
    }
});

app.post('/guardar', async (req, res) => {
  try{
    const {tituloEncuesta, descripcionEncuesta,clave, idUsuario, datos} = req.body;

    if (!tituloEncuesta || !descripcionEncuesta){
      return res.status(400).json({error: "completa todos los campos"});
    }

    const db = await connectDB();
    const collection = db.collection('encuestas');

    const resultado = await collection.insertOne({
      tituloEncuesta,
      descripcionEncuesta,
      clave,
      idUsuario,
      datos,
      creado: new Date()

    });
    res.json({mensaje:"datos de la encuesta añadidos correctamente", id:resultado.insertedId});


  }catch(error){
    console.error("Error al crear encuesta:", error);
    res.status(500).json({ error: error.message });

  }

});

//obtiene los datos de la encuesta 
app.post('/obtenerEncuesta', async (req, res) => {
  try {
    console.log('Body recibido:', req.body); // Ver qué llega
    const { clave } = req.body;
    
    console.log('Clave extraída:', clave); // Verificar la clave
    
    if (!clave) {
      return res.status(400).json({
        success: false,
        message: 'La clave es requerida'
      });
    }
    
    // Buscar encuesta
    const db = await connectDB();
    const collection = db.collection('encuestas');
    const encuesta = await collection.findOne({ clave: clave });

    if (!encuesta) {
      return res.status(404).json({
        success: false,
        message: 'Encuesta no encontrada'
      });
    }
    
    res.status(200).json({
      success: true,
      data: encuesta
    });
    
  } catch (error) {
    console.error('Error completo:', error); 
    res.status(500).json({
      success: false,
      message: 'Error al obtener la encuesta',
      error: error.message // Enviar detalles del error
    });
  }
});

const PORT = 3001;
app.listen(PORT, ()=>{
    console.log('servidor corriendo en el puerto'+ PORT);
});