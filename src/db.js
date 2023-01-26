//connecting to the database
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "1234",
  port: 5432,
  database: "youtubeapidata",
});

module.exports = pool;

// check if database already created

// const { Client } = require("pg");

// const createDatabase = async (dbname) => {
//   const client = new Client({
//     //   host: "127.0.0.1",
//     user: "postgres",
//     password: "1234",
//     port: 5432,
//   });

//   try {
//     await client.connect(); // gets connection
//     await client.query(`CREATE DATABASE ${dbname}`); // sends queries
//     console.log("Database created");
//     await client.query(`
//     CREATE TABLE ytdata(
//       id SERIAL PRIMARY KEY,
//       video_id VARCHAR(12) NOT NULL,
//       title VARCHAR(255) NOT NULL,
//       description VARCHAR(255),
//       published_at TIMESTAMP NOT NULL,
//       thumbnails_url VARCHAR(255) NOT NULL
//   );
//   `);
//     console.log("Table created");
//     return true;
//   } catch (error) {
//     console.log(`Database ${dbname} already created`);
//     return false;
//   } finally {
//     await client.end(); // closes connection
//   }
// };

// createDatabase().then((result) => {
//   if (result) {
//     console.log("Database and Table created");
//   }
// });

// module.exports = { pool , createDatabase };
