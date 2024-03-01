"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import mysql from "mysql";
const sequelize_1 = require("sequelize");
const database = "petparadise"; // database name
const username = "root"; // username
const password = 'ILoveSaewoo52'; // password
// Create the sequelize instance with passing parameters
const sequelize = new sequelize_1.Sequelize(database, username, password, {
    host: 'localhost',
    dialect: 'mysql'
});
exports.default = sequelize;
