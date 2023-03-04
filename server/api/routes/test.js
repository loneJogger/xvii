import express from 'express'
import auth from '../middleware/auth.js'

const testRouter = express.Router()

testRouter.get('/testAuth', auth.verifyUserSession, (req, res, next) => {
    res.send('auth works')
    next()
})

export default testRouter
