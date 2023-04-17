module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('mail_messages', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      to: {
        allowNull: false,
        type: Sequelize.UUID
      },
      from: {
        allowNull: false,
        type: Sequelize.UUID
      },
      subject: {
        allowNull: false,
        type: Sequelize.STRING
      },
      body: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      game_id: {
        allowNull: true,
        type: Sequelize.UUID
      },
      game_secret: {
        allowNull: true,
        type: Sequelize.STRING
      },
      read: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('mail_messages')
  }
}
