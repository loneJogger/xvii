import userServices from '../../services/user.js'

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
            }
            next()
        } catch (e) {
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