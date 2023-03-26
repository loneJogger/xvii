import express from 'express'
import log from '../middleware/log.js'
import auth from '../middleware/auth.js'
import mailServices from '../../services/mail.js'
import userServices from '../../services/user.js'

const mailRouter = express.Router()
mailRouter.use(log)
mailRouter.use(auth.verifyUserSession)

/**
 * creates a new message
 */
mailRouter.post('/', async (req, res, next) => {
    const { to, subject, body } = req.body
    if ( !to || !subject || !body ) {
        res.status(400).send({
            type: 'invalidBody',
            message: 'invalid body: a new mail message must contain a username, a subject, and a body.' 
        })
    } else {
        try {
            const { session } = userServices.checkAuthToken(req.headers['authorization'])
            const user = await userServices.getUserFromUsername(session.username)
            const newMail = mailServices.create(to, user.id,  subject, body)
            res.status(200).send({
                type: 'success',
                message: 'mail message sent',
                user: newMail
            })
        } catch (e) {
            res.status(400).send(e)
        }
    }
    next()
})

/**
 * returns a list of messages to a user
 */
mailRouter.get('/inbox', async (req, res, next) => {
    try {
        const { session } = userServices.checkAuthToken(req.headers['authorization'])
        const user = await userServices.getUserFromUsername(session.username)
        const messages = await mailServices.getInbox(user.id)
        res.status(200).send({
            type: 'success',
            message: 'inbox retrieved',
            inbox: messages
        })
    } catch (e) {
        res.status(400).send(e)
    }
    next()
})

/**
 * returns a list of messages from a user
 */
mailRouter.get('/sent', async (req, res, next) => {
    try {
        const { session } = userServices.checkAuthToken(req.headers['authorization'])
        const user = await userServices.getUserFromUsername(session.username)
        const messages = await mailServices.getSent(user.id)
        res.status(200).send({
            type: 'success',
            message: 'sent retrieved',
            inbox: messages
        })
    } catch (e) {
        res.status(400).send(e)
    }
    next()
})

/**
 * mark a message as read
 */
mailRouter.put('/:id', async (req, res, next) => {
    try {
        const { session } = userServices.checkAuthToken(req.headers['authorization'])
        const user = await userServices.getUserFromUsername(session.username)
        const read = await mailServices.markRead(user.id, req.params.id)
        res.status(200).send({
            type: 'success',
            message: `${read} message was set to read` 
        })
    } catch (e) {
        res.status(400).send(e)
    }
    next()
})


