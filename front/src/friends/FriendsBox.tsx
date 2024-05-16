import React, { useRef, useState } from "react";
import "../home/home.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Test from "../pets/Test";
import MiddleChat from "../middle/MiddleChat";
import ChatSideBox from "../leftside/ChatSideBox";
import socket from "../home/websocket";
import LeftBox from "../leftside/LeftBox";
import Friend from "./Friend";

function FriendsBox(props:any) {
//  console.log(props.data)
  return (
  <div className="body">
   <LeftBox></LeftBox>
   <div className="middle-friend-box">
   <Friend data={props.data}></Friend></div>
   <div className="right">
   <div className="right-inner1"> <Test data={props.data}></Test></div>
   <div className="right-inner"> @ Friends shortcut here @</div>
 </div></div>
  );
}
export default FriendsBox;