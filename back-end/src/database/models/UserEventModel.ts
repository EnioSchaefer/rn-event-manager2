'use strict';

import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class UserEventModel extends Model {
  public userId!: number;
  public eventId!: number;
  public qrCode!: string;
}

UserEventModel.init({
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    field: 'user_id',
    references: {
      model: 'user',
      key: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  },
  eventId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    field: 'event_id',
    references: {
      model: 'event',
      key: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  },
  qrCode: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'qr_code',
  },
}, {
  sequelize,
  modelName: 'UserEvent',
  timestamps: false,
  tableName: 'user_events',
  underscored: true,
});

export default UserEventModel;