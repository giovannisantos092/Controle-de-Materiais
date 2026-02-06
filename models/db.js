import { Sequelize } from "sequelize";

const sequelize = new Sequelize("conexoes", "root", "200292", {
  host: "localhost",
  dialect: "mysql"
});

export default sequelize;




