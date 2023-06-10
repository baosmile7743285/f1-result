import "./App.css";
import DriverResult from "./Components/DriverResult/DriverResult";
import LineChart from "./Components/LineChart/LineChart";

function App() {
  return (
    <div className="container min-h-screen px-20 bg-gray-200">
      <div className="p-10 bg-white h-full">
        <div className="">
          <DriverResult></DriverResult>
        </div>
      </div>
    </div>
  );
}

export default App;
