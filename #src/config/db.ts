// import {Pool} from 'pg'

// const {DB_USER, DB_PASSWORD, DB_HOST, DB_A_NAME} = process.env

// export const db = new Pool({
//     user: DB_USER, 
//     password: DB_PASSWORD,
//     host: DB_HOST,
//     port: 5432,
//     database: DB_A_NAME
// }
// )

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_A_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

export default sequelize;