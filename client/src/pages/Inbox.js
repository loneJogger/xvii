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

    return (
        <div className='page-body'>
            <div className='inbox-container'>
                <div className='inbox-header'>
                    <h2 className='component-title'>MESSAGE INBOX</h2>
                </div>
                <div className='modal-outer'>
                    <div className='modal-inner'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inbox