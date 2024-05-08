"use client"
import React, { useState, useRef  } from 'react';
import './getpet.css';
import { Canvas, useFrame,useLoader} from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import "./profile.css";


function PetModel (props: any) {
  
  function Scene(){
    const image=useLoader(GLTFLoader, "/fox/scene.gltf");
    // const image=useLoader(GLTFLoader, "/chick/scene.gltf");
    // const image=useLoader(GLTFLoader, "/marshal_from_animal_crossing/scene.gltf");
    const mesh = useRef<THREE.Mesh>(null!);
    image.scene.scale.set(-2.5,2.5,2.5);
  
   //fox 
  //  -4.859999999999984

    useFrame(()=>{
      //fox -> camera z 14
      if(image.scene.position.y == -4.859999999999984){
        mesh.current.rotation.y -=0.015;
      }
      else{
        image.scene.position.y -= 0.02;
        // console.log(image.scene.position.y)
      }

      // // chick
      // // -2.600000000000002
      // if(image.scene.position.y ==  -0.06){
      //   mesh.current.rotation.y -=0.015;
      // }
      // else{
      //   image.scene.position.y -= 0.02;
      //   console.log(image.scene.position.y)
      // }

      // //default
      // if(image.scene.position.y == -8.119999999999916){
      //   mesh.current.rotation.y -=0.015;
      // }
      // else{
      //   image.scene.position.y -= 0.02;
      //   console.log(image.scene.position.y)
      // }
    })
  
    return(<>
    <mesh ref={mesh}>
      <primitive object={image.scene} />
    </mesh>
    </>)
  }

  return (
  <>
            <Canvas className="canvas" camera={{position:[-1.5,1,14]}}>
              <OrbitControls />
              <ambientLight intensity={1} />
              <spotLight decay={0} angle={50} position={[10,10,100]}></spotLight>
              <pointLight decay={0} position={[10,50,-10]} ></pointLight>
              <directionalLight position={[-100,30,10]} intensity={3} color={"white"}></directionalLight>
              <Scene></Scene>
            </Canvas>
 </>)
}


export default PetModel;