const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const pool = require("./db"); // use sequelize as well
const PORT = 3000;

//middleware
app.use(cors());
app.use(express.json()); // allows us to enter request.body and get json data from frontend

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

//ROUTES
app.get("/", (req, res) => res.status(200).send("Hello woorld from backend!"));

// ********************** add latest publishedAfter

app.get("/vids/:page", async (req, res) => {
  const { page } = req.params;
  const pageSize = 5;
  console.log("PAGE:", page);
  try {
    await pool
      .query(
        `SELECT * FROM ytdata ORDER BY published_at DESC OFFSET ${
          (page - 1) * pageSize
        } LIMIT ${pageSize}`
      )
      .then((data) => {
        // let items = data.rows;
        // console.log(items);
        // items.forEach((item) => {
        //   console.log(item.id, item.published_at);
        // });

        res.status(200).send(JSON.stringify(data.rows));
      });
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/search/:search", async (req, res) => {
  try {
    const { search } = req.params;
    let searchQuery = search.replace(" ", " | ");
    await pool
      .query(
        `SELECT video_id, title, description FROM ytdata WHERE to_tsvector(title || ' ' || description) @@ to_tsquery('${searchQuery}')`
        // "SELECT video_id, title, description FROM ytdata WHERE title LIKE '%NOTT%' OR description LIKE '%Disc%'"
      )
      .then((data) => res.status(200).send(JSON.stringify(data.rows)));
  } catch (err) {
    console.error(err.message);
  }
});
// const axios = require("axios");
// //await
// axios
//   .get(
//     `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=football&order=date&part=snippet&maxResults=10`
//   )
//   // .get("https://jsonplaceholder.typicode.com/users")
//   .then((res) => {
//     // console.log("%j", res.data);
//     let items = res.data.items;
//     // console.log(items);
//     console.log("Inserting item into DB");
//     items.forEach(async (item) => {
//       //storing: videoId, title, description, publishedAt, thumbnails.default.url
//       //   console.log(
//       //     item.id.videoId,
//       //     item.snippet.title,
//       //     item.snippet.description,
//       //     item.snippet.publishedAt,
//       //     item.snippet.thumbnails.default.url, //can be replaced later to reduce storage cost sinceit's based on
//       //     "\n\n"
//       //   );
//       const newYtData = await pool
//         .query(
//           "INSERT INTO ytdata (video_id, title, description, published_at, thumbnails_url) VALUES ($1, $2, $3, $4, $5)", // RETURNING * or title
//           [
//             item.id.videoId,
//             item.snippet.title,
//             item.snippet.description,
//             item.snippet.publishedAt,
//             item.snippet.thumbnails.default.url,
//           ]
//         )
//         .then(() => {
//           console.log("Successfully added the values!");
//         })
//         .catch((err) => {
//           console.log("Error during inserting in DB:", err);
//         });
//     });
//   })
//   //   .then((res) => console.log(JSON.stringify(res.data)))
//   .catch((err) => {
//     console.log("Error: ", err.message);
//   });

// **********************

// **********************

// pool
//   .query("SELECT * FROM ytdata ORDER BY published_at DESC OFFSET 1 LIMIT 5")
//   .then((data) => {
//     let items = data.rows;
//     // console.log(items);
//     items.forEach((item) => {
//       console.log(item.id, item.published_at);
//     });
//   });

// don't use offset, use estimates if possible, not use ORM

// **********************
// to_tsvector(yourQuery) breaks input into tokens, and to_tsquery(columnValues) does the full text query, ts = TextSearch

// pool
//   .query(
//     "SELECT video_id, title, description FROM ytdata WHERE to_tsvector(title || ' ' || description) @@ to_tsquery('football')"
//     // "SELECT video_id, title, description FROM ytdata WHERE title LIKE '%NOTT%' OR description LIKE '%Disc%'"
//   )
//   .then((data) => console.log("TSQUERY:", data));

// **********************

//  Video title, description, publishing datetime, thumbnails URLs and any other fields you require
// PostgreSQL for any application that might grow to enterprise scope, with complex queries and frequent write operations
// // if the request API costs the same QUOTA for maxResults 10 to 50, then call them all at once! Use refreshToken, etc.
// // https://www.googleapis.com/youtube/v3/search?key=AIzaSyCrwujD2kNWK-3y5XTpJSY6A49HjNSRF7c&q=football&order=date&part=snippet&maxResults=10
// uninstall nodemon if installed
// use multithreading for continuous  YT API Fetching and to work on our DB Calls synchronously

app.listen(PORT, () => console.log(`listening to port:${PORT}`));
