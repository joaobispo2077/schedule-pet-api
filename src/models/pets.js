const connection = require('../infra/database/connection');
const upload = require('../utils/upload');
class Pet {
  create(pet, res) {
    const query = 'INSERT INTO Pets SET ?'

    upload(pet.imagem, pet.nome, (err, savePath) => {
      if (err) return res.status(400).json({ message: err });

      const savePet = {
        nome: pet.nome,
        imagem: savePath
      }

      connection.query(query, savePet, (err) => {
        if (err) {
          console.log(err);
          res.status(400).json(err);
        } else {
          res.status(201).json(savePet);
        }
      });

    });

  }
}

module.exports = new Pet();