import { Model, DataTypes } from 'sequelize'
import db from './db.js'

export class MailMessage extends Model {}

MailMessage.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        to: {
            type: DataTypes.UUID,
            allowNull: false
        },
        from: {
            type: DataTypes.UUID,
            allowNull: false
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1, 2000]
            }
        },
        game_id: {
            type: DataTypes.UUID,
            allowNull: true
        },
        game_secret: {
            type: DataTypes.STRING,
            allowNull: true
        },
        read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
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
        tableName: 'mail_messages',
    }
)

export default MailMessage