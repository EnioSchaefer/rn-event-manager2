'use strict';

import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class UserEventModel extends Model {
  public userId!: number;
  public eventId!: number;
  public qrCode!: string;
  public used!: boolean;
}

UserEventModel.init({
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    field: 'user_id',
    references: {
      model: 'User',
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
      model: 'Event',
      key: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  },
  qrCode: {
    type: DataTypes.BLOB,
    allowNull: false,
    field: 'qr_code',
  },
  used: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
}, {
  sequelize,
  modelName: 'UserEvent',
  timestamps: false,
  tableName: 'user_events',
  underscored: true,
});

export default UserEventModel;