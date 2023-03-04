import express from 'express'
import auth from '../middleware/auth.js'

const testRouter = express.Router()

testRouter.get('/testAuth', auth, (req, res, next) => {
    res.send('auth works')
})

export default testRouter
