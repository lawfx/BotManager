import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../database';

class Holiday extends Model {
  id!: number; // Note that the `null assertion` `!` is required in strict mode.
  date!: Date;
}

Holiday.init(
  {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true
    }
  },
  {
    timestamps: false,
    sequelize: sequelize
  }
);

export { Holiday };
