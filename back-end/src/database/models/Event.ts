import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class Event extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public date!: Date;
  public status!: boolean;
  public ownerId!: number;
}

Event.init({
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
  description: {
    type: DataTypes.STRING,
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
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'users',
      key: 'id'
    }
  },
}, {
  sequelize,
  modelName: 'Event',
  timestamps: false,
  tableName: 'events',
  underscored: true,
});

export default Event;