import axios from 'axios'

/**
 * attempts to login a user, sets session as callback
 */
const login = async (username, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:5000/user/login',
            data: {
                username,
                password 
            }
        })
        return res.data
    } catch (e) {
        const res = e.response.data
        console.log(res)
        return res
    }
}

/**
 * creates a new user
 */
const create = async (username, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:5000/user',
            data: {
                username,
                password
            }
        })
        return res.data
    } catch (e) {
        const res = e.response.data
        console.log(res)
        return res
    }
}

const checkSession = async (session) => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'http://localhost:5000/user/session',
            headers: {
                'Authorization': session
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
        const res = e.response.data
        console.log(res)
        return res
    }
}

export {
    login,
    create,
    checkSession,
}