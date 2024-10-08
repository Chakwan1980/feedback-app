export const sendSuccess = (res, data, message = "Anfrage erfolgreich.") => {
    res.status(200).json({
        success: true,
        message,
        data
    });
};

export const sendError = (res, error, statusCode = 500) => {
    // Mejor manejo del mensaje de error.
    const errorMessage = typeof error === 'string' ? error : error.message || 'Interner Serverfehler';
    
    res.status(statusCode).json({
        success: false,
        error: errorMessage
    });
};
