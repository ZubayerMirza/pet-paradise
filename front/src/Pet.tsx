import React from 'react';
import './Pet.css';
import { useLocation } from 'react-router';


function Pet() {

    const location = useLocation();
    const para = location.state as {name: string};
    const name: string = para.name;

    const OnClickHandler = (e: any) => {
        console.log(e.target.id);
    }
    
  return (
   <>
   <p>Hello, {name}</p>
   <h1>Choose your pet</h1>
    <div className='petBox'>
        <div className='petCard' onClick={OnClickHandler} id="A">A</div>
        <div className='petCard'onClick={OnClickHandler} id="B">B</div>
        <div className='petCard' onClick={OnClickHandler} id="C">C</div>
    </div>
    </>
  );
}
export default Pet;
