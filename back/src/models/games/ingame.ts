import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";

const InGame = data.define('ingames', {
    // join user in the game room 
    // join points
    // join 
},
{
    timestamps: false // not to create the date
});

export default InGame;