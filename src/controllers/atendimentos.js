const Atendimentos = require('../models/atendimentos');

module.exports = (app) => {
    const atendimentos = new Atendimentos();
    app.get('/atendimentos', (req, res) => atendimentos.index(res));

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        atendimentos.searchById(id, res);
    });

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;

        atendimentos.create(atendimento, res);

    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const values = req.body;

        atendimentos.uptade(id, values, res);
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        atendimentos.delete(id, res);
    });

}