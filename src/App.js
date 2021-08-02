import React, { useState } from 'react';
const api = {
  // key: "b2cc5e832a0d6c24754dbe805eaa5103",
  // base: "https://api.openweathermap.org/data/2.5/"
  key: "b2cc5e832a0d6c24754dbe805eaa5103",
  base: "https://api.openweathermap.org/data/2.5/"
  //base:"https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=edb38f5ad7b58363d5339adc2b01203f"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&cnt=7&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }
  
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let time = d.getHours()+":"+d.getMinutes();

    return `${day} | ${date} ${month} ${year} | ${time}`
  }
  // String s1 = {(window.dt)*1000}; 
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
            <a href="#data"></a>
            {/* <div className="wind">Wind Speed: {weather.wind.speed}mph</div> */}
            <ul id="data">
              <li class="winds"><h4>{weather.wind.speed} mph <br/><span>Wind Speed</span></h4></li>
              <li class="humidity"><h4>{weather.main.humidity}%<br/><span>Humidity</span></h4></li>
              <li class="pressure"><h4>{weather.main.pressure} mbar<br/><span>Pressure</span></h4></li>
              {/* <li>{weather.sys.sunrise}<br/><span>Sunrise</span></li> */}
              {/* <li>{weather.sys.sunset}<br/><span>Sunset</span></li> */}
              
            </ul>

            {/* <div className="samay">time: {(weather.dt)*1000}</div> */}

            {/* <div className="apna-time-ayega">apna time:</div> */}

          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
