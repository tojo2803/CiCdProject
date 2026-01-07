const request = require('supertest');
const app = require('../app');
const Employe = require('../app/models/employe');

describe('Test d’intégration - Employe API', () => {

    test('GET /api/employe renvoie un employé valide', async () => {
        const response = await request(app).get('/api/employe');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('nom');
        expect(response.body).toHaveProperty('prenom');
        expect(response.body).toHaveProperty('salaire');
    });

    test('Le salaire renvoyé est cohérent avec le modèle', async () => {
        const response = await request(app).get('/api/employe');

        // Créer un objet Employe avec le même salaire
        const employeTest = new Employe(
            response.body.nom,
            response.body.prenom,
            response.body.salaire
        );

        expect(employeTest.salaire).toBe(response.body.salaire);
    });

    test('Tester setSalaire avec une valeur négative via le modèle', async () => {
        expect(() => {
            new Employe('Test', 'Negatif', -100);
        }).toThrow('Le salaire ne peut pas être négatif');
    });

});
