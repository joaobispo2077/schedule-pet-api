const moment = require('moment');
const axios = require('axios');

const connection = require('../infra/database/connection');
const repositories = require('../repositories/atendimentos');
class Atendimentos {
  constructor() {
    this.isValidDate = ({ date, createdDate }) => moment(date).isSameOrAfter(createdDate);
    this.isValidName = (length) => length >= 4;
    this.validate = (params) => this.validations.filter(field => {
      const { name } = field;
      const param = params[name];

      return !field.isValid(param);
    });

    this.validations = [{
        name: 'date',
        isValid: this.isValidDate,
        message: 'A data deve ser maior ou igual que a data atual'
      },
      {
        name: 'name',
        isValid: this.isValidName,
        message: 'O nome do cliente deve ter pelo menos 4 caracteres'
      }
    ];


  }

  index() {
    return repositories.index();
  }

  searchById(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;

    connection.query(sql, async(err, result) => {
      const atendimento = result[0];
      const cpf = atendimento.cliente;

      if (err) {
        res.tatus(400).json(err);
      } else {
        const { data } = await axios.get(`http://localhost:8082/${cpf}`);
        atendimento.cliente = data;
        res.status(200).json(atendimento);
      }
    })
  }

  create(atendimento) {
    const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
    const createdDate = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

    const validationParams = {
      date: {
        date,
        createdDate
      },
      cliente: { length: atendimento.cliente.length }
    }

    const errors = this.validate(validationParams);
    const areThereErrors = errors.length;

    if (areThereErrors) {
      return new Promise((reject) => reject(errors));
    } else {
      const atendimentoDatado = {...atendimento, dataCriacao, data }

      return repositories.create(atendimentoDatado)
        .then(results => {
          const id = results.insertId;
          return {...atendimento, id };
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