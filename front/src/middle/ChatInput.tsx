import React, { useEffect, useState,useRef } from 'react';
import './MiddleChat.css';
// import socket from '../home/websocket';
import { FiSend } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
function ChatInput(props: any) {
  
    // useEffect(()=>{
    //     // console.log(props)
    //     socket.on("connection", ()=>{
    //       console.log("test", socket.id);
    //     })
    //     socket.emit("welcome",props.data.petname,(res:"string")=>{
    //       console.log("petname :", res)
    //     })
    //     // console.log(props.data.petname)
    //   },[])
//   const [messageList, setMessageList] =useState<string[]>([]);
//   console.log('list:',messageList);
    
      
//     console.log('chat active ' + props.currentChat);
//     console.log(props)
//     const message = useRef('');

//     const Send =(e:any)=>{
//       if(e.key&&e.key==="Enter"){
//         socket.emit("message",message.current,(res:"string")=>{
//           console.log("message from users:", res)
//         })
//         setMessageList([...messageList,message.current]);
//         message.current="";
//       }
//       console.log(message.current)
//      }
//      useEffect(()=>{
//         // socket.emit("message",message.current,(res:"string")=>{
//         //     console.log("message from users:", res)
//         //   })e
//      },[message.current])
//      useEffect(()=>{
//       console.log(messageList)
//    },[messageList])

//     const SetMessage=(e: any)=>{
//       e.preventDefault();
//         message.current=e.target.value;
//     }

//     useEffect(()=>{
//       socket.emit("message",message.current,(res:"string")=>{
//           console.log("message from users:", res)
//         })
//    },[])

     return <>
    
    {/* message input */}
     <div className="chat-Input">
     <div id="plus-icon"><GoPlusCircle /></div>
     {/* <form onSubmit={Send}> */}
      <div className="message-submit">
      {/* <input type="text"   onKeyDown={Send} onChange={SetMessage} placeholder="Try the chat">`${message.current}`</input>
      <button onClick={Send}><FiSend style={{width:'20px',height:'20px'}}/></button> */}
        <input type="text"     placeholder="Try the chat"></input>
      <button ><FiSend style={{width:'20px',height:'20px'}}/></button>
      </div>
      {/* </form> */}
      </div>
 </>
}


export default ChatInput;
 