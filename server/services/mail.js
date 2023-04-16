import { Op } from 'sequelize'
import MailMessage from '../database/models/mail.js'

const create = async (to, from, subject, body) => {
    try {
        const newMail = await MailMessage.create({
            to,
            from,
            subject,
            body
        })
        return {
            id: newMail.id,
            to: newMail.to,
            subject: newMail.subject
        }
    } catch (e) {
        throw {
            type: 'databaseError',
            message: 'an error from the database occured',
            error: e
        }
    }
}

const getInbox = async (id) => {
    try {
        const messages = await MailMessage.findAll({
            where: {
                to: { [Op.eq]: id }
            }
        })
        return messages
    } catch (e) {
        throw {
            type: 'databaseError',
            message: 'an error from the database occured',
            error: e
        }
    }
}

const getSent = async (id) => {
    try {
        const messages = await MailMessage.findAll({
            where: {
                from: { [Op.eq]: id }
            }
        })
        return messages
    } catch (e) {
        throw {
            type: 'databaseError',
            message: 'an error from the database occured',
            error: e
        }
    }
}

const markRead = async (userId, messageId) => {
    try {
        const updated = await MailMessage.update({
            read: true
        },
        {
            where: {
                id: { [Op.eq]: messageId },
                to: { [Op.eq]: userId }
            }
        })
        if (updated.length <= 0) {
            throw {
                type: 'notFoundError',
                message: `no message found with id: ${messageId} for user with id: ${userId}.`
            }
        }
        return updated
    } catch (e) {
        throw {
            type: 'databaseError',
            message: 'an error from the database occured',
            error: e
        }
    }
}

export default {
    create,
    getInbox,
    getSent,
    markRead
}