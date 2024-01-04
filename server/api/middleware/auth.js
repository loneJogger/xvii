import userServices from '../../services/user.js'
import log from '../../services/log.js'

const verifyUserSession = (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) {
        res.status(401).send({
            type: 'noAuthHeader',
            message: 'no authorization header found.'
        })
    } else {
        try {
            const verified = userServices.checkAuthToken(token)
            if (verified.isExpired) {
                res.status(402).send({
                    type: 'sessionExpired',
                    message: 'this user session is expired.'
                })
            } else {
                next()
            }
        } catch (e) {
            log.entry(e.message, 'error', e)
            res.status(400).send({
                type: 'authError',
                message: 'an authentication error occured.',
                error: e
            })
        }
    }
}

export default {
    verifyUserSession
}