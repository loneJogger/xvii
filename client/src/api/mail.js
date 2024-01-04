import axios from 'axios'

const create = async (to, subject, body, session) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API_URL}/mail`,
            data: {
                to,
                subject,
                body
            },
            headers: {
                'Authorization': session
            }
        })
        return res.data
    } catch (e) {
        const res = e.response.data
        console.log(res)
        return res
    }
}

const listInbox = async (session) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/mail/inbox`,
            headers: {
                'Authorization': session
            }
        })
        return res.data
    } catch (e) {
        const res = e.response.data
        console.log(res)
        return res
    }
}

const listSent = async (session) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/mail/sent`,
            headers: {
                'Authorization': session
            }
        })
        return res.data
    } catch (e) {
        const res = e.response.data
        console.log(res)
        return res
    }
}

const markRead = async (messageId, session) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API_URL}/mail/${messageId}`,
            headers: {
                'Authorization': session
            }
        })
        return res.data
    } catch (e) {
        const res = e.response.data
        console.log(res)
        return res
    }
}

export {
    create,
    listInbox,
    listSent,
    markRead
}