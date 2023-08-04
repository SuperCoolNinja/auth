import mysql from 'mysql2/promise';


const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

export const pool = mysql.createPool(dbConfig);

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connection successful!');
    connection.release();
  } catch (error) {
    console.error('Connection error:', error);
  }
})();