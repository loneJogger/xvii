import { useState, useEffect, useContext, useRef } from 'react'
import userContext from '../contexts/User'

const Chat = (props) => {

    const [ isWS, setIsWS ] = useState(true)
    const [ message, setMessage ] = useState('')
    const [ chatlog, setChatlog ] = useState([])
    const chatWS = useRef(null)

    useEffect(() => {
        if ("WebSocket" in window) {
            try {
                chatWS.current = new WebSocket('ws://localhost:5001')
                chatWS.current.onopen = () => {
                    console.log('connected to ws server')
                }
                chatWS.current.onmessage = (data) => {
                    console.log('message coming in!')
                    setChatlog(chatlog => [ ...chatlog, data ])
                }
                chatWS.current.onclose = () => {
                    chatWS.current = null
                    console.log('connection to ws server closed')
                }
            } catch (e) {
                console.log(e)
            }
        } else {
            setIsWS(false)
        }
    }, [])

    const user = useContext(userContext)

    const sendMessage = () => {
        if (isWS) {
            chatWS.current.send(`${user.username}: ${message}`)
            setChatlog(chatlog => [ ...chatlog, { data: `${user.username}: ${message}` } ])
        } else {
            console.log('no ws connection')
        }
    }

    const generateChatLog = () => {
        const list = chatlog.map((entry) => {
            return (
                <p>{entry.data}</p>
            )
        })
        return list
    }

    return (
        <div>
            <div>
                <input value={message} onChange={(e => {setMessage(e.target.value)})}/>
                <button onClick={sendMessage}>send</button>
            </div>
            {generateChatLog()}
        </div>
    )
}

export default Chat