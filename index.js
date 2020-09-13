const customExpress = require("./src/config/customExpress");
const connection = require('./src/app/database/connection');

const Tables = require('./src/app/database/tables');

connection.connect((err) => {
    if (err) {
        console.log(err);

    } else {

        console.log('Conectado com sucesso!');

        Tables.init(connection);


        const app = customExpress();

        app.listen(3000, (req, res) => {
            console.log('Servidor Rodando na porta 3000')
        });

    }
})