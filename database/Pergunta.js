const Sequelize = require('sequelize');
const connection = require ("./database");


const Pergunta = connection.define('perguntas',{
    titulo:{
        type : Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type : Sequelize.TEXT,
        allowNull: false
    }

});
// SINCRONIZA ISSO COM O BANCO DE DADOS ; CRIA A TABELA
// FORCE = FALSE --> SE A TABELA JA EXISTE ELE NAO CRIA
Pergunta.sync({force: false}).then(()=>{});

module.exports  = Pergunta;