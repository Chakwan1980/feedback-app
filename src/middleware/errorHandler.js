export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);  // Loguear la pila de errores para propósitos de depuración.

    // Verificar si el error tiene un código de estado específico (por ejemplo, 400, 404, etc.).
    const statusCode = err.status || 500;
    
    // Enviar una respuesta con un mensaje de error adecuado.
    res.status(statusCode).json({
        success: false,
        error: err.message || "Internal Server Error"
    });
};
