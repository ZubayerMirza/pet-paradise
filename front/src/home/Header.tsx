import React, { useRef, useState } from "react";
import "./home.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import Friend from "../friends/Friend";
import MyPet from "../pets/MyPet";
import Test from "../pets/Test";
import LeftBox from "../leftside/LeftBox";
import "./home.css";
import MiddleBox from "../middle/MiddleBox";
import Feed from "../components/Feed";
import MiddleChat from "../middle/MiddleChat";
import ChatSideBox from "../leftside/ChatSideBox";
import { FriendBox } from "../components/FriendBox";
// import { Click } from '../leftside/ChatSideBox';
// console.log(props.data.hunger*0.9)
import socket from "./websocket";

function Header(props: any) {
  const body = useRef("");
  const side = useRef("LeftBox");
  // console.log(props.data)
  // console.log(props.data.StorageId);

  const navigate = useNavigate();
  const [link, SetLink] = useState("");
  // const navigate = useNavigate(); // hook to navigate
  const [isLogin, setIsLogin] = useState(false);

  const onclickHandler = (e: any) => {
    e.preventDefault();
    // if(e.target.id ==="login"){
    //   navigate('/login');
    // }
    // if(e.target.id==="game"){
    //   navigate('petgame');
    // }
    if (e.target.id == "Link") {
      navigate("/login");
    } else if (e.target.id == "pet") {
      SetLink("pet");
      side.current = "ChatSideBar";
      body.current = "MiddleChat";
    } else if (e.target.id == "logout") {
      navigate("/login");
    } else if (e.target.id == "friend") {
      // SetLink('friends');
      side.current = "SideBar";
      body.current = "friend";
    } else if (e.target.id == "item") {
      navigate("/items", {
        state: {
          petname: props.data.petname,
          petId: props.data.petId,
          userId: props.data.userId,
          typeId: props.data.typeId,
          StorageId: props.data.StorageId,
        },
      });
    }

    setIsLogin(true);
    if (isLogin == true) {
      setIsLogin(false);
    }

    // if(e.target.id== "p1"){
    //     setIsLogin(false);
    //     console.log(isLogin)
    // }
  };

  const NaviLink = () => {
    if (link == "friends") {
      return (
        <>
          <Friend data={props.data}></Friend>
        </>
      );
    } else if (link == "pet") {
      return (
        <>
          <Test data={props.data}></Test>
        </>
      );
    } else {
      return (
        <>
          <Test data={props.data}></Test>
        </>
      );
    }

    // if(link == "item"){

    //   navigate('/items',{
    //       state: { petname: props.data.petname,
    //         petId: props.data.petId,
    //         userId: props.data.userId,
    //         typeId: props.data.typeId,
    //         StorageId: props.data.StorageId
    //       }});

    // }
  };

  const [currentChat, setCurrentChat] = useState('');

  //// value checking with clicked one
  function Click(clickedChat: string) {
    // console.log(clickedChat);
    setCurrentChat(clickedChat);
    return clickedChat;
  }

  useEffect(() => {
    console.log("currentChat : ", currentChat);
  }, [{ currentChat }]);

  const [messageList, setMessageList] = useState<string[]>([]);
  // console.log('list:',messageList);
  const [user, setUser] = useState('');

  useEffect(() => {
    console.log("list : ", messageList);
  }, [messageList]);

  const msg = useRef("");
  useEffect(() => {
    // console.log("message : ",msg)
  }, [msg.current]);

  const SentMessage = (msgfrom: string) => {
    msg.current = msgfrom;
  };
  const TestMessage = (msg: string) => {
    setMessageList([...messageList, msg]);
  };

  const [allUser,setAllUser] = useState([]);

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

    socket.on("roomtest1",(res: any)=>{
      console.log('ssssss: ',res)
    })
  }, []);

  useEffect(() => {
   console.log('alluser: ', allUser);
  },[{allUser}])

  return (
    <>
      <div className="header">
        <div className="header-box">
          {isLogin === true ? (
            <div className="Logo">
              <img src={Logo} style={{ height: "80px" }} alt="logo"></img>
            </div>
          ) : (
            <div className="Logo">
              <img src={Logo} style={{ height: "80px" }} alt="logo"></img>
            </div>
          )}
        </div>
        <div className="navi-box">
          <div className="navi-innerbox"></div>
          {/* <div className="navi-contents" onClick ={onclickHandler} id="p1"></div> */}
          <div className="navi-innerbox">
            <div className="navi-contents1">
              <p>Hello, {props.data.petname}</p>{" "}
            </div>
            <div className="navi-contents" onClick={onclickHandler} id="pet">
              Pet
            </div>
            <div className="navi-contents" onClick={onclickHandler} id="item">
              Item
            </div>
            <div className="navi-contents" onClick={onclickHandler} id="friend">
              Friend
            </div>
            <div className="navi-contents" onClick={onclickHandler} id="chat">
              chat
            </div>
            <div className="navi-contents" onClick={onclickHandler} id="logout">
              Logout
            </div>
          </div>
        </div>
      </div>

      <div className="body">
        {/* sidebar */}
        {side.current === "ChatSideBar" ? (
          <ChatSideBox Click={Click} allUser={allUser} data={props.data}></ChatSideBox>
        ) : <LeftBox></LeftBox> || side.current === "SideBar" ? (
          <LeftBox></LeftBox>
        ) : (
          <LeftBox></LeftBox>
        )}

        {/* middlebox */}
        {/* currentChat -> make taking id of frineds */}
        {body.current === "MiddleChat" ? (
          <MiddleChat
            currentChat={currentChat} //indicate the username
            data={props.data}
            SentMessage={SentMessage}
            TestMessage={TestMessage}
            messageList={messageList}
            Ref={msg}
          ></MiddleChat>
        ) : <MiddleBox></MiddleBox> && body.current === "friend" ? (
          <Friend data={props.data}></Friend>
        ) : (
          <MiddleBox data={props.data}></MiddleBox>
        )}

        {/* rightbar */}
        <div className="right">
          <div className="right-inner1"> {NaviLink()}</div>
          <div className="right-inner">
            @ Friends here @
            <FriendBox />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
