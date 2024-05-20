import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";
import Pets from "../users";

const Friend_List = data.define('Friend_List', {
    isFriend:{
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
    },
    sender:{
        type:DataTypes.STRING,
        allowNull: false
    },
    receiver:{
        type:DataTypes.STRING,
        allowNull: false
    },

},{
    timestamps: true // not to create the date
});

// Pets.belongsToMany(Pets,{as:"from", foreignKey:"friend_id", through: Friend_List});
// Pets.belongsToMany(Pets,{ as:"to", foreignKey:"my_id",through: Friend_List});


export default Friend_List;