const moment = require('moment');

const connection = require('../infra/connection');
class Atendimentos {

    create(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

        const atendimentoDatado = {...atendimento, dataCriacao, data }

        const sql = 'INSERT INTO Atendimentos SET ?';

        connection.query(sql, atendimentoDatado, (err, result) => {
            if (err) {
                res.status(400).json(err); //400 Bad Request
            } else {
                res.status(201).json(result); // 201 Created w Success
            }
        });
    }
}

module.exports = Atendimentos;