// import sequelize from "./dbconnect";
import {createDB, connectSQL, connectSQ } from "./dbconnect"; // not working 

/* 
 I had an error with windowsOS, 
 cuz version of mysql installed is differnet (version is above 8.0),
 if u have gotten any error related to 
 sqlMessage: 'Client does not support authentication protocol requested by server; consider upgrading MySQL client',        
 
 Here is commands to solve

 cd C:\Program Files\MySQL\MySQL Server 8.0\bin
 mysql -u root -p 
 -> after u entered by typing ur password for mysql

 SELECT Host,User,plugin,authentication_string FROM mysql.user;
 -> cuz plugin for root is caching_sha2_password 
 
 ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your password';
 -> change to mysql_native_password, then it will work
 */

// test for the connection is okay
const connect = async () => {

      connectSQL(); // call to connect to sql
      createDB(); // call to check and create the database in sql
      connectSQ(); // test for the connection   is okay along with sequelize

    };

export default connect; 