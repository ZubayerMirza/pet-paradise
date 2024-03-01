// import mysql from "mysql";
import {Sequelize} from "sequelize";

const database = "petparadise"; // database name
const username = "root"; // username
const password = 'ILoveSaewoo52'; // password

// Create the sequelize instance with passing parameters
const sequelize = new Sequelize(database, username, password, {
    host: 'localhost',
    dialect: 'mysql'
  });

export default sequelize; 