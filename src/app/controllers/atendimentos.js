const Atendimentos = require('../models/atendimentos');

module.exports = (app) => {
    app.get('/atendimentos', (req, res) => {
        const atendimentos = new Atendimentos();

        atendimentos.index(res);

    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        const atendimentos = new Atendimentos();
        atendimentos.searchById(id, res);
    });

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;

        const atendimentos = new Atendimentos();

        atendimentos.create(atendimento, res);

    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const values = req.body;

        const atendimentos = new Atendimentos();
        atendimentos.uptade(id, values, res);
    });

}