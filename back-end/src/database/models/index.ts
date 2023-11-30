import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql',
  storage: 'database.mysql',
});

export default sequelize;