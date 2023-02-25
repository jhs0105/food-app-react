import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import FoodList from "./components/FoodList";
import InsertList from "./components/InsertList";
import Zone from "./components/Zone";
import Map from "./components/Map";
import { seoul } from "../src/assets/data/seoul.js";
import { ilsan } from "./assets/data/ilsan";
import { jeju } from "./assets/data/jeju";
import Detail from "./components/Detail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/zone" element={<Zone></Zone>}></Route>
          <Route path="/map/:place/:name" element={<Map></Map>}></Route>
          <Route
            path="/seoul"
            element={
              <FoodList map={seoul} title={"서울"} search={"seoul"}></FoodList>
            }
          ></Route>
          <Route
            path="/ilsan"
            element={
              <FoodList map={ilsan} title={"일산"} search={"ilsan"}></FoodList>
            }
          ></Route>
          <Route
            path="/jeju"
            element={
              <FoodList map={jeju} title={"제주"} search={"jeju"}></FoodList>
            }
          ></Route>
          <Route
            path="/detail/:place/:id"
            element={<Detail seoul={seoul} ilsan={ilsan}></Detail>}
          ></Route>
          <Route
            path="/insertseoul"
            element={<InsertList map={seoul} search={"seoul"}></InsertList>}
          ></Route>
          <Route
            path="/insertilsan"
            element={<InsertList map={ilsan} search={"ilsan"}></InsertList>}
          ></Route>
          <Route
            path="/insertjeju"
            element={<InsertList map={jeju} search={"jeju"}></InsertList>}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
