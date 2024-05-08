import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";
import Storages from "../items/Storage";
import Items from "../items/Items";

const Friend = data.define('friend', {
    isFriend:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isWating:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isInvited:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isRequest:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isAccepted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},{
    timestamps: true // not to create the date
});


export default Friend;