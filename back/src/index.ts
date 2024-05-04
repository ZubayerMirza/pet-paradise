import express from "express";
import router from "./routes/api";
import create from "./models/dummyDB";
import connect from "./config/connect";
import cors from "cors";
import test from "./models/testDB"

const app = express(); // To call a server 
app.use(cors()); // To communicate with resources from others
app.use(express.json()); // to pass the data 
app.use(express.urlencoded({extended: false})); // not work


// set up the env variable for the port
app.set('port', process.env.PORT || 8000);
const PORT = app.get('port');

// connect to sql, create tables, connect to sequelize
connect();
 // test, create the table for DB with some datas
create(); 
// //for testing myself 
test();

// Root path 
app.get('/', (request, response) => {
    response.json('Test Sver');
})

// router to organize and manage efficiently
app.use('/', router);

// Server connection on port 8000
app.listen (PORT, () => {
    console.log(`Port ${PORT} is working`);
});

/* ignore - gonna keep working on the socket.io later

import { Server } from "socket.io";
import { createServer } from "http";

// For socket.io 
const httpServer = createServer(app);
const io = new Server(httpServer, {
});

io.on("connection", (socket) => {
});
*/

