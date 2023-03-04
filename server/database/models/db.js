import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'
dotenv.config()

export default new Sequelize(process.env.DB_CONNECT_DEV, {
    dialect: 'postgres',
})
