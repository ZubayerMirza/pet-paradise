import React, { useEffect, useState } from 'react';
import './Pet.css';
import '../home/home.css';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';

/* DONE 
  1. with giving a name : done
  2. checking whether user has a pet or not : done
  3. if user has -> main page  : done
    not -> pet select  : done
*/

//initialize inteface for using as type of variables
interface petType  { 
  description: string,
  hunger: number,
  id: number, 
  name: string, 
  status: number
}

// components with props of petTypes
const TestProps = (props: any)=>{

 
  const navigate = useNavigate(); // hook to navigate
  
  const OnClickHandler = (e: any) => {
    e.preventDefault();
    // console.log(props)// all props
    
    // id: 1, name: 'CHERRY', description: '../asset/petA.PNG', hunger: 50, status: 50
    navigate('/petget', {state: props}); 
    
 }

  return(
    <> 
    <div className='petCard' onClick={OnClickHandler} id={props.data.name}></div>
    </>
  );
}
function Pet() {

  const navigate = useNavigate(); // hook to navigate
  const location = useLocation(); // hook to see the information obout this page
  const para = location.state as {name: string, id: string, socketId: string}; // access the name and id from passed state
    
    // console.log(para);
    let pet: petType; // pet <- petTypes data
    let pets: petType []=[]; // type of petTypes array
    
    // to get the array of petTypes - not working
    const [petTypes,setPetTypes] = useState<typeof pets>([]);
   
    const Fetch = () =>{
        // had to check once with the id  first
      // to pass the pet selection  
     const test = {
      id: para.id,
      name: para.name
      }

      // then get the pet type data 
      fetch('http://localhost:8000/pet', {
        method: "POST", 
        headers: { // header specifies the content type for the request
          "Content-Type": "application/json",
        },
        body: JSON.stringify(test),
      }).then(response => {return response.json()})
      .then(async response => {
        // I set up with 3 default pet selection choice 
        // if response has 3 objects in it 
        if(response.length === 3){ 
          // console.log(response) //pet type respinse
          
          // mapping for the data
          response.map((data:{ description: string,
            hunger: number,
            id: number,
            name: string,
            status: number}) => {
              
              // pet <- the data
              pet = data;
              // console.log(pet) 

              // pets <- pet data
              pets = [...pets, pet] 
          })
          setPetTypes(pets) // set PetTypes state
          // console.log(petTypes)
        }
        else{
          // when you have pet, -> navigate to pet main page with state
          navigate('/petmain', { state: { 
            // username:para.name,
            petId: response.id, 
            petname: response.petname, 
            typeId: response.typeId,
            userId: response.userId,
            StorageId: response.StorageId,
            myLevel_Id: response.myLevel_Id,
            gold: response.gold,
            status: response.status,
            hunger: response.hunger,
            username: para.name,
            socketId: para.socketId
          }}); 
        }
      })
    }

    // checking first when render at first
    useEffect(()=>
    {
      Fetch(); 
      
    },[])

    // // when petType get updated 
    // useEffect(()=>
    // {
    //   console.log({petTypes})
    // },[{petTypes}])
    
    return (
    <>
    <div className='layout'>
    <div className="pet-text-box">
    <h1>Step 1</h1> 
    <p>Hello,      {para.name} !</p>
    <p>Choose your pet!</p></div>
    <div className='petBox'>
      { petTypes.map((data,index) => 
      // TestProps compenents with petTypes data as props to manipulate
      <TestProps key={data.id} data={data} username={para.name} socketId={para.socketId} userid={para.id}/>)} 
      </div></div>
    </>
  );
}
export default Pet;
