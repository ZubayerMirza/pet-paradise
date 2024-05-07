import React, { useEffect, useState,useRef } from 'react';
import './MiddleBox.css';
import socket from '../home/websocket';
import { FiSend } from "react-icons/fi";
function MiddleChat(props: any) {

    useEffect(()=>{
        // console.log(props)
        socket.on("connect", ()=>{
          console.log("test", socket.id);
        })
        socket.emit("welcome",props.data.petname,(res:"string")=>{
          console.log("petname :", res)
        })
        // console.log(props.data.petname)
      },[])

      
     console.log('chat active ' + props.currentChat);
    
     const message = useRef('');
     const send =()=>{

     }
     useEffect(()=>{
        // socket.emit("message",message.current,(res:"string")=>{
        //     console.log("message from users:", res)
        //   })e
     },[message.current])

    const SetMessage=(e: any)=>{
        console.log(e.target)
    }
     return <>
     {props.currentChat!==''? 
     <div className="middleBox">{props.currentChat}
     <div className="chat-Input">
        <form onSubmit={send}>
            <input type="text"  onChange={SetMessage} style={{color: "black"}}placeholder="Try the chat"></input></form>
            <span><button><FiSend /></button></span></div>
            
            </div> : <Cover></Cover>}</>
}

export function Cover (){
    return <><div className="middleBox">Click the chat</div></>
}
export default MiddleChat;
 