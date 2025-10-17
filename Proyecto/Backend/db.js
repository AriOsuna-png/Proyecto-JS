const { MongoClient } = require("mongodb");

// Cambia TU_PASSWORD por tu contraseña de MongoDB Atlas
const uri = "mongodb+srv://jesusrmamirez123_db_user:Topolobampo123@encuestas.tune38j.mongodb.net/Encuesta?retryWrites=true&w=majority&appName=encuestas";

const client = new MongoClient(uri);

async function connectDB() {
  try {
    if (!client.isConnected?.()) {
      await client.connect();
      console.log("✅ Conectado a MongoDB Atlas");
    }
    return client.db("Encuesta");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    throw error;
  }
}

module.exports = { connectDB, client };
