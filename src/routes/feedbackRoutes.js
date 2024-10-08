import express from 'express';
import { addFeedback, getAllFeedback, deleteFeedbackByTitle } from '../controllers/feedbackController.js';
import { feedbackValidation } from '../middleware/validation.js';
import { sendSuccess, sendError } from '../utils/responseHelper.js';

const feedbackRouter = express.Router();

// POST /feedback - Agrega nuevo feedback
feedbackRouter.post('/feedback', feedbackValidation, async (req, res) => {
    try {
        const { title, text } = req.body;
        const newFeedback = await addFeedback(title, text);
        sendSuccess(res, newFeedback, "Feedback erfolgreich gespeichert.");
    } catch (error) {
        console.error("Error al guardar feedback:", error); // Registro de error para más detalles
        sendError(res, "Fehler beim Speichern des Feedbacks.", 500);
    }
});

// GET /feedback - Retorna todos los feedbacks
feedbackRouter.get('/feedback', async (req, res) => {
    try {
        const feedback = await getAllFeedback();
        sendSuccess(res, feedback, "Feedback erfolgreich abgefragt.");
    } catch (error) {
        console.error("Error al obtener feedback:", error);
        sendError(res, "Fehler beim Abruf des Feedbacks.", 500);
    }
});

// DELETE /feedback/:title - Elimina feedback por título
feedbackRouter.delete('/feedback/:title', async (req, res) => {
    try {
        const { title } = req.params;
        const result = await deleteFeedbackByTitle(title);
        sendSuccess(res, null, "Feedback erfolgreich geloescht.", 204); // 204 No Content para éxito en eliminación
    } catch (error) {
        console.error("Error al eliminar feedback:", error);
        sendError(res, "Fehler beim Loeschen des Feedbacks.", 500);
    }
});

export default feedbackRouter;
