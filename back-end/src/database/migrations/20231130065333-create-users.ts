'use strict';

import { Model, QueryInterface, DataTypes } from "sequelize";
import { User } from "../types/User";

/** @type {import('sequelize-cli').Migration} */
export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<User>>('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(8),
        allowNull: false,
        defaultValue: 'customer',
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'birth_date',
      },
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  }
};
