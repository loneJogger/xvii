import WebSocket, { WebSocketServer } from 'ws'

const init = (port) => {
    const wsServer = new WebSocketServer({ port })
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
}

export default { init }