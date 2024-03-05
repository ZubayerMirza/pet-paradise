import express from "express";
import router from "./routes/login";
import create from "./models/dummyDB";
import connect from "./config/connect";
import cors from "cors";

// // gonna keep working on the socket.io later
// import { Server } from "socket.io";
// import { createServer } from "http";

// // For socket.io 
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
// });

// io.on("connection", (socket) => {
// });

const app = express(); // To call a server 
app.use(cors()); // To communicate with resources from others
app.use(express.json()); // to pass the data 
// app.use(express.urlencoded({extended: false})); // not work


// set up the env variable for the port
app.set('port', process.env.PORT || 8000);
const PORT = app.get('port');

// Root path 
app.get('/', (request, response) => {
    response.send('Test Sver');

    // fuctions for the database
    connect(); // test and connect to DB
    create(); // test, create the table for DB with some datas
})

// router for api
app.use('/', router);

// Server connection on port 8000
app.listen (PORT, () => {
    console.log(`Port ${PORT} is working`);
});
