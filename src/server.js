import express from 'express';
import cors from 'cors';
import feedbackRouter from './routes/feedbackRoutes.js';
import { createTable } from './db.js';

// Crear la aplicación express
const app = express();
const PORT = 3000;

// Configuración de CORS
app.use(cors());
// Middleware para parsear JSON
app.use(express.json());

// Creación de la tabla de feedbacks y manejo de errores
const startServer = async () => {
    try {
        // Asegurarse de que la tabla se haya creado antes de iniciar el servidor
        await createTable();
        console.log('Tabla de feedback creada o ya existente.');
        
        // Uso del router
        app.use('/', feedbackRouter);

        // Iniciar la aplicación
        app.listen(PORT, () => {
            console.log(`Server laeuft auf http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al crear la tabla o iniciar el servidor:', error);
    }
};

// Llamar a la función para iniciar el servidor
startServer();
