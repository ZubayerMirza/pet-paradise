import mysql from "mysql"; // Make sure you have the TypeScript types for mysql if needed

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1zubayer",
  database: "pet_social_media",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  }
  console.log("Connected to database!");
});
export default db;
