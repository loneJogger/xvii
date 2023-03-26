import { useState, useEffect, useRef } from 'react'
import '../styles/components.css'
import '../styles/chat.css'

const Chat = (props) => {

    const [ isWS, setIsWS ] = useState(true)
    const [ message, setMessage ] = useState('')
    const [ chatlog, setChatlog ] = useState([])
    const chatWS = useRef(null)

    useEffect(() => {
        if (props.user?.isLogin && "WebSocket" in window) {
            setIsWS(true)
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
    }, [props.user])

    useEffect(() => {
        autoScroll()
    }, [chatlog])

    const sendMessage = () => {
        if (isWS) {
            chatWS.current.send(JSON.stringify({ 
                username: props.user.username, 
                message: message 
            }))
            setMessage('')
        } else {
            console.log('no ws connection')
        }
    }

    const autoScroll = () => {
        if (chatlog.length > 0) {
            const chatWindow = document.getElementById('chatWindow')
            if (chatWindow.scrollTop > chatWindow.scrollHeight - 192) {
                chatWindow.scrollTop = chatWindow.scrollHeight
            }
        }
    }

    const generateChatLog = () => {
        const list = chatlog.map((entry) => {
            const parsed = JSON.parse(entry.data)
            return (
                <div key={parsed.timestamp} className='chat-message'>
                    <div>
                        <span style={{color: '#04a777'}}>{parsed.username}</span>{': '}
                        <span style={{color: '#e6ebd3'}}>{parsed.message}</span>
                    </div>
                    <span 
                        style={{color: '#e6ebd3', marginRight: '8px', minWidth: '140px'}}
                    >{parsed.timestamp.toString().substring(0,16)}</span>
                </div>
            )
        })
        //list.push(<div key={'bottom'} className='chat-message'><span style={{opacity: '0'}}>{'x'}</span></div>)
        return list
    }

    return (
        <div className='chat-container'>
            {props.user?.isLogin ? (
                <div className='chat-inner'>
                    <div id='chatWindow' className='chat-window'>
                        {generateChatLog()}
                    </div>
                    <div className='component-button-row' style={{marginTop: '4px'}}>
                        <input 
                            className='chat-input' 
                            value={message} 
                            onChange={(e) => {setMessage(e.target.value)}}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    sendMessage()
                                }
                            }}
                        />
                        <div className='chat-button-outer' onClick={sendMessage}>
                            <button className='chat-button-inner'>Chat</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='chat-inner'>
                    out
                </div>
            )}
            
        </div>
    )
}

export default Chat