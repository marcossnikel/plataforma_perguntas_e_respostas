//Aqui iremos criar nossa conexão com o Sequelize 
//Conectando o Banco de Dados/JS/Sequelize

const Sequelize = require('sequelize');

const connection = new Sequelize('asktask', 'root','12345',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;


