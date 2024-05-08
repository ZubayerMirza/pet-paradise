import React, { useEffect, useState } from 'react';
import './MiddleBox.css';

import socket from '../home/websocket';
function MiddleBox(props: any) {

  console.log(props.data.petname)
  // socket.emit("hi",props.data.petname,(res: any)=>{
  //   console.log("res", res)
  // })
  return (
  <><div className="middleBox">feed</div></>
  );
}
export default MiddleBox;
