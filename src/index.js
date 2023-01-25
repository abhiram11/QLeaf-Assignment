const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
// const PORT = 3000;

//middleware
app.use(cors());
app.use(express.json()); // allows us to enter request.body and get json data from frontend

// app.get("/", (req, res) => res.status(200).send("Hello woorld from backend!"));

// app.listen(PORT, () => console.log(`listening to port:${PORT}`));

const axios = require("axios");
//await
axios
  .get(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=football&order=date&part=snippet&maxResults=10`
  )
  // .get("https://jsonplaceholder.typicode.com/users")
  .then((res) => {
    // console.log("%j", res.data);
    let items = res.data.items;
    // console.log(items);
    items.forEach((item) => {
      //storing: videoId, title, description, publishedAt, thumbnails.default.url
      console.log(
        item.id.videoId,
        item.snippet.title,
        item.snippet.description,
        item.snippet.publishedAt,
        item.snippet.thumbnails.default.url, //can be replaced later to reduce storage cost sinceit's based on
        "\n\n"
      );
    });
  })
  //   .then((res) => console.log(JSON.stringify(res.data)))
  .catch((err) => {
    console.log("Error: ", err.message);
  });

console.log("hi");
//  Video title, description, publishing datetime, thumbnails URLs and any other fields you require
// PostgreSQL for any application that might grow to enterprise scope, with complex queries and frequent write operations
// // if the request API costs the same QUOTA for maxResults 10 to 50, then call them all at once! Use refreshToken, etc.
// // https://www.googleapis.com/youtube/v3/search?key=AIzaSyCrwujD2kNWK-3y5XTpJSY6A49HjNSRF7c&q=football&order=date&part=snippet&maxResults=10
