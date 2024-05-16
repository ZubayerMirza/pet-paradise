import React, { useEffect, useState } from 'react';
import './ChatSideBox.css';
import { useRef } from 'react';
// import { ClickChecker } from '../middle/MiddleChat';
import { FaRegUserCircle } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import socket from '../home/websocket';

function ChatSideBox(props:any) {
     // const targetcolor = useRef('white');
    // users in chat is needed instead of testcase -> fetch  n

    const prevClick = useRef('');
    const [user,setUSer] = useState('');
    const onclickHandler=(e: any)=>{
        e.preventDefault();

  //  console.log(e.target.id)
    if(prevClick.current!==e.target.id){
        prevClick.current=e.target.id
    }
    setUSer(e.target.id)
   
    // props.Click("name : ",e.target.id);

    return ChatSideBox
}

useEffect(()=>{
props.Click(user);
},[ {user}])

  return (
  <>
  <div className='chatSideBox'>
    <div className="serch-box">
    <input className="chat-finder"></input>
    <div className="img"><FaMagnifyingGlass /></div>
    </div>
     {props.allUser.map((data:{username:string, socketId:string},
      index:number) => 
     <>
      {`${data.username}`=== `${props.data.username}` ? 
      (null ) :
      (<>
      <div className="chat-side-inner" 
            id={`${data.username}`} 
            style={(prevClick.current == `${data.username}`) ? {backgroundColor:'#95a7b26b',fontSize: '20px',fontWeight: 'bold'} : {}} 
            key = {index} 
            onClick={onclickHandler}>
          <div className="chat-img" id={`${data.username}`} >
              <FaRegUserCircle className='chat-online'/></div>
          <div className="chat-user" id={`${data.username}`} >{data.username}</div>
      </div>
      { 
        props.allUser.length !== index+1 ? 
        <hr className="hr"></hr> : null
      }   
        </>
      )}
         
    </>)}
    </div>
  </>
  );
}
export default ChatSideBox;
