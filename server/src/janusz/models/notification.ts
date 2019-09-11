import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../database';
import { Message } from './message';

class Notification extends Model {
  id!: number; // Note that the `null assertion` `!` is required in strict mode.
  label!: string;
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
    label: {
      type: new DataTypes.STRING(32),
      allowNull: false,
      unique: true
    },
    workingDay: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    second: {
      type: new DataTypes.STRING(32),
      allowNull: false,
      defaultValue: 0
    },
    minute: {
      type: new DataTypes.STRING(32),
      allowNull: false,
      defaultValue: '*'
    },
    hour: {
      type: new DataTypes.STRING(32),
      allowNull: false,
      defaultValue: '*'
    },
    date: {
      type: new DataTypes.STRING(32),
      allowNull: false,
      defaultValue: '*'
    },
    month: {
      type: new DataTypes.STRING(32),
      allowNull: false,
      defaultValue: '*'
    },
    year: {
      type: new DataTypes.STRING(32),
      allowNull: false,
      defaultValue: '*'
    },
    dayOfWeek: {
      type: new DataTypes.STRING(32),
      allowNull: false,
      defaultValue: '*'
    }
  },
  {
    timestamps: false,
    sequelize: sequelize
  }
);

Notification.hasMany(Message, {
  onDelete: 'CASCADE',
  foreignKey: 'notificationId'
});

export { Notification };
