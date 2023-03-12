import express from 'express'
import auth from '../middleware/auth.js'
import log from '../middleware/log.js'

const testRouter = express.Router()
testRouter.use(log)

testRouter.get('/testAuth', auth.verifyUserSession, (req, res, next) => {
    res.send('auth works')
    next()
})

export default testRouter
