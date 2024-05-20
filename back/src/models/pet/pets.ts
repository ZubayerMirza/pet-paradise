import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";
import Friend_List from "../friends/friendsList";
// pets table is defined, for pet information
// will have userid, my item, pet type as foriegn keys

const Pets = data.define("pets", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
    autoIncrement: true,
  },
  petname: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: 'petname',
  },
  hunger: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gold: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Pets.belongsToMany(Pets, {
  as: "from",
  foreignKey: "friend_id",
  through: Friend_List,
});
Pets.belongsToMany(Pets, {
  as: "to",
  foreignKey: "my_id",
  through: Friend_List,
});

export default Pets;
