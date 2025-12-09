const express = require("express");
const cors = require("cors");
const path = require("path");
const { connectDB } = require("./db");
const bcrypt = require("bcryptjs");
const { error } = require("console");
const { ObjectId } = require("mongodb");
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

    const existe = await collection.findOne({ nombre });
    if (existe) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const resultado = await collection.insertOne({
      nombre,
      password: hashedPassword,
      tipo,
      creadoEn: new Date()
    });

    res.json({ success:true, mensaje: "Usuario creado", id: resultado.insertedId });

  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: error.message });
  }
});


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
    const {tituloEncuesta, descripcionEncuesta, clave, idUsuario, datos} = req.body;

    if (!tituloEncuesta || !descripcionEncuesta || !idUsuario){
      return res.status(400).json({error: "completa los campos requeridos"});
    }

    const db = await connectDB();
    const resultado = await db.collection('encuestas').insertOne({
      tituloEncuesta,
      descripcionEncuesta,
      clave,
      idUsuario: new ObjectId(idUsuario),  // ← siempre ObjectId
      datos,
      creado: new Date()
    });

    res.json({success:true, mensaje:"Encuesta creada correctamente", id:resultado.insertedId});

  } catch(error){
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

app.post('/obtenerEncuestaID', async (req, res) => {
  try {
    const { idEncuesta } = req.body;

    if (!idEncuesta) {
      return res.status(400).json({ success: false, message: "Falta idEncuesta" });
    }

    const db = await connectDB();
    const collection = db.collection("encuestas");

    const encuesta = await collection.findOne({ _id: new ObjectId(idEncuesta) });

    if (!encuesta) {
      return res.status(404).json({ success: false, message: "Encuesta no encontrada" });
    }

    res.json({ success: true, data: encuesta });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/guardarRespuestas", async(req,res)=>{
    try{
        const {idEncuesta,idUsuario,respuestas} = req.body;

        const db = await connectDB();

        await db.collection("respuestas").insertOne({
            idEncuesta: new ObjectId(idEncuesta),  // convertir correctamente
            idUsuario: new ObjectId(idUsuario),
            respuestas,
            fecha: new Date()
        });

        res.json({success:true,message:"Respuestas guardadas exitosamente"});
        
    }catch(e){
        console.log(e);  // 👈 MOSTRAR EL ERROR REAL EN CONSOLA
        res.json({success:false,message:"Error al guardar"});
    }
});

app.get("/encuestasUsuario/:idUsuario", async (req, res) => {
    try {
        const idUsuario = req.params.idUsuario;

        const db = await connectDB();
        const encuestas = await db.collection("encuestas")
            .find({ idUsuario: new ObjectId(idUsuario) })   // ← Buscar solo del usuario
            .toArray();

        res.json({ success:true, encuestas });

    } catch (error) {
        console.error("Error en /encuestasUsuario:", error);
        res.status(500).json({ success:false, message:"Error al obtener encuestas", error:error.message });
    }
});


app.get("/obtenerNombreUsuario/:idUsuario", async (req, res) => {
    try {
        const idUsuario = req.params.idUsuario;

        if (!idUsuario) {
            return res.status(400).json({ success:false, message:"Falta idUsuario" });
        }

        const db = await connectDB();
        const usuario = await db.collection("usuarios").findOne({ _id: new ObjectId(idUsuario) });

        if (!usuario) {
            return res.json({ success:false, message:"Usuario no encontrado" });
        }

        res.json({
            success: true,
            nombre: usuario.nombre
        });

    } catch (error) {
        console.error("Error en /obtenerNombreUsuario:", error);
        res.status(500).json({ success:false, message:"Error interno", error:error.message });
    }
});


const PORT = 3001;
app.listen(PORT, ()=>{
    console.log('servidor corriendo en el puerto'+ PORT);
});