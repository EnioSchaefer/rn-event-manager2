'use strict';

import { DataTypes, Model, QueryInterface } from "sequelize";
import { Event } from "../types/Event";

/** @type {import('sequelize-cli').Migration} */
export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Event>>('events', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(5000),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'owner_id',
      },
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('events');
  }
};
