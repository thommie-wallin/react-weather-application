import '../styles/Today.css';

const Today = (props) => {
  const weatherData = props.weatherData;
  const isTempUnit = props.isTempUnit;
  const sunrise = (new Date(weatherData.current.sunrise * 1000)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const sunset = (new Date(weatherData.current.sunset * 1000)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  // Check if user choose celsius or fahrenheit, temp rounded to one decimal
  const temp = isTempUnit ? (weatherData.current.temp-273.15).toFixed(1) : (((weatherData.current.temp-273.15)*1.8)+32).toFixed(1);

  return (
    <div className="content-today">
      <h3>The weather today</h3>
      <ul className="list-today">
        <li><h1>{temp} {isTempUnit ? '℃' : '℉'}</h1></li>
        <li>Wind speed: {weatherData.current.wind_speed} m/s</li>
        <li>Humidity: {weatherData.current.humidity} %</li>
        <li>Sunrise/Sunset: {sunrise}/{sunset}</li>
      </ul>
    </div>
  )
}

export default Today