import React, { useEffect, useState,useRef } from 'react';
import './MiddleChat.css';
import socket from '../home/websocket';
import { FiSend } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";

function MiddleChat(props: any, ref: React.MutableRefObject<string>, SentMessage: any) {
  
  interface msg{
    username: string,
    message: string
  }
  interface msgList{
    username: string,
    message: string,
    socketId:string //might need to change as date?
    //read or not to add here? 
  }
  let msglist: msgList []=[];
    // const [messageList, setMessageList] =useState<string[]>([]);
    const message = useRef('');
    const [user,setUser] =useState('');
    const [msg,setMsg]=useState('');
    const [MSGs,setMSGs]=useState<typeof msglist>([]);
    const [set,setSet]=useState({});
    const check= useRef(0);
    const usercheck = "daisy";

    const Send =(e:any)=>{
      if(e.key&&e.key==="Enter"){

        if(e.target.id ==="msg"){
          //  보내기
          setMsg(e.target.value);
          e.target.value='';
        }
        else if(e.target.id ==="room"){
          setMsg(e.target.value);
          socket.emit("roomtest",{
            message:e.target.value, 
            username:user,
            room: "ABC"})
          // socket.emit('login',e.target.value);
          e.target.value='';
          }
        else{
          setUser(e.target.value)
          // socket.emit('login',e.target.value);
          e.target.value="";
        }

        socket.emit("message",message.current,(res:"string")=>{
          console.log("message from server:", res)
        })


        props.SentMessage(message.current);
        props.TestMessage(message.current);
        // message.current="";
        e.target.value="";

      }else if(e.target.id==="personal"){
        console.log("hello")
        socket.emit("roomtest1",{
          message:"daisy", 
          username:user,
          room: "global"})
      }
      else if(e.target.id==="roomchat"){
  
      }
     }

    const SetMessage=(e: any)=>{
      e.preventDefault();
      props.SentMessage(message.current);
      message.current=e.target.value;
    }

  //   useEffect(()=>{
  //     socket.emit("message",message.current,(res:"string")=>{
  //         console.log("message from users:", res)
  //       })
  //  },[])
   
useEffect(()=>{
    console.log('msg : ', msg,'  user : ', user);

    // setSet({message:msg,username:user});
  },[msg])

  useEffect(()=>{
 console.log("user : ", user)
//  setSet({message: msg,username:user});
  },[user]
  )
  useEffect(()=>{
    // console.log("List:  ", MSGs)
    // setSet({message: msg,username:user});
     },[MSGs]
     )
 
     useEffect(()=>{

      socket.emit("message",set,(res:msgList[])=>{
        console.log("message from users:", res)
        // msglist.push(res);
        msglist=res;
        // console.log(res)
        // setMSGs(msglist);
        console.log("List:  ", msglist)
      })
      // setSet({...set,message: msg});
    },[set])
  
    useEffect(()=>{
      // console.log("props" , props.data.userId)
      // socket.emit('login',props.data.userId);
      socket.on("connection", async()=>{
        console.log("- Socket ID of this connection : ", socket.id);
  
      })

       //for global
    socket.on("roomtest1",(res?:object)=>{
      console.log(res)
    });

    socket.on("message",(res?:string)=>{
      console.log(res);
    })

    socket.on("test",(res:object)=>{
      console.log(res);
    })
    socket.on("roomtest",(res?:object)=>{
      console.log(res)
    });
    socket.on("room_test",(res?:any)=>{
      console.log(res)

     //  if(res?.username===usercheck){
     //   check.current+=1;
     //  }
    });

    socket.on("roomtest1",(res?:any)=>{
     console.log(res)
     if(res?.username===usercheck){
      check.current =+1;
      console.log(res?.username, usercheck)
      console.log('this correck')
     }
   });
   socket.on("of_check",(res?: string)=>{
     console.log("of - check :",res)
    //  if(res?.username===usercheck){
    //   check.current+=1;
    //  }
   });

    },[])
  
     return <>
     
     {props.currentChat!==''? 
     //fetch the data 1-show contents, 2-new chat data insert
     <div className="middleChatBox">
      
      {/* chatbox */}
      <div className="chat-contents">
    
      { props.messageList.map((data: string, index: number)=>{
      return <><div key={index}>{data}</div></>
      })}

      </div>

    {/* message input */}
     <div className="chat-Input">
     <div id="plus-icon"><GoPlusCircle /></div>
      <div className="message-submit">
      <input type="text" onKeyDown={Send} onChange={SetMessage} placeholder="Try the chat"></input>
      <button onClick={Send}><FiSend style={{width:'20px',height:'20px'}}/></button>
      </div>
      </div>


   
  {/* <div className="chat-Input"><input type="text" onKeyDown={Send} placeholder="guest"></input></div>
  <div className="chat-Input"><input type="text" id="room" onKeyDown={Send} placeholder="room"></input></div> */}
  <div className="chat-Input">
     <div id="plus-icon"><GoPlusCircle /></div>
      <div className="message-submit">
      <input type="text" id="msg"onKeyDown={Send} placeholder="Try the chat"></input>
      {/* <button onClick={Send}>send</button> */}
      {/* <button id="roomchat" onClick={Send}>join</button> */}
      <button id="personal"onClick={Send}><FiSend style={{width:'20px',height:'20px'}}/></button>
      </div></div>


            </div>


             : <Cover></Cover>}</>
}

export function Cover (){
    return <><div className="middleBox">Click the chat</div></>
}
export default MiddleChat;
 