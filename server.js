const app = require('./app');
const pool = require('./config/database');

const port = Number(process.env.PORT) || 3000;

async function start() {
  try {
    await pool.query('SELECT 1');
    app.listen(port, () => {
      console.log(`ProjectBoard is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to PostgreSQL. Check DATABASE_URL and run database/init.sql.', error.message);
    process.exit(1);
  }
}

start();
