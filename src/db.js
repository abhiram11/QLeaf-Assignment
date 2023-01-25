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

// const client = new Client({
//   //   host: "127.0.0.1",
//   user: "postgres",
//   password: "1234",
//   port: 5432,
// });

// const createDatabase = async () => {
//   try {
//     await client.connect(); // gets connection
//     await client.query("CREATE DATABASE youtubeapidata"); // sends queries
//     return true;
//   } catch (error) {
//     console.log("Database youtubeapidata already created");
//     return false;
//   } finally {
//     await client.end(); // closes connection
//   }
// };

// createDatabase().then((result) => {
//   if (result) {
//     console.log("Database youtubeapidata created");
//   }
// });
