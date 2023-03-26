import { Model, DataTypes } from 'sequelize'
import db from './db.js'

export class ChatMessage extends Model {}

ChatMessage.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        from: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 200]
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        } 
    },
    {
        sequelize: db,
        tableName: 'chat_messages',
    }
)

export default ChatMessage