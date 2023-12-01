'use strict';

import { DataTypes, Model, ModelDefined } from "sequelize";
import sequelize from "./index";

class UserEvent extends Model {
  public userId!: number;
  public eventId!: number;
  public qrCode!: string;
}

UserEvent.init({
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

export default UserEvent;