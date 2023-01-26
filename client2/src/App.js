import "./App.css";
import Dashboard from "./Dashboard";
import SearchVideo from "./SearchVideo";

function App() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   axios.get("/").then((response) => setData(response.data));
  // }, []);
  // console.log(response);
  return (
    <div className="app">
      <h1>Qodeleaf Assignment</h1>
      <Dashboard />
      <SearchVideo />
    </div>
  );
}

export default App;
