import { useForecastContext } from "../services/contexts/forecast-context";

export default function useGeolocationPermission() {
  const { setPosition, loadingStart, loadingStop, setError } =
    useForecastContext();
  const success = (position) => {
    localStorage.setItem("location-allowed", true);
    // setPosition({
    //   latitude: position.coords.latitude,
    //   longitude: position.coords.longitude,
    // });
    // loadingStop();
    // this.getWeatherData(position.coords.latitude, position.coords.longitude);
  };

  const error = (error) => {
    // this.setState({ status: "unable" });
    localStorage.removeItem("location-allowed");
    console.log(error);
    // alert("Unable to retrieve location.");
  };

  if (navigator.geolocation) {
    // this.setState({ status: "fetching" });
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    // this.setState({ status: "unsupported" });
    alert(
      "Your browser does not support location tracking, or permission is denied.",
    );
  }
}
