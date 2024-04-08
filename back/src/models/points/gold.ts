import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";

const Gold = data.define('golds', {
    gold:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    earned_gold:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_gold:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    timestamps: false // not to create the date
});

export default Gold;