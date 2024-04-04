import './getpet.css';
import { useNavigate,useLocation} from 'react-router';
import { Link } from 'react-router-dom';

function MyPet() {

    const navigate = useNavigate(); // hook to navigate
    const location = useLocation(); // hook to see the information obout this page
    const testcase = location.state as { 
        userId: number,
        typeId: number,
        petId: number,
        petname: string, 
        StorageId: number
    }; // access the name and id from passed state

    const OnClickHandler = (e: any) =>{
      e.preventDefault();
      if(e.target.id =="Link"){
       navigate('/login');
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
    
  return (
   <>
   <div className='home'>
   <h1 id='h1'>Pet main page</h1>
    <div className ='petBox' style={{display:"flex",flexDirection:"column"}}>
   
    <div className='info-box'>
    {/* <div className='petbox '> */}
    <div className='petInnerBox'>My  petname    :  {testcase.petname}</div>
    <div className='petInnerBox'>My  petId         :  {testcase.petId}</div>
    <div className='petInnerBox'>My  userId       :  {testcase.userId}</div>
    <div className='petInnerBox'>My  petTypeId :  {testcase.typeId}</div>
    <div className='petInnerBox'>My  StorageId :  {testcase.StorageId}</div>
    {/* </div> */}
    {/* <div className='petbox'>
    </div> */}
    </div>
    
    <div className='inside-box'>
    <div className='LinkButton'onClick= {OnClickHandler} id="Link">Sign Out</div>
    <div className='LinkButton'onClick= {OnClickHandler}>Items Page</div>
    </div>
  </div>
  
    </div>
    </>
  );
}
export default MyPet;
