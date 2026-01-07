const Employe = require('../models/employe');

exports.getEmploye = (req, res) => {
    try {
        const employe = new Employe("Dupont", "Jean", 2500.0);
        res.json(employe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
