import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

class Skill extends Model {
    public id!: number;
    public ico!: string;
    public skill!: string;
    public desc!: string;
    public public!: boolean;
    public delete!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Skill.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ico: {
            type: new DataTypes.STRING(222),
            allowNull: false,
        },
        skill: {
            type: new DataTypes.STRING(222),
            allowNull: false,
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
        tableName: "skills",
        sequelize,
    }
);

export default Skill;
