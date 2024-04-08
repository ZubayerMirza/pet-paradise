import { DataTypes } from "sequelize";
import data from "../config/dbconnect";
import Pets from "./pet/pets";
import PetTypes from "./pet/pettypes";
import Storages from "./items/Storage";
import Items from "./items/Items";
// import ItemList from "./items/ItemList";
import ItemList from "./items/ItemList";
import myLevel from "./levels/myLevel";
import Level from "./levels/Level";
import Friend_List from "./friends/friendsList";

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
    email: { //not 
        type: DataTypes.STRING,
        allowNull: true
    },
    isLogin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

// relation between tables 


//pets table have connected to users table with userid
Users.hasOne(Pets); // each user have one pet
Pets.belongsTo(Users, { foreignKey: 'userId'});
// Pets.hasOne(Users); // update later! 
// Users.belongsTo(Pets, { foreignKey: 'petId'})

//pets table have connected to pettype table with typeId
Pets.belongsTo(PetTypes, {foreignKey: 'typeId'});

Pets.belongsTo(Storages);
Storages.belongsToMany(Items,{through: ItemList});
Items.belongsToMany(Storages,{through: ItemList});


// myLevel.hasOne(Pets);
// Pets.belongsTo(myLevel,{foreignKey: 'myLevel_Id'});
Pets.hasOne(myLevel);
//either one maybe has to be changed? 
myLevel.hasOne(Pets, {foreignKey: 'myLevel_Id'});
myLevel.belongsTo(Pets,{foreignKey: 'petId'});
// myLevel.hasOne(Level);
Level.hasMany(myLevel);

// friends relations of between user and user
// Users.belongsToMany(Users,{as:"from", foreignKey:"friend_id", through: Friend_List});
// Users.belongsToMany(Users,{ as:"to", foreignKey:"my_id",through: Friend_List});

// game room data relation is neneded

export default Users;