import React, { useEffect, useState,useRef } from 'react';
import './MiddleChat.css';
import socket from '../home/websocket';
import { FiSend } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
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
  interface resList{
    sender: string,
    receiver: string,
    message:string //might need to change as date?
    //read or not to add here? 
  }
  let ResList: resList []=[];
  let msglist: msgList []=[];
  const [res,setRes]=useState<[]>([])
    // const [messageList, setMessageList] =useState<string[]>([]);
    const message = useRef('aaa');
    const username = useRef('');
    const [user,setUser] =useState('');
    const [msg,setMsg]=useState('');
    const [MSGs,setMSGs]=useState<typeof msglist>([]);
    const [test,setTest]=useState([])
    // const [set,setSet]=useState<typeof ResList>([]);
     const [set,setSet]=useState<typeof ResList>([]);
    const check= useRef(0);
    const usercheck = "daisy";

    const Send =(e:any)=>{
      console.log("test", e.target.id)
      if(e.key&&e.key==="Enter"){

        
        if(e.target.id ==="room"){
          setMsg(e.target.value);
          // console.log(props.data.username);
          socket.emit("roomtest",{
            message:e.target.value, 
            sender: `${user}`,
            receiver: props.currentChat})
          // socket.emit('login',e.target.value);
          e.target.value='';
          }
        // props.SentMessage(message.current);
        // props.TestMessage(message.current);
        // message.current="";
        e.target.value="";

      }
      else if(e.target.id ==="send"){
        //  보내기
        setMsg(message.current);
        socket.emit("roomtest",{
          message:message.current, 
          sender: `${user}`,
          receiver: props.currentChat})
      }
     }

    // const SetMessage=(e: any)=>{
    //   e.preventDefault();
    //   // props.SentMessage(message.current);
    //   // message.current=e.target.value;
    //   props.Ref.current = e.target.value;
    // }

  //   useEffect(()=>{
  //     socket.emit("message",message.current,(res:"string")=>{
  //         console.log("message from users:", res)
  //       })
  //  },[])
   
useEffect(()=>{
    console.log('msg : ', msg,'  user : ', user);
  },[msg])
  useEffect(()=>{
    console.log('msg : ', msg,'  user : ', user);
  },[username])

  useEffect(()=>{
 console.log("user : ", user)
  },[user]
  )
  useEffect(()=>{
    // console.log("List:  ", MSGs)
    // setSet({message: msg,username:user});
     },[MSGs]
     )

    useEffect(()=>{
      setUser(props.data.username);
      username.current = props.data.username;
      // console.log(props)
      // socket.emit('login',props.data.userId);
      socket.on("connection", async()=>{
        console.log("- Socket ID of this connection : ", socket.id);
      })

       //for global
    socket.on("roomtest1",(res?:object)=>{
      console.log(res)
    });

    socket.on("onetoone",(res: [])=>{
        if(res){
          // console.log('res',res)
          setTest(res)
        }
      })
    
    // socket.on("message",(res?:string)=>{
    //   console.log(res);
    // })

    socket.on("test",(res:object)=>{
      console.log(res);
    })
    // socket.on("roomtest",(res?:object)=>{
    //   console.log(res)
    // });
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

    const SetMessage=(e: any)=>{
      e.preventDefault();
      // props.SentMessage(message.current);
      message.current=e.target.value;
      
    }
   
  
     return <>
     
     {props.currentChat!==''? 
     //fetch the data 1-show contents, 2-new chat data insert
     <div className="middleChatBox">
      
      {/* chatbox */}
      <div className="chat-contents">
 {props.allMsg.map((data:{sender:string, receiver:string, message:string},
      index:number) => 
     <>
      {(`${data.sender}`=== `${props.data.username}`) 
      &&(`${data.receiver}`=== `${props.currentChat}`) ? 
       (<>{`${data.sender}`=== `${props.data.username}`? 
       (<div className="chat-sender">
       <div className="chat-sender-user" id={`${data.sender}`} >{data.message}</div>
       <div ><FaRegCircleUser /></div>
       {/* <div className="chat-img" id={`${data.sender}`} >{data.sender}</div> */}
   </div>) : (<div className="chat-receiver">
   <div ><FaRegCircleUser /></div>
              {/* <div className="chat-img" id={`${data.receiver}`} ><div ><FaRegCircleUser /></div>{data.receiver}</div> */}
              <div className="chat-receiver-user" id={`${data.receiver}`} >{data.message}</div>
          </div>)}
          </>
        ) : (`${data.receiver}`=== `${props.data.username}` )&&(`${data.sender}`=== `${props.currentChat}`) ?
        (<>{`${data.sender}`=== `${props.data.username}`? 
        (<div className="chat-sender">
        <div className="chat-sender-user" id={`${data.sender}`} >{data.message}</div>
        <div ><FaCircleUser /></div>
        {/* <div className="chat-img" id={`${data.sender}`} ><div ><FaCircleUser /></div>{data.sender}</div> */}
    </div>) : (<div className="chat-receiver"><div><FaCircleUser /></div>
               {/* <div className="chat-img" id={`${data.receiver}`} ><div><FaCircleUser /></div>{data.receiver}</div> */}
               <div className="chat-receiver-user" id={`${data.receiver}`} >{data.message}</div>
           </div>)}
           </>
         ) : (null)
     }  
    </>)}
{/* { set.map((data:resList, index: number)=>{
      <><div key={index}>`${data.message}`</div></>
      })} */}
      </div>

    {/* message input */}
     {/* <div className="chat-Input">
     <div id="plus-icon"><GoPlusCircle /></div>
      <div className="message-submit">
      <input type="text" onKeyDown={Send} onChange={SetMessage} placeholder="Try the chat"></input>
      <button onClick={Send}><FiSend style={{width:'20px',height:'20px'}}/></button>
      </div>
      </div> */}
  <div className="chat-Input">
     <div id="plus-icon"><GoPlusCircle /></div>
      <div className="message-submit">
      <input type="text" id="room" 
      onChange={SetMessage} 
      onKeyDown={Send} 
      placeholder="Try the chat">
      </input>
      {/* <button onClick={Send}>send</button> */}
      <button id="send" onClick={Send}><FiSend onClick={Send} id="send" style={{width:'20px',height:'20px'}}/></button>
      </div></div>
            </div>
             : <Cover></Cover>}</>
}

export function Cover (){
    return <><div className="middleBox">Click the chat</div></>
}
export default MiddleChat;
 