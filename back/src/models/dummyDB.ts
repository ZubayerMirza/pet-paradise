import Users from "./users";
import Pets from "./pet/pets";
import PetTypes from "./pet/pettypes";
import { dropDB } from "../config/dbconnect";
import Items from "./items/Items";
import Storages from "./items/Storage";
import ItemList from "./items/ItemList";
import data from "../config/dbconnect";
// import { Model } from "sequelize";
import {UserData, ItemData, PetTypeData, StorageDB} from "./itemData";

const DummyDB = async () => {
    
    // will create the tables as Users models in defined 
    try {
        
        // drop -> mysql handling is needed ? 

        //force true : to drop the table and create
        //force falce : not drop 
        // dropDB(); // to use for me

        // const Test = await Users.sync({force: false});
        // await PetTypes.sync({force: false}); 
        // await Storages.sync({force: false});
        // await Items.sync({force: false});
        // await ItemList.sync({force: false});
        // await Pets.sync({force: false}); // has to be called later - parent table
        
        // sync at once 
        await data.sync({force: false}); 
        
        // console.log("----- Succeed for table sync -----");  
       
    }
    catch(error){ // whether table is created or not 
        console.log("----- Failed for table sync -----");
        throw(error);
    };
    
    // create the table with the dummy data
    UserData.forEach(async data => {
     try {
        const Test = await Users.create(data);
        // console.log(Test.dataValues);
    }catch(error){ // when data is already exist
        // console.log("----- Data EXISTANT -----");
        // throw(error);
     }
    });

    // // working on
    PetTypeData.forEach(async data => {
        try {
           const T = await PetTypes.create(data);
            // console.log(T.dataValues);
       }catch(error){ // when data is already exist
        //    console.log("----- Data EXISTANT -----");
        }
       });
    // console.log(ItemData);

    ItemData.forEach(async data => {
        try {
            await Items.create(data);
             // console.log(T.dataValues);
        }catch(error){ // when data is already exist
            // console.log("----- Data EXISTANT -----");
         }
    });

    // StorageDB.forEach(async data => {
    //     try {
    //         await Storages.create(data);
    //          // console.log(T.dataValues);
    //     }catch(error){ // when data is already exist
    //         // console.log("----- Data EXISTANT -----");
    //      }
    // });

  }
  
  export default DummyDB;