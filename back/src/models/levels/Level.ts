import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";
import myLevel from "./myLevel";

const Level = data.define('level', {
    level:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    needed_exp:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    timestamps: false // not to create the date
});

// Level.hasMany(myLevel);

export default Level;