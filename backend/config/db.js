import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Railway ke andar 'mysql.railway.internal' sabse fast aur secure hai
export const sequelize = new Sequelize(
  process.env.DB_NAME,     
  process.env.DB_USER,     
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST || 'mysql.railway.internal', 
    port: process.env.DB_PORT || 3306, 
    dialect: 'mysql',          
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Railway Internal Database Connected!');
  } catch (error) {
    console.error('❌ Connection Failed:', error.message);
  }
};
