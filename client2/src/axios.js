import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
  //once we deploy, we change the url and set it to heroku deployment api
});

export default instance;
