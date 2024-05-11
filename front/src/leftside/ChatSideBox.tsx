import React, { useEffect, useState } from 'react';
import './ChatSideBox.css';
import { useRef } from 'react';
import MiddleChat from '../middle/MiddleChat';
// import { ClickChecker } from '../middle/MiddleChat';
import { FaRegUserCircle } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

function ChatSideBox(props:any) {
    // const targetcolor = useRef('white');
    // users in chat is needed instead of testcase -> fetch  n
    const testcase = ['A','B','C','D','E','F','G','H'];
    const prevClick = useRef('');
    // const chatClick = useRef('');
    
    // const count = useRef(0)
    // const [Test,SetTest] =useState({prev:"", current:"", white:"true"});
    const onclickHandler=(e: any)=>{
        e.preventDefault();
        // console.log('cu' + prevClick.current)
    // isClick.current = e.target.innerHTML;
    let  A = e.target;
    // count.current +=1;
        // console.log(e.target.value)
    if(prevClick.current!=e.target.innerHTML){
        prevClick.current=e.target.innerHTML
    }
    props.Click(e.target.innerHTML);
    // console.log(e.target.innerHTML);
    // prevClick.current=e.target.
    // target.current =A.innerHTML;
    // console.log(A.innerHTML);
    // props.Change(A.innerHTML);
    // if((ClickChecker(A.innerHTML))===true){
    //     if(prevClick.current === A.innerHTML){
    //         A.style.backgroundColor ="grey";
    //         A.style.opacity="40%";
    //         A.style.color='white';
    //         console.log('yes')
    //     }
        
    //     prevClick.current=A.innerHTML;
    // }
    return ChatSideBox
}

  return (
  <>
  <div className='leftBox'>
    <div className="serch-box">
    <input className="chat-finder"></input>
    <div className="img"><FaMagnifyingGlass /></div>
    </div>
    {testcase.map((data,index) => 
    <>
    <div className="chat-side-inner" style={(prevClick.current == data) ? {backgroundColor:'#95a7b26b',fontSize: '20px',fontWeight: 'bold'} : {}} key = {index} onClick={onclickHandler}>
        <div className="chat-img"><FaRegUserCircle className='chat-online'/>{data}</div>
        
        <div className="chat-user">{data}</div>
        </div>
        { testcase.length !== index+1 ? <hr className="hr"></hr> : null
        }       
    </>
    )}
    {/* <div className="chat-side-inner" key = {index} onClick={onclickHandler} style={{backgroundColor:`${targetcolor.current}`}}>{data}</div>)} */}
    </div>
  </>
  );
}
export default ChatSideBox;
