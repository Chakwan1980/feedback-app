import { errorHandler } from '../src/middleware/errorHandler';
import express from 'express';
import request from 'supertest';

const app = express();

app.use((req, res, next) => {
  // Simula un error para probar el errorHandler
  const error = new Error('Test error');
  next(error);
});

// Usar el errorHandler después de definir las rutas
app.use(errorHandler);

describe('errorHandler', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock para silenciar console.error
  });

  afterAll(() => {
    console.error.mockRestore(); // Restaurar el comportamiento original
  });

  it('should return 500 and error message for internal server error', async () => {
    const response = await request(app).get('/'); // Hacemos una petición a la ruta raíz

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
  });
});
