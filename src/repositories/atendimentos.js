const query = require('../infra/database/queries');

class Atendimento {
  create(atendimento) {
    const sql = 'INSERT INTO Atendimentos SET ?';
    return query(sql, atendimento);
  }
}

module.exports = new Atendimento();