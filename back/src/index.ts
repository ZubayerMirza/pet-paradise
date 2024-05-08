import express from "express";
import router from "./routes/api";
import create from "./models/dummyDB";
import connect from "./config/connect";
import cors from "cors";
import test from "./models/testDB"
import { Server } from "socket.io"; 
import { createServer } from "http"; // create server using http

// from so.io type script document version
// interface ServerToClientEvents{
//     noArg: () => void;
//     basicEmit: (a:number, b: string, c: Buffer)=> void;
//     withAck: (d:string, callback: (e:number)=>void)=>void;
// }

// interface ClientToServerEvents{
//     hello: () => void;
// }

// interface InterServerEvents {
//     ping: () => void;
// }
// interface SocketData{
//     name:string;
//     age: number;
// }

const app = express(); // To call a server 
app.use(cors()); // To communicate with resources from others
app.use(express.json()); // to pass the data 
app.use(express.urlencoded({extended: false})); // not work


// // set up the env variable for the port
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



// For socket.io 
const httpServer = createServer(app);  
// export const io = new Server<ClientToServerEvents,ServerToClientEvents,InterServerEvents,SocketData>(httpServer, {
//     //set up the cors to allow communicate with the front server 
//     cors:{
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"],
//         credentials: true,
//     }
// });
export const io = new Server(httpServer, {
    //set up the cors to allow communicate with the front server 
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    }
});
// to use the server for communication
// testing : each connection will have own socket.id
io.on("connection",async(socket) => { //io.in <- get  socket<- client
    console.log("test", socket.id);

    socket.on("disconnect", ()=>{
        console.log("finish");
    })
    socket.on("welcome",async (name,func)=>{
        console.log("petname from : response",name)
    });
    socket.on("message",async (name,func)=>{
        console.log("petname from : response",name)
    });
    
//     socket.emit("noArg");
//     socket.emit("basicEmit", 1,"2", Buffer.from([3]));
//     socket.emit("withAck", "4", (e)=>{
//         console.log(e);
//     })
//     //broadcast to all
// io.emit("noArg");
// //works when broadcasting to a room
// io.to("room1").emit("basicEmit", 1,"2", Buffer.from([3]))

});



io.sockets.on('connection', function(socket){
   
    // socket.on('hi',async(id:string, f:any)=>{
    //     io.sockets.emit('hi',id);
    // })
})
// io.on("disconnect", () => {
//     console.log("finish chat");
// });
// io.emit('event', {message: 'hello'});
// // io.emit
// io.on("hi",async(id:string, f:any)=>{
// console.log("back", id);
// })

// router to organize and manage efficiently
app.use('/', router);




 


httpServer.listen(PORT,()=>{
    console.log('socket server is working');
})



