import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

class Work extends Model {
  public id!: number;
  public work!: string;
  public dates!: string[];
  public desc!: string;
  public public!: boolean;
  public delete!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Work.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    work: {
      type: new DataTypes.STRING(222),
      allowNull: false,
    },
    dates: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    desc: {
      type: DataTypes.TEXT,
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
    tableName: 'works',
    sequelize,
  }
);

export default Work;
