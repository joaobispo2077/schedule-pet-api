const moment = require('moment');

const connection = require('../infra/connection');
class Atendimentos {

    create(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

        const isValidDate = moment(data).isSameOrAfter(dataCriacao);
        const isValidName = atendimento.cliente.length >= 4;

        const validations = [

            {
                nome: 'data',
                valido: isValidDate,
                mensagem: 'A data deve ser maior ou igual que a data atual'
            },
            {
                nome: 'nome',
                valido: isValidName,
                mensagem: 'O nome do cliente deve ter pelo menos 4 caracteres'
            }
        ];

        const errors = validations.filter((validation) => !validation.valido);
        const areThereErrors = errors.length;

        if (areThereErrors) {
            res.status(400).json(errors);
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data }

            const sql = 'INSERT INTO Atendimentos SET ?';

            connection.query(sql, atendimentoDatado, (err, result) => {
                if (err || !isValidName, !isValidDate) {
                    res.status(400).json(err); //400 Bad Request
                } else {
                    res.status(201).json(result); // 201 Created w Success
                }
            });
        }

    }
}

module.exports = Atendimentos;