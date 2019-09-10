import { Model, DataTypes, BuildOptions } from 'sequelize';
import { sequelize } from '../../database';

class Notification extends Model {
  id!: number; // Note that the `null assertion` `!` is required in strict mode.
  name!: string;
  author!: string;
  workingDay!: boolean;
  year!: string;
  month!: string;
  date!: string;
  week!: string;
  dayOfWeek!: string;
  hour!: string;
  minute!: string;
  second!: string;
}

Notification.init(
  {
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    author: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    workingDay: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    second: { type: new DataTypes.STRING(128), defaultValue: 0 },
    minute: { type: new DataTypes.STRING(128), allowNull: true },
    hour: { type: new DataTypes.STRING(128), allowNull: true },
    date: { type: new DataTypes.STRING(128), allowNull: true },
    month: { type: new DataTypes.STRING(128), allowNull: true },
    year: {
      type: new DataTypes.STRING(128),
      allowNull: true
    },
    dayOfWeek: { type: new DataTypes.STRING(128), allowNull: true }
  },
  {
    timestamps: false,
    sequelize: sequelize
  }
);

export { Notification };
