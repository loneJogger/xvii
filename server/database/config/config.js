import dotenv from 'dotenv'
dotenv.config()

const development = {
    url: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:5432/${process.env.POSTGRES_DB}`,
    dialect: 'postgres',
}

const production = {
    url: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:5432/${process.env.POSTGRES_DB}`,
    dialect: 'postgres',
}

export default { 
    development, 
    production 
}
