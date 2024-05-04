import { AnyNaptrRecord } from 'dns';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';
import "./items.css";
import emptyImage from "../assets/coconut.jpg";
import itemBackImage from "../assets/itemBack.png";

// in this item section 
// I learned ref which is useful when I don't want to rerender
// and the way to change state of parent component 
// through child component
function Item (props: any) {

  const OnClickHandler=(e: any)=>{
    e.preventDefault();

    // console.log(props.data)
    props.addCart(props.data);
  }

  return (
    <>
    <div className='each-item' onClick={OnClickHandler} id={props.data.name}>
    {/* <div style={{width: "100%", height: "100%"}}> */}
      <p style={{ fontWeight: "bold", fontSize: "2vh", backdropFilter: "blur(2px)", borderRadius: "10px"}} >{props.data.name}</p>
      <p style={{backdropFilter: "blur(2px)", borderRadius: "10px"}}>{props.data.description}</p>
      {/* </div> */}
    </div>
    </>
  )
}

function MyItem (props: any) {

  return (
    <>
    <div className='each-item' id={props.data.name}>
      <p style={{ fontWeight: "bold", fontSize: "2vh", backdropFilter: "blur(2px)", borderRadius: "10px"}}>{props.data.name}</p>
    <p style={{ fontWeight: "bold", fontSize: "2vh",backdropFilter: "blur(2px)", borderRadius: "10px"}}>qty : {props.data.ItemList.quantity}</p>
    </div>
    </>
  )
}

function Items() {

  const location = useLocation(); // hook to see the information obout this page
  const info = location.state as { petname: string,
    petId: number, 
    userId: number,
    typeId: number,
    StorageId: number
  }; // access the name and id from passed state
    
  //initialize inteface for using as type to pass as the state
  interface Items  { 
    description: string,
    id: number, 
    name: string,
    info: string,
    ItemList: Item,
    quantity: number,
    isContain: boolean,
    isCart: boolean,
    StorageId: number,
  };

  interface Item  { 
    // id: number, 
    ItemId: number,
    StorageId: number,
    quantity: string
  };
  
  // let item: item; // item
  let items: Items []=[]; // all items
  let myItems: Items []=[];
  let item: Items;
  // to get the array of petTypes - not working
  const [itemList,setItemList] = useState<typeof items>([]);
  const [myItemList, setMyItemList] = useState<typeof items>([]);
  const [cartList, setCartList] = useState<typeof items>([]);
  const emptyRef = useRef('');

  const OnClickHandler=(e: any)=>{
    e.preventDefault();

    // console.log(e.target.id)
    if (e.target.id === "Buy"){
      Buy();
    }
    else{
    
    // re-setCartList with thoes ids are different
    setCartList(cartList.filter(data => e.target.id !== `${data.id}`));
    }
  }

  const Buy =()=> {

    fetch('http://localhost:8000/items', {
        method: "Put", 
        headers: { // header specifies the content type for the request
          "Content-Type": "application/json",
        },
        body: JSON.stringify({cartList}),
      }).then((response)=>{
        return response.json();
      }).then((response)=>{
        alert(response);
      }).finally(()=>{
        setCartList([]);
        FetchAllItems();
        // setMyItemList([]);
        MyItemsList();
      })
      
  }
  
  // all items fetch
  const FetchAllItems =()=>{
   
    fetch('http://localhost:8000/items', {
        method: "Get", 
        headers: { // header specifies the content type for the request
          "Content-Type": "application/json",
        },
      }).then((response)=> {
        return response.json();
      })
      .then((response)=>{
        // console.log(response);

        // making the item data as array
        response.map((data: any)=>{
          // item= data;
          items = [...items, data];
        })

        setItemList(items);
      })
  }

  const MyItemsList =()=>{
    // my items
    fetch('http://localhost:8000/items', {
      method: "Post", 
      headers: { // header specifies the content type for the request
        "Content-Type": "application/json",
      },
      body: JSON.stringify({StorageId: info.StorageId}),
    }).then((response)=> {
      return response.json();
    })
    .then((response)=>{
      // console.log(response)

      // when user has no items 
      if(response.Items.length ===0){
        // using useref to show the value in box 
        
        // to create empty for condition to show empty box 
        for (var i:number =0; i< 9; i++){
          myItems =[...myItems,item];
        }

      }
      else{
       
      // console.log(response.Items.length)
      // for loop to store the value in arr 
      // I sent it as desc order to show as it added in to my items
      for (var i:number = response.Items.length-1; i>=0; i--){
        // myItems = [...myItems, item];
        myItems = [...myItems, response.Items[i]];
       
      }
  
      // console.log(myItems.length)
      for (var i:number = response.Items.length; i< 9; i++){
        myItems = [...myItems, item];
      }
    }
      setMyItemList(myItems);
    })
  }

  const OnChangeHandler =(e: any)=>{
   
    setCartList(
      cartList.map((data: Items)=> (data.id == e.target.id) ? {
        ...data, quantity: parseInt(e.target.value)
      } : data)
    );
  }

  // to pass the function to the all item component 
  const addCart=(data: Items)=>{
    // data.isCart=false;

    if(cartList.length <=2){
      
      if(!data.isCart){
      data.isCart=true;
      data.quantity = 0;
     
      myItemList.forEach(myitem=>{
        
        if((!myitem)){
          console.log('no items')
        }
        else if((myitem.id === data.id)){
          data.isContain = true;
          // setCartList([...cartList,data]);
        }
      })
      data.StorageId= info.StorageId;
      setCartList([...cartList,data]);
    }
  }
  }

  useEffect(()=>{
    FetchAllItems();
    MyItemsList();
  },[])
  
  
  // // to check list of cart items
  useEffect(()=>{ console.log(cartList)},[cartList])
  
  // // to check list of my items
  // useEffect(()=>{ console.log(myItemList) },[myItemList])
  
  return (
   <>
   <div className='home'>
   <h1 id='h1' style={{marginTop: "60px", marginBottom:"0px"}}>Storage Id: {info.StorageId}</h1>
    <div className='ShopBox'>
    <div className='eachBox'>
      <h1 id='h1'>All Items</h1>
    <div className='itemBox grid' >
    { itemList.map((data) => 
    <Item key={data.id} myItemList={myItemList} CartList={cartList} addCart={addCart} data={data} />
    // <div className='each-item' onClick={OnClickHandler} key={data.id} id={data.name}>{data.name}</div>
    )} 
    </div>
    </div>
    <div className='eachBox'>
      <h1 id='h1'>Shop</h1>
      {/* <div> */}
      <div className='itemBox shopGrid'style={{
      backgroundSize: "cover",
      backgroundPosition: "center",
      // backgroundImage: `url(${itemBackImage})`,
        }}>
      { cartList.map((data) => 
      <div className='cartBox'>
      <div key={data.id} className='cart-item' >
      <div className='cartInner cartImage' id={data.name}>{data.name}</div> 
      <div className='cart-info'>
        <p className='cartInner' style={{ fontWeight: "bold", fontSize: "3vh"}}> x </p>
      <input style={{ fontWeight: "bold", fontSize: "1.5vh", color: "white"}} className='cartInner input'onChange={OnChangeHandler} type="number" id={`${data.id}`} value={`${data.quantity}`} min="1" max="10"></input>
      <div className='cartInner'style={{ fontWeight: "bold", fontSize: "1.5vh"}} onClick={OnClickHandler} id={`${data.id}`}> cancel </div></div>
      </div>
      </div> )} 
      </div>
      <div className='buttonBox'onClick={OnClickHandler}id="Buy">Buy</div>
    </div>

    {/* </div> */}
    
    <div className='eachBox'>
      <h1 id='h1'>My Items</h1>
    <div className='itemBox grid'>
    { 
    
    //later storage quantity updated is needed 
    // before when items fetch
    myItemList.map((data,index) => {
      
      if(data){
        // console.log(myItemList.length);
        return (<MyItem CartList={cartList} key={index} data={data} />) 
      } 
      if(!data){
        return <div key={index} className='each-item' style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          // backgroundImage: `url(${emptyImage})`,
          backgroundColor: "orange"
        }}><p style={{ fontWeight: "bold", fontSize: "2vh"}}>Empty</p><p>Slot</p></div>
      }
    }
    )
    } 
    
   
    </div>
    </div>
    </div>
    </div>
  
    </>
  );
}
export default Items;
