// src/server.js
import express from 'express';
import cors from 'cors';
import feedbackRouter from './routes/feedbackRoutes.js';
import { createTable } from './db.js';
import { errorHandler } from './middleware/errorHandler.js'; // Importar el middleware

const app = express();
const PORT = 3000;

// Configuración de CORS
app.use(cors());
// Middleware para parsear JSON
app.use(express.json());

// Crear la tabla de retroalimentación
createTable();

// Rutas
app.use('/', feedbackRouter);

// Middleware de manejo de errores
app.use(errorHandler); // Asegúrate de que este middleware esté al final

// Iniciar la aplicación
app.listen(PORT, () => {
    console.log(`Server laeuft auf http://localhost:${PORT}`);
});
