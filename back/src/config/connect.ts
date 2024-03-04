import sequelize from "./dbconnect";

// using seq.authenticate func
// test for the connection is okay
const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('----- CONNECTED -----');
      } catch (error) {
        console.error('----- FAILED CONNECTION -----', error);
      }
  };

export default connect; 