import { body, validationResult } from 'express-validator';

export const feedbackValidation = [
    // Validación del campo 'title'
    body('title').notEmpty().withMessage("Titel ist erforderlich."),
    // Validación del campo 'text'
    body('text').notEmpty().withMessage("Text ist erforderlich."),
    // Manejo de errores de validación
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                errors: errors.array() 
            });
        }
        next();
    }
];
