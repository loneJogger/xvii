import User from './user.js'
import MailMessage from './mail.js'

User.hasMany(MailMessage, {
    as: 'fromUser',
    foreignKey: 'from',
    sourceKey: 'id'
})

User.hasMany(MailMessage, {
    as: 'toUser',
    foreignKey: 'to',
    sourceKey: 'id'
})

MailMessage.belongsTo(User, {
    as: 'fromUser',
    targetKey: 'id',
    foreignKey: 'from'
    
})

MailMessage.belongsTo(User, {
    as: 'toUser',
    targetKey: 'id',
    foreignKey: 'to'
})

export default {
    User,
    MailMessage
}