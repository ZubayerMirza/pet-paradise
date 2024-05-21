import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Casino from "./Casino";
import Login from "./users/Login";
// import Home from "./front/Home";
import Main from "./home/Home";
import AnotherHeader from "./header/Header";
import SignUp from "./users/Signup";
import GetPet from "./pets/GetPet";
import MyPet from "./pets/MyPet";
import Pet from "./pets/Pet";
import Items from "./items/Items";
import Friend from "./friends/Friend";
import socket from "./home/websocket";
import ChatBox from "./chat/ChatBox";

import Stats from "./components/Stats";
import { Following } from "./components/Following";
import { Follower } from "./components/Follower";
import AllUsers from "./components/AllUsers";
import Profile from "./components/Profile";
import UpdateProfilePage from "./components/UpdateProfilePage";
import History from "./components/History";
import Battle from "./components/Battle";
import BattleUsers from "./components/BattleUsers";
import Leaderboard from "./components/Leaderboard";
import { string } from "three/examples/jsm/nodes/shadernode/ShaderNode";


// interface info{
//   socketId: string, 
//   name:string
// }

function App() {
//   let info : info;
//   // const userToken = localStorage.getItem("userToken");
//   // const isAuthenticated = !!userToken;
//   const [isLogin,setIsLogin] =useState(false);
//   const [socketId,setSocketId] =useState('');
//   const [testcase, setTestcase]=useState<typeof info>({socketId: "", name: ""})
//   const [check,setCheck]=useState('');
//   const [off,setOff]=useState(false);

//   useEffect(()=>{
//     socket.emit("socketid", (res:string) => {
//       // console.log(res);
//       setSocketId(res)
//     });

//     socket.emit("head", (res:boolean) => {
//       setIsLogin(res)
//       console.log(res);
//     });

//     socket.on('settrue',(res:info)=>{
//       setTestcase(res);
//     })
//     socket.on('setfalse',(res:string)=>{
//       setCheck(res);
//       // if(res === socketId){
//       //   console.log('hohoy: ', res);
//       // }
//     })
    
//   }
//   ,[])
//   useEffect(()=>{
//     if(check ===socketId){
      
//     }
// },[{check}])
//   useEffect(()=>{
//       // console.log('socketId : ', socketId);
//   },[{socketId}])

//   useEffect(()=>{
//     console.log('testcase : ', testcase);
//     console.log(testcase?.socketId)
//     if(testcase?.socketId !== undefined){
//       console.log(testcase.socketId)
//       if(testcase?.socketId===socketId){
//        setIsLogin(true);
//       }
//     }
// },[{testcase}])

  return (
    <div className="root-bgimg">
      <Router>
         {/* goni */}
        {/* <AnotherHeader testcase={testcase} isLogin={isLogin}/>  */}
        <Routes>
        <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/pet" element={<Pet />}></Route>
          <Route path="/petget" element={<GetPet />}></Route>
          <Route path="/petmain" element={<MyPet />}></Route>
          <Route path="/items" element={<Items />}></Route>
          <Route path="/friends" element={<Friend />}></Route>
          <Route path="/chat" element={<ChatBox />}></Route>

          {/* Zubayer's various pages */}
          <Route path="/update" element={<UpdateProfilePage />} />
          <Route path="/following/:userId" element={<Following />} />
          <Route path="/follower/:userId" element={<Follower />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/user/:userId" element={<Profile />} />
          <Route path="/stats/:userId" element={<Stats />} />
          <Route path="/history/:userId" element={<History />} />
          <Route path="/battle" element={<BattleUsers />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/battle/:userId" element={<Battle />} />
          {/* Zubayer's old pages from pet raising game */}
          {/* <Route path="/petgame" element={<SocialPage />} /> */}
          <Route path="/Casino" element={<Casino />} />
          {/* <Route path="/SocialPage" element={<PetGame />} /> */}
          {/* <Route path="/ShopPage" element={<ShopPage />} /> */}
          {/* <Route path="/BoughtFoodPage" element={<BoughtFoodPage />} /> */}
         
       
        </Routes>
      </Router>
    </div>
  );
}

export default App;
