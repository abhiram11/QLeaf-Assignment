const express = require("express");
const app = express();
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");
const pool = require("./db"); // use sequelize as well
const PORT = 3001;

// Creating the Database, check if DB already exists
// createDatabase("youtubeapidata9");
// pool.options.database = "youtubeapidata9";
// console.log("Pool:", pool.options);

// middleware
app.use(cors()); // for frontend integration
app.use(express.json()); // allows us to enter request.body and get json data from frontend

// ROUTES

// Home
app.get("/", (req, res) => res.status(200).send("Hello woorld from backend!"));

// Get all video data from the Database, paginated and in Descending Order (Latest first).
// Without page, get first 100 rows
app.get("/vids", async (req, res) => {
  try {
    await pool
      .query(
        `SELECT video_id, published_at FROM ytdata ORDER BY published_at DESC LIMIT 100`
      )
      .then((data) => {
        res.status(200).send(JSON.stringify(data.rows));
      });
  } catch (err) {
    console.error(err.message);
  }
});

// Get paginated results of 20 results each, where page=1 shows the latest enteies in the database
app.get("/vids/:page", async (req, res) => {
  const { page } = req.params;
  const pageSize = 20;
  console.log("PAGE:", page);
  try {
    await pool
      .query(
        `SELECT video_id, title, description, published_at FROM ytdata ORDER BY published_at DESC OFFSET ${
          (page - 1) * pageSize
        } LIMIT ${pageSize}`
      )
      .then((data) => {
        res.status(200).send(JSON.stringify(data.rows));
      });
  } catch (err) {
    res.status(500).send(err.message);
    console.error(err.message);
  }
});

// Search by matching Title and Description as stored in the Database
app.get("/search/:search", async (req, res) => {
  try {
    const { search } = req.params;
    console.log("Search:", search);
    let searchQuery = search.replaceAll(" ", " | ");
    await pool
      .query(
        `SELECT video_id, title, description FROM ytdata WHERE to_tsvector(title || ' ' || description) @@ to_tsquery('${searchQuery}')`
        // we could also use LIKE for even better matching results
      )
      .then((data) => res.status(200).send(JSON.stringify(data.rows)));
  } catch (err) {
    res.status(500).send(err.message);
    console.error(err.message);
  }
});

// Calls YoutubeAPI with required parameters, the time window is from [1 minute before, NOW]
async function callYoutubeApi() {
  var date = new Date();
  var beforeDate = date;
  beforeDate = beforeDate.toISOString(); // the microseconds have to be removed for query eligibility
  beforeDate =
    beforeDate.slice(0, -5) + beforeDate.slice(-1, beforeDate.length);
  date.setMinutes(date.getMinutes() - 1);
  date = date.toISOString();
  date = date.slice(0, -5) + date.slice(-1, date.length);
  console.log("\n\nAfterDate:", date, "BeforeDate:", beforeDate, "\n\n");

  await axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=football&order=date&part=snippet&maxResults=10&publishedAfter=${date}&publishedBefore=${beforeDate}`
    )
    .then((res) => {
      let items = res?.data?.items;
      if (items) {
        items.forEach(async (item) => {
          console.log(
            `Video id: ${item.id.videoId} --- Published at: ${item.snippet.publishedAt}`
          );
          //storing: videoId, title, description, publishedAt, thumbnails.default.url
          await pool
            .query(
              "INSERT INTO ytdata (video_id, title, description, published_at, thumbnails_url) VALUES ($1, $2, $3, $4, $5)", // RETURNING * or title
              [
                item.id.videoId,
                item.snippet.title,
                item.snippet.description,
                item.snippet.publishedAt,
                item.snippet.thumbnails.default.url,
              ]
            )
            .then(() => {
              // console.log("Successfully added the values!");
            })
            .catch((err) => {
              console.log("Error during inserting in DB:", err);
            });
        });
      }
    })
    //   .then((res) => console.log(JSON.stringify(res.data)))
    .catch((err) => {
      console.log("Error in Axios, (403 = Quota Exceeded): ", err.message);
    });
}

// callYoutubeApi();
// setInterval(callYoutubeApi, 60000); //calling every 60 seconds

app.listen(PORT, () => console.log(`listening to port:${PORT}`));
