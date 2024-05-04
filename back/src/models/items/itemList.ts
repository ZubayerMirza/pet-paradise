import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";
import Storages from "./Storage";
import Items from "./Items";
// item list (table) is defined
// it will be used in shop page
const ItemList = data.define('ItemList', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: true // not to create the date
});


export default ItemList;