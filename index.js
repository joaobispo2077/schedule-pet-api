const customExpress = require("./src/config/customExpress");

const app = customExpress();

app.listen(3000, (req, res) => {
    console.log('Servidor Rodando na porta 3000')
});