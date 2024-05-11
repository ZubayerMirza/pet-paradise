import React, { useEffect, useState,useRef } from 'react';
import './MiddleChat.css';
import socket from '../home/websocket';
import { FiSend } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
function MiddleChat(props: any, ref: React.MutableRefObject<string>, SentMessage: any) {
  
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
  
    const [messageList, setMessageList] =useState<string[]>([]);
    // console.log('list:',messageList);
      
  //   useEffect(()=>{
  //     console.log(messageList)
  //  },[messageList])

    // console.log('chat active ' + props.currentChat);

    const message = useRef('');

    const Send =(e:any)=>{
      if(e.key&&e.key==="Enter"){
        socket.emit("message",message.current,(res:"string")=>{
          console.log("message from server:", res)
        })
        props.SentMessage(message.current);
        props.TestMessage(message.current);
        // message.current="";
        e.target.value="";
    
      }
      // props.messageList.map((data: string)=>{
      //   console.log(data)
      //   })
      // console.log(message.current)
     }
     useEffect(()=>{
        // socket.emit("message",message.current,(res:"string")=>{
        //     console.log("message from users:", res)
        //   })e
     },[message.current])
    

    const SetMessage=(e: any)=>{
      e.preventDefault();
      props.SentMessage(message.current);
      message.current=e.target.value;
    }

    useEffect(()=>{
      socket.emit("message",message.current,(res:"string")=>{
          console.log("message from users:", res)
        })

      
   },[])

     return <>
     
     {props.currentChat!==''? 
     <div className="middleChatBox">
      {/* chatbox */}
      <div className="chat-contents">
      {/* <div>{props.Ref.current}</div> */}
      { props.messageList.map((data: string, index: number)=>{
      return <><div key={index}>{data}</div></>
      })}

      </div>
    {/* message input */}
     <div className="chat-Input">
     <div id="plus-icon"><GoPlusCircle /></div>
     {/* <form onSubmit={Send}> */}
      <div className="message-submit">
      
      <input type="text" onKeyDown={Send} onChange={SetMessage} placeholder="Try the chat"></input>
      <button onClick={Send}><FiSend style={{width:'20px',height:'20px'}}/></button>
      </div>
      {/* </form> */}
      </div>
            {/* </div> */}
            </div> : <Cover></Cover>}</>
}

export function Cover (){
    return <><div className="middleBox">Click the chat</div></>
}
export default MiddleChat;
 