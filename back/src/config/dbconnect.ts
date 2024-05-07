import mysql from "mysql";
import {Sequelize} from "sequelize";

// this supposed to be changed with u guys's mysql information
const database = "petparadise"; // database name
const username = "root"; // username
const password = 'YourPassword'; // password


 // Create the sequelize instance with passing parameters
 const sequelize = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false //hide logging suchExecuting (default) 
});

// using seq.authenticate func
// test for the connection is okay
export const connectSQ = async () =>{
  try{
    await sequelize.authenticate(); 
  }catch(error){
    console.error('----- FAILED CONNECTION -----', error);
    throw (error);
  }
};

 // conndeck to the DB
 export const sql = mysql.createConnection({
  host: 'localhost',
  user: username,
  password: password
});

// connect and create the database 
export const connectSQL = () => {
  try {
    sql.connect();
    console.log("[--- SQL connect okay ---");
  }catch(error){
    // console.error('ERR with mySQL connect',error);
    // throw(error);
  }
}

// to create databasse in sql
export const createDB = () => {

  // sql.query(`show databases like '${database}'`, (err, response) => { // check for whether database is exist
  //   if (err) { // if there is no database
      sql.query(`create database ${database}`, (error) => {  // create the database in sql 
        if(error){
          if(error.errno === 1007){
            console.log('database exists -> creating is ignored');
          }
          // console.error('already existing database',error);
          // throw err; 
        }
      });
    } 
  //   console.log(response); //checking for the response
  // });
  // }

export const dropDB = () => {

  sql.query(`drop database petparadise`, (error) => {  // drop the table in sql 
    if(error){
      console.error('errrrrrrrrrrrr',error);
      // throw err; 
    }
  });
}


export default sequelize; 