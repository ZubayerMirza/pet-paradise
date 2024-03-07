// import sequelize from "./dbconnect";
import {createDB, connectSQL, connectSQ } from "./dbconnect"; // not working 


// test for the connection is okay
const connect = async () => {

      connectSQL(); // call to connect to sql
      createDB(); // call to check and create the database in sql
      connectSQ(); // test for the connection is okay along with sequelize

    };

export default connect; 