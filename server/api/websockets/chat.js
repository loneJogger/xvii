import WebSocket, { WebSocketServer } from 'ws'
import log from '../../services/log.js'

const init = (port) => {
    const wsServer = new WebSocketServer({ port })
    wsServer.on('connection', socket => {
        log.entry('client connected to chat ws.', 'info')
        
        socket.onmessage = ({ data }) => {
            const parsed = JSON.parse(data)
            log.entry('new message from client', 'info', parsed)
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
            log.entry('client has disconnected from chat ws.', 'info')
        }
    })
}

export default { init }