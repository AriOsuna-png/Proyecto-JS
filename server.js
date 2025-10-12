const express = require("express");
const cors = require("cors");
const path = require("path");
const { connectDB } = require("./db");
const bcrypt = require("bcryptjs");



const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde public/
app.use(express.static(path.join(__dirname, "public")));

// Endpoint API para crear usuario  
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

app.post("/login", async (req, res) => {
  try {
    const { nombre, password } = req.body;
    if (!nombre || !password) {
      return res.status(400).json({ error: "nombre y password requeridos" });
    }

    const db = await connectDB();
    const collection = db.collection("usuarios");

    const usuario = await collection.findOne({ nombre });
    if (!usuario) {
      return res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
    }

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      return res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
    }

    // ⚠️ NO devolvemos la contraseña
    const { password: _pw, ...userSafe } = usuario;

    res.json({
      mensaje: "Login exitoso",
      usuario: userSafe   // ✅ Incluye el tipo desde la BD
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

