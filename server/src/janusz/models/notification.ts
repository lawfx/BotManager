import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../database';
import { Message } from './message';

class Notification extends Model {
  id!: number; // Note that the `null assertion` `!` is required in strict mode.
  label!: string;
  creator!: string;
  active!: boolean;
  activeOnHolidays!: boolean;
  minute!: string;
  hour!: string;
  date!: string;
  month!: string;
  dayOfWeek!: string;
}

Notification.init(
  {
    label: {
      type: new DataTypes.STRING(32),
      allowNull: false,
      unique: true
    },
    creator: {
      type: new DataTypes.STRING(32),
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    activeOnHolidays: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
    dayOfWeek: {
      type: new DataTypes.STRING(32),
      allowNull: false,
      defaultValue: '*'
    }
  },
  {
    timestamps: false,
    sequelize: sequelize,
    hooks: {
      beforeValidate: notification => {
        notification.month = ifEmptyThenStar(notification.month);
        notification.date = ifEmptyThenStar(notification.date);
        notification.hour = ifEmptyThenStar(notification.hour);
        notification.minute = ifEmptyThenStar(notification.minute);
        notification.dayOfWeek = ifEmptyThenStar(notification.dayOfWeek);
      }
    }
  }
);

Notification.hasMany(Message, {
  onDelete: 'CASCADE',
  foreignKey: 'notificationId'
});

function ifEmptyThenStar(value: string): string {
  return value.trim().length === 0 ? '*' : value.trim();
}

export { Notification };
