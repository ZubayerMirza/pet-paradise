import express from "express";
import router from "./routes/api";
import create from "./models/dummyDB";
import connect from "./config/connect";
import cors from "cors";
import test from "./models/testDB";
import { Server } from "socket.io";
import { createServer } from "http"; // create server using http
import { socketFucntion } from "./socket/socket";

const app = express(); // To call a server

const corsOptions = {
  origin: "http://localhost:3000", // Allow only http://localhost:3000 to access
  credentials: true, // Allow cookies and authentication headers
};
app.use(cors(corsOptions));
//app.use(cors()); // To communicate with resources from others
app.use(express.json()); // to pass the data
app.use(express.urlencoded({ extended: false })); // not work

// // set up the env variable for the port
app.set("port", process.env.PORT || 8000);
const PORT = app.get("port");

// connect to sql, create tables, connect to sequelize
connect();
// test, create the table for DB with some datas
create();
// //for testing myself
test();

// Root path
app.get("/", (request, response) => {
  response.json("Test Sver");
});

// For socket.io
const httpServer = createServer(app);
export const io = new Server(httpServer, {
  //set up the cors to allow communicate with the front server
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// to comunicate with socket
socketFucntion();

// router to organize and manage efficiently
app.use("/", router);

httpServer.listen(PORT, () => {
  console.log("socket server is working");
});
