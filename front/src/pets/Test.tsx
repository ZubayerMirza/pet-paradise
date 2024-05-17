"use client";
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import "./getpet.css";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./profile.css";
import { FaHeart } from "react-icons/fa6";
import { GiDogBowl } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import PetModel from "./PetModel";
import socket from "../home/websocket";

function Test(props: any) {
  function TestScene() {
    const image = useLoader(
      GLTFLoader,
      "/marshal_from_animal_crossing/scene.gltf"
    );
    const mesh = useRef<THREE.Mesh>(null!);
    image.scene.scale.set(-2.5, 2.5, 2.5);

    useFrame(() => {
      if (image.scene.position.y == -8.119999999999916) {
        mesh.current.rotation.y -= 0.015;
      } else {
        image.scene.position.y -= 0.02;
      }
    });

    return (
      <>
        <mesh ref={mesh}>
          <primitive object={image.scene} />
        </mesh>
      </>
    );
  }
  // console.log(props.data)

  const affectionRef = useRef(props.data.status * 0.97);
  // const goldRef =useRef(props.data.gold*0.97);
  const hungerRef = useRef(props.data.hunger * 0.97);

  console.log(props.data.hunger * 0.9);
  // {
  //     "petId": 1,
  //     "petname": "aa",
  //     "typeId": 2,
  //     "userId": 1,
  //     "StorageId": 1,
  //     "myLevel_Id": 1,
  //     "gold": 9999,
  //     "status": 70,
  //     "hunger": 60
  // }
  const navigate = useNavigate();
  // const navigate = useNavigate(); // hook to navigate
  const [isLogin, setIsLogin] = useState(false);
  const [msg, setMsg] = useState("");

  return (
    <>
      <div className="profile-box">
        <div className="profile-inner-box1">
          {/* <Canvas className="canvas" camera={{position:[-1.5,1,10]}}>
              <OrbitControls />
              <ambientLight intensity={1} />
              <spotLight decay={0} angle={50} position={[10,10,100]}></spotLight>
              <pointLight decay={0} position={[10,50,-10]} ></pointLight>
              <directionalLight position={[-100,30,10]} intensity={3} color={"white"}></directionalLight>
              <TestScene></TestScene>
            </Canvas> */}
          <PetModel />
        </div>
        <div className="profile-inner-box2">
          <div className="pet-name"> {props.data.petname} </div>
          {/* <div className="pet-info-box"> 
          <div className="pet-info-inner">type id: {props.data.typeId}</div>
          <div className="pet-info-inner1">type id: {props.data.typeId}</div>
          </div> */}

          <div className="pet-info-box">
            <div style={{ color: "rgba(232, 58, 104, 0.817)" }}>
              <FaHeart />
            </div>
            <div className="pet-bars">
              {/* status{props.data.status} */}
              <div
                className="pet-bars-inner"
                style={{ width: `${affectionRef.current}%` }}
              ></div>
            </div>
          </div>
          <div className="pet-info-box">
            <div style={{ color: "rgba(0, 65, 177, 0.947)" }}>
              <GiDogBowl />
            </div>
            <div className="pet-bars">
              {/* hunger{props.data.hunger} */}
              <div
                className="pet-bars-inner"
                style={{ width: `${hungerRef.current}%` }}
              ></div>
            </div>
          </div>
          <div className="pet-info-box">
            <div style={{ color: "rgba(255, 175, 4, 0.916)" }}>
              <GrMoney />
            </div>
            <div className="pet-bars">
              {" "}
              {props.data.gold}
              {/* <div className="pet-bars-inner" ></div> */}
            </div>
          </div>
          {/* <div className="pet-info">myLevel_Id {props.data.myLevel_Id}</div> */}
        </div>
      </div>
    </>
  );
}

export default Test;
