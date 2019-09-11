import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../database';
import { Message } from './message';

class Notification extends Model {
  id!: number; // Note that the `null assertion` `!` is required in strict mode.
  name!: string;
  workingDay!: boolean;
  second!: string;
  minute!: string;
  hour!: string;
  date!: string;
  month!: string;
  year!: string;
  dayOfWeek!: string;
}

Notification.init(
  {
    name: {
      type: new DataTypes.STRING(32),
      allowNull: false,
      unique: true
    },
    workingDay: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    second: { type: new DataTypes.STRING(32), defaultValue: 0 },
    minute: { type: new DataTypes.STRING(32), allowNull: true },
    hour: { type: new DataTypes.STRING(32), allowNull: true },
    date: { type: new DataTypes.STRING(32), allowNull: true },
    month: { type: new DataTypes.STRING(32), allowNull: true },
    year: {
      type: new DataTypes.STRING(32),
      allowNull: true
    },
    dayOfWeek: { type: new DataTypes.STRING(32), allowNull: true }
  },
  {
    timestamps: false,
    sequelize: sequelize
  }
);

Notification.hasMany(Message, { onDelete: 'CASCADE' });

export { Notification };
