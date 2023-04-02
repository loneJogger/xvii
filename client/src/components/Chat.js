import { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group' 
import '../styles/components.css'
import '../styles/chat.css'

const Chat = (props) => {

    const [ isWS, setIsWS ] = useState(true)
    const [ message, setMessage ] = useState('')
    const [ chatlog, setChatlog ] = useState([])
    const chatWS = useRef(null)
    const nodeRef = useRef(null)

    useEffect(() => {
        if (props.user?.isLogin && "WebSocket" in window) {
            setIsWS(true)
            chatWS.current = new WebSocket(process.env.REACT_APP_CHAT_WS_URL)
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
        } else {
            setIsWS(false)
        }
        return () => {
            if (props.user?.isLogin && chatWS.current !== null) {
                chatWS.current.close()
            }
        }
    }, [props.user])

    const autoScroll = () => {
        if (chatlog.length > 0) {
            const chatWindow = document.getElementById('chatWindow')
            if (chatWindow.scrollTop > chatWindow.scrollHeight - 192) {
                chatWindow.scrollTop = chatWindow.scrollHeight
            }
        }
    }

    useEffect(autoScroll, [chatlog])

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
        return list
    }

    return (
        <CSSTransition
            in={props.user?.isLogin}
            nodeRef={nodeRef}
            timeout={300}
            appear={true}
            classNames='chat-animated'
        >
            <div className='chat-container' ref={nodeRef} style={{ opacity: props.user?.isLogin ? ('1') : ('0') }}>
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
                    <div className='chat-inner'></div>
                )}
                
            </div>
        </CSSTransition>
    )
}

export default Chat