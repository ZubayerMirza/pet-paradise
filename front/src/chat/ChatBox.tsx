import React, {useState } from "react";
import "../home/home.css";
import { useEffect } from "react";
import Test from "../pets/Test";
import MiddleChat from "../middle/MiddleChat";
import ChatSideBox from "../leftside/ChatSideBox";
import { FaRegUserCircle } from "react-icons/fa";
import socket from "../home/websocket";

function ChatBox(props:any) {

   // value checking with clicked one - for chatside
  const [currentChat, setCurrentChat] = useState('');
  function Click(clickedChat: string) {
    // console.log(clickedChat);
    setCurrentChat(clickedChat);
    return clickedChat;
  }

  useEffect(() => {
    console.log("currentChat : ", currentChat);
  }, [{ currentChat }]);


  //for chatbox
  const [allUser,setAllUser] = useState([]);
  const [allMsg,setAllMsg]=useState([])
 


  useEffect(()=>{
    console.log('response : ',allMsg);
   
  },[{allMsg}])

  useEffect(() => {
    socket.on("connection", () => {
      console.log(socket.id);
    });

    socket.emit('userIn',props.data.username,(res: string)=>{
      console.log(res)
    });

    socket.emit('findOnline',(allList:[])=>{
      setAllUser(allList);
      });
   
    socket.on("findOnline",(allList:[])=>{
        // console.log('ssssss: ',allList)
        setAllUser(allList);
      })
    
      socket.on("onetoone",(res: [])=>{
        if(res){
          // console.log('res',res)
          setAllMsg(res)
        }
      })
  }, []);

  useEffect(() => {
   console.log('alluser: ', allUser);
  },[{allUser}])

  return (
    <div className="body">
    {/* chat sidebar */}
    <ChatSideBox Click={Click} allUser={allUser} data={props.data}></ChatSideBox>
    {/* chat body */}
    <MiddleChat
            currentChat={currentChat} //indicate the username
            data={props.data}
            allMsg={allMsg}
          ></MiddleChat>

    {/* rightbar */}
    <div className="right">
          <div className="right-inner1"><Test data={props.data}></Test></div>
          <div className="right-inner" >
            {/* @ Friends here @
            <FriendBox /> */}<div style={{padding:"1px"}}>@ Friends @</div>
            <hr className="hr"></hr>
             {allUser.map((data:{username:string, socketId:string},
      index:number) => 
     <>
      {`${data.username}`=== `${props.data.username}` ? 
      (null ) :
      (<>
      <div className="chat-side-inner" >
          <div className="chat-img" id={`${data.username}`} >
              <FaRegUserCircle/></div>
          <div className="chat-user" id={`${data.username}`} >{data.username}</div>
      </div>
      { 
        allUser.length !== index+1 ? 
        <hr className="hr"></hr> : null
      }   
        </>
      )}
         
    </>)}
          </div>
        </div>
  </div>
  );
}
export default ChatBox;
