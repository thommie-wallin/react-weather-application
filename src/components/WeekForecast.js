import '../styles/WeekForecast.css';

const WeekForecast = (props) => {
  const weatherData = props.weatherData;
  const isTempUnit = props.isTempUnit;
  const imgUrl = 'http://openweathermap.org/img/wn/';

  // Get data from every third hour from a day
  const dateData = weatherData.daily.slice(0, 5).map((d, i) => {
    // Get the hour
    const dates = new Date(d.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric'});

    // Get sunrise/sunset time
    const sunrise = (new Date(d.sunrise * 1000)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunset = (new Date(d.sunset * 1000)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Check if user choose celsius or fahrenheit, temp rounded to one decimal and parsed into an integer.
    const temperature = isTempUnit ? parseFloat((d.temp.day-273.15).toFixed(1)) : parseFloat((((d.temp.day-273.15)*1.8)+32).toFixed(1));

    const windSpeed = d.wind_speed;
    const humidity = d.humidity;

    const element = 
      <li key={i}>
        {dates} {temperature}{isTempUnit ? '℃' : '℉'} <img src={imgUrl + d.weather[0].icon + '.png'}  alt={d.weather[0].main} /> {d.weather[0].description} {windSpeed}m/s {humidity}% Sunrise/Sunset: {sunrise}/{sunset}
      </li>

    return element
  })


  return (
    <div className="content-forecast">
      <h3>5 Day Weather</h3>
      <ul className="list-forecast">
        {dateData}
      </ul>
    </div>
  )
}

export default WeekForecast