import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Materiais = sequelize.define("Materiais", {
  produto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  destino: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

export default Materiais;
