import '../styles/Hourly.css';

const Hourly = (props) => {
  const weatherData = props.weatherData;
  const isTempUnit = props.isTempUnit;
  const imgUrl = 'http://openweathermap.org/img/wn/';

  // Get todays date
  const date = new Date(weatherData.hourly[0].dt * 1000).toDateString();

  // Get data from every third hour from a day
  const hourlyData = weatherData.hourly.slice(0, 24).filter((_,i) => i % 3 === 0).map((d, i) => {
    // Get the hour
    const hour = new Date(d.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Check if user choose celsius or fahrenheit, temp rounded to one decimal and parsed into an integer.
    const temperature = isTempUnit ? parseFloat((d.temp-273.15).toFixed(1)) : parseFloat((((d.temp-273.15)*1.8)+32).toFixed(1));

    const windSpeed = d.wind_speed;
    const humidity = d.humidity;

    const element = 
      <li key={i}>
        {hour} {temperature}{isTempUnit ? '℃' : '℉'} <img src={imgUrl + d.weather[0].icon + '.png'}  alt={d.weather[0].main} /> {d.weather[0].description} {windSpeed}m/s {humidity}%
      </li>

    return element
  })

  return (
    <div className="content-hourly">
      <h3>Hourly weather - {date}</h3>
      <ul className="list-hourly">
        {hourlyData}
      </ul>
    </div>
  )
}



export default Hourly
