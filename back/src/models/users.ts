import { DataTypes } from "sequelize";
import data from "../config/dbconnect";
import Pets from "./pet/pets";
import PetTypes from "./pet/pettypes";
import Storages from "./items/Storage";
import Items from "./items/Items";
import ItemList from "./items/ItemList";
// Model is defined with define fuction of seq
// represnets as a table of the database
// each will be colums of the tables

// later with sync -> create table users (this model)
const Users = data.define('users', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull: true
    },
    updatedAt:{
        type: DataTypes.DATE,
        allowNull: true
    }
});

// relation between tables 


//pets table have connected to users table with userid
Users.hasOne(Pets); // each user have one pet
Pets.belongsTo(Users, { foreignKey: 'userId'});

//pets table have connected to pettype table with typeId
Pets.belongsTo(PetTypes, {foreignKey: 'typeId'});

Pets.belongsTo(Storages);
Storages.belongsToMany(Items,{through: ItemList});
Items.belongsToMany(Storages,{through: ItemList});
export default Users;