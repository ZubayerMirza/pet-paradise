"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express, {Response, Request} from "express";
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("./routes/login"));
const dummyDB_1 = __importDefault(require("./models/dummyDB"));
const connect_1 = __importDefault(require("./config/connect"));
const cors_1 = __importDefault(require("cors"));
// // gonna keep working on the socket.io later
// import { Server } from "socket.io";
// import { createServer } from "http";
// // For socket.io 
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
// });
// io.on("connection", (socket) => {
// });
const app = (0, express_1.default)(); // To call a server 
app.use((0, cors_1.default)()); // To communicate with resources from others
app.use(express_1.default.json()); // to pass the data 
// fuctions for the database
(0, connect_1.default)(); // test and connect to DB
(0, dummyDB_1.default)(); // test, create the table for DB with some datas
// set up the env variable for the port
app.set('port', process.env.PORT || 8000);
const PORT = app.get('port');
// Root path 
app.get('/', (request, response) => {
    response.send('Test Sver');
});
// router for api
app.use('/', login_1.default);
// Server connection on port 8000
app.listen(PORT, () => {
    console.log(`Port ${PORT} is working`);
});
