const connection = require('../infra/connection');

class Pet {
  create(pet, res) {
    const query = 'INSERT INTO Pets ?'
    connection.query(query, pet, (err) => {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        res.status(201).json(pet);
      }
    });
  }
}

module.exports = new Pet();