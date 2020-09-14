class Tables {
    init(connection) {
        this.connection = connection;
        this.createAttendance();
    }

    createAttendance() {
        const sql = `CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL 
            AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), 
            servico varchar(30) NOT NULL, data datetime NOT NULL, 
            dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, 
            observacoes text, PRIMARY KEY(id))`

        this.connection.query(sql, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Tabela atendimentos criada com sucesso!');
            }
        });
    }
}

module.exports = new Tables;