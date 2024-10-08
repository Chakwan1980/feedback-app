import pkg from 'pg';

const { Pool } = pkg;

// Validación de variables de entorno para prevenir problemas de configuración
if (!process.env.DB_USER || !process.env.DB_HOST || !process.env.DB_NAME || !process.env.DB_PASSWORD || !process.env.DB_PORT) {
    throw new Error("Faltan una o más variables de entorno requeridas para conectar a la base de datos.");
}

// Crear una nueva instancia de Pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// Función para crear la tabla de feedback
const createTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS feedback (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                text TEXT NOT NULL
            );
        `);
        console.log('Tabla feedback creada o ya existente.');
    } catch (error) {
        console.error('Error al crear la tabla: ', error);
        throw error; // Lanzar el error para que sea manejado en otro nivel si es necesario
    }
}

export { pool, createTable };
