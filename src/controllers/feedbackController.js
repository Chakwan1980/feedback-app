import { pool } from '../utils/db.js';  // Asegúrate de tener el path correcto

// Agregar feedback
export const addFeedback = async (title, text) => {
    const query = `INSERT INTO feedback (title, text) VALUES ($1, $2) RETURNING *;`;
    try {
        const result = await pool.query(query, [title, text]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al agregar feedback:', error);
        throw new Error('No se pudo agregar el feedback');
    }
}

// Obtener todos los feedback
export const getAllFeedback = async () => {
    const query = `SELECT * FROM feedback;`;
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener feedback:', error);
        throw new Error('No se pudo obtener el feedback');
    }
}

// Eliminar feedback por título
export const deleteFeedbackByTitle = async (title) => {
    const query = `DELETE FROM feedback WHERE title = $1 RETURNING *;`;
    try {
        const result = await pool.query(query, [title]);
        if (result.rowCount === 0) {
            throw new Error('No se encontró feedback con ese título');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error al eliminar feedback:', error);
        throw new Error('No se pudo eliminar el feedback');
    }
}
