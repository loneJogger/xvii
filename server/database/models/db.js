import dotenv from "dotenv";
import { Sequelize } from "sequelize";

export default new Sequelize("postgres://dev:password@127.0.0.1:5432/dev_db", {
  dialect: "postgres",
});
