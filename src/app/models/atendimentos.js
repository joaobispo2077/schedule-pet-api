const moment = require('moment');

const connection = require('../infra/connection');
class Atendimentos {

    index(res) {

        const sql = 'SELECT * FROM Atendimentos';

        connection.query(sql, (err, results) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(results);
            }
        })
    }

    searchById(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;




        connection.query(sql, (err, result) => {
            const atendimento = result[0];
            if (err) {
                res.tatus(400).json(err);
            } else {
                res.status(200).json(atendimento);
            }
        })
    }

    create(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

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
                    console.log(result);
                    res.status(201).json({ atendimento }); // 201 Created w Success
                }
            });
        }


    }

    uptade(id, values, res) {
        if (values.data) {
            values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        }

        const sql = 'UPDATE Atendimentos SET ? Where id=?'

        connection.query(sql, [values, id], (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                console.log(result);
                res.status(200).json({...values, id });
            }
        });
    }

    delete(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id = ?';

        connection.query(sql, id, (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json({ id });
            }
        })
    }
}

module.exports = Atendimentos;