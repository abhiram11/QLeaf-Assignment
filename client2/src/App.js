import { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import SearchVideo from "./SearchVideo";
import axios from "./axios";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("/").then((response) => setData(response.data));
  }, []);

  return (
    <div className="app">
      <h1>Qodeleaf Assignment</h1>
      <br />
      <p> Backend: {data}</p>
      <Dashboard />
      <SearchVideo />
    </div>
  );
}

export default App;
