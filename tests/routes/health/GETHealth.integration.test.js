import request from 'supertest'
import { server, app } from '../../../src/index'

/**
 * El objetivo de este test de integración es probar
 * el endpoint para evaluar si la aplicación responde
 */
describe('GET ciudades y paises', () => {
    afterAll(() => {
        server.close()
    })

    test('should respond ok message', async () => {
        const response = await request(app.callback()).get('/health')
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: 'ok' })
    })
    test('deberia retornar 200 y un arreglo de ciudades del pais ingresado', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/france');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
    
    test('deberia retornar 200 y un mensaje que dice que no se encontraron ciudades', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/hormiga');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(0);
        expect(response.body).toEqual({
            "message": "No se encontraron ciudades para el país ingresado"
        })
    })
    test('deberia retornar 400 cuando se ingresan datos numericos', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/1234');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            "message": "Solo se aceptan caracteres no numéricos"
        })
        
    })
    test('deberia retornar 400 si el largo del string es menor a 3', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/ab');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            "message": "El país/ciudad ingresado debe tener al menos 3 caracteres"
        })
    })
    test('deberia retornar 400 si el largo del string es menor a 3', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/ab');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            "message": "El país/ciudad ingresado debe tener al menos 3 caracteres"
        })
    })
    
})

