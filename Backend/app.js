const express = require('express');
const cors = require('cors');
const employeController = require('./app/controllers/employeController');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/employe', employeController.getEmploye);

if (require.main === module) {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Backend lancé sur http://localhost:${PORT}`);
    });
}

module.exports = app;
