const request = require('supertest');
const app = require('../app');

describe('GET /api/employe', () => {

    test('doit retourner un employé codé en dur', async () => {
        const response = await request(app).get('/api/employe');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('nom');
        expect(response.body).toHaveProperty('prenom');
        expect(response.body).toHaveProperty('salaire');
        expect(response.body.salaire).toBeGreaterThanOrEqual(0);
    });

});
