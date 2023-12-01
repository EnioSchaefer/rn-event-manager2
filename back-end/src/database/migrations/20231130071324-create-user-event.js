'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('user_events', {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'user_id',
      },
      eventId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'event_id',
      },
      qrCode: {
        type: DataTypes.STRING(200),
        allowNull: false,
        field: 'qr_code',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('user_events');
  }
};
