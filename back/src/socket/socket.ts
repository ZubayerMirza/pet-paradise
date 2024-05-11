import { io } from "../index";

const user: string[] = [];
const msglist: string[] = [];

export interface userInfo {
    username: string,
    socketId: string
}    
export interface Message {
    username: string,
    socketId: string,
    message: string
    //created time? 
}
//chat
//socket_id
//name
export const socketFucntion=()=>{
   
    let list: userInfo[]=[];
    let msgList: Message[]=[];

    const userList = (username:string, socketId:string)=>{
        const Exist = list.find((test)=> test.username === username)
        if (!Exist){
            list.push({username,socketId});
        }  
        //fid user in the sql
    }
    const findOne =(username:string) =>{
        const user = list.find((test)=> test.username === username)
        return user?.socketId;
    } //find friends of socket

    const leave = (socketId:string)=>{
        list = list.filter((test)=> 
        { return test.socketId !== socketId})
    }

    const MsgList = (message:string, username:string, socketId:string)=>{
        msgList.push({username, socketId, message});
        return msgList;
    }

    io.on("connection",async(socket) => { //io.in <- get  socket<- client
        console.log("- Socket ID of this connection : ", socket.id);
        socket.emit("connection");
        // socket.join('room_test');
        // const socketId: string = socket.id;
        // socket.emit('login', socketId);
        // socket.to('socketid').emit('testing',socket.id);
        // socket.to("").emit("hello")
        
        socket.on("login", (user:string)=>{
            userList(user, socket.id);
            console.log('       - User : ',user," joined - ")
        })
       
        
        // socket.join('room_test');
        // socket.emit("connection",socket.id);
        
        socket.on("disconnect", (user: string)=>{
            const A = list.find((user)=>{return user.socketId === socket.id})
            leave(socket.id);
            console.log('       - User : ',A?.username," left -")
        })
    
        socket.emit("socketid",socket.id,(response: string)=>{
            console.log("success", socket.id);
            
          }); 

          socket.on("roomtest",async(info,func)=>{
            console.log("message from client", info.message, info.user, info.room)
            // func(MsgList(info.message,info.username,socket.id))
            // const user = findOne("bella");
            // io.to(`${user}`).emit("test",{
            //     to:"bella",
            //     from:message.username,
            //     message: message.message
            // });
            console.log("Before Enter : ",socket.rooms)
            socket.join(info.room);
            // func();
            console.log("After Join : ",socket.rooms)
            socket.to(info.room).emit("room_test",{
                message: info.message, 
                username:info.username, 
                room: info.room,
                test: "testing",
                socketId:socket.id})
            
             
                //secondone
            socket.emit("roomtest",{
                username: info.username,
                message: info.message, 
                socketId:socket.id})
            // getMsg(message); // to show the message
        });

    socket.on("roomtest1", async(info,func)=>{
            console.log(info);
            io.emit("roomtest1",{
                message:info.message,
                username:info.username,
                room: info.room,
                test: "global",
                socketId:socket.id 
            })
            // // nowork from here
            // socket.broadcast.emit('hello',"this is broad");
            // io.of('/petmain').emit('of_check', socket.id);
        })
        
        


          socket.on("message",async(message,func)=>{
            console.log("message from client", message)
            func(MsgList(message.message,message.username,socket.id))
            const user = findOne("bella");
            io.to(`${user}`).emit("test",{
                to:"bella",
                from:message.username,
                message: message.message
            });
            socket.emit("message",{username: message.username,message: message.message, socketId:socket.id})
            // getMsg(message); // to show the message
        });
        socket.on("no",async({sender,receiver,type},func)=>{
            const user = findOne(receiver);
            io.to(`${user}`).emit("test",{
                sender,
                type
            });
        })
        
        socket.on("pass",async (value,func)=>{
            getUSer(socket.id);
            console.log("login : ", value);
            func(user);
        })
    
        // function work when welcom applied
        socket.on("welcome",async (name,func)=>{
            console.log("petname from : response",name)
        });
        // socket.on("message",async (message,func)=>{
        //     console.log("petname from front",message)
        //     func("true")
        //     socket.emit("notify",message);

        //     getMsg(message);
        // });
        
        
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
    io.of("/login").on("connect", async(socket) => { 
        console.log('/login con : ',socket.id)
    })

    io.of("/petmain").emit("msg", "hello petmain")
   
    // // path doesn't work
    // io.path("/signup").on("connect",async(socket)=>{
    //     console.log("this is singup page", socket.id)
    // })

    // user.push('hello','man')
    // console.log(user);
    
}

const getUSer=(usr: string)=>{
    const a = user.find((test)=> test==='hello');
    if(a){
        //not add
    }
    else{
        user.push(usr);
    }
}
const getMsg=(msg: string)=>{
    msglist.push(msg)
    // taking user/socketid/message
}
