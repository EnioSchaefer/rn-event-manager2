'use strict';

import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class UserModel extends Model {
  public id?: number;
  public name!: string;
  public username?: string;
  public email!: string;
  public password!: string;
  public role?: 'customer' | 'manager' | 'admin';
  public birthDate!: Date;
}

UserModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('customer' , 'manager' , 'admin'),
    allowNull: false,
    defaultValue: 'customer',
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'birth_date',
  },
}, {
  sequelize,
  modelName: 'User',
  timestamps: false,
  tableName: 'users',
  underscored: true,
});

export default UserModel;