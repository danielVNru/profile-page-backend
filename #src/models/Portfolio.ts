import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

class Portfolio extends Model {
  public id!: number;
  public title!: string;
  public about!: string;
  public pictures!: string;
  public public!: boolean;
  public delete!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Portfolio.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(222),
      allowNull: false,
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pictures: {
      type: new DataTypes.STRING(100),
      allowNull: true,
    },
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    delete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'portfolios',
    sequelize,
  }
);

export default Portfolio;
