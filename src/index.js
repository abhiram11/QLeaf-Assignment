require("dotenv").config();
// console.log(process.env);
//install passport for auth

// const express = require("express");

// console.log("Hi abhiram");

// // if the request API costs the same QUOTA for maxResults 10 to 50, then call them all at once! Use refreshToken, etc.
// // https://www.googleapis.com/youtube/v3/search?key=AIzaSyCrwujD2kNWK-3y5XTpJSY6A49HjNSRF7c&q=football&order=date&part=snippet&maxResults=10

// const app = express();
// const PORT = 3000;

// app.get("/", (req, res) => res.status(200).send("Hello woorld from backend!"));

// app.listen(PORT, () => console.log(`listening to port:${PORT}`));

const axios = require("axios");

axios
  .get(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=football&order=date&part=snippet&maxResults=10`
  )
  // .get("https://jsonplaceholder.typicode.com/users")
  .then((res) => console.log(res.data))
  .catch((err) => {
    console.log("Error: ", err.message);
  });
