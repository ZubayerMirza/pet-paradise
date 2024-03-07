import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";

// item list (table) is defined
// it will be used in shop page

const ItemList = data.define('itemList', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    info:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false // not to create the date
});

export default ItemList;