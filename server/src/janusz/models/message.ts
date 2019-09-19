import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../database';

class Message extends Model {
  id!: number; // Note that the `null assertion` `!` is required in strict mode.
  author!: string;
  message!: string;
  notificationId!: number;
}

Message.init(
  {
    author: {
      type: new DataTypes.STRING(32),
      allowNull: false
    },
    message: {
      type: new DataTypes.STRING(1024),
      allowNull: false
    }
  },
  {
    timestamps: false,
    sequelize: sequelize
  }
);

export { Message };
