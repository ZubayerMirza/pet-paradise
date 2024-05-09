import React, { useEffect, useState } from "react";
import "./MiddleBox.css";
import Feed from "../components/Feed";

import socket from "../home/websocket";
function MiddleBox(props: any) {
  console.log(props.data.petname);
  // socket.emit("hi",props.data.petname,(res: any)=>{
  //   console.log("res", res)
  // })
  return (
    <>
      <div
        className="middleBox"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Feed />
      </div>
    </>
  );
}
export default MiddleBox;
