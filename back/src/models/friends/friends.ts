import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";
import Storages from "../items/Storage";
import Items from "../items/Items";

const Friend = data.define('friends', {
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


export default Friend;