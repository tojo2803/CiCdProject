const Employe = require('../app/models/employe');

describe('Employe - setSalaire', () => {

    test('doit accepter un salaire positif', () => {
        const employe = new Employe('Dupont', 'Jean', 2000);
        expect(employe.salaire).toBe(2000);
    });

    test('doit lever une exception si le salaire est négatif', () => {
        expect(() => {
            new Employe('Dupont', 'Jean', -100);
        }).toThrow('Le salaire ne peut pas être négatif');
    });

});
