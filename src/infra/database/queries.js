const connection = require('./connection');

const execQuery = (query, params = '') => {
  return new Promise((resolve, reject) => {

    connection.query(query, params, (err, results, fields) => {
      if (err) reject(err);

      resolve(results);
    });
  });
}

module.exports = execQuery;