import { Op } from 'sequelize'
import Models from '../database/models/index.js'

const { MailMessage, User } = Models

const create = async (to, from, subject, body) => {
    try {
        const newMail = await MailMessage.create({
            to,
            from,
            subject,
            body
        })
        return newMail
    } catch (e) {
        throw {
            type: 'databaseError',
            message: 'an error from the database occured',
            error: e
        }
    }
}

const destroy = async (id) => {
    try {
        const deleted = await MailMessage.destroy({
            where: {
                id: { [Op.eq]: id }
            }
        })
        return deleted
    } catch (e) {
        throw {
            type: 'databaseError',
            message: 'an error from the database occured',
            error: e
        }
    }
}

const view = async (id) => {
    try {
        return await MailMessage.findByPk(id)
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
            },
            include: [
                {model: User, as: 'fromUser', attributes: ['username']},
                {model: User, as: 'toUser', attributes: ['username']}
            ]
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
            },
            include: [
                {model: User, as: 'toUser', attributes: ['username']},
                {model: User, as: 'fromUser', attributes: ['username']}
            ]
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
    destroy,
    view,
    getInbox,
    getSent,
    markRead,
}