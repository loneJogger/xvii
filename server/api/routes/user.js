import express from "express"
import userServices from '../../services/user.js'

const userRouter = express.Router()

/**
 * creates a new user
 */
userRouter.post("/", async (req, res, next) => {
    const { username, password } = req.body
    if ( !username || !password ) {
        res.status(400).send({
            type: 'invalidBody',
            message: 'invalid body: a new user request must contain a username and a password.' 
        })
    } else {
        try {
            const newUser = await userServices.userCreate(username, password)
            res.status(200).send({
                type: 'success',
                message: 'new user created.',
                user: newUser
            })
        } catch (e) {
            res.status(400).send(e)
        }
    }
    next()
})

/**
 * returns a single user
 */
userRouter.get("/:id", (req, res, next) => {})

/**
 * lists all users
 */
userRouter.get("/", (req, res, next) => {})

/**
 * updates a user
 */
userRouter.put("/:id", (req, res, next) => {})

/**
 * deletes a user
 */
userRouter.delete("/:id", (req, res, next) => {})

/**
 * logs a user in, returns a user session
 */
userRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body
    if ( !username || !password ) {
        res.status(400).send({
            type: 'invalidBody',
            message: 'invalid body: a login request must contain a username and a password.' 
        })
    } else {
        try {
            const session = await userServices.userLogin(username, password)
            res.status(200).send({
                type: 'success',
                message: 'user logged in, session created.',
                session
            })
        } catch (e) {
            res.status(401).send(e)
        }
    }
    next()
})

export default userRouter
