import React, { useEffect } from "react";
import { useForecastContext } from "../../../services/contexts/forecast-context";
import useLocalStorage from "../../../hooks/useLocalStorage";

const LocationButton = () => {
  const { setPosition, loadingStart, loadingStop, setError } =
    useForecastContext();
  const [positionBtnDisabled, setPositionBtnDisabled] = useLocalStorage(
    "positionBtnDisabled",
    false,
  );

  function handleGeolocationPermission() {
    const success = (position) => {
      loadingStart();
      setPositionBtnDisabled(false);
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      loadingStop();
    };

    const error = (error) => {
      setPositionBtnDisabled(true);
      console.log(error);
      setError(error);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert(
        "Your browser does not support location tracking, or permission is denied.",
      );
    }
  }

  useEffect(() => {
    handleGeolocationPermission();
  }, []);

  return (
    <button
      className="position-button"
      onClick={handleGeolocationPermission}
      disabled={positionBtnDisabled}
      aria-label="User position"
    >
      {positionBtnDisabled ? (
        <svg
          className="location-on-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path d="M560-560q0-33-23.5-56.5T480-640q-10 0-19 2t-17 7l107 107q5-8 7-17t2-19Zm168 213-58-58q25-42 37.5-78.5T720-552q0-109-69.5-178.5T480-800q-44 0-82.5 13.5T328-747l-57-57q43-37 97-56.5T480-880q127 0 223.5 89T800-552q0 48-18 98.5T728-347Zm-157 71L244-603q-2 12-3 25t-1 26q0 71 59 162.5T480-186q26-23 48.5-45.5T571-276ZM819-28 627-220q-32 34-68 69t-79 71Q319-217 239.5-334.5T160-552q0-32 5-61t14-55L27-820l57-57L876-85l-57 57ZM408-439Zm91-137Z" />
        </svg>
      ) : (
        <svg
          className="location-on-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
        </svg>
      )}
    </button>
  );
};

export default LocationButton;
