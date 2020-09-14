const moment = require('moment');

const connection = require('../infra/connection');
class Atendimentos {

    create(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

        const atendimentoDatado = {...atendimento, dataCriacao, data }

        const sql = 'INSERT INTO Atendimentos SET ?';

        connection.query(sql, atendimentoDatado, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
    }
}

module.exports = Atendimentos;