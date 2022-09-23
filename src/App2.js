import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "@mui/icons-material/Search";

function App2() {
  const [coordsData, setCoordsData] = useState([]);
  const [city, setCity] = useState("");
  const [list, setList] = useState([]);
  const [units, setUnits] = useState("metric");
  const [weatherData, setWeatherData] = useState([]);
  const [placeName, setPlaceName] = useState("");

  const onLocationClickListener = (locationItem) => {
    let { geometry, place_name: placeName } = locationItem;
    setCoordsData(geometry?.coordinates);
    setPlaceName(placeName);
  };
  const unitChangeListener = () => {
    let value = units === "metric" ? "imperial" : "metric";
    setUnits(value);
  };

  const onClickListener = () => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiZ2F1cmlzaGsyMyIsImEiOiJjazRwcHdweXYwODNnM2VxcWtjM2czaWoyIn0.1oHDbUPSS00b9hLNwMoC8Q`
    )
      .then((res) => res.json())
      .then((data) => {
        //setList(data?.features);
        console.log(data);
        //let [location] = data?.features;
        //let { geometry, place_name } = location;
        //setCoordsData(geometry?.coordinates);
        //setPlaceName(place_name);
        setList(data?.features);
      });
  };

  useEffect(() => {
    let [lon, lat] = coordsData;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=ccd0ce0571b6cc8885a5d086df20c629`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      });
  }, [coordsData, units]);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input
            type="textbox"
            value={city}
            className="search-input"
            onChange={(e) => setCity(e.target.value)}
          />
          <div className="search-button">
            <SearchIcon onClick={onClickListener} />
          </div>
        </div>

        <span onClick={unitChangeListener} className="unit">
          &deg;{units === "metric" ? "C" : "F"}{" "}
        </span>
        <div className="location-item">
          {list?.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                onLocationClickListener(item);
              }}
            >
              <p className="place-name">{item.place_name}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="temperature">
            Temperature is: {weatherData?.main?.temp}&deg;
            {units === "metric" ? "C" : "F"}
          </p>
        </div>

        {/* <div>
        <p>{placeName}</p>
      </div> */}
      </header>
    </div>
  );
}

export default App2;
