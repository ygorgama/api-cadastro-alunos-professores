import  { Sequelize }  from "sequelize-typescript";
import mainDatabase from "../config/database";
import User from "../models/Users";
import path from "path";

const sequelize = new Sequelize({
    ...mainDatabase,
    models: [path.join(__dirname, '..', 'models')],
});

export default sequelize;
