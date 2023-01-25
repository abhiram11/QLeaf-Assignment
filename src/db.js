//connecting to the database
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "1234",
  port: 5432,
  database: "youtubeapidata",
});

module.exports = pool;

/**
const { Client } = require('pg');

const client = new Client({
    host: '127.0.0.1',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PSWD || 'password',
    port: process.env.DB_PORT || 5432,
});

const createDatabase = async () => {
    try {
        await client.connect();                            // gets connection
        await client.query('CREATE DATABASE my_database'); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();                                // closes connection
    }
};

createDatabase().then((result) => {
    if (result) {
        console.log('Database created');
    }
});
 * 
 */
