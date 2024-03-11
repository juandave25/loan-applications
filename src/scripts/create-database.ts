import { Client } from 'pg';

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'root',
  database: 'postgres',
});

async function createDatabaseIfNotExists(dbName) {
  try {
    await client.connect();
    const dbExists = await client.query(
      'SELECT 1 FROM pg_database WHERE datname=$1',
      [dbName],
    );
    if (dbExists.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database ${dbName} created.`);
    } else {
      console.log(`Database ${dbName} already exists.`);
    }
  } catch (error) {
    console.error('Could not connect to postgres', error);
  } finally {
    await client.end();
  }
}

createDatabaseIfNotExists('loan_application');
