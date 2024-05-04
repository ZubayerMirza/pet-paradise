import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";

const Points = data.define('points', {
    points:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    earned_points:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_points:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Points;