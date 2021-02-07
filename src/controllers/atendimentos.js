const Atendimentos = require('../models/atendimentos');

module.exports = (app) => {
  const atendimentos = new Atendimentos();
  app.get('/atendimentos', (req, res) =>
    atendimentos
    .index()
    .then(results => res.json(results))
    .catch(err => res.status(400).json(err)));

  app.get('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    atendimentos.searchById(id, res);
  });

  app.post('/atendimentos', (req, res) => {
    const atendimento = req.body;

    atendimentos.create(atendimento)
      .then(atendimentoCadastrado => res.status(201).json(atendimentoCadastrado))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });

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