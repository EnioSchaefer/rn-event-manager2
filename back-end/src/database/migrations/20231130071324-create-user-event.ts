'use strict';

import { DataTypes, Model, QueryInterface } from "sequelize";
import { UserEvent } from "../types/UserEvent";

/** @type {import('sequelize-cli').Migration} */
export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<UserEvent>>('user_events', {
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

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('user_events');
  }
};
