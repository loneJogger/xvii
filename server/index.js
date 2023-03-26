import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import WebSocket, { WebSocketServer } from 'ws'

// services
import logger from './services/log.js'

// routes
import userRouter from './api/routes/user.js'

const PORT = 5000
const WS_PORT = 5001

// express app
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/user', userRouter)

logger.entry('new uptime session', 'start')

app.listen(PORT, () => {
    console.log(` XVII server is running on port ${PORT}`)
    console.log('-------------------------------------')
    console.log('')
})

// ws server
const wsServer = new WebSocketServer({ port: WS_PORT })

wsServer.on('connection', socket => {
    console.log(`Client connected`)

    socket.onmessage = ({ data }) => {
        console.log(`from client: ${data}`)
        const parsed = JSON.parse(data)
        wsServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                const timestamp = new Date().toISOString().replace('T', ' ').substring(0,23)
                const payload = {
                    username: parsed.username,
                    message: parsed.message,
                    timestamp: timestamp
                }
                client.send(JSON.stringify(payload))
            }
        })
    }

    socket.onclose = () => {
        console.log(`Client has disconnected`)
    }
})

