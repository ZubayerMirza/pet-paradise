import mysql from "mysql2";
import { Sequelize } from "sequelize";

const database = "pet_social_media"; // database name
const username = "root"; // username
const password = "1zubayer!"; // password

const sequelize: Sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "mysql",
});

export const connectSQ = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};

export const createDB = async (databaseName: string) => {
  try {
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${databaseName};`);
    console.log(`Database ${databaseName} created or already exists.`);
  } catch (error) {
    console.error("Failed to create database:", error);
    throw error;
  }
};

// Initialize database and connection
export const initializeDatabase = async () => {
  await createDB(database);
  await connectSQ();
};

export default sequelize;
