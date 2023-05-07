import { useState, useEffect, useContext } from 'react'
import { useCookies } from 'react-cookie'
import userContext from '../contexts/User'
import { create, listInbox, listSent, markRead } from '../api/mail'

import '../styles/page.css'
import '../styles/components.css'
import '../styles/inbox.css'
import '../styles/modal.css'

const Inbox = () => {

    const [ inboxMessages, setInboxMessages ] = useState([])
    const [ sentMessages, setSentMessages ] = useState([])
    const [ toggle, setToggle ] = useState('inbox')
    const [ to, setTo ] = useState('')
    const [ subject, setSubject ] = useState('')
    const [ body, setBody ] = useState('')
    const [ selectedMessage, setSelectedMessage ] = useState({})
    const user = useContext(userContext)
    const [ cookies ] = useCookies(['session'])

    useEffect(() => {
        const initInboxMessages = async () => {
            const inbox = await listInbox(cookies.session)
            setInboxMessages(inbox.inbox)
        }
        const initSentMessages = async () => {
            const sent = await listSent(cookies.session)
            setSentMessages(sent.inbox)
        }   
        if (user.isLogin) {
            initInboxMessages()
            initSentMessages()
        }
    }, [user, cookies])

    useEffect(() => {
        if (toggle === 'inbox' && inboxMessages.length > 0) {
            setSelectedMessage(inboxMessages[0])
        }
        if (toggle === 'sent' && sentMessages.lenght > 0) {
            setSelectedMessage(sentMessages[0])
        }
    }, [inboxMessages, sentMessages, toggle])
    
    const sendMessage = async () => {
        const sentMessage = await create(to, subject, body, cookies.session)
        setSentMessages([ ...sentMessages, sentMessage ])
    }

    const switchScreens = () => {
        if (toggle === 'inbox') {
            setToggle('sent')
        } else {
            setToggle('inbox')
        }
    }

    const generateInbox = () => {
        if (inboxMessages.length > 0) {
            const sorted = inboxMessages.toSorted((a,b) => { 
                const aTime = new Date(a.createdAt).valueOf()
                const bTime = new Date(b.createdAt).valueOf()
                return bTime - aTime 
            })
            const list = sorted.map((message) => {
                return (
                    <tr 
                        key={message.id} 
                        className='inbox-table-row'
                        onClick={() => setSelectedMessage(message)}
                    >
                        <td>{message.fromUser.username}</td>
                        <td>{message.read ? '' : 'NEW ' + message.subject}</td>
                        <td>{message.createdAt.replace('T', ' ').substring(0,19)}</td>
                    </tr>
                )
            })
            return (
                <table className='inbox-table'>
                    <thead>
                        <tr>
                            <th className='inbox-table-header' style={{width: '20%'}}>FROM</th>
                            <th className='inbox-table-header'>SUBJECT</th>
                            <th className='inbox-table-header' style={{width: '20%'}}>TIME</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
            )
        }
        return (
            <div>
                <h2>NO MESSAGES</h2>
            </div>
        )
    }

    const generateSent = () => {
        if (sentMessages.length > 0) {
            const sorted = sentMessages.toSorted((a,b) => { 
                const aTime = new Date(a.createdAt).valueOf()
                const bTime = new Date(b.createdAt).valueOf()
                return bTime - aTime 
            })
            const list = sorted.map((message) => {
                return (
                    <tr 
                        key={message.id} 
                        className='inbox-table-row'
                        onClick={() => setSelectedMessage(message)}
                    >
                        <td>{message.toUser.username}</td>
                        <td>{message.subject}</td>
                        <td>{message.createdAt.replace('T', ' ').substring(0,19)}</td>
                    </tr>
                )
            })
            return (
                <table className='inbox-table'>
                    <thead>
                        <tr>
                            <th className='inbox-table-header' style={{width: '20%'}}>TO</th>
                            <th className='inbox-table-header'>SUBJECT</th>
                            <th className='inbox-table-header' style={{width: '20%'}}>TIME</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
            )
        }
        return (
            <div>
                <h2>NO MESSAGES</h2>
            </div>
        )
    }

    const generateSelected = () => {
        if (selectedMessage.id !== '') {
            return (
                <div>
                    <div style={{display: 'flex'}}>
                        <p style={{margin: '8px'}}>{toggle === 'inbox' ? `FROM: ${selectedMessage.fromUser.username}` : `TO :${selectedMessage.toUser.username}`}</p>
                        <p style={{margin: '8px'}}>{`SUBJECT: ${selectedMessage.subject}`}</p>
                        <p style={{margin: '8px'}}>{selectedMessage.createdAt.replace('T', ' ').substring(0,19)}</p>
                    </div>
                    <p style={{margin: '8px'}}>{selectedMessage.body}</p>
                </div>
            )
        } else {
            return null
        }
    }

    return (
        <div className='page-body'>
            <div className='inbox-container'>
                <div className='inbox-header'>
                    <h2 className='component-title'>{toggle.toUpperCase() + ' MESSAGES'}</h2>
                    <a
                        className='component-title' 
                        onClick={switchScreens}
                    >{'GO TO ' + (toggle === 'inbox' ? 'SENT' : 'INBOX')}</a>
                </div>
                <div className='modal-outer'>
                    <div className='modal-inner'>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <input className='inbox-input'/>
                            <div className='button-outer' style={{marginRight: '128px'}}>
                                <button className='button-inner'>search</button>
                            </div>
                        </div>
                        <hr className='modal-rule'/>
                        <div className='inbox-table-container'>
                            {toggle === 'inbox' ? (
                                <>{generateInbox()}</>
                            ) : (
                                <>{generateSent()}</>
                            )}
                        </div>
                        <hr className='modal-rule'/>
                        <div className='selected-container'>
                            <>{/*generateSelected()*/}</>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inbox