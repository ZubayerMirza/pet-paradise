import React from 'react';
import './App.css';
import Login from './Login';
// import { Canvas } from '@react-three/fiber';
// import { useFrame, useThree, useLoader } from '@react-three/fiber';
// import * as THREE from 'three';
// import * as THREE from '@react-three/fiber'


// function Main() {
//   return (
//         // trying to study for react three/fiber 
//         <> 
//         <directionalLight position={[1,1,1]} />
//         <mesh rotation={[0,-1,0]}>
//             <boxGeometry args={[3,3,3]}></boxGeometry>
//             <meshStandardMaterial color="blue" />
//         </mesh>
//         </>
//   );
// }

// I was studying for 3d interactive page using three js 
// just put the login home component for now 
function Home() {
  return (
  <>
  {/* Canvas for 3D models  */}
    {/* <Canvas>  */}
      {/* <Main />   */}
    {/* </Canvas> */}
    <Login />
  </>
  );
}

export default Home;
