import "./App.css";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

function App() {
  const [coordsData, setCoordsData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [units, setUnits] = useState("metric");
  const [list, setList] = useState([]);

  /*  useEffect(() => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/pune.json?access_token=pk.eyJ1IjoiZ2F1cmlzaGsyMyIsImEiOiJjazRwcHdweXYwODNnM2VxcWtjM2czaWoyIn0.1oHDbUPSS00b9hLNwMoC8Q`
    )
      .then((res) => res.json())
      .then((data) => setCoordsData(data?.feature[0]));
  }, []); */

  /*  const radioClickListener = (event) => {
    let value = event.target.value;
    setUnits(value);
  }; */

  const unitChangeListener = () => {
    let value = units === "metric" ? "imperial" : "metric";
    setUnits(value);
  };

  const onLocationListener = (locationItem) => {
    let { geometry, place_name: placeName } = locationItem;
    setCoordsData(geometry?.coordinates);
    setPlaceName(placeName);
  };

  const onClickListener = () => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiZ2F1cmlzaGsyMyIsImEiOiJjazRwcHdweXYwODNnM2VxcWtjM2czaWoyIn0.1oHDbUPSS00b9hLNwMoC8Q`
    )
      .then((res) => res.json())
      .then((data) => {
        /*  let person = {
          firstname: 'Purva',
          lastname: 'Rokde',
          address: 'Akola',
          age: 29
        }
        let { firstname, lastname } = person;
        const arr = [10, 20, 30];
        features=[{},{},{},{},{}]
        let [num1, , num2] = arr; */
        /* let [location] = data?.features; //variable name anything
        let { geometry, place_name } = location; */ //keys as it is from location object

        //let { geometry, place_name } = data?.features;
        //setCoordsData(geometry?.coordinates);
        setList(data?.features);
        //setPlaceName(place_name);
      });
  };

  /* useEffect(() => {}, []); //this is componentdidmount

  useEffect(() => {}); //this is componentdidupdate */
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
  }, [coordsData, units]); //this is componentdidupdate

  /*   useEffect(() => {
    return () => {};
  }, []); //this is componentwillunmount */

  return (
    <div className="App">
      <header className="App-header">
        <h3 className="header">Know your city weather</h3>
        <div className="search-box">
          <input
            type="search"
            placeholder="Enter city.."
            onChange={(e) => setCity(e.target.value)}
            value={city}
            className="search-input "
          />
          <SearchIcon onClick={onClickListener} />
        </div>
        {/*   <div>
          <p style={{ fontSize: "30px" }}>{placeName}</p>
          <p className="temperature">
            {weatherData?.main?.temp}&deg;{units === "metric" ? "C" : "F"}
          </p>
        </div> */}

        <div className="location-item">
          {list?.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                onLocationListener(item);
              }}
            >
              <p style={{ fontSize: "20px" }} className="place-name">
                {item.place_name}
              </p>
            </div>
          ))}
        </div>
        <p className="temperature">
          Temperature is : {weatherData?.main?.temp}&deg;
          {units === "metric" ? "C" : "F"}
        </p>

        {/* <div>
          Temperature in:
          <input
            type="radio"
            value="metric"
            name="unit"
            id="metric-unit"
            onClick={radioClickListener}
          />
          <label for="m">Metric</label>
          <input
            type="radio"
            value="imperial"
            name="unit"
            id="imperial-unit"
            onClick={radioClickListener}
          />
          <label for="i ">Imperial</label>
        </div> */}

        <span onClick={unitChangeListener} className="unit">
          &deg;{units === "metric" ? "C" : "F"}
        </span>
        {/*  <div>  
          <p>{weatherData.name}</p>
          <div>
            Temperature in:
            <input type="radio" id="c" value="c" checked />
            <label for="m">Metric</label>
            <input type="radio" id="f" value="f" />
            <label for="i ">Imperial</label>
            <p>{Math.round(weatherData.main.temp)}&deg;</p>
          </div>
          <p>{weatherData.weather[0].main}</p>
        </div> */}
      </header>
    </div>
  );
}

export default App;
//1.userInput= 'Akola'
//2.search=call API(mapbox) and get Coordinate data and store in coordsData calling setCoordsData
//3.inside ComponentdidUpdate call the second API(openweathermap) with coordsData and store weather information
//in weatherData using setWeatherData
//4.display whtr data using jsx
