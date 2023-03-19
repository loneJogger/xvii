import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// services
import logger from './services/log.js'

// routes
import userRouter from './api/routes/user.js'
import testRouter from './api/routes/test.js'

const PORT = 5000

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/user', userRouter)
app.use('/debug', testRouter)

logger.entry('new uptime session', 'start')

app.listen(PORT, () => {
    console.log(` XVII server is running on port ${PORT}`)
    console.log('-------------------------------------')
    console.log('')
})


