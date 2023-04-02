import { useState, useEffect, useContext } from 'react'
import { useCookies } from 'react-cookie'
import userContext from '../contexts/User'

const Inbox = () => {

    const [ messages, setMessages ] = useState([])
    const user = useContext(userContext)
    const [ cookies ] = useCookies(['session'])

    useEffect(() => {

    }, [])

    return (
        <>
        </>
    )
}

export default Inbox