import dotenv from 'dotenv'
dotenv.config()

const development = {
    url: process.env.DB_CONNECT_DEV,
    dialect: 'postgres',
}

const production = {
    url: process.env.DB_CONNECT_PROD,
    dialect: 'postgres',
}

export default { 
    development, 
    production 
}
