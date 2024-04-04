import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";

const Level = data.define('status', {
    level:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    needed_exp:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    index:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Level;