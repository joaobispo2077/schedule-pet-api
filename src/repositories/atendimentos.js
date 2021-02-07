const query = require('../infra/database/queries');

class Atendimento {
  create(atendimento) {
    const sql = 'INSERT INTO Atendimentos SET ?';
    return query(sql, atendimento);
  }

  index() {
    const sql = 'SELECT * FROM Atendimentos';
    return query(sql);
  }
}

module.exports = new Atendimento();