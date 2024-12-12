import { Sequelize } from 'sequelize';
import pg from 'pg'
import dotenv from 'dotenv';
dotenv.config();

console.log('DATABASE_URL_UNPOOLED:', process.env.DATABASE_URL_UNPOOLED);

// Conexión a la base de datos
const sequelize = new Sequelize(process.env.DATABASE_URL_UNPOOLED, {
  // host: process.env.DB_HOST,
  dialect: 'postgres',
  dialectModule: pg,
  // protocol: 'postgres',
  port: process.env.DB_PORT || 5432, // Opcional: puerto por defecto de PostgreSQL
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a Neon PostgreSQL desde Vercel Storage');
  } catch (error) {
    console.error('Error conectando a PostgreSQL:', error);
  }
}

export { sequelize, testConnection };
