const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const pool = require("./db");
// const PORT = 3000;

//middleware
app.use(cors());
app.use(express.json()); // allows us to enter request.body and get json data from frontend

//ROUTES

// app.get("/", (req, res) => res.status(200).send("Hello woorld from backend!"));
// app.listen(PORT, () => console.log(`listening to port:${PORT}`));

// ********************** add latest publishedAfter
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

// pool.query("SELECT * FROM ytdata").then((data) => {
//   console.log(data);
// });

// **********************
// to_tsvector(yourQuery) breaks input into tokens, and to_tsquery(columnValues) does the full text query, ts = TextSearch
pool
  .query(
    "SELECT video_id, title, description FROM ytdata WHERE to_tsvector(title || ' ' || description) @@ to_tsquery('Discord')"
    // "SELECT video_id, title, description FROM ytdata WHERE title LIKE '%NOTT%' OR description LIKE '%Disc%'"
  )
  .then((data) => console.log("TSQUERY:", data));

// **********************

//  Video title, description, publishing datetime, thumbnails URLs and any other fields you require
// PostgreSQL for any application that might grow to enterprise scope, with complex queries and frequent write operations
// // if the request API costs the same QUOTA for maxResults 10 to 50, then call them all at once! Use refreshToken, etc.
// // https://www.googleapis.com/youtube/v3/search?key=AIzaSyCrwujD2kNWK-3y5XTpJSY6A49HjNSRF7c&q=football&order=date&part=snippet&maxResults=10
