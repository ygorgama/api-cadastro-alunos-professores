import 'dotenv/config';
import { Options } from 'sequelize';



const mainDatabase: Options = {
    dialect: 'mysql',
    host: process.env.DB_HOST as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    username: process.env.DB_USERNAME as string,
    port: Number(process.env.DB_PORT),
    define: {
        timestamps: true,
        underscored: true,
    },
}
// Simplismente para a sequelize-cli funcinar -_-
module.exports = mainDatabase

// Exportação entendida pelo TypeScript
export default mainDatabase;



