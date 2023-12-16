import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import { useWeatherData } from './api/api.js';
import Today from './components/Today';
import WeekOverview from './components/WeekOverview';
import Hourly from './components/Hourly';
import WeekForecast from './components/WeekForecast';

function App() {  
  const {weatherData} = useWeatherData();
  const [isTempUnit, setIsTempUnit] = useState(true);

  // Toggle temperature unit
  const toggleUnit = () => {
    setIsTempUnit(
      isTempUnit ? false : true
    )
  }

  return (
    <Router>
      <div className="content">
        <header className="header">
          <div className="title">
            <h1>u09 Weather App </h1>
            <button onClick={toggleUnit}>
              Change {isTempUnit ? '℃' : '℉'}
            </button>
          </div>
          <div className="timezone">
            <h3>Time Zone: {weatherData.timezone}</h3>
          </div>
        </header>
        <nav className="navbar">
          <ul className="navList">
            <li><Link to="/">Today</Link></li>
            <li><Link to="/hourly">Hourly</Link></li>
            <li><Link to="/fiveday">5 day</Link></li>
          </ul>
        </nav>
        <div className="router-content">
          <Switch>
            <Route exact path="/">
              {Object.keys(weatherData).length > 0 && <Today weatherData={weatherData} isTempUnit={isTempUnit} />}
              {Object.keys(weatherData).length > 0 && <WeekOverview weatherData={weatherData} isTempUnit={isTempUnit} />}
            </Route>
            <Route path="/hourly">
              {Object.keys(weatherData).length > 0 && <Hourly weatherData={weatherData} isTempUnit={isTempUnit} />}
            </Route>
            <Route path="/fiveday">
              {Object.keys(weatherData).length > 0 && <WeekForecast weatherData={weatherData} isTempUnit={isTempUnit} />}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;