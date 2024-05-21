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
import ChatBox from "../chat/ChatBox";
import FriendsBox from "../friends/FriendsBox";
function Header(props: any) {
  const body = useRef("");
  // console.log(props.data)
  // console.log(props.data.StorageId);

  const navigate = useNavigate();
  const [link, SetLink] = useState("");
  // const navigate = useNavigate(); // hook to navigate
  const [isLogin, setIsLogin] = useState(false);

  const onclickHandler = (e: any) => {
    e.preventDefault();
  
    if (e.target.id == "logout") {
      navigate("/login");
      //to do=> set islogin as false 
    } else if (e.target.id == "chat") {
      body.current= "chat";
    } else if (e.target.id == "friend") {
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
            <div className="navi-contents" onClick={onclickHandler} id="chat">
              Chat
            </div>
            <div className="navi-contents" onClick={onclickHandler} id="friend">
              Friend
            </div>
            <div className="navi-contents" onClick={onclickHandler} id="item">
              Item
            </div>
            <div className="navi-contents" onClick={onclickHandler} id="logout">
              Logout
            </div>
          </div>
        </div>
      </div>

      {body.current === "chat" ?
      (<ChatBox data={props.data}/>) : 
      body.current === "friend" ? 
      (<FriendsBox data={props.data}/>) : 
      (<div className="body">
       <LeftBox ></LeftBox>
       <MiddleBox  ></MiddleBox>
       <div className="right">
            <div className="right-inner1"> 
            <Test data={props.data}></Test></div>
            <div className="right-inner"> @ Friends shortcut here @ <FriendBox /></div>
          </div>
        </div>)}
        
    </>
  );
}

export default Header;
