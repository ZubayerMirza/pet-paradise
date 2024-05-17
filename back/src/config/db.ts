// Database file that is used to connect
// Use your password
import mysql from "mysql";

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "PasswordGoni90!",
//   database: "petparadise",
// });

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1zubayer",
  database: "petparadise",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  }
  console.log("Connected to database!");
});
export default db;
