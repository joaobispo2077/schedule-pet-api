const connection = require('../infra/connection');
class Atendimentos {

    create(atendimento) {

        const sql = 'INSERT INTO Atendimentos SET ?';

        connection.query(sql, atendimento, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
    }
}

module.exports = Atendimentos;