import { io } from "../index";
import Users from "../models/users";



export interface userInfo {
    username: string 
    socketId: string
}    
export interface Message {
    username: string,
    socketId: string,
    message: string
    //created time? 
} 
interface resList{
    sender: string,
    receiver: string,
    message:string //might need to change as date?
    //read or not to add here? 
  }
//chat
export const socketFucntion=()=>{
const user: string[] = [];
const msglist: string[] = [];



    // let username: string = "";
    let list: userInfo[]=[];
    let msgList: Message[]=[];
    let allMsg: resList[]=[];

    // used in in login and pet-main page
    const userList = async (username: string, socketId:string)=>{
        // incase of user socket io is reboot, one more of querying and update
        await Users.findOne({ where: { id: username } }).then(
            (res) => {
                if (username == res?.dataValues.username) {
                    res.set({ socketId: socketId, isLogin: true });
                    res.save();
                }
        })
        const Exist = list.find((test)=> test.username === username)
        if (!Exist){
            list.push({username,socketId});
        }  
        // console.log(list)
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


    const setMsg=(sender: string,
        receiver: string,
        message: string)=>{
    const Check = allMsg.find((test)=> test.sender === sender &&test.receiver === receiver && test.message === message)
    if (!Check){
        allMsg.push({sender,receiver,message});
    } }
   
    const findAllMsg = ()=>{
        return allMsg;
    }

    const findAll = ()=>{
        return list;
    }

    const findOne = (username:string) =>{
        // await Users.findOne({ where: { id: username } }).then(
        //     (res) => {
        //         if (username == res?.dataValues.username) {
        //             console.log(res?.dataValues.socketId)
        //             return res?.dataValues.socketId;
        //         }
        // })
        const Exist = list.find((test)=> test.username === username)
        if (Exist){
        //    console.log(Exist.socketId)
           return Exist.socketId
        }  
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
 
        socket.on("socketid", async(func)=>{
            const socketId: string = socket.id;
                func(socketId);
        })

        socket.on("userIn", async(username, func)=>{
                userList(username, socket.id);
                console.log('       [User  joined] ',username," : ",socket.id)
                func({res: "succeess"});
        })

        // find online friend
        socket.on("findOnline", async(func)=>{
            const allList = findAll();
            console.log(allList);
            func(allList);

            // to indicate that userlist updated
            io.emit("findOnline", allList);
            })
        
        socket.on("disconnect", (user: string)=>{
            const A = list.find((user)=>{return user.socketId === socket.id})
            leave(socket.id);
            console.log('       - User : ',A?.username," left -")
        })
    
       
          // test for the chat
          socket.on("roomtest",async(info,func)=>{
            console.log("sender :", info.sender ," receiver : ", info.receiver, "message : " , info.message)
            setMsg(info.sender,info.receiver,info.message);
            const receiverId = findOne(info.receiver);
            console.log(receiverId);
            const allMSG = findAllMsg();
            // io.to(`${receiverId}`).emit("onetoone",allMSG);
            io.emit("onetoone",allMSG);

            // func(MsgList(info.message,info.username,socket.id))
            // const user = findOne("bella");
            // io.to(`${user}`).emit("test",{
            //     to:"bella",
            //     from:message.username,
            //     message: message.message
            // });

            // console.log("Before Enter : ",socket.rooms)
            // socket.join(info.room);
            // // func();
            // console.log("After Join : ",socket.rooms)
            
            // socket.to(info.room).emit("room_test",{
            //     message: info.message, 
            //     username:info.username, 
            //     room: info.room,
            //     test: "testing",
            //     socketId:socket.id})
             
             
            //     //secondone
            // socket.emit("roomtest",{
            //     username: info.username,
            //     message: info.message, 
            //     socketId:socket.id})
            // // getMsg(message); // to show the message
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
            // console.log("message from client", message)
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
    });
}

