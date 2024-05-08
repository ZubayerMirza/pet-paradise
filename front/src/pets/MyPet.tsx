import './getpet.css';
import { useNavigate,useLocation} from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../home/Header';
import { useState } from 'react';
import Friend from '../friends/Friend';

function MyPet(props: any) {
    const [link,SetLink]=useState('');
    const navigate = useNavigate(); // hook to navigate
    const location = useLocation(); // hook to see the information obout this page
    const testcase = location.state as { 
        userId: number,
        typeId: number,
        petId: number,
        petname: string, 
        StorageId: number,
        myLevel_Id: number,
        gold: number,
        status: number,
        hunger: number
    }; // access the name and id from passed state

    const OnClickHandler = (e: any) =>{
      e.preventDefault();
      if(e.target.id =="Link"){
       navigate('/login');
      }
      else if(e.target.id =="home"){
        navigate('/newHome');
      }
      else if( e.target.id =="frds"){
        // navigate('/friends')
        SetLink('friends');
      }
      else if( e.target.id =="pet"){
        // navigate('/friends')
        SetLink('pet');
      }
      else if( e.target.id =="items"){
        // navigate('/friends')
        SetLink('items');
      }
      else{
        navigate('/items',{
          state: { petname: testcase.petname,
            petId: testcase.petId, 
            userId: testcase.userId,
            typeId: testcase.typeId,
            StorageId: testcase.StorageId
          }});
      }
    }
    const NavLink =()=>{

      if(link == "friends"){
        return(<><Friend data={testcase}></Friend></>) 
      }

      return (<></>)
    }
  return (
   <>
   <div className="headerwith">
   <Header data={testcase}></Header>
   {/* <div className='home'>
   <h1 id='h1'>Pet main page</h1>
    <div className ='petBox' style={{display:"flex",flexDirection:"column"}}>
   
    <div className='info-box'>
   
    <div className='petInnerBox'>My  petname    :  {testcase.petname}</div>
    <div className='petInnerBox'>My  petId         :  {testcase.petId}</div>
    <div className='petInnerBox'>My  userId       :  {testcase.userId}</div>
    <div className='petInnerBox'>My  petTypeId :  {testcase.typeId}</div>
    <div className='petInnerBox'>My  StorageId :  {testcase.StorageId}</div>
    <div className='petInnerBox'>My  status :  {testcase.status}</div>
    <div className='petInnerBox'>My  hunger :  {testcase.hunger}</div>
    <div className='petInnerBox'>My  levelId :  {testcase.myLevel_Id}</div>
    <div className='petInnerBox'>My  gold :  {testcase.gold}</div>
    </div>
    
    <div className='inside-box'>
    <div className='LinkButton'onClick= {OnClickHandler} id="Link">Sign Out</div>
    <div className='LinkButton'onClick= {OnClickHandler}>Items Page</div>
    <div className='LinkButton'onClick= {OnClickHandler} id="home">new home</div>
    </div>
  </div>
  
    </div> */}
    {/* <div className='body'> */}
    {/* <div className='side-bar'> */}
    {/* <div className='side-contents' onClick={OnClickHandler} id="pet">Pet</div> */}
    {/* <div className='side-contents' onClick={OnClickHandler} id="frds">Friends</div> */}
    {/* <div className='side-contents' onClick={OnClickHandler} id="item">Items</div> */}
    {/* </div> */}
    {/* <div className='next-bar'>{NavLink()}</div> */}
    {/* </div> */}
   
    </div>
    </>
  );
}
export default MyPet;
