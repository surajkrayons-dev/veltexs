import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Automatically switch Database based on environment
let sequelize;

// Agar Railway par hain, to MySQL use karo
if (process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT) {
  console.log('🔗 Connecting to Live MySQL Database (Railway)...');
  sequelize = new Sequelize(
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
} else {
  // Agar Local laptop par hain, to SQLite use karo (Bina kisi extra setup ke chalega)
  console.log('🛠️ Connecting to Local SQLite Database...');
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './local_dev.sqlite', // Local me ye file ban jayegi DB ke liye
    logging: false
  });
}

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database Connected Successfully!');
  } catch (error) {
    console.error('❌ Connection Failed:', error.message);
  }
};

export { sequelize };
