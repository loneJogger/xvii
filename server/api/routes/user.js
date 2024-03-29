import express from "express"
import userServices from '../../services/user.js'
import log from '../middleware/log.js'
import auth from '../middleware/auth.js'
import logService from '../../services/log.js'

const userRouter = express.Router()
userRouter.use(log)

/**
 * creates a new user
 */
userRouter.post('/', async (req, res, next) => {
    const { username, password } = req.body
    if ( !username || !password ) {
        res.status(400).send({
            type: 'invalidBody',
            message: 'invalid body: a new user request must contain a username and a password.' 
        })
    } else {
        try {
            const newUser = await userServices.userCreate(username, password)
            logService.entry('new user created.', 'info', { username })
            res.status(200).send({
                type: 'success',
                message: 'new user created.',
                user: newUser
            })
        } catch (e) {
            logService.entry(e.message, 'error', e)
            res.status(400).send(e)
        }
    }
    next()
})

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
            logService.entry('user logged in, session created.', 'info', { username })
            res.status(200).send({
                type: 'success',
                message: 'user logged in, session created.',
                session
            })
        } catch (e) {
            logService.entry(e.message, 'error', e)
            res.status(401).send(e)
        }
    }
    next()
})

/**
 * gets a user provided a session
 */
userRouter.get('/session', auth.verifyUserSession, async (req, res, next) => {
    const { session } = userServices.checkAuthToken(req.headers['authorization'])
    const user = await userServices.getUserFromUsername(session.username)
    logService.entry(
        'session is valid, user automatically logged in.',
        'info', 
        { id: user.id, username: user.username, updatedAt: user.updatedAt }
    )
    res.status(200).send({
        type: 'success',
        message: 'session is valid, user automatically logged in.',
        user: {
            id: user.id,
            username: user.username,
            updatedAt: user.updatedAt
        }
    })
    next()
})

export default userRouter
